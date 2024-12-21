import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface SMSPreviewProps {
  message: string | null
  className?: string
}

export function SMSPreview({ message, className }: SMSPreviewProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const formattedMessage = message?.replace(/{{(\w+)}}/g, (_, key) => {
    const placeholders = {
      trackingNumber: 'TRK123456789',
      trackingLink: 'https://track.delivery/TRK123456789',
      driverName: 'John Smith',
      driverPhone: '+1 (555) 123-4567',
      stopDeskAddress: '123 Pickup St, Store #456',
      businessHours: '9 AM - 6 PM'
    }
    return placeholders[key as keyof typeof placeholders] || key
  })

  return (
    <div className={cn("relative w-[300px] h-[600px] mx-auto", className)}>
      {/* iPhone Frame */}
      <div className={cn(
        "absolute inset-0 rounded-[3rem] shadow-xl transition-colors duration-300",
        theme === "dark" ? "bg-gray-900" : "bg-gray-200"
      )}>
        {/* Notch */}
        <div className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 rounded-b-xl transition-colors duration-300",
          theme === "dark" ? "bg-black" : "bg-gray-800"
        )} />
        
        {/* Screen */}
        <div className={cn(
          "absolute inset-2 rounded-[2.5rem] overflow-hidden transition-colors duration-300",
          theme === "dark" ? "bg-black" : "bg-white"
        )}>
          {/* Status Bar */}
          <div className={cn(
            "h-12 flex items-center justify-between px-6 transition-colors duration-300",
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          )}>
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>9:41</span>
            <div className="flex items-center gap-2">
              <Phone className={cn("w-4 h-4", theme === "dark" ? "text-white" : "text-gray-900")} />
              <span className={theme === "dark" ? "text-white" : "text-gray-900"}>5G</span>
            </div>
          </div>
          
          {/* Message */}
          <div className="p-4">
            <div className={cn(
              "p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm transition-colors duration-300",
              theme === "dark" 
                ? "bg-green-600 text-white" 
                : "bg-blue-500 text-white"
            )}>
              {formattedMessage || 'Select a template to preview SMS'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}