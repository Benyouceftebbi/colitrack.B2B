"use client"

import { useState, useEffect } from "react"
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
  Building,
  Info,
  MessageSquare,
  Instagram,
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
import { wilayas } from "../data/algeria-regions"
import { MetaLogo } from "./meta-logo"

// Add onEditOrder to the props interface
interface OrderViewModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
  readOnly?: boolean
  onEditOrder?: (order: Order, field: string, value: any) => void
}

// Update the function signature to include the new prop
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
  const [availableCommunes, setAvailableCommunes] = useState<{ id: number; namefr: string; namear: string }[]>([])

  // Update available communes when wilaya changes
  useEffect(() => {
    if (isEditing && editValues.wilaya) {
      const selectedWilaya = wilayas.find((w) => w.namefr === editValues.wilaya || w.namear === editValues.wilaya)
      if (selectedWilaya) {
        setAvailableCommunes(selectedWilaya.communes)

        // Reset commune if the current one is not in the new wilaya
        const communeExists = selectedWilaya.communes.some(
          (c) => c.namefr === editValues.commune || c.namear === editValues.commune,
        )
        if (!communeExists && selectedWilaya.communes.length > 0) {
          setEditValues((prev) => ({
            ...prev,
            commune: selectedWilaya.communes[0].namefr,
          }))
        }
      }
    }
  }, [isEditing, editValues.wilaya])

  if (!order) return null

  const handleEditChange = (field: string, value: any) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const startEditing = () => {
    const wilayaName = order.orderData.wilaya.name_fr.value
    const selectedWilaya = wilayas.find((w) => w.namefr === wilayaName || w.namear === wilayaName)

    if (selectedWilaya) {
      setAvailableCommunes(selectedWilaya.communes)
    }

    setEditValues({
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
    })
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setAvailableCommunes([])
  }

  const saveChanges = () => {
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
      if (editValues[field] !== originalValues[field]) {
        // Call the parent's onEditOrder function to update the order
        onEditOrder(order, field, editValues[field])
      }
    })

    // Exit edit mode
    setIsEditing(false)
    setAvailableCommunes([])
  }

  const totalPrice = isEditing
    ? Number(editValues.articlePrice) + Number(editValues.deliveryCost)
    : order.orderData.total_price.value / 100

  // Calculate confidence rate as average of all confidence values
  const calculateConfidenceRate = () => {
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
  }

  const confidenceRate = calculateConfidenceRate()
  const getConfidenceBadgeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    if (percentage >= 75) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }

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
                      <Badge className={cn("mr-2", getConfidenceBadgeColor(confidenceRate))}>{confidenceRate}%</Badge>
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
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">À domicile</SelectItem>
                            <SelectItem value="stopdesk">Stop desk</SelectItem>
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
                            <>
                              <Building className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
                              <span className="font-medium dark:text-gray-200">Stop desk</span>
                            </>
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
                            <SelectValue placeholder="Select wilaya" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {wilayas.map((wilaya) => (
                              <SelectItem key={wilaya.id} value={wilaya.namefr}>
                                {wilaya.namefr} ({wilaya.namear})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {order.orderData.wilaya.name_fr.value} ({order.orderData.wilaya.name_ar.value})
                        </p>
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
                            <SelectValue placeholder="Select commune" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {availableCommunes.map((commune) => (
                              <SelectItem key={commune.id} value={commune.namefr}>
                                {commune.namefr} {commune.namear ? `(${commune.namear})` : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium dark:text-gray-200">
                          {order.orderData.commune.name_fr.value} ({order.orderData.commune.name_ar.value})
                        </p>
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
            <div className="col-span-1 space-y-4">
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
                                message.sender === "client"
                                  ? "opacity-70 dark:text-gray-400"
                                  : "opacity-70 text-indigo-100"
                              }`}
                            >
                              {format(parseISO(message.sentAt), "MMM dd, HH:mm")}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No conversation history available.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

