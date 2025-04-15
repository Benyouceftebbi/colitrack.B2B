"use client"

import { useState, useEffect, useMemo, useCallback, memo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit2, Save, X, Facebook, Instagram, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Order } from "../data/sample-orders"
import { getAllWilayas, getCommunesByWilayaName, normalizeString } from "../data/algeria-regions"
import { isStopDeskAvailable } from "../data/shipping-availability"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { validateRegionData } from "./validation-utils"
import { useOrders } from "./order-dashboard"

interface OrdersTableProps {
  orders: Order[]
  onViewOrder: (order: Order) => void
  dateRange: {
    from: Date
    to: Date
  }
}

// Memoize the table row component to prevent re-rendering all rows
const TableRowMemo = memo(function TableRowComponent({
  order,
  editingRow,
  editValues,
  availableCommunes,
  handleEditChange,
  saveEditing,
  cancelEditing,
  startEditing,
  onViewOrder,
  selectedRows,
  handleSelectRow,
}: {
  order: Order
  editingRow: string | null
  editValues: Record<string, any>
  availableCommunes: { id: number; namefr: string; namear: string; normalizedName?: string }[]
  handleEditChange: (field: string, value: any) => void
  saveEditing: (order: Order) => void
  cancelEditing: () => void
  startEditing: (order: Order) => void
  onViewOrder: (order: Order) => void
  selectedRows: string[]
  handleSelectRow: (orderId: string) => void
}) {
  // Memoize expensive calculations for each row
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
  }, [order])

  const confidenceBadgeColor = useMemo(() => {
    if (confidenceRate >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    if (confidenceRate >= 75) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }, [confidenceRate])

  const validation = useMemo(() => validateRegionData(order), [order])

  const hasIssues = useMemo(() => {
    return !validation.wilayaValid || !validation.communeValid || !validation.deliveryTypeValid
  }, [validation])

  const stopDeskValid = useMemo(() => {
    if (order.orderData.delivery_type.value !== "stopdesk") return true
    return isStopDeskAvailable(order.orderData.commune.name_fr.value)
  }, [order])

  const formatArticles = useMemo(() => {
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
  }, [order.orderData.articles])

  return (
    <TableRow
      key={order.id}
      className={`dark:border-gray-700 ${
        hasIssues
          ? "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30"
          : "hover:bg-gray-50 dark:hover:bg-slate-800/30"
      }`}
    >
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
          formatArticles
        )}
      </TableCell>
      <TableCell>
        {editingRow === order.id ? (
          <Select value={editValues.wilaya || ""} onValueChange={(value) => handleEditChange("wilaya", value)}>
            <SelectTrigger className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700">
              <SelectValue placeholder="Select wilaya">{editValues.wilaya}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {getAllWilayas().map((wilaya) => {
                // Check if this wilaya matches the current value using normalized comparison
                const isSelected = normalizeString(wilaya.name_ascii) === normalizeString(editValues.wilaya)
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
            {order.orderData.wilaya.name_fr.value}
            {!validation.wilayaValid && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wilaya not found in database. This order cannot be exported.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
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
              <SelectValue placeholder="Select commune">{editValues.commune}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {availableCommunes.map((commune) => {
                // Check if this commune matches the current value using normalized comparison
                const isSelected = normalizeString(commune.namefr) === normalizeString(editValues.commune)
                const hasStopDesk = isStopDeskAvailable(commune.namefr)

                return (
                  <SelectItem
                    key={commune.id}
                    value={commune.namefr}
                    className={isSelected ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {commune.namefr} {commune.namear ? `(${commune.namear})` : ""}
                        {isSelected && " ✓"}
                      </span>
                      {!hasStopDesk && <span className="text-amber-500 text-xs ml-2">No Stop Desk</span>}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center gap-1">
            {order.orderData.commune.name_fr.value}
            {!validation.communeValid && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Commune not found in database. This order cannot be exported.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
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
              <SelectItem value="stopdesk" disabled={!isStopDeskAvailable(editValues.commune)}>
                Stop desk {!isStopDeskAvailable(editValues.commune) && "(Not available)"}
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center gap-1">
            {order.orderData.delivery_type.value === "home" ? "À domicile" : "Stop desk"}

            {order.orderData.delivery_type.value === "stopdesk" && !stopDeskValid && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Stop desk is not available in this commune. This order cannot be exported.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </TableCell>
      {/* Add a new cell for Stop Desk Center */}
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
          <div className="max-w-[150px] truncate" title={order.orderData.additional_information?.value || "-"}>
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

// Memoize the entire OrdersTable component
export const OrdersTable = memo(function OrdersTable({ orders, onViewOrder, dateRange }: OrdersTableProps) {
  const { selectedRows, setSelectedRows, handleEditOrder } = useOrders()
  const [editingRow, setEditingRow] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, any>>({})
  const [availableCommunes, setAvailableCommunes] = useState<
    { id: number; namefr: string; namear: string; normalizedName?: string }[]
  >([])

  // Fix the commune property in the availableCommunes array
  useEffect(() => {
    if (editingRow && editValues.wilaya) {
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
  }, [editingRow, editValues.wilaya])

  // Update delivery type if commune changes and stop desk is not available
  useEffect(() => {
    if (editingRow && editValues.commune && editValues.deliveryType === "stopdesk") {
      const stopDeskAvailable = isStopDeskAvailable(editValues.commune)

      if (!stopDeskAvailable) {
        // Automatically switch to home delivery if stop desk is not available
        setEditValues((prev) => ({
          ...prev,
          deliveryType: "home",
        }))
      }
    }
  }, [editingRow, editValues.commune, editValues.deliveryType])

  // Memoize handler functions with useCallback
  const handleSelectRow = useCallback(
    (orderId: string) => {
      setSelectedRows(
        selectedRows.includes(orderId) ? selectedRows.filter((id) => id !== orderId) : [...selectedRows, orderId],
      )
    },
    [selectedRows, setSelectedRows],
  )

  const handleSelectAll = useCallback(() => {
    setSelectedRows(selectedRows.length === orders.length ? [] : orders.map((order) => order.id))
  }, [selectedRows, orders, setSelectedRows])

  // Fix the startEditing function to ensure proper initial values
  const startEditing = useCallback((order: Order) => {
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

      const editValuesWithoutCenter = {
        clientName: order.orderData.client_name.value,
        phoneNumber: order.orderData.phone_number.value,
        articleName: order.orderData.articles[0]?.name.value || "",
        price: order.orderData.articles[0]?.total_article_price.value / 100 || 0,
        deliveryPrice: order.orderData.delivery_cost.value / 100 || 0,
        address: order.orderData.address.value,
        wilaya: exactWilayaName,
        commune: exactCommuneName,
        deliveryType: order.orderData.delivery_type.value,
        additionalInfo: order.orderData.additional_information?.value || "",
      }

      setEditingRow(order.id)
      setEditValues(editValuesWithoutCenter)
    } else {
      // If no communes found, use the original values
      const editValuesWithoutCenter = {
        clientName: order.orderData.client_name.value,
        phoneNumber: order.orderData.phone_number.value,
        articleName: order.orderData.articles[0]?.name.value || "",
        price: order.orderData.articles[0]?.total_article_price.value / 100 || 0,
        deliveryPrice: order.orderData.delivery_cost.value / 100 || 0,
        address: order.orderData.address.value,
        wilaya: wilayaName,
        commune: communeName,
        deliveryType: order.orderData.delivery_type.value,
        additionalInfo: order.orderData.additional_information?.value || "",
      }

      setEditingRow(order.id)
      setEditValues(editValuesWithoutCenter)
    }
  }, [])

  const cancelEditing = useCallback(() => {
    setEditingRow(null)
    setEditValues({})
    setAvailableCommunes([])
  }, [])

  // Update the getOriginalValue function to remove stop desk center
  const getOriginalValue = useCallback((order: Order, field: string) => {
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
  }, [])

  // Update the saveEditing function to ensure proper validation before saving
  const saveEditing = useCallback(
    (order: Order) => {
      // Update all edited fields
      Object.keys(editValues).forEach((field) => {
        const originalValue = getOriginalValue(order, field)

        // For wilaya and commune, use normalized comparison
        if (field === "wilaya" || field === "commune") {
          if (normalizeString(editValues[field]) !== normalizeString(originalValue)) {
            handleEditOrder(order, field, editValues[field])
          }
        } else if (editValues[field] !== originalValue) {
          handleEditOrder(order, field, editValues[field])
        }
      })

      setEditingRow(null)
      setEditValues({})
      setAvailableCommunes([])
    },
    [editValues, handleEditOrder, getOriginalValue],
  )

  const handleEditChange = useCallback((field: string, value: any) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  // Inside the table row, after the delivery type cell
  return (
    <div className="rounded-md border dark:border-gray-700 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="dark:border-gray-700">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === orders.length && orders.length > 0}
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
          {orders.length === 0 ? (
            <TableRow className="dark:border-gray-700">
              <TableCell colSpan={14} className="h-24 text-center dark:text-gray-400">
                No orders found in the selected date range.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRowMemo
                key={order.id}
                order={order}
                editingRow={editingRow}
                editValues={editValues}
                availableCommunes={availableCommunes}
                handleEditChange={handleEditChange}
                saveEditing={saveEditing}
                cancelEditing={cancelEditing}
                startEditing={startEditing}
                onViewOrder={onViewOrder}
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
})
