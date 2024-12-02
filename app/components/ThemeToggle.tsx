"use client"
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { setTheme,theme } = useTheme()


  
  return (
    <button
      onClick={()=>theme==='light' ?setTheme("dark"):setTheme("light")}
      className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {theme==='light' ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}