'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

// 为window.gtag添加类型定义
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: Record<string, any> | string
    ) => void;
    dataLayer: any[];
  }
}

// 创建一个内部组件来使用useSearchParams
function AnalyticsTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-C0852F11XB"

  // 页面浏览跟踪
  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && window.gtag) {
      // 检查用户是否已同意Cookie
      const hasConsented = localStorage.getItem('cookie-consent')
      if (hasConsented !== 'true') return // 如果用户未同意，不发送事件
      
      // 构建完整URL
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // 发送页面浏览事件
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: url,
        send_to: gaId
      })

      // 如果是加密货币详情页，发送加密货币浏览事件
      if (pathname.startsWith('/') && pathname.length > 1) {
        const cryptoId = pathname.substring(1) // 移除开头的斜杠
        window.gtag('event', 'view_crypto', {
          'crypto_id': cryptoId,
          'page_title': document.title
        })
      }
    }
  }, [pathname, searchParams, gaId])

  return null
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-C0852F11XB"

  // 如果没有设置GA ID，则不加载GA
  if (!gaId) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // 默认拒绝分析存储，直到用户同意
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            
            // 配置GA
            gtag('config', '${gaId}', {
              page_location: window.location.href,
              page_path: window.location.pathname,
              send_page_view: false
            });
            
            // 检查用户是否已同意Cookie
            const hasConsented = localStorage.getItem('cookie-consent');
            if (hasConsented === 'true') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsTracking />
      </Suspense>
    </>
  )
} 