export type AlertAction = "test" | "campaign"

export type CampaignStatus = "pending" | "sent" | "failed"

export type SentMessage = {
  id: string
  date: Date
  campaignName: string
  recipients: number
  messageCount: number
  totalCost: number
  content: string
  status: CampaignStatus
}

export type ClientGroup = {
  value: string
  label: string
  recipients: number
}

export type RetargetingCampaignHook = {
  message: string
  messageCount: number
  totalRecipients: number
  CHARACTER_LIMIT: number
}

export type ExcelData = {
  headers: string[]
  phoneColumn: string
  nameColumn: string
  data: Record<string, string>[]
}

export type RetargetingCampaignHook = {
  compaignName:string
  message: string
  setMessage: (message: string) => void
  excelData: ExcelData | null
  setExcelData: (data: ExcelData | null) => void
  totalRecipients: number
  setTotalRecipients: (total: number) => void
  CHARACTER_LIMIT: number
  audienceSource?: "excel" | "group"
  selectedGroup?: { recipients: { name: string; phone: string }[] }
  totalCost?: number
  hasArabic: boolean
  effectiveCharLimit: number
}

export type RetargetingCampaignHook = ReturnType<typeof import("./hooks/useRetargetingCampaign").useRetargetingCampaign>