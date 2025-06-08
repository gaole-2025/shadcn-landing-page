"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image
";
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
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={
              theme === "light"
                ? "/hero-image-light.jpeg"
                : "/hero-image-dark.jpeg"
            }
            alt="AI虚拟试衣平台演示"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
