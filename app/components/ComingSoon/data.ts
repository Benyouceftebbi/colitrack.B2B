import { Message } from './types';

export const initialMessages: Message[] = [
  {
    sender: 'customer',
    content: "customerOrderRequest",
    timestamp: '11:24'
  },
  {
    sender: 'business',
    content:"businessOrderConfirmation",
    timestamp: '11:25'
  },
  {
    sender: 'customer',
    content: "customerDeliveryRequest",
    timestamp: '11:26'
  },
  {
    sender: 'business',
    content: "businessConfirmation",
    timestamp: '11:27'
  }
];