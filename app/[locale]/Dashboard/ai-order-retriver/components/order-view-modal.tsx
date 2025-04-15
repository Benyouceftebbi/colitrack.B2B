"use client"

import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  User,
  Package,
  Truck,
  Calendar,
  Save,
  X,
  Edit2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Home,
  Info,
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
import { MetaLogo } from "./meta-logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

export function OrderViewModal({ order, isOpen, onClose, readOnly = false, onEditOrder }: OrderViewModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    clientName: order?.orderData.client_name.value || "",
    phoneNumber: order?.orderData.phone_number.value || "",
    articleName: order?.orderData.articles[0]?.name.value || "",
    articleSize: order?.orderData.articles[0]?.sizes[0]?.value || "",
    articleColor: order?.orderData.articles[0]?.colors[0]?.value || "",
    articlePrice: order?.orderData.articles[0]?.total_article_price.value / 100 || 0,
    address: order?.orderData.address.value || "",
    wilaya: order?.orderData.wilaya.name_fr.value || "",
    commune: order?.orderData.commune.name_fr.value || "",
    deliveryType: order?.orderData.delivery_type.value || "",
    deliveryCost: order?.orderData.delivery_cost.value / 100 || 0,
    additionalInfo: order?.orderData.additional_information?.value || "",
  })
  const [availableCommunes, setAvailableCommunes] = useState([])

  // Update available communes when wilaya changes
  useEffect(() => {
    if (isEditing && editValues.wilaya) {
      // Get communes for this wilaya using the normalized string comparison
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

        // Check if the current commune exists in the new wilaya using normalized comparison
        const normalizedCurrentCommune = normalizeString(editValues.commune)
        const communeExists = communesList.some((commune) => commune.normalizedName === normalizedCurrentCommune)

        if (!communeExists && communesList.length > 0) {
          setEditValues((prev) => ({
            ...prev,
            commune: communesList[0].namefr,
          }))
        }
      } else {
        setAvailableCommunes([])
      }
    }
  }, [isEditing, editValues.wilaya])

  // Memoize expensive calculations
  const validation = useMemo(() => validateRegionData(order), [order])

  const totalPrice = useMemo(() => {
    return isEditing
      ? Number(editValues.articlePrice) + Number(editValues.deliveryCost)
      : order.orderData.total_price.value / 100
  }, [isEditing, editValues.articlePrice, editValues.deliveryCost, order.orderData.total_price.value])

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
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  // Update the startEditing function to handle accented characters
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

    if (communes.length > 0) {
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

      // Set the initial values with the exact names
      const initialValues = {
        clientName: order.orderData.client_name.value,
        phoneNumber: order.orderData.phone_number.value,
        articleName: order.orderData.articles[0]?.name.value || "",
        articleSize: order.orderData.articles[0]?.sizes[0]?.value || "",
        articleColor: order.orderData.articles[0]?.colors[0]?.value || "",
        articlePrice: order.orderData.articles[0]?.total_article_price.value / 100 || 0,
        address: order.orderData.address.value,
        wilaya: exactWilayaName,
        commune: exactCommuneName,
        deliveryType: order.orderData.delivery_type.value,
        deliveryCost: order.orderData.delivery_cost.value / 100 || 0,
        additionalInfo: order.orderData.additional_information?.value || "",
      }

      setEditValues(initialValues)
    } else {
      // If no communes found, use the original values
      setEditValues({
        clientName: order.orderData.client_name.value,
        phoneNumber: order.orderData.phone_number.value,
        articleName: order.orderData.articles[0]?.name.value || "",
        articleSize: order.orderData.articles[0]?.sizes[0]?.value || "",
        articleColor: order.orderData.articles[0]?.colors[0]?.value || "",
        articlePrice: order.orderData.articles[0]?.total_article_price.value / 100 || 0,
        address: order.orderData.address.value,
        wilaya: wilayaName,
        commune: communeName,
        deliveryType: order.orderData.delivery_type.value,
        deliveryCost: order.orderData.delivery_cost.value / 100 || 0,
        additionalInfo: order.orderData.additional_information?.value || "",
      })
    }

    setIsEditing(true)
  }, [order])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
    setAvailableCommunes([])
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
      articlePrice: order.orderData.articles[0]?.total_article_price.value / 100 || 0,
      address: order.orderData.address.value,
      wilaya: order.orderData.wilaya.name_fr.value,
      commune: order.orderData.commune.name_fr.value,
      deliveryType: order.orderData.delivery_type.value,
      deliveryCost: order.orderData.delivery_cost.value / 100 || 0,
      additionalInfo: order.orderData.additional_information?.value || "",
    }

    // Check each field for changes and update if needed
    Object.keys(editValues).forEach((field) => {
      // For wilaya and commune, use normalized comparison
      if (field === "wilaya" || field === "commune") {
        if (normalizeString(editValues[field]) !== normalizeString(originalValues[field])) {
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
  }, [editValues, order, onEditOrder])

  // Memoize the conversation section
  const ConversationSection = useMemo(() => {
    return (
      <Card className="border dark:border-gray-700 h-full">
        <CardHeader className="bg-gray-50 dark:bg-slate-800/80 border-b dark:border-gray-700 py-3">
          <CardTitle className="text-base font-medium flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Conversation History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-y-auto p-4 space-y-4">
            {order.conversation && order.conversation.length > 0 ? (
              order.conversation.map((message, index) => (
                <ConversationMessage key={index} message={message} index={index} />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No conversation history available.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }, [order.conversation])

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
                {format(parseISO(order.timestamp), "MMM dd, yyyy 'at' HH:mm")}
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
                <Edit2 className="h-4 w-4 mr-1" /> Edit
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
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={saveChanges}
                  className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
                >
                  <Save className="h-4 w-4 mr-1" /> Save
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
              <span className="sr-only">Close</span>
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
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Source</p>
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
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Article</p>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Size</p>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.articlePrice}
                          onChange={(e) => handleEditChange("articlePrice", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {(order.orderData.articles[0]?.total_article_price.value / 100).toLocaleString()} DA
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Cost</p>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.deliveryCost}
                          onChange={(e) => handleEditChange("deliveryCost", e.target.value)}
                          className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {(order.orderData.delivery_cost.value / 100).toLocaleString()} DA
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator className="my-2 dark:border-gray-700" />

                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Price</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {totalPrice.toLocaleString()} DA
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Badge className={cn("mr-2", confidenceBadgeColor)}>{confidenceRate}%</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Confidence</span>
                    </div>

                    <div className="flex items-center">
                      {order.status === "delivered" ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Delivered
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
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
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Type</p>
                      {isEditing ? (
                        <Select
                          value={editValues.deliveryType}
                          onValueChange={(value) => handleEditChange("deliveryType", value)}
                        >
                          <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                            <SelectValue placeholder="Select type">
                              {editValues.deliveryType === "home" ? "À domicile" : ""}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">À domicile</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center">
                          {order.orderData.delivery_type.value === "home" ? (
                            <>
                              <Home className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                              <span className="font-medium dark:text-gray-200">À domicile</span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>

                    {order.orderData.delivery_date && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Expected Delivery</p>
                        {isEditing ? (
                          <Input
                            value={order.orderData.delivery_date.value}
                            onChange={(e) => handleEditChange("deliveryDate", e.target.value)}
                            className="h-8 dark:bg-slate-700/70 dark:border-gray-700"
                          />
                        ) : (
                          <p className="font-medium dark:text-gray-200 flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                            {order.orderData.delivery_date.value}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
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

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Wilaya</p>
                      {isEditing ? (
                        <Select value={editValues.wilaya} onValueChange={(value) => handleEditChange("wilaya", value)}>
                          <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                            <SelectValue placeholder="Select wilaya">{editValues.wilaya}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {getAllWilayas().map((wilaya) => {
                              // Check if this wilaya matches the current value using normalized comparison
                              const isSelected =
                                normalizeString(wilaya.name_ascii) === normalizeString(editValues.wilaya)
                              return (
                                <SelectItem
                                  key={wilaya.code}
                                  value={wilaya.name_ascii}
                                  className={isSelected ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}
                                >
                                  {wilaya.name_ascii} ({wilaya.name}){isSelected && " ✓"}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-1">
                          <p className="font-medium dark:text-gray-200">
                            {order.orderData.wilaya.name_fr.value} ({order.orderData.wilaya.name_ar.value})
                          </p>
                          {!validation.wilayaValid && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Wilaya not found in database</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Commune</p>
                      {isEditing ? (
                        <Select
                          value={editValues.commune}
                          onValueChange={(value) => handleEditChange("commune", value)}
                          disabled={!editValues.wilaya || availableCommunes.length === 0}
                        >
                          <SelectTrigger className="h-8 dark:bg-slate-700/70 dark:border-gray-700">
                            <SelectValue placeholder="Select commune">{editValues.commune}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {availableCommunes.map((commune) => {
                              // Check if this commune matches the current value using normalized comparison
                              const isSelected = normalizeString(commune.namefr) === normalizeString(editValues.commune)
                              return (
                                <SelectItem
                                  key={commune.id}
                                  value={commune.namefr}
                                  className={isSelected ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}
                                >
                                  {commune.namefr} {commune.namear ? `(${commune.namear})` : ""}
                                  {isSelected && " ✓"}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-1">
                          <p className="font-medium dark:text-gray-200">
                            {order.orderData.commune.name_fr.value} ({order.orderData.commune.name_ar.value})
                          </p>
                          {!validation.communeValid && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Commune not found in database</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="overflow-hidden border dark:border-gray-700">
                <CardHeader className="bg-gray-50 dark:bg-slate-800/80 border-b dark:border-gray-700 py-3">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {isEditing ? (
                    <Input
                      value={editValues.additionalInfo}
                      onChange={(e) => handleEditChange("additionalInfo", e.target.value)}
                      className="dark:bg-slate-700/70 dark:border-gray-700"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      {order.orderData.additional_information?.value || "No additional information"}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column: Conversation */}
            <div className="col-span-1 space-y-4">{ConversationSection}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
