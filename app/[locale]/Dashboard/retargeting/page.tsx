"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, Upload, InfoIcon, CheckIcon, AlertTriangleIcon, X, Download, Battery, Signal, Wifi, ChevronLeft ,HelpCircle} from 'lucide-react'
import confetti from "canvas-confetti"
import * as XLSX from "xlsx"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const CLIENT_GROUPS = [
  { value: "last_week", label: "Last Week Clients", recipients: 100 },
  { value: "last_15_days", label: "Last 15 Days Clients", recipients: 250 },
  { value: "last_month", label: "Last Month Clients", recipients: 500 },
  { value: "last_3_months", label: "Last 3 Months Clients", recipients: 1000 },
  { value: "last_6_months", label: "Last 6 Months Clients", recipients: 2000 },
  { value: "last_12_months", label: "Last 12 Months Clients", recipients: 5000 },
]

const CHARACTER_LIMIT = 160
const STEPS = ["Select Audience", "Craft Message", "Preview & Test", "Send Campaign"]
const COST_PER_MESSAGE = 15 // in DZD

type AlertAction = "test" | "campaign"

type SentMessage = {
  id: string
  date: Date
  recipients: number
  messageCount: number
  totalCost: number
  content: string
}

function StatusBar() {
  return (
    <div className="h-8 bg-gray-100 dark:bg-gray-800 flex justify-between items-center px-3 pt-1 text-xs font-medium text-gray-900 dark:text-white">
      <span>11:24</span>
      <div className="absolute left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full" />
      <div className="flex items-center gap-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  )
}

function MessageHeader({ senderId }: { senderId: string }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-3 pb-2">
      <div className="flex items-center gap-2 py-1">
        <ChevronLeft className="w-4 h-4 text-blue-500" />
        <div className="flex-1 text-center">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1" />
          <div className="font-semibold text-xs text-gray-900 dark:text-white">{senderId || 'Colitrack'}</div>
        </div>
        <div className="w-4" /> {/* Spacer for alignment */}
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: string }) {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-3 max-w-[80%]">
        <p className="text-sm break-words">{message}</p>
      </div>
    </div>
  )
}

