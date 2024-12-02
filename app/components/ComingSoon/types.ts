export interface Message {
  sender: 'customer' | 'business';
  content: string;
  timestamp: string;
}

export type SafeMessage = Partial<Message>;