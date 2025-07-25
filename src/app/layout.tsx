import "./style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import HeaderWrap from "./HeaderWrap";

const cairo = localFont({
  src: [
    {
      path: "..//..//public/fonts/cairo.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "..//..//public/fonts/cairo-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
});
console.log(cairo);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "..//..//public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "..//..//public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "..//..//public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "..//..//public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export const metadata = {
  title: "SpeedCubing - Syria",
  description: "SpeedCubing - Syria- Homs",
  icons: {
    icon: "/icon.ico",
  },
  keywords: "Speed cubing syria",
  verification: {
    google: "WCBTADGkk1aE4gdEWk4b8DxuoOKOfKVe45nFg2Br8y8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="XO3Rsmwi7-TKYfGuTBoeA8UML0X8wwW4lHF2vwN-WYQ"
        />
      </head>
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-cairo text-base text-gray-200 antialiased`}
      >
        <HeaderWrap />
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