function PhonePreview({ messageTemplate, senderId, onClose }: { messageTemplate: string; senderId: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          className="relative w-full max-w-[280px]"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-[500px] bg-black rounded-[2rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-[1.8rem] overflow-hidden">
              <StatusBar />
              <MessageHeader senderId={senderId} />
              
              <div className="h-[calc(100%-90px)] overflow-y-auto px-3 py-2">
                <div className="text-center mb-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Today 11:24</div>
                </div>
                <MessageBubble message={messageTemplate} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function RetargetingCampaign() {
  const [selectedGroup, setSelectedGroup] = React.useState(CLIENT_GROUPS[0])
  const [message, setMessage] = React.useState("")
  const [isAlertOpen, setIsAlertOpen] = React.useState(false)
  const [alertAction, setAlertAction] = React.useState<AlertAction>("campaign")
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isPersonalized, setIsPersonalized] = React.useState(false)
  const [isSending, setIsSending] = React.useState(false)
  const [sentMessages, setSentMessages] = React.useState<SentMessage[]>([])
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [excelFile, setExcelFile] = React.useState<File | null>(null)
  const [deliveryStatus, setDeliveryStatus] = React.useState<"all" | "delivered" | "not_delivered">("all")
  const [orderAmount, setOrderAmount] = React.useState<string>("")

  const characterCount = message.length
  const messageCount = Math.ceil(characterCount / CHARACTER_LIMIT)
  const remainingCharacters = CHARACTER_LIMIT - (characterCount % CHARACTER_LIMIT)
  const totalCost = messageCount * selectedGroup.recipients * COST_PER_MESSAGE

  const handleSendCampaign = async () => {
    setIsSending(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (alertAction === "test") {
      console.log("Sending test message to", testNumber, "with message:", message)
    } else {
      console.log("Sending campaign to", selectedGroup.label, "with message:", message)
      console.log("Number of messages:", messageCount)
      console.log("Number of recipients:", selectedGroup.recipients)
      console.log("Total cost:", totalCost, "DZD")
      
      // Add the sent message to the history
      const newMessage: SentMessage = {
        id: Date.now().toString(),
        date: new Date(),
        recipients: selectedGroup.recipients,
        messageCount,
        totalCost,
        content: message
      }
      setSentMessages(prev => [newMessage, ...prev])

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
    setIsSending(false)
    setIsAlertOpen(false)
    setIsPopupOpen(false)
  }

  const handleTestSend = () => {
    setAlertAction("test")
    setIsAlertOpen(true)
  }

  const handleCampaignSend = () => {
    setAlertAction("campaign")
    setIsAlertOpen(true)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  const exportToExcel = (message: SentMessage) => {
    const worksheet = XLSX.utils.json_to_sheet([{
      Date: message.date.toLocaleString(),
      Recipients: message.recipients,
      'Message Count': message.messageCount,
      'Total Cost': message.totalCost,
      Content: message.content
    }])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Campaign")
    XLSX.writeFile(workbook, `campaign_${message.id}.xlsx`)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectAudience
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            excelFile={excelFile}
            setExcelFile={setExcelFile}
            deliveryStatus={deliveryStatus}
            setDeliveryStatus={setDeliveryStatus}
            orderAmount={orderAmount}
            setOrderAmount={setOrderAmount}
          />
        )
      case 1:
        return <CraftMessage message={message} setMessage={setMessage} remainingCharacters={remainingCharacters} messageCount={messageCount} selectedGroup={selectedGroup} totalCost={totalCost} isPersonalized={isPersonalized} setIsPersonalized={setIsPersonalized} />
      case 2:
        return <PreviewAndTest message={message} messageCount={messageCount} isPersonalized={isPersonalized} />
      case 3:
        return <SendCampaign />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <Header />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Message History</h2>
          <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <DialogTrigger asChild>
              <Button>Create New Campaign</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1150px] w-full h-[800px] p-0 pb-16">
              <DialogHeader className="p-6 pb-2">
                <DialogTitle>Create Retargeting Campaign</DialogTitle>
                <DialogDescription>
                  Follow the steps to create and send your retargeting campaign.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-2 h-[calc(100%-80px)] flex flex-col">
                <ProgressSteps steps={STEPS} currentStep={currentStep} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-6"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <NavigationButtons 
                  currentStep={currentStep} 
                  prevStep={prevStep} 
                  nextStep={nextStep} 
                  handleCampaignSend={handleCampaignSend}
                  isAlertOpen={isAlertOpen}
                  setIsAlertOpen={setIsAlertOpen}
                  alertAction={alertAction}
                  selectedGroup={selectedGroup}
                  messageCount={messageCount}
                  handleSendCampaign={handleSendCampaign}
                  totalCost={totalCost}
                  isSending={isSending}
                />
            </DialogContent>
          </Dialog>
        </div>
        <MessageHistory sentMessages={sentMessages} exportToExcel={exportToExcel} />
      </div>
    </div>
  )
}

const Header = ({ token, senderId }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-4xl font-bold mb-2">Retargeting Campaign</h1>
      <p className="text-muted-foreground">
        Create custom retargeting messages for your clients
      </p>
 
    <div className="flex flex-wrap items-center gap-4 mt-2">
    <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Token:</span>
        <code className="px-2 py-1 bg-muted rounded text-sm">
          {token ? `${token.slice(0, 8)}...${token.slice(-8)}` : 'Not available'}
        </code>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Sender ID:</span>
        <code className="px-2 py-1 bg-muted rounded text-sm">
          {senderId || 'Not available'}
        </code>
      </div>
    </div>
    </div>
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        aria-label="Help"
        className="fixed top-4 right-40 z-50"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>
    </div>
  </div>
);


const ProgressSteps = ({ steps, currentStep }: { steps: string[], currentStep: number }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((step, index) => (
      <React.Fragment key={step}>
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {index < currentStep ? <CheckIcon className="h-4 w-4" /> : index + 1}
          </motion.div>
          <span className="text-sm mt-2">{step}</span>
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div 
            className={`flex-1 h-0.5 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
)

const SelectAudience = ({ 
  selectedGroup, 
  setSelectedGroup, 
  excelFile, 
  setExcelFile,
  deliveryStatus,
  setDeliveryStatus,
  orderAmount,
  setOrderAmount
}: { 
  selectedGroup: typeof CLIENT_GROUPS[0], 
  setSelectedGroup: React.Dispatch<React.SetStateAction<typeof CLIENT_GROUPS[0]>>,
  excelFile: File | null,
  setExcelFile: React.Dispatch<React.SetStateAction<File | null>>,
  deliveryStatus: "all" | "delivered" | "not_delivered",
  setDeliveryStatus: React.Dispatch<React.SetStateAction<"all" | "delivered" | "not_delivered">>,
  orderAmount: string,
  setOrderAmount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setExcelFile(file);
      setSelectedGroup({
        value: "custom",
        label: "Custom Excel Upload",
        recipients: 0
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-6">
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold">Select Client Group</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedGroup.label}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {CLIENT_GROUPS.map((group) => (
                    <DropdownMenuItem
                      key={group.value}
                      onSelect={() => setSelectedGroup(group)}
                    >
                      {group.label} ({group.recipients} recipients)
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm text-muted-foreground">
                Selected group: {selectedGroup.recipients} recipients
              </p>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold">Upload Excel File</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button onClick={handleUploadClick} variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              {excelFile && (
                <p className="text-sm text-muted-foreground">
                  Uploaded file: {excelFile.name}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Additional Filters</h3>
          <div>
            <Label htmlFor="delivery-status">Delivery Status</Label>
            <RadioGroup
              id="delivery-status"
              value={deliveryStatus}
              onValueChange={(value: "all" | "delivered" | "not_delivered") => setDeliveryStatus(value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivered" id="delivered" />
                <Label htmlFor="delivered">Delivered</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_delivered" id="not_delivered" />
                <Label htmlFor="not_delivered">Not Delivered</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="order-amount">Minimum Order Amount (DZD)</Label>
            <Input
              id="order-amount"
              type="number"
              placeholder="Enter minimum order amount"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const CraftMessage = ({ message, setMessage, remainingCharacters, messageCount, selectedGroup, totalCost, isPersonalized, setIsPersonalized }: { message: string, setMessage: React.Dispatch<React.SetStateAction<string>>, remainingCharacters: number, messageCount: number, selectedGroup: typeof CLIENT_GROUPS[0], totalCost: number, isPersonalized: boolean, setIsPersonalized: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    <div className="flex items-center justify-between">
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Retargeting Message
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Best practices for retargeting messages:</p>
            <ul className="list-disc pl-4 mt-2">
              <li>Keep it concise and clear</li>
              <li>Personalize when possible</li>
              <li>Include a strong call-to-action</li>
              <li>Highlight unique value propositions</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Textarea
      id="message"
      placeholder="Type your retargeting message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      rows={6}
      className="w-full"
    />
    <div className="flex justify-between items-center text-sm text-muted-foreground">
      <span>{remainingCharacters} characters remaining</span>
      <span>{messageCount} message{messageCount !== 1 ? 's' : ''} × {selectedGroup.recipients} recipients</span>
    </div>
    <Progress value={(CHARACTER_LIMIT - remainingCharacters) / CHARACTER_LIMIT * 100} />
    <p className="text-sm text-muted-foreground">
      Estimated total cost: {totalCost.toLocaleString()} DZD
    </p>
    <div className="flex items-center space-x-2">
      <Switch
        id="personalize"
        checked={isPersonalized}
        onCheckedChange={setIsPersonalized}
      />
      <Label htmlFor="personalize">Personalize message with recipient's name</Label>
    </div>
  </motion.div>
)

const PreviewAndTest = ({ message, messageCount, isPersonalized }: { message: string, messageCount: number, isPersonalized: boolean }) => {
  const [showPhonePreview, setShowPhonePreview] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">Message Preview</h3>
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            {Array.from({ length: messageCount }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-2 rounded"
                style={{
                  backgroundColor: `hsl(${(index * 360) / messageCount}, 70%, 90%)`,
                }}
              >
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  {isPersonalized && index === 0 ? "Hi [Recipient's Name],\n" : ""}
                  {message.slice(index * CHARACTER_LIMIT, (index + 1) * CHARACTER_LIMIT)}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={() => setShowPhonePreview(true)} disabled={!message}>
          Preview on Phone
        </Button>
      </div>

      {showPhonePreview && (
        <PhonePreview
          messageTemplate={isPersonalized ? `Hi [Recipient's Name],\n${message}` : message}
          senderId="Your Company"
          onClose={() => setShowPhonePreview(false)}
        />
      )}
    </motion.div>
  )
}

const SendCampaign = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center space-y-4"
  >
    <h3 className="text-2xl font-semibold">Ready to Send Your Campaign?</h3>
    <p className="text-center text-muted-foreground">
      Review your message and audience one last time before sending.
    </p>
  </motion.div>
)

const MessageHistory = ({ sentMessages, exportToExcel }: { sentMessages: SentMessage[], exportToExcel: (message: SentMessage) => void }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Recipients</TableHead>
        <TableHead>Message Count</TableHead>
        <TableHead>Total Cost (DZD)</TableHead>
        <TableHead>Content</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sentMessages.map((msg) => (
        <TableRow key={msg.id}>
          <TableCell>{msg.date.toLocaleString()}</TableCell>
          <TableCell>{msg.recipients}</TableCell>
          <TableCell>{msg.messageCount}</TableCell>
          <TableCell>{msg.totalCost.toLocaleString()}</TableCell>
          <TableCell className="max-w-xs truncate">{msg.content}</TableCell>
          <TableCell>
            <Button variant="outline" size="sm" onClick={() => exportToExcel(msg)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const NavigationButtons = ({ 
  currentStep, 
  prevStep, 
  nextStep, 
  handleCampaignSend, 
  isAlertOpen, 
  setIsAlertOpen, 
  alertAction, 
  selectedGroup, 
  messageCount, 
  handleSendCampaign,
  totalCost,
  isSending
}: { 
  currentStep: number, 
  prevStep: () => void, 
  nextStep: () => void, 
  handleCampaignSend: () => void, 
  isAlertOpen: boolean, 
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>, 
  alertAction: AlertAction, 
  selectedGroup: typeof CLIENT_GROUPS[0], 
  messageCount: number, 
  handleSendCampaign: () => void,
  totalCost: number,
  isSending: boolean
}) => (
  <motion.div 
    className="fixed bottom-6 right-6 flex justify-end items-center space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Button onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
    {currentStep < STEPS.length - 1 ? (
      <Button onClick={nextStep}>Next</Button>
    ) : (
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={handleCampaignSend}>Send Campaign</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alertAction === "test" ? "Send Test Message?" : "Send Campaign?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertAction === "test" 
                ? `This action will send a test message to ${testNumber}.`
                : `This action will send ${messageCount} message${messageCount !== 1 ? 's' : ''} to ${selectedGroup.recipients} recipients (${selectedGroup.label}).
                  Total messages: ${messageCount * selectedGroup.recipients}
                  The total cost will be ${totalCost.toLocaleString()} DZD (${COST_PER_MESSAGE} DZD per message).`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendCampaign} disabled={isSending}>
              {isSending ? (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </motion.div>
              ) : (
                alertAction === "test" ? "Send Test" : "Send Campaign"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )}
  </motion.div>
)

