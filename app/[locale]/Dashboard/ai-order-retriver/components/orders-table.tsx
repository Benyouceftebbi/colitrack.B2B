"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit2, Save, X, Facebook, Instagram } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Order } from "../data/sample-orders"
import { parseISO, isWithinInterval } from "date-fns"
import { wilayas } from "../data/algeria-regions"

interface OrdersTableProps {
  orders: Order[]
  onViewOrder: (order: Order) => void
  onEditOrder: (order: Order, field: string, value: any) => void
  selectedRows: string[]
  setSelectedRows: (rows: string[]) => void
  dateRange: {
    from: Date
    to: Date
  }
}

export function OrdersTable({
  orders,
  onViewOrder,
  onEditOrder,
  selectedRows,
  setSelectedRows,
  dateRange,
}: OrdersTableProps) {
  const [editingRow, setEditingRow] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, any>>({})
  const [availableCommunes, setAvailableCommunes] = useState<{ id: number; namefr: string; namear: string }[]>([])

  // Filter orders based on date range and exclude confirmed orders from the main table
  const filteredOrders = orders.filter((order) => {
    const orderDate = parseISO(order.timestamp)
    return (
      isWithinInterval(orderDate, {
        start: dateRange.from,
        end: new Date(dateRange.to.setHours(23, 59, 59, 999)),
      }) && order.status !== "confirmed"
    ) // Exclude confirmed orders
  })

  // Update available communes when wilaya changes
  useEffect(() => {
    if (editingRow && editValues.wilaya) {
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
  }, [editingRow, editValues.wilaya])

  const handleSelectRow = (orderId: string) => {
    setSelectedRows(
      selectedRows.includes(orderId) ? selectedRows.filter((id) => id !== orderId) : [...selectedRows, orderId],
    )
  }

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === filteredOrders.length ? [] : filteredOrders.map((order) => order.id))
  }

  const startEditing = (order: Order) => {
    const wilayaName = order.orderData.wilaya.name_fr.value
    const selectedWilaya = wilayas.find((w) => w.namefr === wilayaName || w.namear === wilayaName)

    if (selectedWilaya) {
      setAvailableCommunes(selectedWilaya.communes)
    }

    setEditingRow(order.id)
    setEditValues({
      clientName: order.orderData.client_name.value,
      phoneNumber: order.orderData.phone_number.value,
      articleName: order.orderData.articles[0]?.name.value || "",
      price: order.orderData.articles[0]?.total_article_price.value / 100 || 0,
      deliveryPrice: order.orderData.delivery_cost.value / 100 || 0,
      address: order.orderData.address.value,
      wilaya: order.orderData.wilaya.name_fr.value,
      commune: order.orderData.commune.name_fr.value,
      deliveryType: order.orderData.delivery_type.value,
      additionalInfo: order.orderData.additional_information?.value || "",
    })
  }

  const cancelEditing = () => {
    setEditingRow(null)
    setEditValues({})
    setAvailableCommunes([])
  }

  const saveEditing = (order: Order) => {
    // Update all edited fields
    Object.keys(editValues).forEach((field) => {
      const originalValue = getOriginalValue(order, field)
      if (editValues[field] !== originalValue) {
        onEditOrder(order, field, editValues[field])
      }
    })

    setEditingRow(null)
    setEditValues({})
    setAvailableCommunes([])
  }

  const getOriginalValue = (order: Order, field: string) => {
    switch (field) {
      case "clientName":
        return order.orderData.client_name.value
      case "phoneNumber":
        return order.orderData.phone_number.value
      case "articleName":
        return order.orderData.articles[0]?.name.value || ""
      case "price":
        return order.orderData.articles[0]?.total_article_price.value / 100 || 0
      case "deliveryPrice":
        return order.orderData.delivery_cost.value / 100 || 0
      case "address":
        return order.orderData.address.value
      case "wilaya":
        return order.orderData.wilaya.name_fr.value
      case "commune":
        return order.orderData.commune.name_fr.value
      case "deliveryType":
        return order.orderData.delivery_type.value
      case "additionalInfo":
        return order.orderData.additional_information?.value || ""
      default:
        return ""
    }
  }

  const handleEditChange = (field: string, value: any) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Format articles as quantity x name = total
  const formatArticles = (order: Order) => {
    if (!order.orderData.articles || order.orderData.articles.length === 0) return "-"

    return order.orderData.articles.map((article, index) => {
      const quantity = article.quantity.value
      const name = article.name.value
      const price = article.total_article_price.value / 100

      return (
        <div key={index} className={index > 0 ? "mt-1 pt-1 border-t dark:border-gray-700" : ""}>
          {quantity} x {name} = {price.toLocaleString()} DA
        </div>
      )
    })
  }

  // Calculate confidence rate as average of all confidence values
  const calculateConfidenceRate = (order: Order) => {
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

  // Get confidence badge color based on percentage
  const getConfidenceBadgeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    if (percentage >= 75) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }

  return (
    <div className="rounded-md border dark:border-gray-700 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="dark:border-gray-700">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === filteredOrders.length && filteredOrders.length > 0}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Articles</TableHead>
            <TableHead>Wilaya</TableHead>
            <TableHead>Commune</TableHead>
            <TableHead>Delivery Type</TableHead>
            <TableHead>Delivery Price</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Additional Info</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length === 0 ? (
            <TableRow className="dark:border-gray-700">
              <TableCell colSpan={14} className="h-24 text-center dark:text-gray-400">
                No orders found in the selected date range.
              </TableCell>
            </TableRow>
          ) : (
            filteredOrders.map((order) => {
              const confidenceRate = calculateConfidenceRate(order)
              const confidenceBadgeColor = getConfidenceBadgeColor(confidenceRate)

              return (
                <TableRow key={order.id} className="dark:border-gray-700">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(order.id)}
                      onCheckedChange={() => handleSelectRow(order.id)}
                      aria-label={`Select order ${order.id}`}
                    />
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Input
                        value={editValues.clientName || ""}
                        onChange={(e) => handleEditChange("clientName", e.target.value)}
                        className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      order.orderData.client_name.value
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Input
                        value={editValues.phoneNumber || ""}
                        onChange={(e) => handleEditChange("phoneNumber", e.target.value)}
                        className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      order.orderData.phone_number.value
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Input
                        value={editValues.articleName || ""}
                        onChange={(e) => handleEditChange("articleName", e.target.value)}
                        className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      formatArticles(order)
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Select
                        value={editValues.wilaya || ""}
                        onValueChange={(value) => handleEditChange("wilaya", value)}
                      >
                        <SelectTrigger className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700">
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
                      order.orderData.wilaya.name_fr.value
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Select
                        value={editValues.commune || ""}
                        onValueChange={(value) => handleEditChange("commune", value)}
                        disabled={!editValues.wilaya || availableCommunes.length === 0}
                      >
                        <SelectTrigger className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700">
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
                      order.orderData.commune.name_fr.value
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Select
                        value={editValues.deliveryType || ""}
                        onValueChange={(value) => handleEditChange("deliveryType", value)}
                      >
                        <SelectTrigger className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">À domicile</SelectItem>
                          <SelectItem value="stopdesk">Stop desk</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : order.orderData.delivery_type.value === "home" ? (
                      "À domicile"
                    ) : (
                      "Stop desk"
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Input
                        type="number"
                        value={editValues.deliveryPrice || ""}
                        onChange={(e) => handleEditChange("deliveryPrice", e.target.value)}
                        className="h-8 w-24 dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      `${(order.orderData.delivery_cost.value / 100).toLocaleString()} DA`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Input
                        value={editValues.address || ""}
                        onChange={(e) => handleEditChange("address", e.target.value)}
                        className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <div className="max-w-[200px] truncate" title={order.orderData.address.value}>
                        {order.orderData.address.value}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === order.id ? (
                      <Input
                        value={editValues.additionalInfo || ""}
                        onChange={(e) => handleEditChange("additionalInfo", e.target.value)}
                        className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700"
                      />
                    ) : (
                      <div
                        className="max-w-[150px] truncate"
                        title={order.orderData.additional_information?.value || "-"}
                      >
                        {order.orderData.additional_information?.value || "-"}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${confidenceBadgeColor}`}>{confidenceRate}%</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{(order.orderData.total_price.value / 100).toLocaleString()} DA</span>
                  </TableCell>
                  <TableCell>
                    {order.source === "messenger" ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                      >
                        <Facebook className="h-3 w-3 mr-1" />
                        FB
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                      >
                        <Instagram className="h-3 w-3 mr-1" />
                        IG
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingRow === order.id ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => saveEditing(order)}>
                          <Save className="h-4 w-4 text-green-600 dark:text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={cancelEditing}>
                          <X className="h-4 w-4 text-red-600 dark:text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => onViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => startEditing(order)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

