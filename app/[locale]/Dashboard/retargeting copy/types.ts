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