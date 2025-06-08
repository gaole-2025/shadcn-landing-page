'use client'

import React, { useState } from 'react'
import { Pencil, User, Zap, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FunctionTabs } from './function-tabs'
import { TextInput } from './inputs/text-input'
import { ImageInput } from './inputs/image-input'
import { ModelSelector } from './inputs/model-selector'
import { ModelSelection } from './model-selection'
import { useImageGeneration } from '@/lib/hooks/use-image-generation'

interface ControlPanelProps {
  onGenerationResult?: (result: any, debugInfo?: any) => void
}

// 定义流程步骤
type FlowStep = 'input' | 'clothing-generated' | 'model-selection' | 'final-generation'

export function ControlPanel({ onGenerationResult }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('image')
  const [inputImage, setInputImage] = useState<string | null>(null)
  const [modelImage, setModelImage] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>('model_a')
  const [customModelImage, setCustomModelImage] = useState<string | undefined>()
  const [textPrompt, setTextPrompt] = useState('')
  const [currentStep, setCurrentStep] = useState<FlowStep>('input')
  const [generatedClothingImage, setGeneratedClothingImage] = useState<string | null>(null)
  
  const { generateImage, isGenerating, result, error, debugInfo, reset } = useImageGeneration()

  // 重置流程
  const resetFlow = () => {
    setCurrentStep('input')
    setGeneratedClothingImage(null)
    setInputImage(null)
    setModelImage(null)
    setTextPrompt('')
    reset()
  }

  // 切换模式时重置流程
  const handleTabChange = (tab: 'text' | 'image') => {
    setActiveTab(tab)
    resetFlow()
  }

  // 第一步：生成或上传衣物
  const handleClothingGeneration = async () => {
    if (activeTab === 'image' && !inputImage) {
      alert('Please upload a clothing image first')
      return
    }
    if (activeTab === 'text' && !textPrompt.trim()) {
      alert('Please enter a description for your outfit')
      return
    }

    if (activeTab === 'text') {
      // Text模式：生成衣物图片
      try {
        await generateImage({
          prompt: textPrompt,
          activeMode: 'text',
          inputImage1: '',
          inputImage2: '',
          modelType: selectedModel,
        })
      } catch (err) {
        console.error('Clothing generation failed:', err)
      }
    } else {
      // Image模式：直接使用上传的图片
      setGeneratedClothingImage(inputImage)
      setCurrentStep('model-selection')
    }
  }

  // 第二步：最终试衣生成
  const handleFinalGeneration = async () => {
    if (!generatedClothingImage) {
      alert('No clothing image available')
      return
    }
    if (!modelImage) {
      alert('Please select a model or upload a photo')
      return
    }

    try {
      await generateImage({
        prompt: 'Make the person in the reference photo wear the uploaded clothing item. Keep the person\'s pose and expression natural. The result should look realistic.',
        activeMode: 'image',
        inputImage1: generatedClothingImage,
        inputImage2: modelImage,
        modelType: selectedModel,
      })
    } catch (err) {
      console.error('Final generation failed:', err)
    }
  }

  // Pass result to parent component
  React.useEffect(() => {
    if (result && activeTab === 'text' && currentStep === 'input') {
      // Text模式第一步完成，保存生成的衣物图片
      const clothingImageUrl = typeof result.imageUrl === 'string'
        ? result.imageUrl
        : typeof result.message === 'string'
          ? result.message
          : ''
      console.log('Text模式生成衣物完成，保存图片:', clothingImageUrl)
      setGeneratedClothingImage(clothingImageUrl)
      setCurrentStep('model-selection')
      // 清理 result 状态，防止触发下一个条件
      reset()
    } else if (result && onGenerationResult && currentStep === 'model-selection') {
      // 只有在模特选择步骤完成后才显示最终结果
      console.log('模特选择步骤完成，显示最终结果')
      onGenerationResult(result, debugInfo)
      setCurrentStep('final-generation')
    }
  }, [result, debugInfo, onGenerationResult, activeTab, currentStep, reset])

  // 获取当前步骤信息
  const getStepInfo = () => {
    if (activeTab === 'text') {
      return [
        { id: 'input', title: '描述衣物', completed: currentStep !== 'input' },
        { id: 'model-selection', title: '选择模特', completed: currentStep === 'final-generation' },
        { id: 'final-generation', title: '生成试衣', completed: false }
      ]
    } else {
      return [
        { id: 'input', title: '上传衣物', completed: currentStep !== 'input' },
        { id: 'model-selection', title: '选择模特', completed: currentStep === 'final-generation' },
        { id: 'final-generation', title: '生成试衣', completed: false }
      ]
    }
  }

  const canGenerate = () => {
    if (currentStep === 'input') {
      if (activeTab === 'image') {
        return inputImage !== null
      } else {
        return textPrompt.trim().length > 0
      }
    } else if (currentStep === 'model-selection') {
      return modelImage !== null
    } else {
      return false
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Create Outfit</CardTitle>
        <CardDescription>Generate your perfect outfit style with AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FunctionTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* 步骤指示器 */}
        <div className="flex items-center justify-between">
          {getStepInfo().map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    currentStep === step.id ? 'border-primary bg-primary' : 'border-gray-300'
                  }`} />
                )}
                <span className={`text-sm ${
                  step.completed ? 'text-green-600' : 
                  currentStep === step.id ? 'text-primary font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < getStepInfo().length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>
        
        {/* 第一步：输入衣物 */}
        {currentStep === 'input' && (
          <div>
            <div className="flex items-center gap-2 font-semibold mb-3">
              <Pencil className="w-4 h-4" />
              <span>{activeTab === 'text' ? 'Describe your outfit idea' : 'Upload clothing image'}</span>
            </div>
            
            {activeTab === 'text' ? (
              <TextInput onTextChange={setTextPrompt} />
            ) : (
              <ImageInput onImageChange={setInputImage} />
            )}
          </div>
        )}

        {/* 第二步：选择模特 */}
        {currentStep === 'model-selection' && (
          <>
            {/* 显示已生成的衣物 */}
            {generatedClothingImage && (
              <div>
                <div className="flex items-center gap-2 font-semibold mb-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>已生成衣物</span>
                </div>
                <div className="border rounded-lg p-3 bg-green-50">
                  {generatedClothingImage.startsWith('http') ? (
                    <img 
                      src={generatedClothingImage} 
                      alt="Generated clothing" 
                      className="w-full h-32 object-contain rounded"
                    />
                  ) : (
                    <p className="text-sm text-green-600">✓ 衣物已生成成功</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 font-semibold mb-3">
                <User className="w-4 h-4" />
                <span>Choose model or upload photo</span>
              </div>
              <ModelSelector onModelChange={setModelImage} />
            </div>
          </>
        )}

        {/* 第三步：最终结果 */}
        {currentStep === 'final-generation' && (
          <div className="flex items-center gap-2 font-semibold mb-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>试衣完成！</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* 操作按钮 */}
        <div className="space-y-3">
          {currentStep === 'input' && (
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full" 
              onClick={handleClothingGeneration}
              disabled={isGenerating || !canGenerate()}
            >
              <Zap className="w-5 h-5 mr-2" />
              <span>{isGenerating ? '生成中...' : (activeTab === 'text' ? '生成衣物' : '下一步')}</span>
            </Button>
          )}

          {currentStep === 'model-selection' && (
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full" 
              onClick={handleFinalGeneration}
              disabled={isGenerating || !canGenerate()}
            >
              <Zap className="w-5 h-5 mr-2" />
              <span>{isGenerating ? '生成中...' : '生成试衣效果'}</span>
              <span className="text-xs opacity-80 ml-1">(2 credits)</span>
            </Button>
          )}

          {currentStep === 'final-generation' && (
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full" 
              onClick={resetFlow}
            >
              重新开始
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          {currentStep === 'model-selection' ? 
            'Note: 2 credits are required for try-on generation.' :
            'Follow the steps to create your perfect outfit.'
          }
        </p>
      </CardContent>
    </Card>
  )
} 