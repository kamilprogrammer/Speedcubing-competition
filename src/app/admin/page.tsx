"use client";
import Dashboard from "@/components/sections/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/not-authorized");
    }
  }, [router]);
  return <Dashboard />;
}
