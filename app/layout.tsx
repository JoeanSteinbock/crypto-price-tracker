import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoTick.live - Real-time Cryptocurrency Price Tracker",
  description:
    "Track cryptocurrency prices in real-time with CryptoTick.live - featuring live charts, price alerts, and market data.",
  keywords:
    "cryptocurrency, bitcoin price, ethereum price, solana price, crypto tracker, live crypto prices, BTC, ETH, SOL, market cap, trading volume",
  generator: "CryptoTick.live",
  authors: [{ name: "CryptoTick.live" }],
  openGraph: {
    title: "CryptoTick.live - Real-time Cryptocurrency Price Tracker",
    description: "Track cryptocurrency prices in real-time with CryptoTick.live",
    url: "https://cryptotick.live",
    siteName: "CryptoTick.live",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoTick.live - Real-time Cryptocurrency Price Tracker",
    description: "Track cryptocurrency prices in real-time with CryptoTick.live",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CryptoTick.live",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="CryptoTick.live" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'