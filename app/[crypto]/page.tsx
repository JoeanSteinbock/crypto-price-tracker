import type { Metadata } from "next"
import CryptoPriceTracker from "@/components/crypto-price-tracker"
import TOP_CRYPTOCURRENCIES from "../../data/cryptocurrencies"

// 动态生成元数据
export async function generateMetadata({ params }: { params: { crypto: string } }): Promise<Metadata> {
  const { crypto: cryptoId } = await params
  
  try {
    // 尝试从 API 获取加密货币信息
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
      { next: { revalidate: 3600 } } // 缓存1小时
    )
    
    if (!response.ok) {
      throw new Error("Failed to fetch crypto info")
    }
    
    const data = await response.json()
    
    return {
      title: `${data.name} (${data.symbol.toUpperCase()}) Price | Live Cryptocurrency Tracker`,
      description: `Track real-time ${data.name} (${data.symbol.toUpperCase()}) price with live updates. View detailed market data including volume, market cap, and 24h change.`,
      keywords: `${data.name}, ${data.symbol.toUpperCase()}, ${data.name} price, cryptocurrency, crypto tracker, live crypto prices, market cap, trading volume`,
      openGraph: {
        images: data.image?.large ? [data.image.large] : [],
      },
      manifest: `/manifest/${cryptoId}.json`,
    }
  } catch (error) {
    // 如果 API 调用失败，使用默认加密货币或通用元数据
    const defaultCrypto = TOP_CRYPTOCURRENCIES.find((c) => c.id === cryptoId) || TOP_CRYPTOCURRENCIES[0]
    
    return {
      title: `${defaultCrypto.name} (${defaultCrypto.symbol}) Price | Live Cryptocurrency Tracker`,
      description: `Track real-time cryptocurrency prices with live updates. View detailed market data including volume, market cap, and 24h change.`,
      keywords: `cryptocurrency, crypto tracker, live crypto prices, market cap, trading volume, ${defaultCrypto.name}, ${defaultCrypto.symbol}`,
    }
  }
}

export default async function CryptoPage({ params }: { params: { crypto: string } }) {

  const { crypto: cryptoId } = await params
  
  // 直接传递 cryptoId 到组件，让客户端组件处理加载
  return <CryptoPriceTracker initialCrypto={cryptoId} />
}

// 为常见加密货币生成静态路径，以提高性能
export function generateStaticParams() {
  return TOP_CRYPTOCURRENCIES.map((crypto) => ({
    crypto: crypto.id,
  }))
}

