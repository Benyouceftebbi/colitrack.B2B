"use client"
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface PhoneInputProps {
  onSubmit: (phoneNumber: string, senderId: string) => void;
  onSenderIdChange: (senderId: string) => void;
  label: string;
  isMultiNumber?: boolean;
}

export default function PhoneInput({ onSubmit, onSenderIdChange, label, isMultiNumber = false }: PhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [senderId, setSenderId] = useState('Colitrack');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phoneNumber, senderId);
  };

  const handleSenderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSenderId = e.target.value;
    setSenderId(newSenderId);
    onSenderIdChange(newSenderId);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="senderId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sender ID (max 11 characters)
          </label>
          <input
            type="text"
            id="senderId"
            maxLength={11}
            placeholder="Colitrack"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            value={senderId}
            onChange={handleSenderIdChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
          {isMultiNumber ? (
            <textarea
              id="phone"
              placeholder="Enter phone numbers, separated by commas"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all h-32"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <input
              type="tel"
              id="phone"
              placeholder="(555) 000-0000"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
        >
          <Send className="w-5 h-5" />
          Send Demo Message
        </button>
      </form>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        By submitting, you agree to receive a one-time demo message. Standard message rates may apply.
      </div>
    </div>
  );
}