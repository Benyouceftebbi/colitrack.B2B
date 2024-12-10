import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import StatusBar from './StatusBar';
import MessageHeader from './MessageHeader';
import MessageBubble from './MessageBubble';

interface PhonePreviewProps {
  isMessageSent: boolean;
  messageTemplate: string;
  senderId: string;
  onClose: () => void;
}

export default function PhonePreview({ isMessageSent, messageTemplate, senderId, onClose }: PhonePreviewProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          className="relative w-full max-w-sm"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
            <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-[2.7rem] overflow-hidden">
              <StatusBar />
              <MessageHeader senderId={senderId} />
              
              <div className="h-full overflow-y-auto px-4 py-2">
                <div className="text-center mb-6">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Today 11:24</div>
                </div>
                <MessageBubble isVisible={isMessageSent} message={messageTemplate} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

