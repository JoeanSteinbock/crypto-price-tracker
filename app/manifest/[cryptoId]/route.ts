import { NextRequest, NextResponse } from 'next/server'
import { TOP_CRYPTOCURRENCIES } from '@/data/cryptocurrencies'

export async function GET(
  request: Request,
  { params }: { params: { cryptoId: string } }
) {
  const { cryptoId } = await params
  const crypto = TOP_CRYPTOCURRENCIES.find(c => c.id === cryptoId) || TOP_CRYPTOCURRENCIES[0]
  
  const manifest = {
    name: `Coin ${cryptoId}`,
    short_name: `Coin ${cryptoId}`,
    description: `Track ${crypto.name} price in real-time with CryptoTick.live`,
    start_url: `/${cryptoId}`,
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}