export type AlertAction = "test" | "campaign";

export type SentMessage = {
  id: string;
  date: Date;
  recipients: number;
  messageCount: number;
  totalCost: number;
  content: string;
};

export type ClientGroup = {
  value: string;
  label: string;
  recipients: number;
};

export type RetargetingCampaignHook = ReturnType<typeof import('./hooks/useRetargetingCampaign').useRetargetingCampaign>;