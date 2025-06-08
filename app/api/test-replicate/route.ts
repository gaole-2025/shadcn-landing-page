import { NextResponse } from 'next/server'
import Replicate from 'replicate'

export async function GET() {
  try {
    // 检查环境变量
    const apiToken = process.env.REPLICATE_API_TOKEN
    if (!apiToken) {
      return NextResponse.json(
        { error: 'API token not configured', status: 'error' },
        { status: 500 }
      )
    }

    const replicate = new Replicate({
      auth: apiToken,
    })

    // 我们只是验证token格式，不实际调用API
    // Replicate构造函数不会立即验证token，但至少可以确认token存在
    
    return NextResponse.json({
      status: 'success',
      message: 'Replicate API token is configured',
      token_prefix: apiToken.substring(0, 5) + '...' + apiToken.substring(apiToken.length - 4),
    })
  } catch (error) {
    console.error('Replicate API test failed:', error)
    
    let errorMessage = 'Unknown error'
    let statusCode = 500
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      if (errorMessage.includes('Authentication')) {
        statusCode = 401
      } else if (errorMessage.includes('rate limit')) {
        statusCode = 429
      }
    }
    
    return NextResponse.json(
      { error: errorMessage, status: 'error' },
      { status: statusCode }
    )
  }
} 