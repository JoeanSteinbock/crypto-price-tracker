import { NextResponse } from 'next/server'
import TOP_CRYPTOCURRENCIES from '@/data/cryptocurrencies'

export async function GET(
  _request: Request,
  { params }: { params: { cryptoId: string } }
) {
  const { cryptoId } = await params
  
  // 首先尝试从本地数据获取加密货币信息
  const localCrypto = TOP_CRYPTOCURRENCIES.find(c => c.id === cryptoId)
  
  // 如果在本地数据中找到，直接使用本地数据
  if (localCrypto) {
    const manifest = {
      name: `${localCrypto.name} Price - CryptoTick.live`,
      short_name: `${localCrypto.symbol.toUpperCase()} Price`,
      description: `Track ${localCrypto.name} price in real-time with CryptoTick.live`,
      start_url: `/${cryptoId}`,
      scope: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000',
      orientation: 'landscape',
      icons: [
        {
          src: localCrypto.image || '/logo.svg',
          sizes: 'any',
          type: localCrypto.image ? 'image/png' : 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
    
    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400' // 缓存24小时
      }
    })
  }
  
  // 只有在本地数据中找不到时，才尝试从 API 获取
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
      { next: { revalidate: 86400 } } // 缓存24小时
    )
    
    if (!response.ok) {
      throw new Error("Failed to fetch crypto info")
    }
    
    const data = await response.json()
    
    const manifest = {
      name: `${data.name} Price - CryptoTick.live`,
      short_name: `${data.symbol.toUpperCase()} Price`,
      description: `Track ${data.name} price in real-time with CryptoTick.live`,
      start_url: `/${cryptoId}`,
      scope: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000',
      orientation: 'landscape',
      icons: [
        {
          src: data.image?.large || '/logo.svg',
          sizes: 'any',
          type: data.image?.large ? 'image/png' : 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
    
    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400' // 缓存24小时
      }
    })
  } catch (error) {
    // 如果 API 调用失败，使用默认加密货币
    const defaultCrypto = TOP_CRYPTOCURRENCIES[0]
    
    const manifest = {
      name: `${defaultCrypto.name} Price - CryptoTick.live`,
      short_name: `${defaultCrypto.symbol.toUpperCase()} Price`,
      description: `Track ${defaultCrypto.name} price in real-time with CryptoTick.live`,
      start_url: `/${defaultCrypto.id}`,
      scope: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000',
      orientation: 'landscape',
      icons: [
        {
          src: defaultCrypto.image || '/logo.svg',
          sizes: 'any',
          type: defaultCrypto.image ? 'image/png' : 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
    
    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400' // 缓存24小时
      }
    })
  }
}