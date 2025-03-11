"use client"

import dynamic from "next/dynamic"

// 使用 dynamic 导入禁用组件预渲染，因为它使用了浏览器特性
const CryptoPriceTrackerNoSSR = dynamic(
  () => import("@/components/crypto-price-tracker"),
  { ssr: false }
)

export default function CryptoPageClient({ 
  cryptoId, 
  presentationMode 
}: { 
  cryptoId: string; 
  presentationMode: boolean;
}) {
  return (
    <div className="flex overflow-hidden relative h-screen">
      <CryptoPriceTrackerNoSSR
        initialCrypto={cryptoId}
        presentationMode={presentationMode}
      />
    </div>
  )
} 