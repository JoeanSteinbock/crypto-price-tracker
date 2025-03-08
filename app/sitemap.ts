import type { MetadataRoute } from "next"
import { TOP_CRYPTOCURRENCIES } from "@/data/cryptocurrencies"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cryptotick.live"

  // 创建每个加密货币的站点地图条目
  const cryptoEntries = TOP_CRYPTOCURRENCIES.map((crypto) => ({
    url: `${baseUrl}/${crypto.id}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1,
    },
    ...cryptoEntries,
  ]
}

