import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StepProps {
  step: number;
  title: string;
  description: string;
}

const stepList: StepProps[] = [
  {
    step: 1,
    title: "选择输入方式",
    description:
      "可以选择文本描述您想要的衣物风格，或者直接上传衣物图片。AI会根据您的输入生成或识别衣物。",
  },
  {
    step: 2,
    title: "选择模特",
    description:
      "从我们提供的预设模特中选择，或者上传您自己的照片作为模特，让试衣效果更加个性化。",
  },
  {
    step: 3,
    title: "AI生成试衣",
    description:
      "点击生成按钮，AI将在几秒内为您创建逼真的试衣效果图，展示衣物在模特身上的穿着效果。",
  },
  {
    step: 4,
    title: "保存或分享",
    description:
      "对生成的试衣效果满意后，您可以保存图片或分享给朋友，也可以继续尝试其他风格。",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        使用流程
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        三分钟上手AI试衣
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        简单四步，即可体验专业级的AI虚拟试衣效果。
        无需专业知识，人人都能轻松使用。
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full lg:w-[80%] mx-auto">
        {stepList.map(({ step, title, description }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step}
                </div>
                {title}
              </CardTitle>
              <CardDescription className="mt-3 text-base">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
