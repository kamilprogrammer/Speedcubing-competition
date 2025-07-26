import "./style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import HeaderWrap from "./HeaderWrap";
import Analytics from "./analytics";

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
  title: "Syria SpeedCubing Open 2025",
  description: "Syria SpeedCubing Open 2025",
  icons: {
    icon: "/icon.ico",
  },
  keywords: "Speed cubing syria SSCO 2025",
  verification: {
    google: "WCBTADGkk1aE4gdEWk4b8DxuoOKOfKVe45nFg2Br8y8",
  },
};
const GA_MEASUREMENT_ID = "G-34N366FFCJ";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Syria SpeedCubing Open 2025" />

        {/* Open Graph Meta for Social Sharing */}
        <meta
          property="og:image"
          content="https://speed-cubing-sy.netlify.app/images/logo.png"
        />

        {/* Favicon */}
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Syria SpeedCubing Open 2025",
              url: "https://speed-cubing-sy.netlify.app/",
              logo: "https://speed-cubing-sy.netlify.app/images/logo.png",
              sameAs: [
                "https://www.facebook.com/Cubuzzler/posts/syria-speedcubing-open-2025-locationsyria-homs-governoratevenue-martyr-abdul-ham/746270654624382/",
                "https://www.instagram.com/p/DL5jidVzbiT/",
              ],
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="XO3Rsmwi7-TKYfGuTBoeA8UML0X8wwW4lHF2vwN-WYQ"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-34N366FFCJ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-cairo text-base text-gray-200 antialiased`}
      >
        <HeaderWrap />
        <Analytics />
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
