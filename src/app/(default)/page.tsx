"use client";
import Cta from "@/components/sections/Cta";
import HeroSection from "@/components/sections/HeroSection";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  const testimonials = [
    {
      quote:
        "شغوف بعالم حل مكعب الروبيك وممثل عن مجتمع الشرق الأوسط، والمُنظم الرئيسي لأول بطولة رسمية في البلاد، بفضل جهوده، بدأت رياضة حل المكعب تجد مكانها في سوريا",
      name: "Nihad AlSoufi",
      designation: "Founder of SSCC",
      src: "/images/Nihad.png",
    },

    {
      quote:
        "لاعب مكعب متميز و دوره بارز في المجتمع ، يُعد الشريك المؤسس لمجتمع المكعب السوري، ساهم بشكل فعّال في بناء هذا المجتمع منذ بدايته، وكان له دور كبير في دعم وتنظيم أول بطولة رسمية في سوريا",
      name: "Mahmoud Sras",
      designation: "Co-Founder of SSCC",
      src: "/images/Mahmoud.jpg",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CustomCursor />
        <HeroSection />
        <AnimatedTestimonials testimonials={testimonials} />
        {/* 
        <Cube />*/}
        <Cta />
      </main>
    </div>
  );
}
