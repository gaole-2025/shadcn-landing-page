'use client'

import { useState, useCallback } from 'react'

interface GenerationResult {
  success: boolean
  imageUrl?: string
  prompt?: string
  error?: string
  details?: string
  isBinaryResponse?: boolean
  message?: string
}

interface GenerationRequest {
  prompt: string
  inputImage?: string
  inputImage1?: string
  inputImage2?: string
  modelType?: string
  activeMode?: string
}

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const generateImage = useCallback(async (request: GenerationRequest) => {
    console.group('🖼️ 图片生成请求')
    console.log('⏱️ 开始时间:', new Date().toISOString())
    
    setIsGenerating(true)
    setError(null)
    setResult(null)
    setDebugInfo(null)

    try {
      console.log('📤 请求参数:', {
        prompt: request.prompt,
        modelType: request.modelType,
        inputImageLength: request.inputImage ? request.inputImage.length : 0
      })

      console.time('API请求耗时')
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })
      console.timeEnd('API请求耗时')

      console.log('📥 响应状态:', response.status, response.statusText)
      console.log('📥 响应头:', Object.fromEntries(response.headers.entries()))

      // 获取响应文本
      const responseText = await response.text()
      console.log('📥 响应内容:', responseText.substring(0, 500))

      // 检查是否是 JSON
      let data
      try {
        data = JSON.parse(responseText)
        console.log('📥 解析后的响应数据:', data)
        
        // 保存调试信息
        setDebugInfo(data)
      } catch (parseError) {
        console.error('❌ JSON解析错误:', parseError)
        throw new Error(`服务器返回了无效的响应: ${responseText.substring(0, 100)}`)
      }

      if (!response.ok) {
        console.error('❌ 服务器错误:', data.error || response.statusText)
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      // 检查是否是二进制响应
      if (data.success && data.isBinaryResponse) {
        console.warn('⚠️ 服务器返回了二进制响应，需要更新客户端处理方式:', data.message)
        setResult({
          success: true,
          prompt: data.prompt,
          isBinaryResponse: true,
          message: data.message || '服务器返回了二进制数据，而不是图片URL。请联系开发人员更新客户端。'
        })
        return
      }

      // 检查图片URL
      if (data.success && data.imageUrl) {
        console.log('✅ 成功获取图片URL:', data.imageUrl)
      } else {
        console.warn('⚠️ 响应中没有图片URL:', data)
      }

      setResult(data)
      console.log('✅ 请求成功完成')
    } catch (err) {
      console.error('❌ 请求失败:', err)
      let errorMessage = '发生未知错误'
      
      if (err instanceof Error) {
        errorMessage = err.message
        
        // 处理常见错误
        if (errorMessage.includes('Failed to fetch')) {
          errorMessage = '网络错误。请检查您的网络连接并重试。'
          console.error('❌ 网络连接错误')
        } else if (errorMessage.includes('API token not configured')) {
          errorMessage = 'API令牌未配置。请在.env.local文件中设置REPLICATE_API_TOKEN。'
          console.error('❌ API令牌配置错误')
        } else if (errorMessage.includes('Authentication')) {
          errorMessage = '认证失败。请检查您的API令牌。'
          console.error('❌ API认证错误')
        } else if (errorMessage.includes('insufficient')) {
          errorMessage = '积分不足。请检查您的Replicate账户余额。'
          console.error('❌ 账户积分不足')
        } else if (errorMessage.includes('rate limit')) {
          errorMessage = '请求频率过高。请稍后再试。'
          console.error('❌ 请求频率限制')
        } else if (errorMessage.includes('empty response')) {
          errorMessage = '服务器返回了空响应。这可能是由于模型限制或服务器问题导致的。'
          console.error('❌ 空响应错误')
        } else if (errorMessage.includes('ReadableStream')) {
          errorMessage = '服务器返回了二进制流数据。当前客户端不支持处理此类响应。'
          console.error('❌ 不支持的响应类型')
        }
      }

      setError(errorMessage)
      setResult({ success: false, error: errorMessage })
    } finally {
      setIsGenerating(false)
      console.log('⏱️ 结束时间:', new Date().toISOString())
      console.groupEnd()
    }
  }, [])

  const reset = useCallback(() => {
    console.log('🔄 重置生成状态')
    setResult(null)
    setError(null)
    setIsGenerating(false)
    setDebugInfo(null)
  }, [])

  return {
    generateImage,
    isGenerating,
    result,
    error,
    debugInfo,
    reset,
  }
} 