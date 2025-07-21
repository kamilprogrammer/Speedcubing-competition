import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Image from "next/image";
export function DraggableCardDemo() {
  const items = [
    {
      title: "3x3",
      image: "/images/3x3.png",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "2x2",
      image: "/images/2x2.png",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "4x4",
      image: "/images/4x4.png",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Mirror",
      image: "/images/mirror.png",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
  ];
  return (
    <>
      <div className="absolute md:top-165 lg:top-193 z-[-11] h-[90vh] w-screen bg-[#030712] bg-[radial-gradient(#ffffff33_1px,#030712_1px)] bg-[size:20px_20px]"></div>

      <DraggableCardContainer className="relative flex min-h-[550px] w-full items-center justify-center overflow-clip">
        <p className="absolute top-1/2 mx-auto max-w-md -translate-y-3/4 text-center text-xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
          16/8/2025 - 17/8/2025🔥🔥🔥
        </p>
        {items.map((item) => (
          <DraggableCardBody key={item.title} className={item.className}>
            <Image
              src={item.image}
              alt={item.title}
              width={360}
              height={360}
              className="pointer-events-none relative z-10 h-80 w-80 object-cover"
            />
            <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </>
  );
}
