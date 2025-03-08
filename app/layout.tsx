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
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'