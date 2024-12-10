import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from 'lucide-react'

interface MessageCenterHeaderProps {
  token: string | null
  senderId: string | null
}

export function MessageCenterHeader({ token, senderId }: MessageCenterHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">Message Center</h1>
        <p className="text-sm sm:text-base text-muted-foreground">View and manage all your messages in real-time</p>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Token:</span>
            <code className="px-2 py-1 bg-muted rounded text-xs sm:text-sm">
              {token ? `${token.slice(0, 4)}...${token.slice(-4)}` : 'Not available'}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Sender ID:</span>
            <code className="px-2 py-1 bg-muted rounded text-xs sm:text-sm">
              {senderId || 'Not available'}
            </code>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" className="text-xs text-blue-500 hover:text-blue-700 p-0">
                    Need unique sender ID?
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Contact us for a unique sender ID</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
        <Button 
          variant="outline" 
          size="icon" 
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

