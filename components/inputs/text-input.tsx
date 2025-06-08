'use client'

import React, { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TextInputProps {
  onTextChange?: (text: string) => void
}

export function TextInput({ onTextChange }: TextInputProps) {
  const [text, setText] = useState('')
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    onTextChange?.(newText)
  }

  const optimizePrompt = async () => {
    if (!text.trim()) {
      alert('请先输入服装描述')
      return
    }

    setIsOptimizing(true)
    try {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: text
        }),
      })

      const data = await response.json()

      if (data.success && data.optimizedPrompt) {
        setText(data.optimizedPrompt)
        onTextChange?.(data.optimizedPrompt)
      } else {
        alert('优化失败：' + (data.error || '未知错误'))
      }
    } catch (error) {
      console.error('优化提示词失败:', error)
      alert('优化失败，请稍后再试')
    } finally {
      setIsOptimizing(false)
    }
  }

  const suggestions = [
    "Casual summer outfit with denim jacket",
    "Professional business attire for office", 
    "Elegant evening dress for dinner party",
    "Sporty outfit for weekend activities",
    "Cozy winter layers with warm tones"
  ]

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe your ideal outfit... (e.g., 'Casual chic look with earth tones for a weekend brunch')"
        value={text}
        onChange={handleChange}
        className="min-h-[120px] resize-none"
      />
      
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={optimizePrompt}
          disabled={isOptimizing || !text.trim()}
          className="flex items-center gap-2"
        >
          {isOptimizing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isOptimizing ? '优化中...' : '优化提示词'}
        </Button>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Try these suggestions:
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setText(suggestion)
                onTextChange?.(suggestion)
              }}
              className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Be specific about style, colors, occasion, and mood for best results. Click "Optimize Prompt" to enhance your description with professional details.
      </p>
    </div>
  )
} 