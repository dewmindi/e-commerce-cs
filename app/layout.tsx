import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { GlobalLoader } from '@/components/GlobalLoader'
import CursorFollower from '@/components/CursorFollower'
import { CartProvider } from './context/CartContext'
import MaintenanceOverlay from '@/components/MaintenanceOverlay'
import localFont from 'next/font/local';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'CS Meta Graphic',
  description: 'Precision-crafted logos that deliver clarity in a complex marketplace.',
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

const isMaintenance = false

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <Suspense fallback={null}>
//           <GlobalLoader />
//         </Suspense>
//         <CartProvider>
//           {children}
//         </CartProvider>
//         <CursorFollower />
//       </body>
//     </html>
//   )
// }

// const isMaintenance = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
        <CartProvider>
          <div className={`${isMaintenance ? 'blur-sm pointer-events-none' : ''} ${cursive.variable} ${symphonie.variable}`}>
            {children}
          </div>
          {isMaintenance && <MaintenanceOverlay />}</CartProvider>
        <CursorFollower />
                {/* reCAPTCHA v3 script */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}