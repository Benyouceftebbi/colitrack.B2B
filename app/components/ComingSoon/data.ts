import { Message } from './types';

export const initialMessages: Message[] = [
  {
    sender: 'customer',
    content: 'Hi! I\'d like to order the blue dress in size M',
    timestamp: '11:24'
  },
  {
    sender: 'business',
    content: 'Hello! The blue dress in size M is available. Would you like to proceed with the order?',
    timestamp: '11:25'
  },
  {
    sender: 'customer',
    content: 'Yes please! Can I get it delivered to 123 Main St?',
    timestamp: '11:26'
  },
  {
    sender: 'business',
    content: '✅',
    timestamp: '11:27'
  }
];