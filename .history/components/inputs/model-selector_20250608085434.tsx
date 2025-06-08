'use client'

import React, { useState } from 'react'
import { Upload, User, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageInput } from './image-input'
import { cn } from '@/lib/utils'
import { PRESET_MODELS } from '@/lib/constants/preset-models'

interface ModelSelectorProps {
  onModelChange?: (modelUrl: string | null) => void
}

export function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState<'male' | 'female' | 'custom' | null>(null)
  const [customModelImage, setCustomModelImage] = useState<string | null>(null)

  const presetModels = [
    {
      ...PRESET_MODELS.male,
      icon: User
    },
    {
      ...PRESET_MODELS.female,
      icon: Users
    }
  ]

  const handlePresetModelSelect = (modelId: 'male' | 'female') => {
    setSelectedModel(modelId)
    const modelData = presetModels.find(m => m.id === modelId)
    if (modelData) {
      onModelChange?.(modelData.image)
    }

  }

  const handleCustomUpload = () => {
    setSelectedModel('custom')
    // 清空预设选择，准备上传自定义照片
  }

  const handleCustomImageChange = (imageUrl: string | null) => {
    setCustomModelImage(imageUrl)
    if (imageUrl) {
      setSelectedModel('custom')
    }
    onModelChange?.(imageUrl)
  }

  return (
    <div className="space-y-4">
      {/* 预设模特选择 */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">
          选择预设模特：
        </p>
        <div className="grid grid-cols-2 gap-3">
          {presetModels.map((model) => {
            const Icon = model.icon
            return (
              <button
                key={model.id}
                onClick={() => handlePresetModelSelect(model.id)}
                className={cn(
                  "relative border rounded-lg p-3 transition-all hover:border-primary/50",
                  selectedModel === model.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <div className="aspect-square w-full mb-2 rounded-md overflow-hidden bg-secondary">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 如果图片加载失败，显示图标占位
                      e.currentTarget.style.display = 'none'
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-secondary"><svg class="w-8 h-8 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`
                      }
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{model.name}</p>
                {selectedModel === model.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 分割线 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">或</span>
        </div>
      </div>

      {/* 自定义上传 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Upload className="w-4 h-4" />
          <p className="text-sm font-medium text-muted-foreground">
            上传自己的照片：
          </p>
        </div>
        <ImageInput onImageChange={handleCustomImageChange} />
        {customModelImage && selectedModel === 'custom' && (
          <p className="text-xs text-green-600 mt-2">✓ 已上传自定义模特照片</p>
        )}
      </div>

      {/* 当前选择状态 */}
      {selectedModel && selectedModel !== 'custom' && (
        <div className="text-xs text-primary">
          ✓ 已选择：{presetModels.find(m => m.id === selectedModel)?.name}
        </div>
      )}
    </div>
  )
} 
} 