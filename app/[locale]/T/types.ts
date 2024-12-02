export type ShipmentStatus = 
| 'in-preparation'
| 'transfer'
| 'shipped'
| 'distribution-center'
| 'en-route-to-region'
| 'arrived-at-region'
| 'ready-for-pickup'
| 'out-for-delivery'
| 'delivered'
| 'alert'
| 'delivery-attempt-failed'
| 'delivery-failed'
| 'returning-to-center'
| 'returned-to-center'
| 'exchange-failed';
export type DeliveryAttemptResult = 
  | 'no-response'
  | 'customer-unavailable';

export interface DeliveryAttempt {
  date: string;
  result: DeliveryAttemptResult;
  notes?: string;
}

export interface ShipmentStep {
  title: string;
  description: string;
  date: string;
  location: string;
  status: ShipmentStatus;
  deliveryAttempts?: DeliveryAttempt[];
  isIssue?: boolean;
}