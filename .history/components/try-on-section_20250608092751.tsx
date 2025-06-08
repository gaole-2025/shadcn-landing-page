'use client';

import React, { useState } from 'react';
import { ControlPanel } from './control-panel';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';

export function TryOnSection() {
  const [result, setResult] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleGenerationResult = (generationResult: any, generationDebugInfo?: any) => {
    console.log('试衣结果:', generationResult);
    setResult(generationResult);
    setDebugInfo(generationDebugInfo);
  };

  const handleDownload = () => {
    if (result?.imageUrl) {
      const link = document.createElement('a');
      link.href = result.imageUrl;
      link.download = `stylemix-ai-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (result?.imageUrl && navigator.share) {
      try {
        await navigator.share({
          title: 'StyleMix AI - 我的试衣效果',
          text: '看看我用AI生成的试衣效果！',
          url: result.imageUrl,
        });
      } catch (error) {
        console.log('分享失败:', error);
      }
    } else {
      // 复制链接到剪贴板
      if (result?.imageUrl) {
        navigator.clipboard.writeText(result.imageUrl);
        alert('链接已复制到剪贴板！');
      }
    }
  };

  return (
    <section id="try-on" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          AI试衣体验
        </h2>
        <h3 className="text-3xl md:text-4xl text-center font-bold mb-4">
          开始你的虚拟试衣之旅
        </h3>
        <p className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground">
          选择文本描述或上传衣物图片，AI将为你生成完美的试衣效果
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* 控制面板 */}
        <div>
          <ControlPanel onGenerationResult={handleGenerationResult} />
        </div>

        {/* 结果显示区域 */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                试衣结果
                {result?.success && (
                  <Badge variant="secondary" className="text-green-600">
                    ✓ 生成成功
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  {result.imageUrl ? (
                    <div className="space-y-4">
                      <img
                        src={result.imageUrl}
                        alt="AI试衣效果"
                        className="w-full h-auto rounded-lg border border-border"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownload}
                          className="flex-1"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          下载图片
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShare}
                          className="flex-1"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          分享
                        </Button>
                      </div>
                    </div>
                  ) : result.message ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">{result.message}</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">生成中...</p>
                    </div>
                  )}
                  
                  {debugInfo && (
                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer">调试信息</summary>
                      <pre className="mt-2 bg-muted p-2 rounded text-xs overflow-auto">
                        {JSON.stringify(debugInfo, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                      <span className="text-2xl">👗</span>
                    </div>
                    <p>试衣结果将在这里显示</p>
                    <p className="text-sm mt-1">请在左侧开始你的AI试衣体验</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 