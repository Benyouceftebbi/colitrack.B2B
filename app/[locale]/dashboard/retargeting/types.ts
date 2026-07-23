export type AlertAction = "test" | "campaign"

export type CampaignStatus = "pending" | "sent" | "failed"

export type SentMessage = {
  failed:any
  id: string
  date: Date
  campaignName: string
  recipients: any
  messageCount: number
  totalCost: number
  content: string
  status: CampaignStatus
  failedLength:number
  successLength:number

}

export type ClientGroup = {
  value: string
  label: string
  recipients: number
}

export type ExcelData = {
  headers: string[]
  phoneColumn: string
  nameColumn: string
  messageColumn?: string
  data: Record<string, string>[]
}

export type MessageType = "custom" | "unique"

export type UniqueMessageStats = {
  totalRecipients: number
  totalCharacters: number
  averageCharacters: number
  maxCharacters: number
  minCharacters: number
  messagesOverLimit: number
}

export type RetargetingCampaignHook = ReturnType<typeof import("./hooks/useRetargetingCampaign").useRetargetingCampaign>
