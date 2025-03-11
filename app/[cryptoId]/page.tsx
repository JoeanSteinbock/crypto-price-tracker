import { Metadata } from "next"
import { TOP_CRYPTOCURRENCIES } from "@/data/cryptocurrencies"
import { generateKeywords } from "@/app/metadata"
import { getServerApiService } from "@/lib/api-service"
import CryptoPageClient from "./client-page"

// 添加字符串反转函数
const reverseString = (str: string) => str.split('').reverse().join('');

export async function generateMetadata({ params }: { params: { cryptoId: string } }): Promise<Metadata> {
  const { cryptoId } = await params

  // 创建服务端 API 服务实例
  const apiService = getServerApiService((message: string) => {
    console.log(`[SERVER] ${message}`)
  })

  // 首先检查是否在本地数据中
  const localCrypto = TOP_CRYPTOCURRENCIES.find(
    (crypto) => crypto.id === cryptoId
  )

  // 构建OG图像URL
  const ogImageUrl = `/api/og/${cryptoId}`

  if (localCrypto) {
    return {
      title: `${localCrypto.name} ($${localCrypto.symbol.toUpperCase()}) Price - CryptoTick.live`,
      description: `Track ${localCrypto.name} price in real-time with CryptoTick.live`,
      manifest: `/manifest/${cryptoId}`,
      icons: {
        icon: localCrypto.image ? [{ url: localCrypto.image }] : undefined
      },
      openGraph: {
        title: `${localCrypto.name} ($${localCrypto.symbol.toUpperCase()}) Price`,
        description: `Track ${localCrypto.name} price in real-time with CryptoTick.live`,
        images: [{ url: ogImageUrl }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${localCrypto.name} ($${localCrypto.symbol.toUpperCase()}) Price`,
        description: `Track ${localCrypto.name} price in real-time with CryptoTick.live`,
        images: [ogImageUrl]
      },
      keywords: generateKeywords([
        localCrypto.name.toLowerCase(),
        localCrypto.symbol.toLowerCase(),
        `${localCrypto.symbol.toLowerCase()} price`,
        `${localCrypto.name.toLowerCase()} price`
      ])
    }
  }

  // 只有在本地数据中找不到时，才尝试从 API 获取
  try {
    // 使用我们的 API 服务来获取数据，而不是直接 fetch
    const cryptoInfo = await apiService.fetchCryptoInfo(cryptoId);

    if (!cryptoInfo) {
      throw new Error("Failed to fetch crypto info");
    }

    return {
      title: `${cryptoInfo.name} (${cryptoInfo.symbol.toUpperCase()}) Price - CryptoTick.live`,
      description: `Track ${cryptoInfo.name} price in real-time with CryptoTick.live`,
      manifest: `/manifest/${cryptoId}`,
      icons: {
        icon: cryptoInfo.image ? [{ url: cryptoInfo.image }] : undefined
      },
      openGraph: {
        title: `${cryptoInfo.name} (${cryptoInfo.symbol.toUpperCase()}) Price`,
        description: `Track ${cryptoInfo.name} price in real-time with CryptoTick.live`,
        images: [{ url: ogImageUrl }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${cryptoInfo.name} (${cryptoInfo.symbol.toUpperCase()}) Price`,
        description: `Track ${cryptoInfo.name} price in real-time with CryptoTick.live`,
        images: [ogImageUrl]
      },
      keywords: generateKeywords([
        cryptoInfo.name.toLowerCase(),
        cryptoInfo.symbol.toLowerCase(),
        `${cryptoInfo.symbol.toLowerCase()} price`,
        `${cryptoInfo.name.toLowerCase()} price`
      ])
    }
  } catch (error) {
    console.error(`Error fetching metadata for ${cryptoId}:`, error)

    // 回退到默认元数据
    return {
      title: `Cryptocurrency Price Tracker - CryptoTick.live`,
      description: `Track cryptocurrency prices in real-time with CryptoTick.live`,
      manifest: `/manifest/${cryptoId}`,
      openGraph: {
        title: `Cryptocurrency Price Tracker - CryptoTick.live`,
        description: `Track cryptocurrency prices in real-time with CryptoTick.live`,
        images: [{ url: ogImageUrl }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `Cryptocurrency Price Tracker - CryptoTick.live`,
        description: `Track cryptocurrency prices in real-time with CryptoTick.live`,
        images: [ogImageUrl]
      }
    }
  }
}

export default async function CryptoPage({ 
  params, 
  searchParams 
}: { 
  params: { cryptoId: string }, 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const { cryptoId } = await params
  const { pm, api_key, api_type } = await searchParams

  // 处理 API key 参数（如果存在）
  let apiKey = "";
  let apiKeyType: "demo" | "pro" | null = null;

  if (typeof api_key === 'string') {
    // 反转 API key
    apiKey = reverseString(api_key);
    if (typeof api_type === 'string' && (api_type === 'demo' || api_type === 'pro')) {
      apiKeyType = api_type;
    } else {
      // 根据密钥前缀推断类型
      apiKeyType = apiKey.startsWith('demo_') ? 'demo' : 'pro';
    }
  }

  const presentationMode = pm === "1" || pm === "true"
  
  return (
    <CryptoPageClient 
      cryptoId={cryptoId} 
      presentationMode={presentationMode}
      initialApiKey={apiKey}
      initialApiKeyType={apiKeyType}
    />
  )
}

// 生成所有已知加密货币的静态路径，提高性能
export function generateStaticParams() {
  return TOP_CRYPTOCURRENCIES.map((crypto) => ({
    cryptoId: crypto.id,
  }))
} 