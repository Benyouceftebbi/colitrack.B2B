"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { utils, writeFile } from "xlsx"
import type { SentMessage, ClientGroup, ExcelData, CampaignStatus, MessageType, UniqueMessageStats } from "../types"
import { CLIENT_GROUPS, CHARACTER_LIMIT, COST_PER_MESSAGE } from "../components/constants"
import { useShop } from "@/app/context/ShopContext"
import { functions } from "@/firebase/firebase"
import { httpsCallable } from "firebase/functions"
import {
  containsUnicodeCharacters,
  containsRTLCharacters,
  validateNamePlaceholderLength,
  getUnicodeValidationMessage,



  
} from "../utils/message"
import { useToast } from "@/hooks/use-toast"

export function useRetargetingCampaign() {
  const { toast } = useToast() // Use the imported useToast hook
  const [selectedGroup, setSelectedGroup] = useState<ClientGroup>(CLIENT_GROUPS[0])
  const [message, setMessage] = useState("")
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertAction, setAlertAction] = useState<"test" | "campaign">("campaign")
  const [currentStep, setCurrentStep] = useState(0)
  const [isPersonalized, setIsPersonalized] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [audienceSource, setAudienceSource] = useState("group")
  const [deliveryStatus, setDeliveryStatus] = useState("all")
  const [excelData, setExcelData] = useState<ExcelData | null>(null)
  const [processedData, setProcessedData] = useState<Array<{ name: string; number: string; message?: string }>>([])
  const [totalRecipients, setTotalRecipients] = useState(0)
  const [campaignName, setCampaignName] = useState("")
  const [messageType, setMessageType] = useState<MessageType>("custom")
  const [uniqueMessageStats, setUniqueMessageStats] = useState<UniqueMessageStats | null>(null)

  const hasUnicode = containsUnicodeCharacters(message)
  const hasRTL = containsRTLCharacters(message)
  const effectiveCharLimit = hasUnicode ? 80 : CHARACTER_LIMIT
  const characterCount = message.length
  const messageCount = Math.ceil(characterCount / effectiveCharLimit)
  const remainingCharacters = effectiveCharLimit - (characterCount % effectiveCharLimit || effectiveCharLimit)
  const totalCost = messageCount * totalRecipients * COST_PER_MESSAGE
  const nameValidation = validateNamePlaceholderLength(message)
  const unicodeValidation = hasUnicode ? getUnicodeValidationMessage(message) : null
  const { shopData, setShopData } = useShop()

  useEffect(() => {
    if (excelData && excelData.phoneColumn && excelData.nameColumn) {
      const phoneIndex = excelData.headers.indexOf(excelData.phoneColumn)
      const nameIndex = excelData.headers.indexOf(excelData.nameColumn)
      const messageIndex = excelData.messageColumn ? excelData.headers.indexOf(excelData.messageColumn) : -1

      const processed = excelData.data.map((row) => ({
        name: row[nameIndex] as string,
        number: row[phoneIndex] as string,
        message: messageIndex >= 0 ? (row[messageIndex] as string) : undefined,
      }))

      setProcessedData(processed)
      setTotalRecipients(processed.length)

      // Calculate unique message stats if message column is selected
      if (messageType === "unique" && messageIndex >= 0) {
        const messages = processed.map(p => p.message || "").filter(m => m.length > 0)
        const charCounts = messages.map(m => m.length)
        const totalChars = charCounts.reduce((a, b) => a + b, 0)
        const effectiveLimit = messages.some(m => containsUnicodeCharacters(m)) ? 80 : CHARACTER_LIMIT
        
        setUniqueMessageStats({
          totalRecipients: processed.length,
          totalCharacters: totalChars,
          averageCharacters: messages.length > 0 ? Math.round(totalChars / messages.length) : 0,
          maxCharacters: messages.length > 0 ? Math.max(...charCounts) : 0,
          minCharacters: messages.length > 0 ? Math.min(...charCounts) : 0,
          messagesOverLimit: charCounts.filter(c => c > effectiveLimit).length,
        })
      } else {
        setUniqueMessageStats(null)
      }

      console.log("Processed Excel Data:", processed)
      console.log("Total Recipients:", processed.length)
    }
  }, [excelData, messageType])

  const handleSendCampaign = async () => {
    try {
      // Check if senderId exists
      if (!shopData.senderId) {
        toast({
          title: "Sender ID Missing",
          description: "You need to set up your sender ID. Learn more in upgrade.",
          variant: "destructive",
        })
        return null
      }

      setIsSending(true)

      let response
      let calculatedTotalCost = totalCost
      let calculatedMessageCount = messageCount

      // Use different functions based on message type
      if (messageType === "unique" && excelData?.messageColumn) {
        // Unique SMS - each recipient gets their own message from Excel
        const sendUniqueBulkSMS = httpsCallable(functions, "sendUniqueBulkSMS")
        
        // Calculate stats for unique messages
        const totalChars = uniqueMessageStats?.totalCharacters || 0
        const effectiveLimit = hasUnicode ? 80 : CHARACTER_LIMIT
        calculatedMessageCount = Math.ceil(totalChars / effectiveLimit)
        calculatedTotalCost = calculatedMessageCount * COST_PER_MESSAGE

        response = await sendUniqueBulkSMS({
          phoneNumbers: processedData.map((recipient) => ({
            name: recipient.name,
            phoneNumber: recipient.number,
            sms: recipient.message || "", // Each recipient has their own message
          })),
          compaignName: campaignName,
          collectionName: "Clients",
          hasUnicode,
          hasRTL,
          isUniqueMessage: true,
        })
      } else {
        // Custom SMS - same message for all recipients
        const sendBulkSMS = httpsCallable(functions, "sendBulkSMS")
        response = await sendBulkSMS({
          sms: message,
          phoneNumbers: processedData.map((recipient) => ({
            name: recipient.name,
            phoneNumber: recipient.number,
          })),
          compaignName: campaignName,
          messageCount,
          collectionName: "Clients",
          hasUnicode,
          hasRTL,
        })
      }

      const responseData = response.data

      if (!responseData) {
        throw new Error("Invalid response from server")
      }

      if (responseData.status === "failed") {
        // Handle different failure reasons
        if (responseData.error === "Not enough tokens") {
          alert("Not enough tokens to run this campaign! You have: " + responseData.newTokens)
        } else if (responseData.error === "SMS contains sensitive content") {
          alert("SMS content was rejected. Please modify your message.")
        } else {
          alert("Failed to send SMS: " + responseData.error)
        }
        setIsSending(false)
        return null
      }

      if (responseData.status === "pending") {
        console.log("SMS Campaign Pending, handling the rest...")
        console.log("Response:", responseData)

        // Create a new SMS campaign entry
        const newMessage = {
          id: responseData.campaignId,
          date: new Date(),
          recipients: totalRecipients,
          campaignName,
          messageCount: calculatedMessageCount,
          totalCost: calculatedTotalCost,
          content: messageType === "unique" ? `[Unique Messages - ${totalRecipients} recipients]` : message,
          status: "pending",
          messageType, // Track if this was a unique or custom campaign
        }

        // Update shop data with new tokens
        setShopData((prevShopData) => ({
          ...prevShopData,
          tokens: responseData.newTokens,
        }))

        // Fire confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        setIsSending(false)
        setIsAlertOpen(false)
        resetForm()
        return newMessage
      } else {
        console.error("Unexpected response status:", responseData.status)
        setIsSending(false)
        return null
      }
    } catch (error) {
      console.error("Error sending SMS campaign:", error)
      alert("An unexpected error occurred. Please try again.")
      setIsSending(false)
      return null
    }
  }

  const updateCampaignStatus = async (messageId: string, newStatus: CampaignStatus) => {
    // In a real application, you would update the status on the server here
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (newStatus === "sent") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    return newStatus
  }

  const exportToExcel = (message: SentMessage) => {
    const worksheet = utils.json_to_sheet([
      {
        Date: message.date.toLocaleString(),
        "Campaign Name": message.campaignName,
        Recipients: message.recipients,
        "Message Count": message.messageCount,
        "Total Cost": message.totalCost,
        Content: message.content,
        Status: message.status,
      },
    ])
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "Campaign")
    writeFile(workbook, `campaign_${message.id}.xlsx`)
  }

  const resetForm = () => {
    setCampaignName("")
    setMessage("")
    setSelectedGroup(CLIENT_GROUPS[0])
    setAudienceSource("group")
    setExcelData(null)
    setTotalRecipients(0)
    setCurrentStep(0)
    setAudienceSource("")
    setProcessedData([])
    setMessageType("custom")
    setUniqueMessageStats(null)
  }

  return {
    selectedGroup,
    setSelectedGroup,
    message,
    setMessage,
    isAlertOpen,
    setIsAlertOpen,
    alertAction,
    setAlertAction,
    currentStep,
    setCurrentStep,
    isPersonalized,
    setIsPersonalized,
    isSending,
    characterCount,
    messageCount,
    remainingCharacters,
    totalCost,
    handleSendCampaign,
    updateCampaignStatus,
    exportToExcel,
    CLIENT_GROUPS,
    CHARACTER_LIMIT,
    audienceSource,
    setAudienceSource,
    deliveryStatus,
    setDeliveryStatus,
    excelData,
    setExcelData,
    processedData,
    totalRecipients,
    setTotalRecipients,
    campaignName,
    setCampaignName,
    resetForm,
    hasUnicode,
    hasRTL,
    effectiveCharLimit,
    nameValidation,
    unicodeValidation,
    messageType,
    setMessageType,
    uniqueMessageStats,
    setUniqueMessageStats,
  }
}
