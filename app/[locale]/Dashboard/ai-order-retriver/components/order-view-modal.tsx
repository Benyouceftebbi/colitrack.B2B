"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Facebook,
  Instagram,
  User,
  MapPin,
  Phone,
  Package,
  Truck,
  Calendar,
  CreditCard,
  Save,
  X,
  Edit2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parseISO } from "date-fns"
import type { Order } from "../data/sample-orders"
import { wilayas } from "../data/algeria-regions"

interface OrderViewModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
  readOnly?: boolean
}

export function OrderViewModal({ order, isOpen, onClose, readOnly = false }: OrderViewModalProps) {
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
    // Here you would implement the logic to save the changes to your backend
    console.log("Saving changes:", editValues)
    // For now, we'll just exit edit mode
    setIsEditing(false)
    setAvailableCommunes([])
  }

  const totalPrice = isEditing
    ? Number(editValues.articlePrice) + Number(editValues.deliveryCost)
    : order.orderData.total_price.value / 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Order Details
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">#{order.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Order Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {order.source === "messenger" ? (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                >
                  <Facebook className="h-3 w-3 mr-1" />
                  Facebook Messenger
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
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(parseISO(order.timestamp), "MMM dd, yyyy 'at' HH:mm")}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold dark:text-gray-200">Customer Details</h3>
                {!readOnly && !isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startEditing}
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 dark:border-indigo-800"
                  >
                    <Edit2 className="h-4 w-4 mr-1" /> Edit Order
                  </Button>
                )}
                {isEditing && (
                  <div className="flex gap-2">
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
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-300">Name:</span>
                  {isEditing ? (
                    <Input
                      value={editValues.clientName}
                      onChange={(e) => handleEditChange("clientName", e.target.value)}
                      className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                    />
                  ) : (
                    <span className="dark:text-gray-300">{order.orderData.client_name.value}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-300">Phone:</span>
                  {isEditing ? (
                    <Input
                      value={editValues.phoneNumber}
                      onChange={(e) => handleEditChange("phoneNumber", e.target.value)}
                      className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                    />
                  ) : (
                    <span className="dark:text-gray-300">{order.orderData.phone_number.value}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-gray-200">Order Details</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-300">Article:</span>
                  {isEditing ? (
                    <Input
                      value={editValues.articleName}
                      onChange={(e) => handleEditChange("articleName", e.target.value)}
                      className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                    />
                  ) : (
                    <span className="dark:text-gray-300">{order.orderData.articles[0]?.name.value || "-"}</span>
                  )}
                </div>

                {(order.orderData.articles[0]?.sizes.length > 0 || isEditing) && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium ml-6 dark:text-gray-300">Size:</span>
                    {isEditing ? (
                      <Input
                        value={editValues.articleSize}
                        onChange={(e) => handleEditChange("articleSize", e.target.value)}
                        className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <span className="dark:text-gray-300">{order.orderData.articles[0].sizes[0].value}</span>
                    )}
                  </div>
                )}

                {(order.orderData.articles[0]?.colors.length > 0 || isEditing) && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium ml-6 dark:text-gray-300">Color:</span>
                    {isEditing ? (
                      <Input
                        value={editValues.articleColor}
                        onChange={(e) => handleEditChange("articleColor", e.target.value)}
                        className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <span className="dark:text-gray-300">{order.orderData.articles[0].colors[0].value}</span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-300">Price:</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editValues.articlePrice}
                      onChange={(e) => handleEditChange("articlePrice", e.target.value)}
                      className="h-8 ml-2 w-32 dark:bg-slate-700/70 dark:border-gray-700"
                    />
                  ) : (
                    <span className="dark:text-gray-300">
                      {(order.orderData.articles[0]?.total_article_price.value / 100).toLocaleString()} DA
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-300">Delivery Type:</span>
                  {isEditing ? (
                    <Select
                      value={editValues.deliveryType}
                      onValueChange={(value) => handleEditChange("deliveryType", value)}
                    >
                      <SelectTrigger className="h-8 ml-2 w-40 dark:bg-slate-700/70 dark:border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">À domicile</SelectItem>
                        <SelectItem value="stopdesk">Stop desk</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="dark:text-gray-300">
                      {order.orderData.delivery_type.value === "home" ? "À domicile" : "Stop desk"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium ml-6 dark:text-gray-300">Delivery Cost:</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editValues.deliveryCost}
                      onChange={(e) => handleEditChange("deliveryCost", e.target.value)}
                      className="h-8 ml-2 w-32 dark:bg-slate-700/70 dark:border-gray-700"
                    />
                  ) : (
                    <span className="dark:text-gray-300">
                      {(order.orderData.delivery_cost.value / 100).toLocaleString()} DA
                    </span>
                  )}
                </div>

                {order.orderData.delivery_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium dark:text-gray-300">Delivery Date:</span>
                    {isEditing ? (
                      <Input
                        value={order.orderData.delivery_date.value}
                        onChange={(e) => handleEditChange("deliveryDate", e.target.value)}
                        className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <span className="dark:text-gray-300">{order.orderData.delivery_date.value}</span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                  <CreditCard className="h-4 w-4" />
                  <span>Total Price:</span>
                  <span>{totalPrice.toLocaleString()} DA</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-gray-200">Delivery Address</h3>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-1" />
                  <div className="dark:text-gray-300 w-full">
                    <div className="flex items-center">
                      <span className="font-medium dark:text-gray-300">Address:</span>
                      {isEditing ? (
                        <Input
                          value={editValues.address}
                          onChange={(e) => handleEditChange("address", e.target.value)}
                          className="h-8 ml-2 dark:bg-slate-700/70 dark:border-gray-700"
                        />
                      ) : (
                        <span className="ml-2">{order.orderData.address.value}</span>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="font-medium dark:text-gray-300">Wilaya:</span>
                      {isEditing ? (
                        <Select value={editValues.wilaya} onValueChange={(value) => handleEditChange("wilaya", value)}>
                          <SelectTrigger className="h-8 ml-2 w-full dark:bg-slate-700/70 dark:border-gray-700">
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
                        <span className="ml-2">
                          {order.orderData.wilaya.name_fr.value} ({order.orderData.wilaya.name_ar.value})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="font-medium dark:text-gray-300">Commune:</span>
                      {isEditing ? (
                        <Select
                          value={editValues.commune}
                          onValueChange={(value) => handleEditChange("commune", value)}
                          disabled={!editValues.wilaya || availableCommunes.length === 0}
                        >
                          <SelectTrigger className="h-8 ml-2 w-full dark:bg-slate-700/70 dark:border-gray-700">
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
                        <span className="ml-2">
                          {order.orderData.commune.name_fr.value} ({order.orderData.commune.name_ar.value})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold dark:text-gray-200">Additional Information</h3>
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
            </div>
          </div>

          {/* Conversation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-200">Conversation</h3>
            <div className="border dark:border-gray-700 rounded-lg p-4 max-h-[500px] overflow-y-auto space-y-4 bg-white dark:bg-slate-800/50">
              {order.conversation && order.conversation.length > 0 ? (
                order.conversation.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "client" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[90%] rounded-lg p-3 ${
                        message.sender === "client"
                          ? "bg-gray-100 text-gray-800 dark:bg-slate-700/70 dark:text-gray-200"
                          : "bg-indigo-600 text-white dark:bg-indigo-700"
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
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No conversation history available.
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

