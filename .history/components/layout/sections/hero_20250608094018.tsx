"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const { theme } = useTheme();
  
  const scrollToTryOn = () => {
    const tryOnSection = document.getElementById('try-on');
    if (tryOnSection) {
      tryOnSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>AI</Badge>
            </span>
            <span> 虚拟试衣技术已上线！ </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              体验未来的
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                AI虚拟试衣
              </span>
              技术
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`只需描述或上传衣物图片，AI将为您生成逼真的试衣效果。
            支持自定义模特，让您轻松找到完美的穿搭风格。`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button 
              className="w-5/6 md:w-1/4 font-bold group/arrow"
              onClick={scrollToTryOn}
            >
              立即体验
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                href="#features"
              >
                了解更多
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          
          {/* AI试衣演示区域 - 使用渐变背景和图标 */}
          <div className="w-full md:w-[1200px] mx-auto h-[400px] md:h-[600px] rounded-lg relative border border-t-2 border-secondary border-t-primary/30 bg-gradient-to-br from-background via-muted/50 to-background overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="flex justify-center space-x-8 items-center">
                  {/* 输入阶段 */}
                  <div className="flex flex-col items-center space-y-3 opacity-80">
                    <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl">👕</span>
                    </div>
                    <p className="text-sm text-muted-foreground">输入衣物</p>
                  </div>
                  
                  {/* 箭头 */}
                  <ArrowRight className="w-6 h-6 text-primary" />
                  
                  {/* AI处理 */}
                  <div className="flex flex-col items-center space-y-3 opacity-80">
                    <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <p className="text-sm text-muted-foreground">AI处理</p>
                  </div>
                  
                  {/* 箭头 */}
                  <ArrowRight className="w-6 h-6 text-primary" />
                  
                  {/* 试衣结果 */}
                  <div className="flex flex-col items-center space-y-3 opacity-80">
                    <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl">✨</span>
                    </div>
                    <p className="text-sm text-muted-foreground">试衣效果</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-lg font-medium text-foreground">AI虚拟试衣演示</p>
                  <p className="text-sm text-muted-foreground mt-2">上传图片或描述文字，即可生成逼真试衣效果</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
