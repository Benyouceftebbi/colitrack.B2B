"use client"

import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  User,
  Package,
  Truck,
  Save,
  X,
  Edit2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Home,
  MessageSquare,
  Instagram,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parseISO } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Order } from "../data/sample-orders"
import { getAllWilayas, getCommunesByWilayaName, normalizeString } from "../data/algeria-regions"

// Add the import for Yalidin centers
import { getYalidinCentersForCommune } from "../data/yalidin-centers"
import { useShop } from "@/app/context/ShopContext"
import { getNoastCentersByWilaya } from "../data/noast-centers"

// At the top of the file, add the import for useTranslations
import { useTranslations } from "next-intl"

// Add a function to validate wilaya and commune after the imports but before the component
function validateRegionData(order: Order) {
  const wilayaName = order.orderData.wilaya.name_fr.value
  const communeName = order.orderData.commune.name_fr.value

  // Check if wilaya exists
  const allWilayas = getAllWilayas()
  const wilayaExists = allWilayas.some((wilaya) => normalizeString(wilaya.name_ascii) === normalizeString(wilayaName))

  // Check if commune exists
  let communeExists = false
  if (wilayaExists) {
    const communes = getCommunesByWilayaName(wilayaName)
    communeExists = communes.some(
      (commune) => normalizeString(commune.commune_name_ascii) === normalizeString(communeName),
    )
  }

  return {
    wilayaValid: wilayaExists,
    communeValid: communeExists,
  }
}

// Memoize the conversation message component
const ConversationMessage = memo(function ConversationMessage({
  message,
  index,
}: {
  message: any
  index: number
}) {
  return (
    <div
      key={index}
      className={`flex ${message.sender === "client" ? "justify-start" : "justify-end"} animate-in fade-in-0 slide-in-from-bottom-3 duration-300`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`max-w-[90%] rounded-lg p-3 ${
          message.sender === "client"
            ? "bg-gray-100 text-gray-800 dark:bg-slate-700/70 dark:text-gray-200 rounded-tl-none"
            : "bg-indigo-600 text-white dark:bg-indigo-700 rounded-tr-none"
        }`}
      >
        {message.type === "image" ? (
          <div className="space-y-2">
            <img
              src={message.attachment || "/placeholder.svg?height=200&width=200"}
              alt="Attachment"
              className="rounded-md max-w-full max-h-[200px] object-contain"
            />
            <p className="text-xs italic">[Image]</p>
          </div>
        ) : (
          <p dir="auto">{message.message}</p>
        )}
        <p
          className={`text-xs mt-1 ${
            message.sender === "client" ? "opacity-70 dark:text-gray-400" : "opacity-70 text-indigo-100"
          }`}
        >
          {format(parseISO(message.sentAt), "MMM dd, HH:mm")}
        </p>
      </div>
    </div>
  )
})

// Add onEditOrder to the props interface
interface OrderViewModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
  readOnly?: boolean
  onEditOrder?: (order: Order, field: string, value: any) => void
}

// Define MetaLogo component (replace with actual implementation or import)
const MetaLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M14 13.5h2.5l1-4H14v-2c0-.55.45-1 1-1h1.5V3.28c0-.88-1.08-1.3-1.8-.82l-3 2.25V9h-3c0 .55.45 1 1 1h2v3.5z"
      />
    </svg>
  )
}

