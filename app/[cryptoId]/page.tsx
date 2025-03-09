import type { Metadata } from 'next'
import TOP_CRYPTOCURRENCIES from '@/data/cryptocurrencies'
import CryptoPriceTracker from '@/components/crypto-price-tracker'

export async function generateMetadata({ params }: { params: { cryptoId: string } }): Promise<Metadata> {
  const { cryptoId } = await params

  // 首先尝试从本地数据获取加密货币信息
  const localCrypto = TOP_CRYPTOCURRENCIES.find(c => c.id === cryptoId)

  // 如果在本地数据中找到，直接使用本地数据
  if (localCrypto) {
    return {
      title: `${localCrypto.name} ($${localCrypto.symbol.toUpperCase()}) Price - CryptoTick.live`,
      description: `Track ${localCrypto.name} price in real-time with CryptoTick.live`,
      manifest: `/manifest/${cryptoId}`,
      icons: {
        icon: localCrypto.image ? [{ url: localCrypto.image }] : undefined
      },
      keywords: `${localCrypto.name}, ${localCrypto.symbol.toUpperCase()}, cryptocurrency, crypto tracker, live prices`
    }
  }

  // 只有在本地数据中找不到时，才尝试从 API 获取
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
      { next: { revalidate: 86400 } } // 缓存24小时，减少 API 调用频率
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto info")
    }

    const data = await response.json()

    return {
      title: `${data.name} (${data.symbol.toUpperCase()}) Price - CryptoTick.live`,
      description: `Track ${data.name} price in real-time with CryptoTick.live`,
      manifest: `/manifest/${cryptoId}`,
      icons: {
        icon: data.image?.large ? [{ url: data.image.large }] : undefined
      },
      keywords: `${data.name}, ${data.symbol.toUpperCase()}, cryptocurrency, crypto tracker, live prices`
    }
  } catch (error) {
    // 如果 API 调用失败，使用默认加密货币
    const defaultCrypto = TOP_CRYPTOCURRENCIES[0]

    return {
      title: `${defaultCrypto.name} ($${defaultCrypto.symbol.toUpperCase()}) Price - CryptoTick.live`,
      description: `Track ${defaultCrypto.name} price in real-time with CryptoTick.live`,
      manifest: `/manifest/${cryptoId}`,
      icons: {
        icon: defaultCrypto.image ? [{ url: defaultCrypto.image }] : undefined
      }
    }
  }
}

export default async function CryptoPage({ params }: { params: { cryptoId: string } }) {
  const { cryptoId } = await params
  return <CryptoPriceTracker initialCrypto={cryptoId} />
}

// 为所有本地加密货币生成静态路径，以提高性能并减少 API 调用
export function generateStaticParams() {
  return TOP_CRYPTOCURRENCIES.map((crypto) => ({
    cryptoId: crypto.id,
  }))
} 