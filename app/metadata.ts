// 从 layout.tsx 同步的关键词
export const siteKeywords = "cryptocurrency, bitcoin price, ethereum price, crypto tracker, live crypto prices, crypto broadcast, crypto streaming, digital signage, crypto display, large screen crypto, crypto TV display, crypto dashboard, BTC, ETH, SOL, market cap, trading volume, crypto presentation"

// 用于生成页面特定的关键词
export function generateKeywords(additionalKeywords: string[] = []): string {
  return [...siteKeywords.split(", "), ...additionalKeywords].join(", ")
} 