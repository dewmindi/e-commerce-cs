import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { GlobalLoader } from '@/components/GlobalLoader'
import { CartProvider } from './context/CartContext'
import localFont from 'next/font/local';
import Script from "next/script";
import NonBlockingCSS from '@/components/NonBlockingCSS'
import GlobalNavbar from '@/components/GlobalNavbar'
import ChatBot from '@/components/ChatBot'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Top-Rated Logo & Graphic Design Agency in Melbourne & Hallam | CS Graphic Meta',
    template: '%s | CS Graphic Meta',
  },
  description: '5,000+ completed projects. Get custom logo, packaging, business card designs & web design services in Melbourne. Affordable pricing with unlimited revisions. Get a quote!',
  keywords: [
    'logo design Melbourne',
    'graphic design agency Melbourne',
    'graphic design Hallam',
    'business card design',
    'web development Melbourne',
    'e-commerce website design',
    'social media design',
    'banner poster design',
    'packaging design Australia',
    'custom web development',
    'CS Graphic Meta',
  ],
  authors: [{ name: 'CS Graphic Meta', url: BASE_URL }],
  creator: 'CS Graphic Meta',
  publisher: 'CS Graphic Meta',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: BASE_URL,
    siteName: 'CS Graphic Meta',
    title: 'Top-Rated Logo & Graphic Design Agency in Melbourne & Hallam',
    description: '5,000+ completed projects. Get custom logo, packaging, business card designs & web design services in Melbourne. Affordable pricing with unlimited revisions.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'CS Graphic Meta – Logo & Graphic Design Agency Melbourne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top-Rated Logo & Graphic Design Agency in Melbourne & Hallam',
    description: '5,000+ completed projects. Custom logo, web & graphic design services in Melbourne.',
    images: ['/og-default.jpg'],
    creator: '@csgraphicmeta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

const cursive = localFont({
  src: '../public/fonts/Merienda-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-cursive', // 👈 defines a CSS variable
});

const symphonie = localFont({
  src: '../public/fonts/SymphonieCAT.ttf',
  display: 'swap',
  variable: '--font-symphonie', // 👈 defines a CSS variable
});

const poppins = localFont({
  src: '../public/fonts/PoppinsRegular.ttf',
  display: 'swap',
  variable: '--font-poppins', // 👈 defines a CSS variable
});

const nexa = localFont({
  src: [
    {
      path: '../public/fonts/NexaLight/Nexa Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NexaLight/Nexa Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nexa',
  display: 'swap',
});

const isMaintenance = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="rdycbyzkhcegq5rd847uwza5k6x1lf" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8R8WFW8TH5" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8R8WFW8TH5');
          `}
        </Script>
        {/* JSON-LD: LocalBusiness structured data */}
        <Script
          id="jsonld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "CS Graphic Meta",
              url: "https://csgraphicmeta.com.au",
              logo: "https://csgraphicmeta.com.au/cs-logo.png",
              image: "https://csgraphicmeta.com.au/og-default.jpg",
              description:
                "Award-winning graphic design & web development agency in Melbourne, Australia. Logo design, business cards, social media, packaging, and custom websites.",
              telephone: "+61-3-0000-0000",
              email: "info@csgraphicmeta.com.au",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Hallam",
                addressLocality: "Melbourne",
                addressRegion: "VIC",
                postalCode: "3803",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -37.9333,
                longitude: 145.2167,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/csgraphicmeta",
                "https://www.instagram.com/csgraphicmeta",
                "https://www.linkedin.com/company/csgraphicmeta",
              ],
              priceRange: "$$",
              areaServed: {
                "@type": "Country",
                name: "Australia",
              },
            }),
          }}
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <NonBlockingCSS />
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
        <CartProvider>
          <GlobalNavbar />
          <div className={`${isMaintenance ? 'blur-sm pointer-events-none' : ''} ${cursive.variable} ${symphonie.variable} ${nexa.variable}`}>
            {children}
          </div>
          <ChatBot />
          </CartProvider>
        {/* <CursorFollower /> */}
        {/* reCAPTCHA v3 script */}
      </body>
    </html>
  )
}