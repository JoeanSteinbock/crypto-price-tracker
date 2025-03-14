import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { ClientFooter } from "@/components/client-footer"
import GoogleAnalytics from "@/components/google-analytics"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"] })

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://cryptotick.live'),
  keywords:
    "cryptocurrency, bitcoin price, ethereum price, crypto tracker, live crypto prices, crypto broadcast, crypto streaming, digital signage, crypto display, large screen crypto, crypto TV display, crypto dashboard, BTC, ETH, SOL, market cap, trading volume, crypto presentation",
  creator: "CryptoTick.live",
  publisher: "CryptoTick.live",
  generator: "CryptoTick.live",
  manifest: "/manifest.json",
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
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.png", type: "image/png" }
    ],
    apple: [
      { url: "/icons/icon-192x192.png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CryptoTick.live"
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    "application-name": "CryptoTick.live",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "display": "fullscreen",
    "orientation": "landscape"
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="CryptoTick.live" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <GoogleAnalytics />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex relative flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <ClientFooter />
          </div>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'