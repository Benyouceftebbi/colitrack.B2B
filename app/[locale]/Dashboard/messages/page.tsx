'use client'

import * as React from "react"
import { useEffect, useState, useMemo } from "react"
import { MessageCenterHeader } from "./components/message-center-header"
import { MessageFeatures } from "./components/message-features"
import { MessagePreview } from "./components/message-preview"
import { MessageList } from "./components/message-list"

const features = [
  { id: 'expedited', name: 'Expedited Delivery', tokens: 5, description: 'Send updates for expedited shipments' },
  { id: 'arrived_stop', name: 'Arrived at Stop', tokens: 3, description: 'Notify when package arrives at a delivery stop' },
  { id: 'out_for_delivery', name: 'Out for Delivery', tokens: 2, description: 'Alert customers when their package is out for delivery' },
]

const timeOptions = [
  { value: "1h", label: "Last hour" },
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "custom", label: "Custom range" },
]

const initialMessages = [
  { id: 1, customer: "John Doe", trackingNumber: "TRK123456789", status: "delivered", time: new Date(2024, 2, 15, 14, 30), message: "Your package will be delivered today between 2-4 PM", senderId: "SENDER001", messageType: "expedited" },
  { id: 2, customer: "Jane Smith", trackingNumber: "TRK987654321", status: "failed", time: new Date(2024, 2, 15, 13, 45), message: "Package delivery attempted. Please confirm your availability for tomorrow.", senderId: "SENDER002", messageType: "delivery_attempt" },
  { id: 3, customer: "Mike Johnson", trackingNumber: "TRK456789123", status: "delivered", time: new Date(2024, 2, 15, 12, 15), message: "Your package has been picked up by our courier", senderId: "SENDER003", messageType: "pickup" },
  { id: 4, customer: "Emily Brown", trackingNumber: "TRK789123456", status: "pending", time: new Date(2024, 2, 15, 11, 30), message: "Your package is being processed at our facility", senderId: "SENDER004", messageType: "processing" },
  { id: 5, customer: "David Wilson", trackingNumber: "TRK321654987", status: "delivered", time: new Date(2024, 2, 15, 10, 45), message: "Your package has been delivered. Thank you for using our service!", senderId: "SENDER005", messageType: "delivered" },
  ...[...Array(20)].map((_, index) => ({
    id: 6 + index,
    customer: `Customer ${index + 6}`,
    trackingNumber: `TRK${Math.random().toString(36).substr(2, 9)}`,
    status: ["delivered", "failed", "pending"][Math.floor(Math.random() * 3)],
    time: new Date(2024, 2, 15, 10, 0 - index * 15),
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    senderId: `SENDER${(6 + index).toString().padStart(3, '0')}`,
    messageType: ["expedited", "arrived_stop", "out_for_delivery"][Math.floor(Math.random() * 3)]
  }))
]

export default function MessageCenter() {
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>(["all"])
  const [selectedTime, setSelectedTime] = React.useState(timeOptions[0].value)
  const [date, setDate] = React.useState<Date>()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [token, setToken] = useState<string | null>(null)
  const [senderId, setSenderId] = useState<string | null>(null)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [previewMessage, setPreviewMessage] = useState<string | null>(null)
  const [activePreviewTab, setActivePreviewTab] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const messagesPerPage = 10

  useEffect(() => {
    const fetchTokenAndSenderId = async () => {
      setToken("example_token")
      setSenderId("SENDER123")
    }
    fetchTokenAndSenderId()
  }, [])

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const statusMatch = selectedStatus.includes("all") || selectedStatus.includes(message.status)
      let timeMatch = true

      if (selectedTime === "1h") {
        timeMatch = message.time > new Date(Date.now() - 60 * 60 * 1000)
      } else if (selectedTime === "24h") {
        timeMatch = message.time > new Date(Date.now() - 24 * 60 * 60 * 1000)
      } else if (selectedTime === "7d") {
        timeMatch = message.time > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      } else if (selectedTime === "30d") {
        timeMatch = message.time > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      } else if (selectedTime === "custom" && date) {
        timeMatch = message.time >= date
      }

      const searchMatch = 
        message.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.senderId.toLowerCase().includes(searchTerm.toLowerCase())

      return statusMatch && timeMatch && searchMatch
    })
  }, [messages, selectedStatus, selectedTime, date, searchTerm])

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage)
  
  const paginatedMessages = useMemo(() => {
    const startIndex = (currentPage - 1) * messagesPerPage
    return filteredMessages.slice(startIndex, startIndex + messagesPerPage)
  }, [filteredMessages, currentPage])

  const refreshMessages = async () => {
    console.log("Refreshing messages with token:", token)
  }

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const previewDeliveryMessage = (stage: string) => {
    const trackingNumber = "TRK123456789"
    let message = ""

    switch (stage) {
      case "expedited":
        message = `Your package (${trackingNumber}) has been expedited. Expect delivery soon!`;
        break;
      case "arrived_stop":
        message = `Your package (${trackingNumber}) has arrived at a delivery stop. It will be out for delivery shortly.`;
        break;
      case "out_for_delivery":
        message = `Your package (${trackingNumber}) is out for delivery. Expect it today!`;
        break;
      default:
        message = `Update for your package (${trackingNumber}): ${stage}`;
    }

    setPreviewMessage(message)
    setActivePreviewTab(stage)
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto space-y-6 sm:space-y-8">
        <MessageCenterHeader token={token} senderId={senderId} />

        <div className="w-1/2 mb-6 sm:mb-8">
          <div className="bg-[#faf5ff] p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-2/5">
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/jNQXAC9IVRw"
                    title="Delivery Update Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="w-full sm:w-3/5 space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">Ready to streamline your delivery updates?</h2>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Our delivery update system keeps your customers informed in real-time. Track packages across multiple carriers, automate notifications, and improve customer satisfaction with timely updates about their deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="col-span-full md:col-span-2">
            <MessageFeatures 
              features={features}
              selectedFeatures={selectedFeatures}
              toggleFeature={toggleFeature}
            />
          </div>
          <div className="col-span-full md:col-span-1 h-full">
            <MessagePreview 
              features={features}
              previewMessage={previewMessage}
              activePreviewTab={activePreviewTab}
              previewDeliveryMessage={previewDeliveryMessage}
            />
          </div>
        </div>

        <MessageList 
          messages={paginatedMessages}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          date={date}
          setDate={setDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          refreshMessages={refreshMessages}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </div>
    </div>
  )
}

