import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Type",
    title: "文本生成衣物",
    description:
      "只需描述您想要的衣物风格，AI将自动生成对应的服装图片，支持各种风格和材质描述。",
  },
  {
    icon: "Upload",
    title: "图片上传试衣",
    description:
      "上传您喜欢的衣物图片，AI将智能识别并进行虚拟试穿，支持多种图片格式。",
  },
  {
    icon: "Users",
    title: "多样模特选择",
    description:
      "提供预设男女模特，也支持上传自己的照片，让试衣效果更加个性化和真实。",
  },
  {
    icon: "Sparkles",
    title: "AI智能匹配",
    description:
      "采用先进的AI算法，自动调整衣物尺寸和角度，确保试衣效果自然逼真。",
  },
  {
    icon: "Zap",
    title: "快速生成",
    description:
      "强大的云端算力支持，通常在几秒内即可生成高质量的试衣效果图。",
  },
  {
    icon: "Shield",
    title: "隐私保护",
    description:
      "所有上传的图片仅用于试衣生成，我们严格保护用户隐私，不会存储个人照片。",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        核心功能
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        为什么选择我们的AI试衣
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        结合最新的AI技术，为您提供最真实、最便捷的虚拟试衣体验，
        让购物变得更智能、更有趣。
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
