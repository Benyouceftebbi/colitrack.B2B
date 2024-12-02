import React from 'react';
import { Search } from 'lucide-react';
import '../index.css'
interface TrackingFormProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TrackingForm({ trackingNumber, setTrackingNumber, onSubmit }: TrackingFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number..."
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 pr-16 transition-all duration-300 hover:border-gray-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-300"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}