// Update the OrderViewModal component to handle other shipping providers
export function OrderViewModal({ order, isOpen, onClose, readOnly = false, onEditOrder }: OrderViewModalProps) {
  // Inside the OrderViewModal component, add this line near the top:
  const t = useTranslations("ai-order-retriever")
  const { shopData } = useShop()
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    clientName: order?.orderData.client_name.value || "",
    phoneNumber: order?.orderData.phone_number.value || "",
    articleName: order?.orderData.articles[0]?.name.value || "",
    articleSize: order?.orderData.articles[0]?.sizes[0]?.value || "",
    articleColor: order?.orderData.articles[0]?.colors[0]?.value || "",
    articlePrice: order?.orderData.articles[0]?.total_article_price.value || 0,
    address: order?.orderData.address.value || "",
    wilaya: order?.orderData.wilaya.name_fr.value || "",
    commune: order?.orderData.commune.name_fr.value || "",
    deliveryType: order?.orderData.delivery_type.value || "",
    deliveryCost: order?.orderData.delivery_cost.value || 0,
    totalPrice: order?.orderData.total_price.value || 0,
    additionalInfo: order?.orderData.additional_information?.value || "",
    stopDeskId: order?.orderData.stop_desk?.id || "",
  })
  const [availableCommunes, setAvailableCommunes] = useState([])
  const [availableStopDesks, setAvailableStopDesks] = useState([])

  // Check if a shipping provider that requires stop desk is being used
  const shippingProvider = shopData?.deliveryCompany
  const isNoastExpress = shippingProvider?.toUpperCase() === "NOEST EXPRESS"
  const isYalidinExpress = shippingProvider?.toUpperCase() === "YALIDIN EXPRESS"
  const requiresStopDesk = isNoastExpress || isYalidinExpress

  // Update available stop desks when wilaya or commune changes
  useEffect(() => {
    if (isEditing && editValues.deliveryType === "stopdesk" && requiresStopDesk) {
      let stopDesks = []

      // For NOEST Express, load centers based on wilaya, not commune
      if (isNoastExpress) {
        if (editValues.wilaya) {
          // Get centers directly by wilaya
          stopDesks = getNoastCentersByWilaya(editValues.wilaya)
        }
      } else if (shippingProvider === "Yalidin Express") {
        // For Yalidin, continue using commune-based centers
        if (editValues.commune) {
          stopDesks = getYalidinCentersForCommune(editValues.commune)
        }
      }

      setAvailableStopDesks(stopDesks)

      // If there's only one stop desk, select it automatically
      if (stopDesks.length === 1 && !editValues.stopDeskId) {
        setEditValues((prev) => ({
          ...prev,
          stopDeskId: stopDesks[0].center_id ? stopDesks[0].center_id.toString() : stopDesks[0].key,
        }))
      }
    } else {
      setAvailableStopDesks([])
    }
  }, [
    isEditing,
    editValues.wilaya,
    editValues.commune,
    editValues.deliveryType,
    requiresStopDesk,
    shippingProvider,
    isNoastExpress,
    isYalidinExpress,
  ])

  // Add this useEffect to update available communes when wilaya changes
  useEffect(() => {
    if (isEditing && editValues.wilaya && (!isNoastExpress || (isNoastExpress && editValues.deliveryType === "home"))) {
      // Get communes for this wilaya
      const communes = getCommunesByWilayaName(editValues.wilaya)

      if (communes.length > 0) {
        // Create the available communes list with normalized values for matching
        const communesList = communes.map((commune) => ({
          id: commune.id,
          namefr: commune.commune_name_ascii,
          namear: commune.commune_name,
          normalizedName: normalizeString(commune.commune_name_ascii),
        }))

        setAvailableCommunes(communesList)

        // If there are communes available but none is selected, select the first one
        if (!editValues.commune && communesList.length > 0) {
          setEditValues((prev) => ({
            ...prev,
            commune: communesList[0].namefr,
          }))
        }
      } else {
        setAvailableCommunes([])
      }
    }
  }, [isEditing, editValues.wilaya, editValues.deliveryType, isNoastExpress])

  // Memoize expensive calculations
  const validation = useMemo(() => validateRegionData(order), [order])

  const totalPrice = useMemo(() => {
    return isEditing ? Number(editValues.totalPrice) : order.orderData.total_price.value
  }, [isEditing, editValues.totalPrice, order.orderData.total_price.value])

  // Calculate confidence rate as average of all confidence values
  const confidenceRate = useMemo(() => {
    let totalConfidence = 0
    let count = 0

    // Client name confidence
    if (order.orderData.client_name?.confidence) {
      totalConfidence += order.orderData.client_name.confidence
      count++
    }

    // Phone number confidence
    if (order.orderData.phone_number?.confidence) {
      totalConfidence += order.orderData.phone_number.confidence
      count++
    }

    // Articles confidence
    if (order.orderData.articles && order.orderData.articles.length > 0) {
      order.orderData.articles.forEach((article) => {
        if (article.name?.confidence) {
          totalConfidence += article.name.confidence
          count++
        }
      })
    }

    // Address confidence
    if (order.orderData.address?.confidence) {
      totalConfidence += order.orderData.address.confidence
      count++
    }

    // Return average as percentage
    return count > 0 ? Math.round((totalConfidence / count) * 100) : 0
  }, [order.orderData])

  const confidenceBadgeColor = useMemo(() => {
    if (confidenceRate >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    if (confidenceRate >= 75) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }, [confidenceRate])

  // Memoize handler functions
  const handleEditChange = useCallback((field: string, value: any) => {
    setEditValues((prev) => {
      const newValues = { ...prev, [field]: value }

      // If article price or delivery cost changes, update the total price
      if (field === "articlePrice" || field === "deliveryCost") {
        const articlePrice = field === "articlePrice" ? Number(value) : Number(prev.articlePrice)
        const deliveryCost = field === "deliveryCost" ? Number(value) : Number(prev.deliveryCost)
        newValues.totalPrice = articlePrice + deliveryCost
      }

      return newValues
    })
  }, [])

  const startEditing = useCallback(() => {
    // Get the exact wilaya name as it appears in the data
    const wilayaName = order.orderData.wilaya.name_fr.value
    const communeName = order.orderData.commune.name_fr.value

    // Find the exact wilaya in the list to ensure we have the correct format
    const allWilayas = getAllWilayas()
    const matchingWilaya = allWilayas.find(
      (wilaya) => normalizeString(wilaya.name_ascii) === normalizeString(wilayaName),
    )

    // Use the exact wilaya name from the list if found
    const exactWilayaName = matchingWilaya ? matchingWilaya.name_ascii : wilayaName

    // Get communes for this wilaya
    const communes = getCommunesByWilayaName(exactWilayaName)

    // Create initial edit values
    const initialValues = {
      clientName: order.orderData.client_name.value,
      phoneNumber: order.orderData.phone_number.value,
      articleName: order.orderData.articles[0]?.name.value || "",
      articleSize: order.orderData.articles[0]?.sizes[0]?.value || "",
      articleColor: order.orderData.articles[0]?.colors[0]?.value || "",
      articlePrice: order.orderData.articles[0]?.total_article_price.value || 0,
      address: order.orderData.address.value,
      wilaya: exactWilayaName,
      commune: communeName,
      deliveryType: order.orderData.delivery_type.value,
      deliveryCost: order.orderData.delivery_cost.value || 0,
      totalPrice:
        (order.orderData.articles[0]?.total_article_price.value || 0) + (order.orderData.delivery_cost.value || 0),
      additionalInfo: order.orderData.additional_information?.value || "",
      stopDeskId: order.orderData.stop_desk?.id || "",
    }

    // For NOEST Express with stopdesk, commune is not required
    if (isNoastExpress && order.orderData.delivery_type.value === "stopdesk") {
      // No need to set available communes
      setEditValues(initialValues)

      // Load NOEST centers based on wilaya
      const stopDesks = getNoastCentersByWilaya(wilayaName)
      setAvailableStopDesks(stopDesks)
    }
    // For other cases, load communes if available
    else if (communes.length > 0) {
      // Find the matching commune to get the exact name format
      const matchingCommune = communes.find(
        (commune) => normalizeString(commune.commune_name_ascii) === normalizeString(communeName),
      )

      // Use the exact commune name from the list if found
      const exactCommuneName = matchingCommune ? matchingCommune.commune_name_ascii : communeName

      // Create the available communes list
      setAvailableCommunes(
        communes.map((commune) => ({
          id: commune.id,
          namefr: commune.commune_name_ascii,
          namear: commune.commune_name,
          normalizedName: normalizeString(commune.commune_name_ascii),
        })),
      )

      // Update commune in initial values
      initialValues.commune = exactCommuneName
      setEditValues(initialValues)

      // If delivery type is stopdesk and we have a shipping provider that requires stop desks,
      // load available stop desks
      if (order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk) {
        let stopDesks = []

        if (isNoastExpress) {
          stopDesks = getNoastCentersByWilaya(wilayaName)
        } else if (isYalidinExpress) {
          stopDesks = getYalidinCentersForCommune(exactCommuneName || communeName)
        }

        setAvailableStopDesks(stopDesks)
      }
    }
    // If no communes found, just use the original values
    else {
      setEditValues(initialValues)

      // For NOEST Express, load centers based on wilaya
      if (isNoastExpress && order.orderData.delivery_type.value === "stopdesk") {
        const stopDesks = getNoastCentersByWilaya(wilayaName)
        setAvailableStopDesks(stopDesks)
      } else if (isYalidinExpress && order.orderData.delivery_type.value === "stopdesk") {
        // For Yalidin, try to get centers for the commune
        const stopDesks = getYalidinCentersForCommune(communeName)
        setAvailableStopDesks(stopDesks)
      }
    }

    setIsEditing(true)
  }, [order, requiresStopDesk, isNoastExpress, isYalidinExpress])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
    setAvailableCommunes([])
    setAvailableStopDesks([])
  }, [])

  // Also update the saveChanges function to use normalizeString instead of compareNormalizedStrings
  const saveChanges = useCallback(() => {
    if (!onEditOrder) return

    // Get the original order values to compare with edited values
    const originalValues = {
      clientName: order.orderData.client_name.value,
      phoneNumber: order.orderData.phone_number.value,
      articleName: order.orderData.articles[0]?.name.value || "",
      articleSize: order.orderData.articles[0]?.sizes[0]?.value || "",
      articleColor: order.orderData.articles[0]?.colors[0]?.value || "",
      articlePrice: order.orderData.articles[0]?.total_article_price.value || 0,
      address: order.orderData.address.value,
      wilaya: order.orderData.wilaya.name_fr.value,
      commune: order.orderData.commune.name_fr.value,
      deliveryType: order.orderData.delivery_type.value,
      deliveryCost: order.orderData.delivery_cost.value || 0,
      totalPrice: order.orderData.total_price.value || 0,
      additionalInfo: order.orderData.additional_information?.value || "",
    }

    // Check each field for changes and update if needed
    Object.keys(editValues).forEach((field) => {
      // For wilaya and commune, use normalized comparison
      if (field === "wilaya" || field === "commune") {
        if (normalizeString(editValues[field]) !== normalizeString(originalValues[field])) {
          onEditOrder(order, field, editValues[field])
        }
      } else if (field === "stopDeskId") {
        // Handle stop desk ID separately
        if (editValues[field] !== (order.orderData.stop_desk?.id || "")) {
          onEditOrder(order, field, editValues[field])
        }
      } else if (editValues[field] !== originalValues[field]) {
        // For other fields, use regular comparison
        onEditOrder(order, field, editValues[field])
      }
    })

    // Exit edit mode
    setIsEditing(false)
    setAvailableCommunes([])
    setAvailableStopDesks([])
  }, [editValues, order, onEditOrder])

  // Memoize the conversation section
  const ConversationSection = useMemo(() => {
    return (
      <Card className="border dark:border-gray-700 h-full">
        <CardHeader className="bg-gray-50 dark:bg-slate-800/80 border-b dark:border-gray-700 py-3">
          <CardTitle className="text-base font-medium flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            {t("conversationHistory")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-y-auto p-4 space-y-4">
            {order.conversation && order.conversation.length > 0 ? (
              order.conversation.map((message, index) => (
                <ConversationMessage key={index} message={message} index={index} />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">{t("noConversationHistory")}</div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }, [order.conversation, t])

  // Function to check if stop desk is available for a commune
  const isStopDeskAvailableForCommune = useCallback(
    (communeName: string) => {
      if (isNoastExpress) return true // For NOEST Express, stop desks are always available
      if (!requiresStopDesk) return true // If not a provider that requires stop desk, stop desks are always "available"

      // For Yalidin Express, check if the commune has stop desks
      const stopDesks = getYalidinCentersForCommune(communeName)
      return stopDesks.length > 0
    },
    [requiresStopDesk, isNoastExpress],
  )

  // Don't render if not open to improve performance
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto dark:border-gray-700 p-0">
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
                Order #{order.id}
                <Badge
                  className={`ml-3 ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {order.status === "delivered" ? "Delivered" : "Pending"}
                </Badge>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {format(
                  order.timestamp instanceof Date ? order.timestamp : parseISO(order.timestamp),
                  "MMM dd, yyyy 'at' HH:mm",
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!readOnly && !isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={startEditing}
                className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 dark:border-indigo-800"
              >
                <Edit2 className="h-4 w-4 mr-1" /> {t("edit")}
              </Button>
            )}
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelEditing}
                  className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <X className="h-4 w-4 mr-1" /> {t("cancel")}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={saveChanges}
                  className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
                >
                  <Save className="h-4 w-4 mr-1" /> {t("save")}
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{t("close")}</span>
            </Button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Order details */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="overflow-hidden border dark:border-gray-700">
                <CardHeader className="bg-gray-50 dark:bg-slate-800/80 border-b dark:border-gray-700 py-3">
                  <CardTitle className="text-base font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    {t("customerInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("name")}</p>
                      {isEditing ? (
                        <Input
                          value={editValues.clientName}
                          onChange={(e) => handleEditChange("clientName", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">{order.orderData.client_name.value}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("phone")}</p>
                      {isEditing ? (
                        <Input
                          value={editValues.phoneNumber}
                          onChange={(e) => handleEditChange("phoneNumber", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">{order.orderData.phone_number.value}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("source")}</p>
                      <div className="flex items-center">
                        {order.source === "messenger" ? (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                          >
                            <MetaLogo className="h-3 w-3 mr-1" />
                            Meta Messenger
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                          >
                            <Instagram className="h-3 w-3 mr-1" />
                            Instagram
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card className="overflow-hidden border dark:border-gray-700">
                <CardHeader className="bg-gray-50 dark:bg-slate-800/80 border-b dark:border-gray-700 py-3">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Package className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    {t("orderDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("article")}</p>
                      {isEditing ? (
                        <Input
                          value={editValues.articleName}
                          onChange={(e) => handleEditChange("articleName", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {order.orderData.articles[0]?.name.value || "-"}
                        </p>
                      )}
                    </div>

                    {(order.orderData.articles[0]?.sizes.length > 0 || isEditing) && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("size")}</p>
                        {isEditing ? (
                          <Input
                            value={editValues.articleSize}
                            onChange={(e) => handleEditChange("articleSize", e.target.value)}
                            className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                          />
                        ) : (
                          <p className="font-medium dark:text-gray-200">{order.orderData.articles[0].sizes[0].value}</p>
                        )}
                      </div>
                    )}

                    {(order.orderData.articles[0]?.colors.length > 0 || isEditing) && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("color")}</p>
                        {isEditing ? (
                          <Input
                            value={editValues.articleColor}
                            onChange={(e) => handleEditChange("articleColor", e.target.value)}
                            className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                          />
                        ) : (
                          <p className="font-medium dark:text-gray-200">
                            {order.orderData.articles[0].colors[0].value}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("price")}</p>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.articlePrice}
                          onChange={(e) => handleEditChange("articlePrice", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {(order.orderData.articles[0]?.total_article_price.value).toLocaleString()} DA
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("deliveryCost")}</p>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.deliveryCost}
                          onChange={(e) => handleEditChange("deliveryCost", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {order.orderData.delivery_cost.value.toLocaleString()} DA
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator className="my-2 dark:border-gray-700" />

                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("totalPrice")}</p>
                    {isEditing ? (
                      <div className="flex items-center">
                        <Input
                          type="number"
                          value={editValues.totalPrice}
                          onChange={(e) => handleEditChange("totalPrice", e.target.value)}
                          className="h-8 w-32 dark:bg-slate-700/70 dark:border-gray-700 mr-2"
                        />
                        <span className="text-sm font-medium">DA</span>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {totalPrice.toLocaleString()} DA
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Badge className={cn("mr-2", confidenceBadgeColor)}>{confidenceRate}%</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t("confidence")}</span>
                    </div>

                    <div className="flex items-center">
                      {order.status === "delivered" ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {t("delivered")}
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {t("pending")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card className="overflow-hidden border dark:border-gray-700">
                <CardHeader className="bg-gray-50 dark:bg-slate-800/80 border-b dark:border-gray-700 py-3">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    {t("deliveryInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("deliveryType")}</p>
                      {isEditing ? (
                        <Select
                          value={editValues.deliveryType}
                          onValueChange={(value) => handleEditChange("deliveryType", value)}
                        >
                          <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                            <SelectValue placeholder={t("selectType")}>
                              {editValues.deliveryType === "home"
                                ? "À domicile"
                                : editValues.deliveryType === "stopdesk"
                                  ? "Point de relais"
                                  : ""}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">{t("homeDelivery")}</SelectItem>
                            <SelectItem value="stopdesk">
                              {t("stopDesk")}
                              {!isNoastExpress &&
                                editValues.commune &&
                                !isStopDeskAvailableForCommune(editValues.commune) && (
                                  <span className="ml-2 text-amber-500 text-xs font-medium px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 rounded">
                                    Non disponible
                                  </span>
                                )}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center">
                          {order.orderData.delivery_type.value === "home" ? (
                            <>
                              <Home className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                              <span className="font-medium dark:text-gray-200">À domicile</span>
                            </>
                          ) : order.orderData.delivery_type.value === "stopdesk" ? (
                            <>
                              <Home className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                              <span className="font-medium dark:text-gray-200">Point de relais</span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Only show stop desk selection for providers that require it */}
                    {editValues.deliveryType === "stopdesk" && requiresStopDesk ? (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("stopDesk")}</p>
                        {isEditing ? (
                          <Select
                            value={editValues.stopDeskId || "no_selection"}
                            onValueChange={(value) =>
                              handleEditChange("stopDeskId", value === "no_selection" ? "" : value)
                            }
                            disabled={availableStopDesks.length === 0}
                          >
                            <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                              <SelectValue placeholder={t("selectStopDesk")} />
                            </SelectTrigger>
                            <SelectContent>
                              {availableStopDesks.length === 0 ? (
                                <SelectItem value="no_selection">
                                  <span className="text-amber-500 text-xs font-medium">
                                    {t("noStopDesksAvailable")}
                                  </span>
                                </SelectItem>
                              ) : (
                                <>
                                  <SelectItem value="no_selection">{t("selectAStopDesk")}</SelectItem>
                                  {availableStopDesks
                                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                                    .map((desk) => {
                                      // Use key for NOEST centers and center_id for Yalidin centers
                                      const centerId = isNoastExpress ? desk.key : desk.center_id
                                      return (
                                        <SelectItem key={centerId} value={centerId?.toString() || ""}>
                                          {desk.name} {isNoastExpress && desk.code ? `(${desk.code})` : ""}
                                        </SelectItem>
                                      )
                                    })}
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="font-medium dark:text-gray-200">
                            {order.orderData.stop_desk?.name || (
                              <span className="text-amber-600 dark:text-amber-400 font-medium">{t("notSelected")}</span>
                            )}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("address")}</p>
                    {isEditing ? (
                      <Input
                        value={editValues.address}
                        onChange={(e) => handleEditChange("address", e.target.value)}
                        className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <p className="font-medium dark:text-gray-200">{order.orderData.address.value}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("wilaya")}</p>
                      {isEditing ? (
                        <Select
                          value={editValues.wilaya}
                          onValueChange={(value) => {
                            handleEditChange("wilaya", value)
                            setAvailableCommunes([])
                            setEditValues((prev) => ({ ...prev, commune: "" }))
                          }}
                        >
                          <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                            <SelectValue placeholder={t("selectWilaya")}>{editValues.wilaya}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {getAllWilayas()
                              .sort((a, b) => a.name_ascii.localeCompare(b.name_ascii)) // Sort alphabetically
                              .map((wilaya) => (
                                <SelectItem
                                  key={wilaya.code} // Make sure this key is unique
                                  value={wilaya.name_ascii}
                                >
                                  {wilaya.name_ascii}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium dark:text-gray-200">{order.orderData.wilaya.name_fr.value}</p>
                      )}
                      {!validation.wilayaValid && (
                        <div className="flex items-center text-red-500 dark:text-red-400 text-sm mt-1">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          {t("invalidWilaya")}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("commune")}</p>
                      {isEditing ? (
                        <Select
                          value={editValues.commune || "placeholder-value"}
                          onValueChange={(value) => handleEditChange("commune", value)}
                          disabled={
                            !editValues.wilaya ||
                            availableCommunes.length === 0 ||
                            (isNoastExpress && editValues.deliveryType === "stopdesk")
                          }
                        >
                          <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                            <SelectValue placeholder={t("selectCommune")}>
                              {isNoastExpress && editValues.deliveryType === "stopdesk"
                                ? "Not required for NOEST"
                                : editValues.commune || "Select commune"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {isNoastExpress && editValues.deliveryType === "stopdesk" ? (
                              <SelectItem value="placeholder-value" disabled>
                                {t("notRequiredForNoestExpress")}
                              </SelectItem>
                            ) : isNoastExpress ? (
                              // For NOEST Express, add the wilaya as a commune option
                              <>
                                <SelectItem value={editValues.wilaya}>{editValues.wilaya} (Same as Wilaya)</SelectItem>
                                {availableCommunes.length > 0 ? (
                                  availableCommunes
                                    .sort((a, b) => a.namefr.localeCompare(b.namefr)) // Sort alphabetically
                                    .map((commune) => {
                                      // Check if this commune matches the current value using normalized comparison
                                      const isSelected =
                                        normalizeString(commune.namefr) === normalizeString(editValues.commune)
                                      const hasStopDesk = isStopDeskAvailableForCommune(commune.namefr)

                                      return (
                                        <SelectItem
                                          key={commune.id}
                                          value={commune.namefr || "placeholder-value"}
                                          className={isSelected ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span>
                                              {commune.namefr} {commune.namear ? `(${commune.namear})` : ""}
                                              {isSelected && " ✓"}
                                            </span>
                                            {!hasStopDesk && editValues.deliveryType === "stopdesk" && (
                                              <span className="text-amber-500 text-xs font-medium ml-2 px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 rounded">
                                                {t("noStopDesk")}
                                              </span>
                                            )}
                                          </div>
                                        </SelectItem>
                                      )
                                    })
                                ) : (
                                  <SelectItem value="placeholder-value" disabled>
                                    {editValues.wilaya ? "No communes found" : "Select wilaya first"}
                                  </SelectItem>
                                )}
                              </>
                            ) : availableCommunes.length > 0 ? (
                              availableCommunes
                                .sort((a, b) => a.namefr.localeCompare(b.namefr)) // Sort alphabetically
                                .map((commune) => {
                                  // Check if this commune matches the current value using normalized comparison
                                  const isSelected =
                                    normalizeString(commune.namefr) === normalizeString(editValues.commune)
                                  const hasStopDesk = isStopDeskAvailableForCommune(commune.namefr)

                                  return (
                                    <SelectItem
                                      key={commune.id}
                                      value={commune.namefr || "placeholder-value"}
                                      className={isSelected ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span>
                                          {commune.namefr} {commune.namear ? `(${commune.namear})` : ""}
                                          {isSelected && " ✓"}
                                        </span>
                                        {!hasStopDesk && editValues.deliveryType === "stopdesk" && (
                                          <span className="text-amber-500 text-xs font-medium ml-2 px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 rounded">
                                            {t("noStopDesk")}
                                          </span>
                                        )}
                                      </div>
                                    </SelectItem>
                                  )
                                })
                            ) : (
                              <SelectItem value="placeholder-value" disabled>
                                {editValues.wilaya ? "No communes found" : "Select wilaya first"}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {isNoastExpress && order.orderData.delivery_type.value === "stopdesk" ? (
                            <span className="text-gray-500 dark:text-gray-400 italic">{t("notRequiredForNoest")}</span>
                          ) : order.orderData.commune.name_fr.value ? (
                            order.orderData.commune.name_fr.value
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 italic">Not specified</span>
                          )}
                        </p>
                      )}
                      {!validation.communeValid &&
                        !(isNoastExpress && order.orderData.delivery_type.value === "stopdesk") && (
                          <div className="flex items-center text-red-500 dark:text-red-400 text-sm mt-1">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {t("invalidCommune")}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("additionalInformation")}</p>
                    {isEditing ? (
                      <Input
                        value={editValues.additionalInfo}
                        onChange={(e) => handleEditChange("additionalInfo", e.target.value)}
                        className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <p className="font-medium dark:text-gray-200">
                        {order.orderData.additional_information?.value || "-"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column: Conversation History */}
            <div className="col-span-1 lg:col-span-1">{ConversationSection}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
