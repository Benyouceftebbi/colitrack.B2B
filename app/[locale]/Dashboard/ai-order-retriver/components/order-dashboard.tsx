"use client"

import { useState, useCallback, useMemo, lazy, Suspense, useEffect } from "react"
import { DashboardHeader } from "./dashboard-header"
import { StatsCards } from "./stats-cards"
import { OrdersTable } from "./orders-table"
import { TableActionButtons } from "./table-action-buttons"
import { Button } from "@/components/ui/button"
import { History, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { orders as initialOrders, type Order } from "../data/sample-orders"
import { validateRegionData } from "./validation-utils"
import { uploadOrders } from "../data/shipping-availability"
import { Badge } from "@/components/ui/badge"

// Lazy load heavy components
const OrderViewModal = lazy(() => import("./order-view-modal").then((mod) => ({ default: mod.OrderViewModal })))
const OrderHistorySheet = lazy(() =>
  import("./order-history-sheet").then((mod) => ({ default: mod.OrderHistorySheet })),
)
const FacebookAuthDialog = lazy(() =>
  import("./facebook-auth-dialog").then((mod) => ({ default: mod.FacebookAuthDialog })),
)

// Create a context for orders data to avoid prop drilling
import { createContext, useContext } from "react"

// Create the import for Yalidin centers
import { getYalidinCenterById } from "../data/yalidin-centers"

// Add the import for Noast centers:
import { getNoastCenterById } from "../data/noast-centers"

// Import the useShop hook
import { useShop } from "@/app/context/ShopContext"

// Create a context for orders data
type OrdersContextType = {
  orders: Order[]
  selectedRows: string[]
  setSelectedRows: (rows: string[]) => void
  handleEditOrder: (order: Order, field: string, value: any) => void
}

const OrdersContext = createContext<OrdersContextType | null>(null)

export const useOrders = () => {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
      <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  </div>
)

// Helper function to get center by ID
const getCenterById = (id: string, deliveryCompany: string) => {
  if (deliveryCompany && deliveryCompany.toUpperCase() === "YALIDIN EXPRESS") {
    return getYalidinCenterById(id)
  } else if (deliveryCompany && deliveryCompany.toUpperCase() === "NOEST EXPRESS") {
    return getNoastCenterById(id)
  }
  return undefined
}

// Update the findNoestCommuneId function to use the new getNoestCommuneId function
const findNoestCommuneId = (wilayaName: string): number | undefined => {
  // Use the getNoestCommuneId function that returns the numeric ID directly
  const { getNoestCommuneId } = require("../data/noast-centers")
  return getNoestCommuneId(wilayaName)
}

// Update the OrderDashboard component to handle the beta request state
export function OrderDashboard() {
  // Use orders from shopData if available, otherwise use initialOrders
  const { shopData, dateRange, setDateRange,setShopData} = useShop()
  const [orders, setOrders] = useState<Order[]>(() => shopData.orders || initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isHistorySheetOpen, setIsHistorySheetOpen] = useState(false)
  const [isViewingFromHistory, setIsViewingFromHistory] = useState(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isRetrieving, setIsRetrieving] = useState(false)
  const [isFacebookConnected, setIsFacebookConnected] = useState(false)
  const [isFacebookAuthOpen, setIsFacebookAuthOpen] = useState(false)
  const [hasRequestedBeta, setHasRequestedBeta] = useState(shopData.hasRequestedBeta?true:false)
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  // Update orders when shopData.orders changes
  useEffect(() => {
    if (shopData.orders && shopData.orders.length > 0) {
      setOrders(shopData.orders)
    }
  }, [shopData.orders])

  // Memoize handler functions with useCallback
  const handleViewOrder = useCallback((order: Order, fromHistory = false) => {
    setSelectedOrder(order)
    setIsViewingFromHistory(fromHistory)
    setIsViewModalOpen(true)
  }, [])

  // Update the handleEditOrder function to handle stop desk information
  const handleEditOrder = useCallback(
    (order: Order, field: string, value: any) => {
      setOrders((currentOrders) => {
        return currentOrders.map((o) => {
          if (o.id !== order.id) return o

          // Create a deep copy of the order we want to update
          const updatedOrder = { ...o }

          // Update the appropriate field based on the field parameter
          switch (field) {
            case "clientName":
              updatedOrder.orderData.client_name.value = value
              break
            case "phoneNumber":
              updatedOrder.orderData.phone_number.value = value
              break
            case "articleName":
              if (updatedOrder.orderData.articles[0]) {
                updatedOrder.orderData.articles[0].name.value = value
              }
              break
            case "articleSize":
              if (updatedOrder.orderData.articles[0] && updatedOrder.orderData.articles[0].sizes[0]) {
                updatedOrder.orderData.articles[0].sizes[0].value = value
              }
              break
            case "articleColor":
              if (updatedOrder.orderData.articles[0] && updatedOrder.orderData.articles[0].colors[0]) {
                updatedOrder.orderData.articles[0].colors[0].value = value
              }
              break
            case "price":
            case "articlePrice":
              if (updatedOrder.orderData.articles[0]) {
                updatedOrder.orderData.articles[0].total_article_price.value = value * 100
                // Also update the total price
                updatedOrder.orderData.total_price.value =
                  updatedOrder.orderData.articles[0].total_article_price.value +
                  updatedOrder.orderData.delivery_cost.value
              }
              break
            case "deliveryPrice":
            case "deliveryCost":
              updatedOrder.orderData.delivery_cost.value = value * 100
              // Also update the total price
              updatedOrder.orderData.total_price.value =
                (updatedOrder.orderData.articles[0]?.total_article_price.value || 0) +
                updatedOrder.orderData.delivery_cost.value
              break
            case "address":
              updatedOrder.orderData.address.value = value
              break
            case "wilaya":
              updatedOrder.orderData.wilaya.name_fr.value = value
              break
            case "commune":
              updatedOrder.orderData.commune.name_fr.value = value
              break
            case "deliveryType":
              updatedOrder.orderData.delivery_type.value = value
              break
            case "additionalInfo":
              if (!updatedOrder.orderData.additional_information) {
                updatedOrder.orderData.additional_information = {
                  confidence: 0.8,
                  description: value,
                  value: value,
                }
              } else {
                updatedOrder.orderData.additional_information.value = value
                updatedOrder.orderData.additional_information.description = value
              }
              break
            // Existing cases...
            case "totalPrice":
              // Update the total price directly
              updatedOrder.orderData.total_price.value = value * 100
              break
            case "stopDeskId":
              // If stop desk ID is provided, get the center information
              if (value) {
                const center = getCenterById(value, shopData.deliveryCompany)
                if (center) {
                  // Handle different structures for Yalidin and Noast
                  if (shopData.deliveryCompany === "NOEST EXPRESS") {
                    updatedOrder.orderData.stop_desk = {
                      id: value,
                      name: center.name,
                      code: center.code,
                    }
                  } else {
                    updatedOrder.orderData.stop_desk = {
                      id: value,
                      name: center.name,
                    }
                  }
                } else {
                  updatedOrder.orderData.stop_desk = {
                    id: value,
                    name: "Unknown Stop Desk",
                  }
                }
              } else {
                // If no stop desk ID is provided, remove the stop desk information
                updatedOrder.orderData.stop_desk = undefined
              }
              break
            default:
              console.warn(`Unknown field: ${field}`)
          }

          return updatedOrder
        })
      })

      // Show toast notification
      toast({
        title: "Order Updated",
        description: `Order #${order.id} has been updated.`,
      })
    },
    [toast, shopData.deliveryCompany],
  )

  const showFacebookAuth = useCallback(() => {
    // Reset any previous submission state
    setIsFacebookAuthOpen(true)
  }, [])

  const handleFacebookAuth = useCallback(async () => {
    // In a real app, this would initiate the Meta OAuth flow
    setIsRetrieving(true)

    // Simulate authentication process
    toast({
      title: "Connecting to Meta",
      description: "Authenticating with Meta Business...",
    })

    // Simulate a delay for authentication
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Set as connected and close dialog
    setIsFacebookConnected(true)
    setIsFacebookAuthOpen(false)

    toast({
      title: "Meta Connected",
      description: "Successfully connected to Meta. Auto-retrieve is now active.",
    })

    // Simulate initial retrieval
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Initial Scan Complete",
      description: "Found 3 orders with ✅ emoji markers.",
    })

    setIsRetrieving(false)
  }, [toast])

  // Handle beta request sent
  const handleBetaRequestSent = useCallback(() => {
    console.log("Beta request sent, updating state")
    setHasRequestedBeta(true)
    // Store in localStorage to persist across sessions
    setShopData(prev=>({...prev,hasRequestedBeta:true}))
  }, [])


  const handleExcelExport = useCallback(() => {
    // In a real app, this would generate and download an Excel file
    toast({
      title: "Exporting to Excel",
      description: "Your export will download shortly.",
    })
  }, [toast])

  // Update the handleShippingExport function to use the improved wilaya matching
  const handleShippingExport = useCallback(async () => {
    if (selectedRows.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select at least one order to export.",
        variant: "destructive",
      })
      return
    }

    // Set loading state to true
    setIsExporting(true)

    // Show loading toast
    toast({
      title: "Checking with shipping provider",
      description: "Verifying delivery availability for selected orders...",
    })

    try {
      // Get selected orders
      const selectedOrders = orders.filter((order) => selectedRows.includes(order.id))

      // Simulate backend processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check for issues in the selected orders - STRICT VALIDATION
      const invalidOrders = selectedOrders.filter((order) => {
        const validation = validateRegionData(order, {
          deliveryCompany: shopData?.deliveryCompany,
        })

        // CRITICAL: Check for missing stop desk when delivery type is stopdesk
        // Only for shipping providers that require stop desk (NOEST Express and Yalidin Express)
        const isNoestExpress = shopData?.deliveryCompany?.toUpperCase() === "NOEST EXPRESS"
        const isYalidinExpress = shopData?.deliveryCompany?.toUpperCase() === "YALIDIN EXPRESS"
        const requiresStopDesk = isNoestExpress || isYalidinExpress

        const missingStopDesk =
          order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk && !order.orderData.stop_desk?.id

        // For NOEST Express with stopdesk, we only validate wilaya and stop desk
        if (isNoestExpress && order.orderData.delivery_type.value === "stopdesk") {
          return !validation.wilayaValid || !validation.stopDeskValid || missingStopDesk
        } else {
          return (
            !validation.wilayaValid ||
            !validation.communeValid ||
            !validation.deliveryTypeValid ||
            (requiresStopDesk && !validation.stopDeskValid) ||
            missingStopDesk
          )
        }
      })

      const validOrders = selectedOrders.filter((order) => !invalidOrders.includes(order))

      // If no valid orders, show error and return
      if (validOrders.length === 0) {
        toast({
          title: "Cannot Export Orders",
          description: "All selected orders have validation issues. Please fix them before exporting.",
          variant: "destructive",
        })
        setIsExporting(false)
        return
      }

      // Count orders with missing stop desk
      const missingStopDeskOrders = invalidOrders.filter((order) => {
        const isNoestExpress = shopData?.deliveryCompany?.toUpperCase() === "NOEST EXPRESS"
        const isYalidinExpress = shopData?.deliveryCompany?.toUpperCase() === "YALIDIN EXPRESS"
        const requiresStopDesk = isNoestExpress || isYalidinExpress

        return order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk && !order.orderData.stop_desk?.id
      })

      // Create detailed logs of exported and failed orders
      const { findWilayaByName, findCommuneByNameAcrossWilayas } = require("../data/algeria-regions")
      const exportedOrdersLog = validOrders.map((order) => {
        // Find the wilaya code and commune ID from the algeria-regions data
        const wilayaName = order.orderData.wilaya.name_fr.value
        const communeName = order.orderData.commune.name_fr.value

        // Get wilaya code using the improved findWilayaByName function
        const wilayaCode = findWilayaByName(wilayaName)

        // Get commune ID based on delivery type and shipping provider
        let communeId
        const isNoestExpress = shopData?.deliveryCompany?.toUpperCase() === "NOEST EXPRESS"
        const isYalidinExpress = shopData?.deliveryCompany?.toUpperCase() === "YALIDIN EXPRESS"

        if (order.orderData.delivery_type.value === "home") {
          // For home delivery, get commune ID from algeria-regions data
          const commune = findCommuneByNameAcrossWilayas(communeName)
          communeId = commune?.id
        } else if (isNoestExpress && order.orderData.delivery_type.value === "stopdesk") {
          // For NOEST Express with stopdesk, get commune ID directly from the commune object
          // This is the numeric ID of the commune, not the key from the centers array
          communeId = findNoestCommuneId(wilayaName)
        } else if (isYalidinExpress && order.orderData.delivery_type.value === "stopdesk") {
          // For Yalidin Express with stopdesk, get commune ID from the selected stop desk
          // The stop desk ID should already contain the commune information
          if (order.orderData.stop_desk?.id) {
            // Extract commune ID from the stop desk center
            const { getYalidinCenterById } = require("../data/yalidin-centers")
            const center = getYalidinCenterById(order.orderData.stop_desk.id)
            if (center) {
              communeId = center.commune_id
            } else {
              // Fallback to finding commune by name
              const commune = findCommuneByNameAcrossWilayas(communeName)
              communeId = commune?.id
            }
          }
        } else {
          // For other cases, try to find commune by name
          const commune = findCommuneByNameAcrossWilayas(communeName)
          communeId = commune?.id
        }

        return {
          id: order.id,
          address: order.orderData.address.value,
          articles: order.orderData.articles,
          customerName: order.orderData.client_name.value,
          phoneNumber: order.orderData.phone_number.value,
          wilaya: order.orderData.wilaya.name_fr.value,
          wilayaCode: wilayaCode, // Add wilaya code
          commune: order.orderData.commune.name_fr.value || wilayaName, // Use wilaya name if commune is undefined
          communeId: communeId, // Add commune ID
          deliveryType: order.orderData.delivery_type.value,
          totalPrice: order.orderData.total_price.value / 100,
          status: "confirmed", // New status after export
          // Include stop desk information if applicable
          stopDesk:
            order.orderData.delivery_type.value === "stopdesk"
              ? {
                  id: order.orderData.stop_desk?.id,
                  name: order.orderData.stop_desk?.name,
                  code: order.orderData.stop_desk?.code,
                }
              : undefined,
        }
      })

      const failedOrdersLog = invalidOrders.map((order) => {
        const validation = validateRegionData(order, {
          deliveryCompany: shopData?.deliveryCompany,
        })

        return {
          id: order.id,
          customerName: order.orderData.client_name.value,
          phoneNumber: order.orderData.phone_number.value,
          wilaya: order.orderData.wilaya.name_fr.value,
          commune: order.orderData.commune.name_fr.value,
          deliveryType: order.orderData.delivery_type.value,
          totalPrice: order.orderData.total_price.value / 100,
          validationIssues: {
            wilayaValid: validation.wilayaValid,
            communeValid: validation.communeValid,
            deliveryTypeValid: validation.deliveryTypeValid,
            stopDeskValid: validation.stopDeskValid,
            missingStopDesk: order.orderData.delivery_type.value === "stopdesk" && !order.orderData.stop_desk?.id,
          },
          // Include stop desk information if applicable
          stopDesk:
            order.orderData.delivery_type.value === "stopdesk"
              ? {
                  id: order.orderData.stop_desk?.id,
                  name: order.orderData.stop_desk?.name,
                  code: order.orderData.stop_desk?.code,
                }
              : undefined,
        }
      })

      // Log the arrays to console
      console.log("Exported Orders:", exportedOrdersLog)
      console.log("Failed Orders:", failedOrdersLog)

      // Now upload the valid orders to the shipping provider's backend
      const uploadResult = await uploadOrders(shopData, exportedOrdersLog, shopData.deliveryCompany)

      if (uploadResult.success) {
        // All orders were successfully uploaded to the backend
        // Update the status of ONLY valid orders to "confirmed" in both local state and Firestore
        //const updatePromises = validOrders.map((order) => updateOrderStatus(order.id, "confirmed"))
        //await Promise.all(updatePromises)

        // Update local state
        setOrders((currentOrders) => {
          return currentOrders.map((order) => {
            if (validOrders.some((validOrder) => validOrder.id === order.id)) {
              return { ...order, status: "confirmed" }
            }
            return order
          })
        })
        setShopData(prev => ({
          ...prev,
          tokens: uploadResult.tokens
        }));

        toast({
          title: "Export Successful",
          description: `Successfully exported ${validOrders.length} orders to shipping provider.`,
        })
      } else {
        // Some orders failed on the backend
        const backendFailedOrders = uploadResult.failed || []
        const backendFailedIds = backendFailedOrders.map((order) => order.id)

        // Only update the status of orders that passed both frontend and backend validation
        const successfulOrders = validOrders.filter((order) => !backendFailedIds.includes(order.id))

        // Update status in Firestore for successful orders
       // const updatePromises = successfulOrders.map((order) => updateOrderStatus(order.id, "confirmed"))
        //await Promise.all(updatePromises)

        // Update local state
        setOrders((currentOrders) => {
          return currentOrders.map((order) => {
            if (successfulOrders.some((successfulOrder) => successfulOrder.id === order.id)) {
              return { ...order, status: "confirmed" }
            }
            return order
          })
        })

        // Show success message for successful orders
        if (successfulOrders.length > 0) {
          toast({
            title: "Partial Export Successful",
            description: `Successfully exported ${successfulOrders.length} out of ${validOrders.length} orders.`,
          })
        }

        // Show warning for backend failed orders
        if (backendFailedOrders.length > 0) {
          const orderIds = backendFailedOrders.map((order) => `#${order.id}`).join(", ")
          toast({
            title: "Some Orders Failed Backend Validation",
            description: `${backendFailedOrders.length} orders were rejected by the shipping provider: ${orderIds}`,
            variant: "warning",
          })
        }
      }

      // Show warning for frontend validation failures
      if (invalidOrders.length > 0) {
        // Create a more detailed message about why orders failed
        const stopDeskIssues = missingStopDeskOrders.length
        const otherIssues = invalidOrders.length - stopDeskIssues

        let warningMessage = `${invalidOrders.length} orders were skipped due to validation issues: `

        if (stopDeskIssues > 0) {
          warningMessage += `${stopDeskIssues} missing stop desk selection`
        }

        if (otherIssues > 0) {
          warningMessage +=
            stopDeskIssues > 0
              ? `, ${otherIssues} with other validation issues`
              : `${otherIssues} with validation issues`
        }

        const orderIds = invalidOrders.map((order) => `#${order.id}`).join(", ")
        warningMessage += `. Skipped orders: ${orderIds}`

        toast({
          title: "Some Orders Were Skipped",
          description: warningMessage,
          variant: "warning",
        })
      }

      // Clear selection after export
      setSelectedRows([])
    } catch (error) {
      console.error("Error exporting orders:", error)
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Set loading state back to false
      setIsExporting(false)
    }
  }, [orders, selectedRows, toast, shopData])

  const toggleHistorySheet = useCallback(() => {
    setIsHistorySheetOpen((prev) => !prev)
  }, [])

  const handleDisconnect = useCallback(() => {
    setIsFacebookConnected(false)
  }, [])

  // Memoize the validation status calculation
  const selectedOrdersValidationStatus = useMemo(() => {
    if (selectedRows.length === 0) return { valid: true, invalidCount: 0 }

    const selectedOrders = orders.filter((order) => selectedRows.includes(order.id))
    const invalidOrders = selectedOrders.filter((order) => {
      const validation = validateRegionData(order, {
        deliveryCompany: shopData?.deliveryCompany,
      })

      // CRITICAL: Check for missing stop desk when delivery type is stopdesk
      const isNoestExpress = shopData?.deliveryCompany?.toUpperCase() === "NOEST EXPRESS"
      const isYalidinExpress = shopData?.deliveryCompany?.toUpperCase() === "YALIDIN EXPRESS"
      const requiresStopDesk = isNoestExpress || isYalidinExpress

      const missingStopDesk =
        order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk && !order.orderData.stop_desk?.id

      // For NOEST Express with stopdesk, we only validate wilaya and stop desk
      if (isNoestExpress && order.orderData.delivery_type.value === "stopdesk") {
        return !validation.wilayaValid || !validation.stopDeskValid || missingStopDesk
      } else {
        return (
          !validation.wilayaValid ||
          !validation.communeValid ||
          !validation.deliveryTypeValid ||
          (requiresStopDesk && !validation.stopDeskValid) ||
          missingStopDesk
        )
      }
    })

    return {
      valid: invalidOrders.length === 0,
      invalidCount: invalidOrders.length,
    }
  }, [orders, selectedRows, shopData])

  // Memoize the view order handler from history
  const handleViewFromHistory = useCallback(
    (order: Order) => {
      handleViewOrder(order, true)
      setIsHistorySheetOpen(false)
    },
    [handleViewOrder],
  )

  // Create context value
  const ordersContextValue = useMemo(
    () => ({
      orders,
      selectedRows,
      setSelectedRows,
      handleEditOrder,
    }),
    [orders, selectedRows, handleEditOrder],
  )

  // Memoize the filtered orders for the current date range
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.timestamp)
      const isInDateRange =
        orderDate >= dateRange.from && orderDate <= new Date(dateRange.to.getTime() + 24 * 60 * 60 * 1000 - 1)

      // Only include orders that are not confirmed and are in the date range
      return order.status !== "confirmed" && isInDateRange
    })
  }, [orders, dateRange])

  return (
    <OrdersContext.Provider value={ordersContextValue}>
      <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-6">
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isFacebookConnected={isFacebookConnected}
          showFacebookAuth={showFacebookAuth}
          onDisconnect={handleDisconnect}
        />

        <StatsCards orders={filteredOrders} dateRange={dateRange} />

        <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow p-4 md:p-6 border dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
            <div className="flex flex-wrap gap-3">
              <TableActionButtons
                onExcelExport={handleExcelExport}
                onShippingExport={handleShippingExport}
                selectedCount={selectedRows.length}
                isRetrieving={isRetrieving}
                isExporting={isExporting}
                isFacebookConnected={isFacebookConnected}
                showFacebookAuth={showFacebookAuth}
                validationStatus={selectedOrdersValidationStatus}
                hasRequestedBeta={hasRequestedBeta}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {hasRequestedBeta && !isFacebookConnected && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 py-2 px-3">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Beta Access Requested
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={toggleHistorySheet}
                className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
              >
                <History className="mr-2 h-4 w-4" />
                Order History
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <OrdersTable orders={filteredOrders} onViewOrder={handleViewOrder} dateRange={dateRange} />
          </div>
        </div>

        {/* Lazy load heavy components with Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          {selectedOrder && isViewModalOpen && (
            <OrderViewModal
              order={selectedOrder}
              isOpen={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
              readOnly={isViewingFromHistory}
              onEditOrder={handleEditOrder}
            />
          )}

          {isHistorySheetOpen && (
            <OrderHistorySheet
              isOpen={isHistorySheetOpen}
              onClose={() => setIsHistorySheetOpen(false)}
              orders={orders}
              onViewOrder={handleViewFromHistory}
            />
          )}

          {isFacebookAuthOpen && (
            <FacebookAuthDialog
              isOpen={isFacebookAuthOpen}
              onClose={() => setIsFacebookAuthOpen(false)}
              onAuthenticate={handleFacebookAuth}
              onRequestSent={handleBetaRequestSent}
              hasRequestedBeta={hasRequestedBeta}
              shopId={shopData.id}
            />
          )}
        </Suspense>
      </div>
    </OrdersContext.Provider>
  )
}
