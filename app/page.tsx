"use client"

import CryptoPriceTracker from "@/components/crypto-price-tracker"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful');
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }

    // 添加 PWA 安装提示
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // 可以在这里添加自定义安装提示UI
    });
  }, []);

  return (
    <main className="relative">
      {/* 移除固定定位的 logo */}
      <CryptoPriceTracker />
    </main>
  )
}

