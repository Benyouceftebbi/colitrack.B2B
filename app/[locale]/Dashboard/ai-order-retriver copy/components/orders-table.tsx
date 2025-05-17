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
// Add the import for Yalidin centers
import { getYalidinCentersForCommune } from "../data/yalidin-centers"
import { useShop } from "@/app/context/ShopContext"
import { getNoastCentersByWilaya } from "../data/noast-centers"
// At the top of the file, add the import for useTranslations
import { useTranslations } from "next-intl"

interface OrdersTableProps {
  orders: Order[]
  onViewOrder: (order: Order) => void
  dateRange: {
    from: Date
    to: Date
  }
}

// Update the TableRowMemo component to handle NOEST Express with stopdesk
const TableRowMemo = memo(function TableRowComponent({
  order,
  editingRow,
  editValues,
  availableCommunes,
  availableStopDesks,
  handleEditChange,
  saveEditing,
  cancelEditing,
  startEditing,
  onViewOrder,
  selectedRows,
  handleSelectRow,
  isNoestExpress,
  requiresStopDesk,
}: {
  order: Order
  editingRow: string | null
  editValues: Record<string, any>
  availableCommunes: { id: number; namefr: string; namear: string; normalizedName?: string }[]
  availableStopDesks: any[]
  handleEditChange: (field: string, value: any) => void
  saveEditing: (order: Order) => void
  cancelEditing: () => void
  startEditing: (order: Order) => void
  onViewOrder: (order: Order) => void
  selectedRows: string[]
  handleSelectRow: (orderId: string) => void
  isNoestExpress: boolean
  requiresStopDesk: boolean
}) {
  // Inside the TableRowMemo component, add this line near the top:
  const t = useTranslations("ai-order-retriever")
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

  // Check for validation issues based on delivery type
  const hasIssues = useMemo(() => {
    // For NOEST Express with stopdesk, we only validate wilaya and stop desk
    if (isNoestExpress && order.orderData.delivery_type.value === "stopdesk") {
      return !validation.wilayaValid || !validation.stopDeskValid
    } else if (order.orderData.delivery_type.value === "home") {
      // For home delivery, we need valid wilaya and commune
      return !validation.wilayaValid || !validation.communeValid
    } else {
      // For stop desk delivery, we need valid wilaya, commune, and stop desk
      return (
        !validation.wilayaValid ||
        !validation.communeValid ||
        !validation.deliveryTypeValid ||
        (requiresStopDesk && !validation.stopDeskValid)
      )
    }
  }, [validation, order.orderData.delivery_type.value, isNoestExpress, requiresStopDesk])

  const stopDeskValid = useMemo(() => {
    if (order.orderData.delivery_type.value !== "stopdesk") return true
    return isStopDeskAvailable(order.orderData.commune.name_fr.value)
  }, [order])

  const formatArticles = useMemo(() => {
    if (!order.orderData.articles || order.orderData.articles.length === 0) return "-"

    return order.orderData.articles.map((article, index) => {
      const quantity = article.quantity.value
      const name = article.name.value
      const price = article.total_article_price.value

      return (
        <div key={index} className={index > 0 ? "mt-1 pt-1 border-t dark:border-gray-700" : ""}>
          {quantity} x {name} = {price.toLocaleString()} DA
        </div>
      )
    })
  }, [order.orderData.articles])

  const { shopData } = useShop()

  // Add a check for missing stop desk - CRITICAL VALIDATION
  const missingStopDesk = useMemo(() => {
    return order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk && !order.orderData.stop_desk?.id
  }, [order, requiresStopDesk])

  return (
    <TableRow
      key={order.id}
      className={`dark:border-gray-700 ${
        hasIssues || missingStopDesk
          ? missingStopDesk
            ? "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/40" // Stronger highlight for missing stop desk
            : "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30"
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
              <SelectValue placeholder={t("selectWilaya")}>{editValues.wilaya}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {getAllWilayas()
                .sort((a, b) => a.name_ascii.localeCompare(b.name_ascii)) // Sort alphabetically
                .map((wilaya) => {
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
                    <p>{t("wilayaNotFound")}</p>
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
            value={editValues.commune || "placeholder-value"}
            onValueChange={(value) => handleEditChange("commune", value)}
            disabled={
              !editValues.wilaya ||
              availableCommunes.length === 0 ||
              (isNoestExpress && editValues.deliveryType === "stopdesk")
            }
          >
            <SelectTrigger className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700">
              <SelectValue placeholder={t("selectCommune")}>
                {isNoestExpress && editValues.deliveryType === "stopdesk"
                  ? "Not required for NOEST"
                  : editValues.commune || "Select commune"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {isNoestExpress && editValues.deliveryType === "stopdesk" ? (
                <SelectItem value="placeholder-value" disabled>
                  {t("notRequiredForNoestExpress")}
                </SelectItem>
              ) : isNoestExpress ? (
                // For NOEST Express, add the wilaya as a commune option
                <>
                  <SelectItem value={editValues.wilaya}>{editValues.wilaya} (Same as Wilaya)</SelectItem>
                  {availableCommunes.length > 0 ? (
                    availableCommunes
                      .sort((a, b) => a.namefr.localeCompare(b.namefr)) // Sort alphabetically
                      .map((commune) => {
                        // Check if this commune matches the current value using normalized comparison
                        const isSelected = normalizeString(commune.namefr) === normalizeString(editValues.commune)
                        const hasStopDesk = isStopDeskAvailable(commune.namefr)

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
                    const isSelected = normalizeString(commune.namefr) === normalizeString(editValues.commune)
                    const hasStopDesk = isStopDeskAvailable(commune.namefr)

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
          <div className="flex items-center gap-1">
            {isNoestExpress && order.orderData.delivery_type.value === "stopdesk" ? (
              <span className="text-gray-500 dark:text-gray-400 italic">{t("notRequiredForNoest")}</span>
            ) : (
              <>
                {order.orderData.commune.name_fr.value || (
                  <span className="text-gray-500 dark:text-gray-400 italic">{t("notSpecified")}</span>
                )}
              </>
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
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">{t("homeDelivery")}</SelectItem>
              <SelectItem value="stopdesk">
                {t("stopDesk")}
                {!isNoestExpress && editValues.commune && !isStopDeskAvailable(editValues.commune) && (
                  <span className="ml-2 text-amber-500 text-xs font-medium px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 rounded">
                    {t("notAvailable")}
                  </span>
                )}
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center gap-1">
            {order.orderData.delivery_type.value === "home" ? t("homeDelivery") : t("stopDesk")}

            {order.orderData.delivery_type.value === "stopdesk" && !stopDeskValid && !isNoestExpress && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("stopDeskNotAvailable")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </TableCell>
      {/* Add this after the delivery type cell */}
      {editingRow === order.id && editValues.deliveryType === "stopdesk" && requiresStopDesk ? (
        <TableCell>
          <Select
            value={editValues.stopDeskId || "no_selection"}
            onValueChange={(value) => handleEditChange("stopDeskId", value === "no_selection" ? "" : value)}
          >
            <SelectTrigger className="h-8 w-full dark:bg-slate-700/70 dark:border-gray-700">
              <SelectValue placeholder={t("selectStopDesk")} />
            </SelectTrigger>
            <SelectContent>
              {availableStopDesks.length === 0 ? (
                <SelectItem value="no_selection">
                  <span className="text-amber-500 font-medium">{t("noStopDesksAvailable")}</span>
                </SelectItem>
              ) : (
                <>
                  <SelectItem value="no_selection">{t("selectAStopDesk")}</SelectItem>
                  {availableStopDesks
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                    .map((desk) => {
                      // Use key for NOEST centers and center_id for Yalidin centers
                      const centerId = isNoestExpress ? desk.key : desk.center_id
                      return (
                        <SelectItem key={centerId} value={centerId?.toString() || ""}>
                          {desk.name} {isNoestExpress && desk.code ? `(${desk.code})` : ""}
                        </SelectItem>
                      )
                    })}
                </>
              )}
            </SelectContent>
          </Select>
        </TableCell>
      ) : (
        <TableCell>
          {order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk ? (
            <div className="flex items-center gap-1">
              {order.orderData.stop_desk?.name || (
                <span className="text-amber-600 dark:text-amber-400 font-medium">{t("notSelected")}</span>
              )}
              {order.orderData.delivery_type.value === "stopdesk" &&
                requiresStopDesk &&
                !order.orderData.stop_desk?.id && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400">
                          {t("stopDeskSelectionRequired")}
                        </p>
                        <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
                          {t("clickEditToSelectStopDesk")}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 italic">{t("notRequired")}</span>
          )}
        </TableCell>
      )}
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
          `${(order.orderData.delivery_cost.value).toLocaleString()} DA`
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
        {editingRow === order.id ? (
          <Input
            type="number"
            value={editValues.totalPrice || ""}
            onChange={(e) => handleEditChange("totalPrice", e.target.value)}
            className="h-8 w-24 dark:bg-slate-700/70 dark:border-gray-700"
          />
        ) : (
          <span className="font-medium">{order.orderData.total_price.value.toLocaleString()} DA</span>
        )}
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

// Update the OrdersTable component to pass requiresStopDesk to TableRowMemo
export const OrdersTable = memo(function OrdersTable({ orders, onViewOrder, dateRange }: OrdersTableProps) {
  // Inside the OrdersTable component, add this line near the top:
  const t = useTranslations("ai-order-retriever")
  const { selectedRows, setSelectedRows, handleEditOrder } = useOrders()
  const { shopData } = useShop()
  const [editingRow, setEditingRow] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, any>>({})
  const [availableCommunes, setAvailableCommunes] = useState<
    { id: number; namefr: string; namear: string; normalizedName?: string }[]
  >([])
  const [availableStopDesks, setAvailableStopDesks] = useState([])

  // Check if NOEST Express is the delivery company
  const isNoestExpress = shopData?.deliveryCompany?.toUpperCase() === "NOEST EXPRESS"
  const isYalidinExpress = shopData?.deliveryCompany?.toUpperCase() === "YALIDIN EXPRESS"

  // Check if a shipping provider that requires stop desk is being used
  const requiresStopDesk = isNoestExpress || isYalidinExpress

  const shippingProvider = shopData?.deliveryCompany?.toUpperCase()

  // Update available stop desks when wilaya or commune changes
  useEffect(() => {
    if (editingRow && editValues.deliveryType === "stopdesk" && requiresStopDesk) {
      let stopDesks = []

      // For NOEST Express, load centers based on wilaya, not commune
      if (isNoestExpress) {
        if (editValues.wilaya) {
          // Get centers directly by wilaya
          stopDesks = getNoastCentersByWilaya(editValues.wilaya)
        }
      } else if (shippingProvider === "YALIDIN EXPRESS") {
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
    editingRow,
    editValues.wilaya,
    editValues.commune,
    editValues.deliveryType,
    requiresStopDesk,
    shippingProvider,
    isNoestExpress,
  ])

  // Fix the commune property in the availableCommunes array
  useEffect(() => {
    if (
      editingRow &&
      editValues.wilaya &&
      (!isNoestExpress || (isNoestExpress && editValues.deliveryType === "home"))
    ) {
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
  }, [editingRow, editValues.wilaya, editValues.deliveryType, isNoestExpress])

  // Don't automatically change delivery type, just update stop desk availability
  useEffect(() => {
    if (editingRow && editValues.commune && !isNoestExpress) {
      // Check stop desk availability but don't automatically change delivery type
      const stopDeskAvailable = isStopDeskAvailable(editValues.commune)

      // If stop desk is not available and we have a stop desk ID, clear it
      if (!stopDeskAvailable && editValues.stopDeskId) {
        setEditValues((prev) => ({
          ...prev,
          stopDeskId: "", // Clear the stop desk ID if stop desk is not available
        }))
      }
    }
  }, [editingRow, editValues.commune, isNoestExpress])

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

  // Update the startEditing function to handle commune selection for NOEST Express with home delivery
  const startEditing = useCallback(
    (order: Order) => {
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

      // For NOEST Express with stopdesk, we don't need commune
      // For all other cases (including NOEST Express with home delivery), we need commune
      if (
        communes.length > 0 &&
        (!isNoestExpress || (isNoestExpress && order.orderData.delivery_type.value === "home"))
      ) {
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

        // Add stop desk information
        const stopDeskId = order.orderData.stop_desk?.id || ""

        // Update editValues with stop desk information
        const updatedEditValues = {
          clientName: order.orderData.client_name.value,
          phoneNumber: order.orderData.phone_number.value,
          articleName: order.orderData.articles[0]?.name.value || "",
          price: order.orderData.articles[0]?.total_article_price.value || 0,
          deliveryPrice: order.orderData.delivery_cost.value || 0,
          totalPrice: order.orderData.total_price.value || 0,
          address: order.orderData.address.value,
          wilaya: exactWilayaName,
          commune: exactCommuneName,
          deliveryType: order.orderData.delivery_type.value,
          additionalInfo: order.orderData.additional_information?.value || "",
          stopDeskId: stopDeskId,
        }

        setEditingRow(order.id)
        setEditValues(updatedEditValues)

        // If delivery type is stopdesk and we have a shipping provider that requires stop desks,
        // load available stop desks
        if (order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk) {
          let stopDesks = []

          if (shippingProvider === "YALIDIN EXPRESS") {
            stopDesks = getYalidinCentersForCommune(exactCommuneName || communeName)
          }

          setAvailableStopDesks(stopDesks)
        }
      } else {
        // For NOEST Express with stopdesk or if no communes found, use the original values
        // Add stop desk information
        const stopDeskId = order.orderData.stop_desk?.id || ""

        const editValuesWithoutCenter = {
          clientName: order.orderData.client_name.value,
          phoneNumber: order.orderData.phone_number.value,
          articleName: order.orderData.articles[0]?.name.value || "",
          price: order.orderData.articles[0]?.total_article_price.value || 0,
          deliveryPrice: order.orderData.delivery_cost.value || 0,
          totalPrice: order.orderData.total_price.value || 0,
          address: order.orderData.address.value,
          wilaya: wilayaName,
          commune: communeName,
          deliveryType: order.orderData.delivery_type.value,
          additionalInfo: order.orderData.additional_information?.value || "",
          stopDeskId: stopDeskId,
        }

        setEditingRow(order.id)
        setEditValues(editValuesWithoutCenter)

        // For NOEST Express, load centers based on wilaya
        if (isNoestExpress && order.orderData.delivery_type.value === "stopdesk") {
          const stopDesks = getNoastCentersByWilaya(wilayaName)
          setAvailableStopDesks(stopDesks)
        }
      }
    },
    [requiresStopDesk, shippingProvider, isNoestExpress],
  )

  const cancelEditing = useCallback(() => {
    setEditingRow(null)
    setEditValues({})
    setAvailableCommunes([])
    setAvailableStopDesks([])
  }, [])

  // Update the getOriginalValue function to include stop desk information
  const getOriginalValue = useCallback((order: Order, field: string) => {
    switch (field) {
      case "clientName":
        return order.orderData.client_name.value
      case "phoneNumber":
        return order.orderData.phone_number.value
      case "articleName":
        return order.orderData.articles[0]?.name.value || ""
      case "price":
        return order.orderData.articles[0]?.total_article_price.value || 0
      case "deliveryPrice":
        return order.orderData.delivery_cost.value || 0
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
      // Existing cases...
      case "stopDeskId":
        return order.orderData.stop_desk?.id || ""
      case "totalPrice":
        return order.orderData.total_price.value || 0
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
        } else if (field === "stopDeskId") {
          // Handle stop desk ID separately
          if (editValues[field] !== (order.orderData.stop_desk?.id || "")) {
            handleEditOrder(order, field, editValues[field])
          }
        } else if (editValues[field] !== originalValue) {
          // For other fields, use regular comparison
          handleEditOrder(order, field, editValues[field])
        }
      })

      setEditingRow(null)
      setEditValues({})
      setAvailableCommunes([])
      setAvailableStopDesks([])
    },
    [editValues, handleEditOrder, getOriginalValue],
  )

  const handleEditChange = useCallback((field: string, value: any) => {
    setEditValues((prev) => {
      const newValues = { ...prev, [field]: value }

      // If price (article price) or deliveryPrice (delivery cost) changes, update the total price
      if (field === "price" || field === "deliveryPrice") {
        const articlePrice = field === "price" ? Number(value) : Number(prev.price || 0)
        const deliveryCost = field === "deliveryPrice" ? Number(value) : Number(prev.deliveryPrice || 0)
        newValues.totalPrice = articlePrice + deliveryCost
      }

      return newValues
    })
  }, [])

  // Use useMemo for filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Filter out confirmed orders - they should only appear in the history sheet
      return order.status !== "confirmed"
    })
  }, [orders])

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
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("phone")}</TableHead>
            <TableHead>{t("articles")}</TableHead>
            <TableHead>{t("wilaya")}</TableHead>
            <TableHead>{t("commune")}</TableHead>
            <TableHead>{t("deliveryType")}</TableHead>
            <TableHead>{t("stopDesk")}</TableHead>
            <TableHead>{t("deliveryPrice")}</TableHead>
            <TableHead>{t("address")}</TableHead>
            <TableHead>{t("additionalInfo")}</TableHead>
            <TableHead>{t("confidence")}</TableHead>
            <TableHead>{t("totalPrice")}</TableHead>
            <TableHead>{t("source")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow className="dark:border-gray-700">
              <TableCell colSpan={14} className="h-24 text-center dark:text-gray-400">
                {t("noOrdersInDateRange")}
              </TableCell>
            </TableRow>
          ) : (
            filteredOrders.map((order) => (
              <TableRowMemo
                key={order.id}
                order={order}
                editingRow={editingRow}
                editValues={editValues}
                availableCommunes={availableCommunes}
                availableStopDesks={availableStopDesks}
                handleEditChange={handleEditChange}
                saveEditing={saveEditing}
                cancelEditing={cancelEditing}
                startEditing={startEditing}
                onViewOrder={onViewOrder}
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
                isNoestExpress={isNoestExpress}
                requiresStopDesk={requiresStopDesk}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
})
