import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ServicesSection } from "@/components/layout/sections/services";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { TryOnSection } from "@/components/try-on-section";

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
      <TryOnSection />
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
