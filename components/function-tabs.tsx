'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface FunctionTabsProps {
  activeTab: 'text' | 'image'
  onTabChange: (tab: 'text' | 'image') => void
}

export function FunctionTabs({ activeTab, onTabChange }: FunctionTabsProps) {
  return (
    <div className="flex bg-muted rounded-lg p-1">
      <button
        onClick={() => onTabChange('text')}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
          activeTab === 'text'
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Text to Outfit
      </button>
      <button
        onClick={() => onTabChange('image')}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
          activeTab === 'image'
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Image to Outfit
      </button>
    </div>
  )
} 