"use client";
import Cta from "@/components/sections/Cta";
import Cube from "@/components/sections/cube";
import { DraggableCardDemo } from "@/components/sections/Draggable";
import HeroSection from "@/components/sections/HeroSection";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  const testimonials = [
    {
      quote:
        "Hey Nihad, I really don't know what to write here. So you better tell what you wanna write before deployment, Or I'll push this and everybody can see it :)",
      name: "Nihad AlSoufi",
      designation: "Fastest Syrian Cuber",
      src: "/images/Nihad.png",
    },

    {
      quote:
        "Hey Mahmoud, I really don't know what to write here. So you better tell what you wanna write before deployment, Or I'll push this and everybody can see it :)",
      name: "Mahmoud Sras",
      designation: "Also Fastest Syrian Cuber",
      src: "/images/Mahmoud.jpg",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CustomCursor />

        <HeroSection />
        <DraggableCardDemo />
        <AnimatedTestimonials testimonials={testimonials} />
        <Cube />
        <Cta />
      </main>
    </div>
  );
}
