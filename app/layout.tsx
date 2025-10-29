import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://v0-tag-glasses-website.vercel.app"),
  title: "TAG Glasses - Digital Identity Layer",
  description:
    "TAG is powering the digital identity economy layer. #IDFI Awakening campaign is live powered by SBTs. Get your TAG Lens now!",
  icons: {
    icon: [
      { url: '/images/og-image.png', type: 'image/png' }
    ],
    apple: [
      { url: '/images/og-image.png', type: 'image/png' }
    ],
    shortcut: '/images/og-image.png'
  },
  openGraph: {
    title: "TAG Glasses - Digital Identity Layer",
    description:
      "TAG is powering the digital identity economy layer. #IDFI Awakening campaign is live powered by SBTs. Get your TAG Lens now!",
    url: "https://v0-tag-glasses-website.vercel.app",
    siteName: "TAG Glasses",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAG Glasses - Digital Identity Layer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAG Glasses - Digital Identity Layer",
    description:
      "TAG is powering the digital identity economy layer. #IDFI Awakening campaign is live powered by SBTs. Get your TAG Lens now!",
    images: ["/images/og-image.png"],
    creator: "@TAGGlasses",
  },
    generator: 'TAG Glasses'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/og-image.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/og-image.png" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
