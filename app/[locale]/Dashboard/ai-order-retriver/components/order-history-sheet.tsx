"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, parseISO } from "date-fns"
import type { Order } from "../data/sample-orders"

interface OrderHistorySheetProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
  onViewOrder: (order: Order) => void
}

export function OrderHistorySheet({ isOpen, onClose, orders, onViewOrder }: OrderHistorySheetProps) {
  // Filter only confirmed orders
  const confirmedOrders = orders.filter((order) => order.status === "confirmed")

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center">
            <Badge className="mr-2 bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">
              Confirmed
            </Badge>
            Order History
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {confirmedOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No confirmed orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-gray-700">
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {confirmedOrders.map((order) => (
                    <TableRow key={order.id} className="dark:border-gray-700">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.orderData.client_name.value}</TableCell>
                      <TableCell>{format(parseISO(order.timestamp), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{(order.orderData.total_price.value / 100).toLocaleString()} DA</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewOrder(order)}
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

