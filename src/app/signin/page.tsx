"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const router = useRouter();
  const password = process.env.NEXT_PUBLIC_SECRET_KEY;
  console.log(password);
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="cursor-none flex items-center mb-6 text-2xl font-black text-white"
        >
          <Image
            width={40}
            height={40}
            className="w-8 h-8 mr-2"
            src="/images/logo.png"
            alt="logo"
          />
          SSCO 25
        </Link>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to Admin
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.elements.namedItem(
                  "email"
                ) as HTMLInputElement;
                const passwordInput = form.elements.namedItem(
                  "password"
                ) as HTMLInputElement;
                console.log(passwordInput.value);
                console.log(password);
                console.log(password === passwordInput.value);
                if (
                  emailInput &&
                  emailInput.value === "admin@gmail.com" &&
                  passwordInput &&
                  passwordInput.value === password
                ) {
                  localStorage.setItem("role", "admin");
                  router.push("/admin");
                }
              }}
            >
              <div>
                <label className="cursor-none block mb-2 text-sm font-medium text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="cursor-none border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="cursor-none block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" cursor-none border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="cursor-none w-full focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
