import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  console.log('====== 提示词优化 API 请求开始 ======')
  console.log('请求时间:', new Date().toISOString())
  
  try {
    // 检查环境变量
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('❌ OPENROUTER_API_KEY is not configured')
      return NextResponse.json(
        { error: 'OpenRouter API key not configured. Please check your .env.local file.' },
        { status: 500 }
      )
    }
    
    console.log('✅ OpenRouter API Key 已配置')

    // 初始化 OpenAI 客户端（指向 OpenRouter）
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "StyleMix AI - Outfit Generator",
      },
    })

    // 解析请求数据
    let requestData
    try {
      const requestText = await request.text()
      console.log('📥 原始请求数据:', requestText)
      
      requestData = JSON.parse(requestText)
      console.log('📥 解析后的请求数据:', JSON.stringify(requestData, null, 2))
    } catch (parseError) {
      console.error('❌ 请求解析错误:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const { userPrompt } = requestData

    if (!userPrompt || userPrompt.trim().length === 0) {
      console.error('❌ 缺少必要参数: userPrompt')
      return NextResponse.json(
        { error: 'Missing required field: userPrompt' },
        { status: 400 }
      )
    }

    console.log('📋 用户输入的提示词:', userPrompt)

    // 构建系统提示词
    const systemPrompt = `你是一个专业的服装图片生成提示词优化助手。用户会输入简单的服装描述，你需要将其转换为适合Imagen-4 API的详细、专业的提示词。

优化规则：
必须包含的元素：
1. 图片规格：开头强制添加 "1024x1024 resolution, 1:1 aspect ratio, square format"
2. 完整性要求：必须包含 "complete garment fully visible from top to bottom"、"entire clothing item in frame"、"no cropping of any part"
3. 拍摄角度：使用 "professional product photography"、"studio lighting"、"clean white background" 或 "neutral gray backdrop"
4. 材质细节：根据服装类型添加具体材质描述（silk, cotton, wool, denim, leather等）
5. 光线效果：使用 "soft, even lighting"、"subtle shadows"、"fabric texture highlights"
6. 构图要求："centered composition"、"full garment visible"、"sharp focus on fabric details"
7. 画质参数：结尾添加 "hyperrealistic fabric textures, professional fashion photography"

根据服装类型优化：
* 正装/礼服：添加 "elegant draping"、"precise tailoring"、"luxurious fabric sheen"
* 休闲装：添加 "comfortable fit"、"natural fabric texture"、"casual styling"
* 运动装：添加 "athletic cut"、"moisture-wicking fabric appearance"、"dynamic styling"
* 外套：添加 "structural silhouette"、"detailed stitching"、"layered design elements"

请直接返回优化后的英文提示词，不要任何解释或额外文字。`

    console.log('🔄 调用 DeepSeek API 优化提示词...')
    console.time('DeepSeek API 调用耗时')
    
    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            "role": "system",
            "content": systemPrompt
          },
          {
            "role": "user",
            "content": userPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      console.timeEnd('DeepSeek API 调用耗时')
      
      const optimizedPrompt = completion.choices[0]?.message?.content?.trim()
      
      if (!optimizedPrompt) {
        console.error('❌ DeepSeek API 没有返回内容')
        return NextResponse.json(
          { error: 'No response from optimization service' },
          { status: 500 }
        )
      }

      console.log('✅ 原始提示词:', userPrompt)
      console.log('✅ 优化后提示词:', optimizedPrompt)

      const response = {
        success: true,
        originalPrompt: userPrompt,
        optimizedPrompt: optimizedPrompt
      }

      console.log('📤 API 响应:', JSON.stringify(response, null, 2))
      console.log('====== 提示词优化 API 请求结束 ======')

      return NextResponse.json(response)

    } catch (deepseekError: any) {
      console.timeEnd('DeepSeek API 调用耗时')
      console.error('❌ DeepSeek API 调用错误:', deepseekError)
      console.error('- 错误类型:', deepseekError.constructor.name)
      console.error('- 错误消息:', deepseekError.message)
      
      return NextResponse.json(
        { 
          error: 'Prompt optimization failed', 
          details: deepseekError.message
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ 提示词优化错误:', error)
    
    if (error instanceof Error) {
      console.error('- 错误类型:', error.constructor.name)
      console.error('- 错误消息:', error.message)
      console.error('- 错误堆栈:', error.stack)
      
      return NextResponse.json(
        { 
          error: 'Failed to optimize prompt', 
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: 'An unexpected error occurred',
        details: 'Please try again later'
      },
      { status: 500 }
    )
  }
} 