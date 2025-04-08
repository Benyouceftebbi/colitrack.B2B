"use client"

import { useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { StatsCards } from "./stats-cards"
import { OrdersTable } from "./orders-table"
import { OrderViewModal } from "./order-view-modal"
import { TableActionButtons } from "./table-action-buttons"
import { OrderHistorySheet } from "./order-history-sheet"
import { FacebookAuthDialog } from "./facebook-auth-dialog"
import { useToast } from "@/hooks/use-toast"
import { orders as initialOrders, type Order } from "../data/sample-orders"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"

export function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isHistorySheetOpen, setIsHistorySheetOpen] = useState(false)
  const [isViewingFromHistory, setIsViewingFromHistory] = useState(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isRetrieving, setIsRetrieving] = useState(false)
  const [isFacebookConnected, setIsFacebookConnected] = useState(false)
  const [isFacebookAuthOpen, setIsFacebookAuthOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 3, 4), // April 4, 2025
    to: new Date(2025, 3, 5), // April 5, 2025
  })
  const { toast } = useToast()

  const handleViewOrder = (order: Order, fromHistory = false) => {
    setSelectedOrder(order)
    setIsViewingFromHistory(fromHistory)
    setIsViewModalOpen(true)
  }

  // Update the handleEditOrder function to actually update the orders array
  const handleEditOrder = (order: Order, field: string, value: any) => {
    // Create a deep copy of the orders array
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
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
          default:
            console.warn(`Unknown field: ${field}`)
        }

        return updatedOrder
      }
      return o
    })

    // Update the orders state
    setOrders(updatedOrders)

    // Show toast notification
    toast({
      title: "Order Updated",
      description: `Order #${order.id} has been updated.`,
    })
  }

  const showFacebookAuth = () => {
    setIsFacebookAuthOpen(true)
  }

  const handleFacebookAuth = async () => {
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
  }

  const handleExcelExport = () => {
    // In a real app, this would generate and download an Excel file
    toast({
      title: "Exporting to Excel",
      description: "Your export will download shortly.",
    })
  }

  const handleShippingExport = () => {
    if (selectedRows.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select at least one order to export.",
        variant: "destructive",
      })
      return
    }

    // Update the status of ALL selected orders to "confirmed"
    const updatedOrders = orders.map((order) => {
      if (selectedRows.includes(order.id)) {
        return { ...order, status: "confirmed" }
      }
      return order
    })

    setOrders(updatedOrders)

    // In a real app, this would export selected orders to your shipping provider
    toast({
      title: "Exporting to Shipping Provider",
      description: `Exported ${selectedRows.length} orders to shipping provider. Status changed to confirmed.`,
    })

    // Clear selection after export
    setSelectedRows([])
  }

  const toggleHistorySheet = () => {
    setIsHistorySheetOpen(!isHistorySheetOpen)
  }

  return (
    <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-6">
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isFacebookConnected={isFacebookConnected}
        showFacebookAuth={showFacebookAuth}
        onDisconnect={() => setIsFacebookConnected(false)}
      />

      <StatsCards orders={orders} dateRange={dateRange} />

      <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow p-4 md:p-6 border dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <TableActionButtons
            onExcelExport={handleExcelExport}
            onShippingExport={handleShippingExport}
            selectedCount={selectedRows.length}
            isRetrieving={isRetrieving}
            isFacebookConnected={isFacebookConnected}
            showFacebookAuth={showFacebookAuth}
          />

          <Button
            variant="outline"
            onClick={toggleHistorySheet}
            className="ml-2 border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
          >
            <History className="mr-2 h-4 w-4" />
            Order History
          </Button>
        </div>

        <div className="overflow-x-auto">
          <OrdersTable
            orders={orders}
            onViewOrder={(order) => handleViewOrder(order, false)}
            onEditOrder={handleEditOrder}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            dateRange={dateRange}
          />
        </div>
      </div>

      {selectedOrder && (
        <OrderViewModal
          order={selectedOrder}
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          readOnly={isViewingFromHistory}
          onEditOrder={handleEditOrder}
        />
      )}

      <OrderHistorySheet
        isOpen={isHistorySheetOpen}
        onClose={() => setIsHistorySheetOpen(false)}
        orders={orders}
        onViewOrder={(order) => {
          handleViewOrder(order, true)
          setIsHistorySheetOpen(false)
        }}
      />

      <FacebookAuthDialog
        isOpen={isFacebookAuthOpen}
        onClose={() => setIsFacebookAuthOpen(false)}
        onAuthenticate={handleFacebookAuth}
      />
    </div>
  )
}

