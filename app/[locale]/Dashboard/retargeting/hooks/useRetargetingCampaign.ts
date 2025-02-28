"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { utils, writeFile } from "xlsx"
import type { SentMessage, ClientGroup, ExcelData, CampaignStatus } from "../types"
import { CLIENT_GROUPS, CHARACTER_LIMIT, COST_PER_MESSAGE } from "../components/constants"
import { useShop } from "@/app/context/ShopContext"
import axios from "axios"
import { functions } from "@/firebase/firebase"
import { httpsCallable } from "firebase/functions"
export function useRetargetingCampaign() {
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
  const [processedData, setProcessedData] = useState<Array<{ name: string; number: string }>>([])
  const [totalRecipients, setTotalRecipients] = useState(0)
  const [campaignName, setCampaignName] = useState("")

  const characterCount = message.length
  const messageCount = Math.ceil(characterCount / CHARACTER_LIMIT)
  const remainingCharacters = CHARACTER_LIMIT - (characterCount % CHARACTER_LIMIT)
  const totalCost = messageCount * totalRecipients * COST_PER_MESSAGE
  const {shopData,setShopData}=useShop()

  useEffect(() => {
    if (excelData && excelData.phoneColumn && excelData.nameColumn) {
      const phoneIndex = excelData.headers.indexOf(excelData.phoneColumn)
      const nameIndex = excelData.headers.indexOf(excelData.nameColumn)

      const processed = excelData.data.map((row) => ({
        name: row[nameIndex] as string,
        number: row[phoneIndex] as string,
      }))

      setProcessedData(processed)
      setTotalRecipients(processed.length)

      console.log("Processed Excel Data:", processed)
      console.log("Total Recipients:", processed.length)
    }
  }, [excelData])

  const handleSendCampaign = async () => {
    try {
      setIsSending(true);
  
      // Firebase Cloud Function
      const sendBulkSMS = httpsCallable(functions, "sendBulkSMS");
      const response = await sendBulkSMS({
        sms: message, // The SMS content
        phoneNumbers: processedData.map((recipient) => ({
          name: recipient.name,
          phoneNumber: recipient.number,
        })),
        compaignName:campaignName, // Ensure campaign name is passed
        messageCount,
      });
  
      const responseData = response.data;
  
      if (!responseData) {
        throw new Error("Invalid response from server");
      }
  
      if (responseData.status === "failed") {
        // Handle different failure reasons
        if (responseData.error === "Not enough tokens") {
          alert("⚠️ Not enough tokens to run this campaign! You have: " + responseData.newTokens);
        } else if (responseData.error === "SMS contains sensitive content") {
          alert("❌ SMS content was rejected. Please modify your message.");
        } else {
          alert("❌ Failed to send SMS: " + responseData.error);
        }
        setIsSending(false);
        return;
      }
  
      if (responseData.status === "pending") {
        console.log("✅ SMS Campaign Pending, handling the rest...");
        console.log("Response:", responseData);
  
        // Create a new SMS campaign entry
        const newMessage = {
          id: responseData.campaignId,
          date: new Date(),
          recipients: totalRecipients,
          campaignName,
          messageCount,
          totalCost,
          content: message,
          status: "pending", // Set initial status
        };
  
        // Update shop data with new tokens
        setShopData((prevShopData) => ({
          ...prevShopData,
          tokens: responseData.newTokens,
        }));
  
        // Fire confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
  
        setIsSending(false);
        setIsAlertOpen(false);
        resetForm();
        return newMessage;
      } else {
        console.error("Unexpected response status:", responseData.status);
        setIsSending(false);
      }
    } catch (error) {
      console.error("🚨 Error sending SMS campaign:", error);
      alert("❌ An unexpected error occurred. Please try again.");
      setIsSending(false);
    }
  };

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
  }
}