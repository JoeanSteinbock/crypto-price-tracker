import { NextRequest, NextResponse } from 'next/server'
import { TOP_CRYPTOCURRENCIES } from '@/data/cryptocurrencies'

export async function GET(
  request: NextRequest,
  { params }: { params: { cryptoId: string } }
) {
  const crypto = TOP_CRYPTOCURRENCIES.find(c => c.id === params.cryptoId) || TOP_CRYPTOCURRENCIES[0]
  
  const manifest = {
    name: `${crypto.name} Price - CryptoTick.live`,
    short_name: `${crypto.symbol.toUpperCase()} Price`,
    description: `Track ${crypto.name} price in real-time with CryptoTick.live`,
    start_url: `/${crypto.id}`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }

  return NextResponse.json(manifest)
}