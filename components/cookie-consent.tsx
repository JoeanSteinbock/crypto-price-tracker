'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// 分离出使用 useSearchParams 的子组件
function CookieConsentContent() {
  const [showConsent, setShowConsent] = useState(false)
  const searchParams = useSearchParams()
  const presentationMode = searchParams?.get('pm') === '1' || searchParams?.get('pm') === 'true'

  useEffect(() => {
    // 如果是演示模式，自动授予 cookie 同意
    if (presentationMode) {
      localStorage.setItem('cookie-consent', 'true')
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        })
      }
      return
    }

    // 检查用户是否已经同意 cookies
    const hasConsented = localStorage.getItem('cookie-consent')
    if (!hasConsented) {
      setShowConsent(true)
    }

    // 如果用户已同意，确保 Google Analytics 正常工作
    if (hasConsented === 'true' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
  }, [presentationMode])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true')
    setShowConsent(false)
    
    // Notify Google Analytics that user has consented
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false')
    setShowConsent(false)
    
    // Notify Google Analytics that user has declined
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
  }

  if (!showConsent || presentationMode) return null

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 p-4 bg-gray-100 shadow-lg dark:bg-gray-800">
      <div className="container flex flex-col gap-4 justify-between items-center mx-auto md:flex-row">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to improve your browsing experience, analyze site traffic, and personalize content.
            By clicking "Accept", you agree to our use of all cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={declineCookies}>
            Reject All
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            Accept All
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowConsent(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// 主组件
export function CookieConsent() {
  return (
    <Suspense fallback={null}>
      <CookieConsentContent />
    </Suspense>
  )
}