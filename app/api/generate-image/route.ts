import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

// 定义可能的输出类型
interface ReplicateOutput {
  url?: string | Function;
  image?: string;
  output?: string;
  id?: string;
  read?: Function;
  [key: string]: any;
}

// 检测是否是 ReadableStream 的函数
function isReadableStream(output: any): boolean {
  return (
    output.constructor?.name === 'ReadableStream' ||
    Object.prototype.toString.call(output) === '[object ReadableStream]' ||
    ('locked' in output && 'state' in output && typeof (output as any).read === 'function') ||
    output.toString().includes('ReadableStream')
  );
}

export async function POST(request: NextRequest) {
  console.log('====== API 请求开始 ======')
  console.log('请求时间:', new Date().toISOString())
  
  try {
    // 检查环境变量
    const apiToken = process.env.REPLICATE_API_TOKEN
    if (!apiToken) {
      console.error('❌ REPLICATE_API_TOKEN is not configured')
      return NextResponse.json(
        { error: 'API token not configured. Please check your .env.local file.' },
        { status: 500 }
      )
    }
    
    console.log('✅ API Token 已配置:', `${apiToken.substring(0, 5)}...${apiToken.substring(apiToken.length - 4)}`)

    const replicate = new Replicate({
      auth: apiToken,
    })

    // 解析请求数据
    let requestData
    try {
      const requestText = await request.text()
      console.log('📥 原始请求数据:', requestText.substring(0, 500))
      
      requestData = JSON.parse(requestText)
      console.log('📥 解析后的请求数据:', JSON.stringify(requestData, null, 2))
    } catch (parseError) {
      console.error('❌ 请求解析错误:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const { prompt, inputImage, inputImage1, inputImage2, modelType = 'custom', activeMode } = requestData

    // 兼容 inputImage1/inputImage2
    const clothingImage = inputImage1 || inputImage || ''
    const modelImage = inputImage2 || ''

    console.log('📋 请求参数:')
    console.log('- prompt:', prompt)
    console.log('- modelType:', modelType)
    console.log('- activeMode:', activeMode)
    console.log('- clothingImage:', clothingImage ? `${clothingImage.substring(0, 50)}...（长度: ${clothingImage.length}）` : 'null')
    console.log('- modelImage:', modelImage ? `${modelImage.substring(0, 50)}...（长度: ${modelImage.length}）` : 'null')

    if (!prompt) {
      console.error('❌ 缺少必要参数: prompt')
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      )
    }

    // 根据 activeMode 选择不同的模型和处理逻辑
    if (activeMode === 'text') {
      // Text to outfit 模式：使用 google/imagen-4
      const modelId = "google/imagen-4";
      console.log('🔄 使用 text-to-outfit 模式，模型:', modelId);
      
      const modelParams = {
        input: {
          prompt: prompt,
          aspect_ratio: "1:1",
          safety_filter_level: "block_medium_and_above"
        }
      }
      console.log('📤 发送到 Replicate 的参数:', JSON.stringify(modelParams, null, 2))
      console.log('⏳ 开始调用 Replicate API...')
      console.time('Replicate API 调用耗时')
      try {
        const output = await replicate.run(modelId, modelParams);
        console.timeEnd('Replicate API 调用耗时');
        console.log('📥 Replicate 返回的原始输出类型:', typeof output);
        console.log('📥 Replicate 返回的原始输出:', output);
        
        // 处理输出
        let imageUrl = '';
        if (typeof output === 'string') {
          imageUrl = output;
        } else if (Array.isArray(output) && output.length > 0) {
          imageUrl = output[0];
        } else if (output && typeof output === 'object') {
          console.log('🔍 输出是对象');
          console.log('🔍 对象构造函数名称:', output.constructor?.name);
          console.log('🔍 对象原型:', Object.prototype.toString.call(output));
          console.log('🔍 对象属性键:', Object.keys(output));
          console.log('🔍 toString 结果:', output.toString());
          
          // 检测是否是 ReadableStream
          const streamDetected = isReadableStream(output);
          console.log('🔍 ReadableStream 检测结果:', streamDetected);
          
          if (streamDetected) {
            // ReadableStream 情况：返回成功但提示这是二进制数据
            console.log('🔍 输出是 ReadableStream，尝试提取URL');
            const url = output.toString();
            if (typeof url === 'string' && url.startsWith('http')) {
              console.log('✅ 从 ReadableStream 提取到图片 URL:', url);
              return NextResponse.json({
                success: true,
                imageUrl: url,
                debugInfo: {
                  modelId,
                  modelParams,
                  rawOutput: 'ReadableStream',
                  outputType: 'ReadableStream',
                  extractedUrl: url
                }
              });
            } else {
              console.log('🔍 无法从 ReadableStream 提取有效URL，返回提示');
              return NextResponse.json({
                success: true,
                isBinaryResponse: true,
                prompt: prompt,
                message: "Model returned binary data. The image was generated successfully but returned as a stream."
              });
            }
          }
          
          // 尝试从对象中提取 URL
          const outputObj = output as ReplicateOutput;
          if (typeof outputObj.url === 'string') {
            imageUrl = outputObj.url;
          } else if (typeof outputObj.image === 'string') {
            imageUrl = outputObj.image;
          } else if (typeof outputObj.output === 'string') {
            imageUrl = outputObj.output;
          }
        } else {
          console.error('❌ 无法解析 Replicate 输出格式:', output);
          throw new Error('无法解析生成结果');
        }

        console.log('✅ 解析出的图片 URL:', imageUrl);

        return NextResponse.json({
          success: true,
          imageUrl: imageUrl,
          debugInfo: {
            modelId,
            modelParams,
            rawOutput: output,
            outputType: typeof output
          }
        });
      } catch (err: any) {
        console.timeEnd('Replicate API 调用耗时');
        console.error('❌ Replicate API 调用错误:', err);
        console.error('- 错误类型:', err.constructor.name);
        console.error('- 错误消息:', err.message);
        console.error('- 错误堆栈:', err.stack);
        return NextResponse.json(
          { 
            error: 'Text-to-outfit generation failed', 
            details: err.message,
            debugInfo: {
              modelId,
              modelParams,
              errorType: err.constructor.name,
              errorMessage: err.message
            }
          },
          { status: 500 }
        );
      }
    } else {
      // 图片模式：使用 flux-kontext-apps/multi-image-kontext 模型
      const modelId = "flux-kontext-apps/multi-image-kontext-max";
      console.log('🔄 使用图片模式，模型:', modelId);

      // 对于图片模式，需要检查是否有输入图片
      if (clothingImage === '' || (clothingImage && clothingImage.length < 10)) {
        // 如果没有输入图片，使用文字生成模式
        console.log('🔄 使用文字生成模式')
        
        const modelParams = {
          input: {
            prompt: `Fashion photography: ${prompt}. High-quality professional fashion shoot, modern styling, clean background, good lighting.`,
            aspect_ratio: "1:1",
            output_quality: 90,
            safety_tolerance: 2,
          }
        }
        
        console.log('📤 发送到 Replicate 的参数:', JSON.stringify(modelParams, null, 2))
        
        console.log('⏳ 开始调用 Replicate API...')
        console.time('Replicate API 调用耗时')
        
        try {
          const output = await replicate.run(modelId, modelParams);
          console.timeEnd('Replicate API 调用耗时');
          console.log('📥 Replicate 返回的原始输出类型:', typeof output);
          
          // 处理不同类型的输出
          let imageUrl = '';
          
          if (Array.isArray(output) && output.length > 0) {
            console.log('🔍 输出是数组，使用第一个元素作为图片URL');
            imageUrl = output[0];
          } else if (typeof output === 'string') {
            console.log('🔍 输出是字符串，直接作为图片URL');
            imageUrl = output;
          } else if (output && typeof output === 'object') {
            console.log('🔍 输出是对象');
            console.log('🔍 对象构造函数名称:', output.constructor?.name);
            console.log('🔍 对象原型:', Object.prototype.toString.call(output));
            console.log('🔍 对象属性键:', Object.keys(output));
            console.log('🔍 是否有 read 方法:', typeof (output as any).read);
            console.log('🔍 是否有 locked 属性:', 'locked' in output);
            console.log('🔍 toString 结果:', output.toString());
            
            // 改进 ReadableStream 检测逻辑
            const streamDetected = isReadableStream(output);
            console.log('🔍 ReadableStream 检测结果:', streamDetected);
            
            if (streamDetected) {
              // 尝试从 toString() 拿到图片 URL
              const url = output.toString();
              if (typeof url === 'string' && url.startsWith('http')) {
                return NextResponse.json({
                  success: true,
                  isBinaryResponse: true,
                  prompt,
                  imageUrl: url, // 直接返回 imageUrl 字段
                  message: url   // 兼容前端旧逻辑
                });
              }
              // 否则 fallback
              return NextResponse.json({ 
                success: true, 
                prompt: prompt,
                isBinaryResponse: true,
                message: "Model returned a ReadableStream. The client needs to be updated to handle binary data."
              });
            }
            
            // 使用类型断言
            const outputObj = output as ReplicateOutput;
            
            // 检查是否为空对象 - 但不要将 ReadableStream 识别为空对象
            if (Object.keys(outputObj).length === 0 && !streamDetected) {
              console.error('❌ API 返回了空对象');
              return NextResponse.json({ 
                error: 'API returned empty response',
                details: 'The model did not return any data'
              }, { status: 500 });
            }
            
            // 检查是否是可读流
            if (typeof outputObj.read === 'function') {
              console.log('🔍 输出是可读流，上传到临时存储并返回URL');
              
              // 这里我们直接返回一个成功响应，但提示前端这是一个二进制响应
              // 实际项目中，你可能需要将二进制数据上传到云存储并返回URL
              return NextResponse.json({ 
                success: true, 
                prompt: prompt,
                isBinaryResponse: true,
                message: "Model returned binary data instead of URL. Please update client to handle binary responses."
              });
            }
            
            // 检查是否有URL属性
            if (typeof outputObj.url === 'string') {
              imageUrl = outputObj.url;
              console.log('- 找到URL字符串属性:', imageUrl);
            } else if (typeof outputObj.image === 'string') {
              imageUrl = outputObj.image;
              console.log('- 找到image字符串属性:', imageUrl);
            } else if (typeof outputObj.output === 'string') {
              imageUrl = outputObj.output;
              console.log('- 找到output字符串属性:', imageUrl);
            } else if (typeof outputObj.url === 'function') {
              console.error('❌ URL属性是一个函数而不是字符串');
              
              // 尝试直接使用模型ID和参数构建预测URL
              const predictionId = outputObj.id || Date.now().toString();
              imageUrl = `https://replicate.com/p/${predictionId}`;
              console.log('- 创建了预测URL:', imageUrl);
            }
          }
          
          if (!imageUrl) {
            console.error('❌ 未找到有效的图片URL:', output);
            return NextResponse.json({ 
              error: 'No valid image URL returned from API',
              details: 'The model did not return a valid image URL'
            }, { status: 500 });
          }

          const response = { 
            success: true, 
            imageUrl: imageUrl,
            prompt: prompt
          };
          
          console.log('📤 API 响应:', JSON.stringify(response, null, 2));
          console.log('====== API 请求结束 ======');
          
          return NextResponse.json(response);
        } catch (replicateError) {
          console.error('❌ Replicate API 调用错误:', replicateError);
          throw replicateError;
        }
      } else {
        // 图片混合模式：需要两张图片
        if (clothingImage && modelImage) {
          console.log('🔄 使用图片混合模式')
          const modelParams = {
            input: {
              prompt: "Make the person wear the clothing item. Keep the person's pose and expression natural. The result should look realistic.. Professional fashion photography, modern aesthetic, high quality.",
              input_image_1: clothingImage, // 直接传 URL
              input_image_2: modelImage,    // 直接传 URL
              aspect_ratio: "1:1",
            }
          }
          // 日志打印真实参数
          console.log('📤 发送到 Replicate 的参数:', JSON.stringify(modelParams, null, 2))
          console.log('⏳ 开始调用 Replicate API...')
          console.time('Replicate API 调用耗时')
          try {
            const output = await replicate.run(modelId, modelParams);
            console.timeEnd('Replicate API 调用耗时');
            console.log('📥 Replicate 返回的原始输出类型:', typeof output);
            console.log('📥 Replicate 返回的原始输出:', output);
            
            // 处理不同类型的输出
            let imageUrl = '';
            
            if (Array.isArray(output) && output.length > 0) {
              console.log('🔍 输出是数组，使用第一个元素作为图片URL');
              imageUrl = output[0];
            } else if (typeof output === 'string') {
              console.log('🔍 输出是字符串，直接作为图片URL');
              imageUrl = output;
            } else if (output && typeof output === 'object') {
              console.log('🔍 输出是对象');
              console.log('🔍 对象构造函数名称:', output.constructor?.name);
              console.log('🔍 对象原型:', Object.prototype.toString.call(output));
              console.log('🔍 对象属性键:', Object.keys(output));
              console.log('🔍 是否有 read 方法:', typeof (output as any).read);
              console.log('🔍 是否有 locked 属性:', 'locked' in output);
              console.log('🔍 toString 结果:', output.toString());
              
              // 改进 ReadableStream 检测逻辑
              const streamDetected = isReadableStream(output);
              console.log('🔍 ReadableStream 检测结果:', streamDetected);
              
              if (streamDetected) {
                // 尝试从 toString() 拿到图片 URL
                const url = output.toString();
                if (typeof url === 'string' && url.startsWith('http')) {
                  return NextResponse.json({
                    success: true,
                    isBinaryResponse: true,
                    prompt,
                    imageUrl: url, // 直接返回 imageUrl 字段
                    message: url   // 兼容前端旧逻辑
                  });
                }
                // 否则 fallback
                return NextResponse.json({ 
                  success: true, 
                  prompt: prompt,
                  isBinaryResponse: true,
                  message: "Model returned a ReadableStream. The client needs to be updated to handle binary data."
                });
              }
              
              // 使用类型断言
              const outputObj = output as ReplicateOutput;
              
              // 检查是否为空对象 - 但不要将 ReadableStream 识别为空对象
              if (Object.keys(outputObj).length === 0 && !streamDetected) {
                console.error('❌ API 返回了空对象');
                return NextResponse.json({ 
                  error: 'API returned empty response',
                  details: 'The model did not return any data'
                }, { status: 500 });
              }
              
              // 检查是否是可读流
              if (typeof outputObj.read === 'function') {
                console.log('🔍 输出是可读流，上传到临时存储并返回URL');
                
                // 这里我们直接返回一个成功响应，但提示前端这是一个二进制响应
                // 实际项目中，你可能需要将二进制数据上传到云存储并返回URL
                return NextResponse.json({ 
                  success: true, 
                  prompt: prompt,
                  isBinaryResponse: true,
                  message: "Model returned binary data instead of URL. Please update client to handle binary responses."
                });
              }
              
              // 检查是否有URL属性
              if (typeof outputObj.url === 'string') {
                imageUrl = outputObj.url;
                console.log('- 找到URL字符串属性:', imageUrl);
              } else if (typeof outputObj.image === 'string') {
                imageUrl = outputObj.image;
                console.log('- 找到image字符串属性:', imageUrl);
              } else if (typeof outputObj.output === 'string') {
                imageUrl = outputObj.output;
                console.log('- 找到output字符串属性:', imageUrl);
              } else if (typeof outputObj.url === 'function') {
                console.error('❌ URL属性是一个函数而不是字符串');
                
                // 尝试直接使用模型ID和参数构建预测URL
                const predictionId = outputObj.id || Date.now().toString();
                imageUrl = `https://replicate.com/p/${predictionId}`;
                console.log('- 创建了预测URL:', imageUrl);
              }
            }
            
            if (!imageUrl) {
              console.error('❌ 未找到有效的图片URL:', output);
              return NextResponse.json({ 
                error: 'No valid image URL returned from API',
                details: 'The model did not return a valid image URL'
              }, { status: 500 });
            }

            const response = { 
              success: true, 
              imageUrl: imageUrl,
              prompt: prompt
            };
            
            console.log('📤 API 响应:', JSON.stringify(response, null, 2));
            console.log('====== API 请求结束 ======');
            
            return NextResponse.json(response);
          } catch (replicateError) {
            console.error('❌ Replicate API 调用错误:', replicateError);
            throw replicateError;
          }
        } else {
          console.error('❌ 缺少必要的图片输入')
          return NextResponse.json(
            { error: 'Missing required image input' },
            { status: 400 }
          )
        }
      }
    }

  } catch (error) {
    console.error('❌ 图片生成错误:', error)
    
    // 更详细的错误处理
    if (error instanceof Error) {
      console.error('- 错误类型:', error.constructor.name)
      console.error('- 错误消息:', error.message)
      console.error('- 错误堆栈:', error.stack)
      
      // 检查是否是 Replicate API 相关错误
      if (error.message.includes('Authentication')) {
        console.error('❌ 认证错误: API token 无效或过期')
        return NextResponse.json(
          { 
            error: 'API authentication failed. Please check your Replicate API token.',
            details: 'Make sure your REPLICATE_API_TOKEN is correctly set in .env.local'
          },
          { status: 401 }
        )
      }
      
      if (error.message.includes('insufficient')) {
        console.error('❌ 余额不足: Replicate 账户积分不足')
        return NextResponse.json(
          { error: 'Insufficient credits. Please check your Replicate account balance.' },
          { status: 402 }
        )
      }
      
      if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
        console.error('❌ 速率限制: 请求过于频繁')
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }

      return NextResponse.json(
        { 
          error: 'Failed to generate image', 
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