"use client"

import type React from "react"

import { useState, useMemo, useCallback, memo } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, Calendar, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, parseISO, isWithinInterval, endOfDay } from "date-fns"
import type { Order } from "../data/sample-orders"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderHistorySheetProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
  onViewOrder: (order: Order) => void
}

// Update the OrderRow component to include stop desk information
const OrderRow = memo(function OrderRow({
  order,
  onViewOrder,
}: {
  order: Order
  onViewOrder: (order: Order) => void
}) {
  const handleViewClick = useCallback(() => {
    onViewOrder(order)
  }, [order, onViewOrder])

  // Handle both string and Date objects for timestamp
  const orderDate = order.timestamp instanceof Date ? order.timestamp : parseISO(order.timestamp)

  return (
    <TableRow key={order.id} className="dark:border-gray-700">
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{order.orderData.client_name.value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{order.orderData.phone_number.value}</div>
        </div>
      </TableCell>
      <TableCell>{format(orderDate, "MMM dd, yyyy")}</TableCell>
      <TableCell>{(order.orderData.total_price.value).toLocaleString()} DA</TableCell>
      <TableCell>
        <div className="max-w-[150px] truncate" title={order.orderData.articles[0]?.name.value || ""}>
          {order.orderData.articles[0]?.name.value || "-"}
        </div>
      </TableCell>
      {/* Add stop desk information */}
      <TableCell>
        {order.orderData.delivery_type.value === "stopdesk" && order.orderData.stop_desk?.name ? (
          <div className="max-w-[150px] truncate" title={order.orderData.stop_desk.name}>
            {order.orderData.stop_desk.name}
          </div>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewClick}
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
      </TableCell>
    </TableRow>
  )
})

// Memoize the entire OrderHistorySheet component
export const OrderHistorySheet = memo(function OrderHistorySheet({
  isOpen,
  onClose,
  orders,
  onViewOrder,
}: OrderHistorySheetProps) {
  // Filter only confirmed orders - memoized
  const confirmedOrders = useMemo(() => {
    return orders.filter((order) => order.status === "confirmed")
  }, [orders])

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  })
  const [searchField, setSearchField] = useState<string>("all")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Use useMemo for filtered orders
  const filteredOrders = useMemo(() => {
    // Start with confirmed orders
    let result = confirmedOrders

    // Apply date filter
    if (dateRange.from && dateRange.to) {
      const endDate = endOfDay(new Date(dateRange.to))
      result = result.filter((order) => {
        // Handle both string and Date objects for timestamp
        const orderDate = order.timestamp instanceof Date ? order.timestamp : parseISO(order.timestamp)
        return isWithinInterval(orderDate, {
          start: dateRange.from,
          end: endDate,
        })
      })
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((order) => {
        if (searchField === "all") {
          return (
            order.id.toLowerCase().includes(term) ||
            order.orderData.client_name.value.toLowerCase().includes(term) ||
            order.orderData.phone_number.value.toLowerCase().includes(term) ||
            order.orderData.articles.some((article) => article.name.value.toLowerCase().includes(term))
          )
        } else if (searchField === "id") {
          return order.id.toLowerCase().includes(term)
        } else if (searchField === "name") {
          return order.orderData.client_name.value.toLowerCase().includes(term)
        } else if (searchField === "phone") {
          return order.orderData.phone_number.value.toLowerCase().includes(term)
        } else if (searchField === "article") {
          return order.orderData.articles.some((article) => article.name.value.toLowerCase().includes(term))
        }
        return false
      })
    }

    return result
  }, [confirmedOrders, searchTerm, dateRange, searchField])

  // Use useCallback for event handlers
  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setDateRange({
      from: new Date(2025, 0, 1),
      to: new Date(),
    })
    setSearchField("all")
  }, [])

  const formatDateRange = useCallback(() => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
    }
    return "All time"
  }, [dateRange])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchField(value)
  }, [])

  const handleDateRangeChange = useCallback((range: { from: Date; to: Date | undefined }) => {
    if (range) {
      setDateRange(range)
    }
    if (range?.from && range?.to) {
      setIsCalendarOpen(false)
    }
  }, [])

  const handleCalendarReset = useCallback(() => {
    setDateRange({ from: new Date(2025, 0, 1), to: new Date() })
    setIsCalendarOpen(false)
  }, [])

  const toggleCalendar = useCallback(() => {
    setIsCalendarOpen((prev) => !prev)
  }, [])

  const EmptyState = useMemo(
    () => (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-lg border dark:border-gray-700">
        <div className="flex flex-col items-center gap-2">
          <Filter className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          <h3 className="font-medium text-gray-700 dark:text-gray-300">No matching orders</h3>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
            Clear all filters
          </Button>
        </div>
      </div>
    ),
    [clearFilters],
  )

  const OrdersTable = useMemo(
    () => (
      <div className="overflow-x-auto border rounded-md dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-700">
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Article</TableHead>
              <TableHead>Stop Desk</TableHead>
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} onViewOrder={onViewOrder} />
            ))}
          </TableBody>
        </Table>
      </div>
    ),
    [filteredOrders, onViewOrder],
  )

  // Don't render anything if not open to improve performance
  return isOpen ? (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold flex items-center">
            <Badge className="mr-2 bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">
              Confirmed
            </Badge>
            Order History
          </SheetTitle>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
              <X className="h-3 w-3 mr-1" /> Clear filters
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-9 h-10"
              />
            </div>

            <Select value={searchField} onValueChange={handleSearchFieldChange}>
              <SelectTrigger className="w-[140px] h-10">
                <SelectValue placeholder="Search in..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All fields</SelectItem>
                <SelectItem value="id">Order ID</SelectItem>
                <SelectItem value="name">Customer name</SelectItem>
                <SelectItem value="phone">Phone number</SelectItem>
                <SelectItem value="article">Article</SelectItem>
              </SelectContent>
            </Select>

            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start text-left h-10 gap-2"
                  onClick={toggleCalendar}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="truncate">{formatDateRange()}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateRangeChange}
                  initialFocus
                  numberOfMonths={2}
                />
                <div className="p-3 border-t border-border flex justify-between">
                  <Button variant="ghost" size="sm" onClick={handleCalendarReset}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setIsCalendarOpen(false)}>
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredOrders.length} of {confirmedOrders.length} confirmed orders
          </div>

          {/* Orders table */}
          {filteredOrders.length === 0 ? EmptyState : OrdersTable}
        </div>
      </SheetContent>
    </Sheet>
  ) : null
})
