"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/ui/header";

export default function HeaderWrap() {
  const pathname = usePathname();
  const hideNavbarRoutes = [
    "/admin",
    "/login",
    "/admin/competitors",
    "/admin/events",
    "/admin/solves",
    "/results"
  ];
  const showNavbar = !hideNavbarRoutes.includes(pathname);

  return showNavbar ? <Header /> : null;
}
