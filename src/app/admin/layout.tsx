"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import CustomCursor from "@/components/ui/CustomCursor";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/ui/AdminSideBar";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <CustomCursor />

      <SidebarProvider>
        <AdminSidebar />

        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>
      </SidebarProvider>
    </>
  );
}
