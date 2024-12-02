"use client"
import React, { useState, useEffect, useRef } from 'react';
import { initialMessages } from './data';
import { Message } from './types';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import AIResponse from './AIResponse';

export default function ChatPreview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    let mounted = true;

    const showNextMessage = () => {
      if (!mounted || currentIndex >= initialMessages.length) return;

      const nextMessage = initialMessages[currentIndex];
      if (nextMessage?.sender && nextMessage?.content && nextMessage?.timestamp) {
        setMessages(prev => [...prev, nextMessage]);
        
        // Add vibration effect after each message
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 200);
      }
      
      if (currentIndex === initialMessages.length - 1) {
        setTimeout(() => {
          if (mounted) {
            setShowAIResponse(true);
          }
        }, 500); // Reduced delay for AI response
      }
      
      currentIndex++;
    };

    // Reduced interval between messages
    const interval = setInterval(showNextMessage, 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-200 ${
        isHighlighted ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <ChatHeader />

      <div className="h-[400px] p-4 space-y-4 overflow-y-auto">
        <div className="text-center mb-6">
          <div className="text-xs text-gray-500 dark:text-gray-400">Today 11:24</div>
        </div>
        
        {messages.map((message, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '0.5s'
            }}
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {showAIResponse && (
          <div className="animate-bounce-in">
            <AIResponse />
          </div>
        )}
      </div>
    </div>
  );
}