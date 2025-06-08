import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ServicesSection } from "@/components/layout/sections/services";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { ControlPanel } from "@/components/control-panel";

export const metadata = {
  title: "AI虚拟试衣 - StyleMix AI",
  description: "使用AI技术体验虚拟试衣，文本生成衣物或上传图片，智能匹配模特，创造完美穿搭效果",
  openGraph: {
    type: "website",
    url: "https://stylemix-ai.vercel.app",
    title: "AI虚拟试衣 - StyleMix AI",
    description: "使用AI技术体验虚拟试衣，文本生成衣物或上传图片，智能匹配模特，创造完美穿搭效果",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StyleMix AI - AI虚拟试衣平台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://stylemix-ai.vercel.app",
    title: "AI虚拟试衣 - StyleMix AI",
    description: "使用AI技术体验虚拟试衣，文本生成衣物或上传图片，智能匹配模特，创造完美穿搭效果",
    images: [
      "/og-image.jpg",
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
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
        <div className="max-w-2xl mx-auto">
          <ControlPanel />
        </div>
      </section>
      <FeaturesSection />
      <BenefitsSection />
      <ServicesSection />
      <TestimonialSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
