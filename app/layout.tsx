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

export const metadata: Metadata = {
  title: 'Top-Rated Logo & Graphic Design Agency in Melbourne & Hallam',
  description: '5,000+ completed projects. Get custom logo, packaging,business card designs & web design services in Melbourne. Affordable pricing with unlimited revisions. Get a quote!',
  icons: {
    icon: '/favicon.ico',
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