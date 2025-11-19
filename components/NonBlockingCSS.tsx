"use client"

import Head from "next/head"

export default function NonBlockingCSS() {
  return (
    <Head>
      <link
        rel="preload"
        as="style"
        href="/css/494d650d16ab1145.css"
      />
      <link
        rel="stylesheet"
        href="/css/494d650d16ab1145.css"
        media="print"
        onLoad={(e) => {
          const link = e.target as HTMLLinkElement
          link.media = "all"
        }}
      />

      <link
        rel="preload"
        as="style"
        href="/css/d36f3e05f586e7d3.css"
      />
      <link
        rel="stylesheet"
        href="/css/d36f3e05f586e7d3.css"
        media="print"
        onLoad={(e) => {
          const link = e.target as HTMLLinkElement
          link.media = "all"
        }}
      />
    </Head>
  )
}
