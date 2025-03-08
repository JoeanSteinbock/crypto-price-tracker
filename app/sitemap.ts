import type { MetadataRoute } from "next"

// Available cryptocurrencies
const CRYPTOS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.com"

  // Create sitemap entries for each cryptocurrency
  const cryptoEntries = CRYPTOS.map((crypto) => ({
    url: `${baseUrl}/${crypto.id}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...cryptoEntries,
  ]
}

