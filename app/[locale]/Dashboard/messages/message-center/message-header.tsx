import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"


interface MessageHeaderProps {
  token: string | null
  senderId: string | null
}

export function MessageHeader({ token, senderId }: MessageHeaderProps) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold glow">Message Center</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your automated delivery notifications
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {senderId && (
            <Badge variant="outline" className="glass">
              ID: {senderId}
            </Badge>
          )}

          <button className="p-2 glass rounded-lg hover:neon-border transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}