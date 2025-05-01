"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCTAProps {
  onClick: () => void;
  disabled?: boolean;
  text: string;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClick, disabled = false, text }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white to-transparent flex justify-center">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className="relative overflow-hidden bg-[#4f4ce1] hover:bg-[#4f4ce1]/95 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg w-full sm:w-auto sm:min-w-[280px]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={{
          y: [0, -3, 0],
          boxShadow: [
            "0 4px 12px rgba(79, 76, 225, 0.5)",
            "0 8px 24px rgba(79, 76, 225, 0.7)",
            "0 4px 12px rgba(79, 76, 225, 0.5)",
          ]
        }}
        transition={{
          y: { 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut" 
          },
          boxShadow: { 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        {/* Shine effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
            zIndex: 0
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
        
        {/* Pulse effect */}
        <motion.div 
          className="absolute inset-0 rounded-xl"
          style={{ 
            boxShadow: "0 0 0 0 rgba(79, 76, 225, 0.7)",
            zIndex: -1
          }}
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(79, 76, 225, 0.7)",
              "0 0 0 10px rgba(79, 76, 225, 0)",
            ] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        
        {/* Button text */}
        <span className="relative z-10 flex items-center justify-center">
          {text}
          <motion.span
            initial={{ x: -5, opacity: 0 }}
            whileHover={{ x: 5, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mr-2"
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingCTA;