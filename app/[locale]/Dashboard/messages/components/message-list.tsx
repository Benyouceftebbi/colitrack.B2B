import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RefreshCw, ChevronLeft, ChevronRight, ChevronDownIcon, CalendarIcon, SearchIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  customer: string
  trackingNumber: string
  status: string
  time: Date
  senderId: string
  messageType: string
  message: string
}

interface MessageListProps {
  messages: Message[]
  selectedStatus: string[]
  setSelectedStatus: (status: string[]) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  refreshMessages: () => void
  currentPage: number
  totalPages: number
  goToNextPage: () => void
  goToPreviousPage: () => void
}

export function MessageList({
  messages,
  selectedStatus,
  setSelectedStatus,
  selectedTime,
  setSelectedTime,
  date,
  setDate,
  searchTerm,
  setSearchTerm,
  refreshMessages,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage
}: MessageListProps) {
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "delivered", label: "Delivered" },
    { value: "failed", label: "Failed" },
    { value: "pending", label: "Pending" },
  ]

  const timeOptions = [
    { value: "1h", label: "Last hour" },
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "custom", label: "Custom range" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg sm:text-xl">Message List</CardTitle>
          <CardDescription className="text-xs sm:text-sm">View and filter all messages</CardDescription>
        </div>
        <Button onClick={refreshMessages} size="sm" className="text-xs sm:text-sm">
          <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Refresh Messages
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[200px] justify-between text-xs sm:text-sm">
                {selectedStatus.length === 1 && selectedStatus[0] === "all"
                  ? "All Statuses"
                  : `${selectedStatus.length} selected`}
                <ChevronDownIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              {statusOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={selectedStatus.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (option.value === "all") {
                      setSelectedStatus(checked ? ["all"] : [])
                    } else {
                      setSelectedStatus((prev) =>
                        checked
                          ? [...prev.filter((item) => item !== "all"), option.value]
                          : prev.filter((item) => item !== option.value)
                      )
                    }
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[200px] justify-between text-xs sm:text-sm">
                {timeOptions.find((option) => option.value === selectedTime)?.label}
                <ChevronDownIcon className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              {timeOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={selectedTime === option.value}
                  onCheckedChange={() => setSelectedTime(option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedTime === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[200px] justify-start text-left font-normal text-xs sm:text-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}

          <div className="relative w-full sm:w-auto">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-[300px] text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-auto flex-grow border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sm:w-[200px] text-xs sm:text-sm">CUSTOMER</TableHead>
                <TableHead className="w-[100px] sm:w-[200px] text-xs sm:text-sm">TRACKING NUMBER</TableHead>
                <TableHead className="w-[80px] sm:w-[100px] text-xs sm:text-sm">STATUS</TableHead>
                <TableHead className="w-[100px] sm:w-[200px] text-xs sm:text-sm">TIME</TableHead>
                <TableHead className="w-[100px] sm:w-[150px] text-xs sm:text-sm">SENDER ID</TableHead>
                <TableHead className="w-[100px] sm:w-[150px] text-xs sm:text-sm">MESSAGE TYPE</TableHead>
                <TableHead className="text-xs sm:text-sm">MESSAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium text-xs sm:text-sm">{message.customer}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{message.trackingNumber}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        message.status === "delivered"
                          ? "success"
                          : message.status === "failed"
                          ? "destructive"
                          : "default"
                      }
                      className="text-[10px] sm:text-xs"
                    >
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">{message.time.toLocaleString()}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{message.senderId}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{message.messageType}</TableCell>
                  <TableCell className="max-w-[150px] sm:max-w-md truncate text-xs sm:text-sm">{message.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <div className="flex items-center space-x-2">
            <Button 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1} 
              className="text-xs sm:text-sm"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs sm:text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages} 
              className="text-xs sm:text-sm"
              size="sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

