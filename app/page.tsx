"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Cast, Maximize2, Volume2, Zap, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TOP_CRYPTOCURRENCIES } from "@/data/cryptocurrencies"
import Link from "next/link"
import Image from "next/image"
import CryptoPriceTracker from "@/components/crypto-price-tracker"

// 同步自 layout.tsx 的关键词
// export const metadata = {
//   keywords: "cryptocurrency, bitcoin price, ethereum price, crypto tracker, live crypto prices, crypto broadcast, crypto streaming, digital signage, crypto display, large screen crypto, crypto TV display, crypto dashboard, BTC, ETH, SOL, market cap, trading volume, crypto presentation"
// }

// 创建一个特殊的演示模式组件
function DemoCryptoPriceTracker({ isMobile }: { isMobile: boolean }) {
  // 使用 useEffect 手动添加演示模式类
  useEffect(() => {
    // 如果是移动设备，不应用演示模式
    if (isMobile) return;
    
    // 找到组件的容器元素
    const container = document.querySelector('.demo-presentation-mode');
    if (container) {
      // 找到内部的主容器
      const innerContainer = container.querySelector('div');
      if (innerContainer) {
        innerContainer.classList.add('force-presentation-mode');
        
        // 找到内部的 min-h-[100dvh] 容器并移除最小高度
        const minHeightContainer = innerContainer.querySelector('div');
        if (minHeightContainer) {
          minHeightContainer.classList.remove('min-h-[100dvh]');
          minHeightContainer.style.minHeight = 'auto';
          minHeightContainer.style.height = '100%';
        }
      }
    }
  }, [isMobile]);
  
  return (
    <div className="h-full demo-presentation-mode">
      <CryptoPriceTracker 
        initialCrypto="bitcoin" 
        presentationMode={!isMobile} // 只在非移动设备上启用演示模式
      />
    </div>
  );
}

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    // 检测是否是移动设备
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 小于 768px 视为移动设备
    };
    
    // 初始检测
    checkIfMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile);

    // 添加滚动监听器来控制演示区域的显示
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const demoSection = document.getElementById('demo-section');
      if (demoSection) {
        const demoPosition = demoSection.offsetTop - window.innerHeight / 2;
        if (scrollPosition > demoPosition) {
          setShowDemo(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <main className="overflow-hidden relative min-h-screen bg-white dark:bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20" />

      {/* Hero Section with Animated Background */}
      <div className="relative">
        <div className="overflow-hidden absolute inset-0">
          <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:60px_60px] dark:bg-grid-white/[0.02]" />
        </div>
        
        <div className="flex relative flex-col justify-center items-center px-4 py-24 min-h-screen text-center">
          <div className="animate-fade-in">
            <div className="flex gap-3 items-center mb-8 animate-slide-down">
              <Image
                src="/logo.svg"
                alt="CryptoTick.live Logo"
                width={64}
                height={64}
                priority
                className="animate-pulse"
              />
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                CryptoTick<span className="text-blue-500">.live</span>
              </h1>
            </div>
            
            <h2 className="mb-6 max-w-3xl text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 sm:text-5xl lg:text-6xl dark:from-white dark:to-gray-200">
              Real-time Cryptocurrency Price Tracker for{" "}
              <span className="text-blue-500">Live Streaming</span> and{" "}
              <span className="text-green-500">Broadcasting</span>
            </h2>
            
            <p className="mx-auto mb-12 max-w-xl text-xl text-gray-600 dark:text-gray-400">
              Perfect for streamers, content creators, and digital displays. Track crypto prices with style.
            </p>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-2 gap-4 mx-auto mb-12 max-w-4xl md:grid-cols-4">
              {TOP_CRYPTOCURRENCIES.slice(0, 4).map((crypto) => (
                <Link key={crypto.id} href={`/${crypto.id}`}>
                  <Button
                    variant="outline"
                    className="flex flex-col gap-2 justify-center items-center w-full h-24 text-lg transition-all hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-900 group"
                  >
                    <span className="text-3xl transition-transform transform group-hover:scale-110">{crypto.icon}</span>
                    <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
                  </Button>
                </Link>
              ))}
            </div>

            {/* Main CTA */}
            <div className="flex flex-col gap-6 items-center">
              <Link href="/bitcoin">
                <Button size="lg" className="px-8 py-6 text-lg bg-blue-600 shadow-lg transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:shadow-xl">
                  Launch Tracker
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <button 
                onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex gap-2 items-center text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                See It In Action
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section with Bitcoin Tracker in Presentation Mode */}
      <section id="demo-section" className="relative py-16 bg-gray-900 dark:bg-black">
        <div className="container px-4 mx-auto">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">
              See It In Action
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Experience the real-time Bitcoin tracker{isMobile ? "." : " in presentation mode. Perfect for streaming and broadcasting."}
              {isMobile && " For the full presentation mode, try on a larger screen."}
            </p>
          </div>
          
          <div className={`transition-all duration-1000 transform ${showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="p-2 mx-auto max-w-4xl rounded-xl border shadow-2xl backdrop-blur-md bg-gray-800/50 border-gray-700/50">
              <div className="overflow-hidden relative rounded-lg demo-container" style={{ height: '500px', isolation: 'isolate' }}>
                {showDemo && (
                  <div className="absolute inset-0 z-10 pointer-events-none presentation-container">
                    <DemoCryptoPriceTracker isMobile={isMobile} />
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 text-sm text-center text-gray-400">
              {isMobile ? 
                "This is a simplified preview. For the full presentation mode, try on a larger screen." :
                "This is a preview of the presentation mode. Controls are disabled in this demo."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section id="features" className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center">
            Powerful Features for Professional Use
          </h2>
          
          <div className="grid gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative p-8 bg-white rounded-2xl shadow-lg transition-all group dark:bg-gray-800 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl opacity-0 transition-opacity dark:from-yellow-900/20 dark:to-yellow-800/10 group-hover:opacity-100" />
              <div className="relative">
                <Zap className="mb-4 w-12 h-12 text-yellow-500" />
                <h3 className="mb-3 text-xl font-semibold">Real-time Updates</h3>
                <p className="text-gray-600 dark:text-gray-400">Live price updates with micro-fluctuations for smooth transitions</p>
              </div>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-lg transition-all group dark:bg-gray-800 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl opacity-0 transition-opacity dark:from-blue-900/20 dark:to-blue-800/10 group-hover:opacity-100" />
              <div className="relative">
                <Cast className="mb-4 w-12 h-12 text-blue-500" />
                <h3 className="mb-3 text-xl font-semibold">Streaming Ready</h3>
                <p className="text-gray-600 dark:text-gray-400">Perfect for OBS, Streamlabs, and other broadcasting software</p>
              </div>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-lg transition-all group dark:bg-gray-800 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl opacity-0 transition-opacity dark:from-green-900/20 dark:to-green-800/10 group-hover:opacity-100" />
              <div className="relative">
                <Volume2 className="mb-4 w-12 h-12 text-green-500" />
                <h3 className="mb-3 text-xl font-semibold">Price Alerts</h3>
                <p className="text-gray-600 dark:text-gray-400">Audio feedback for price changes and market movements</p>
              </div>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-lg transition-all group dark:bg-gray-800 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl opacity-0 transition-opacity dark:from-purple-900/20 dark:to-purple-800/10 group-hover:opacity-100" />
              <div className="relative">
                <Maximize2 className="mb-4 w-12 h-12 text-purple-500" />
                <h3 className="mb-3 text-xl font-semibold">Presentation Mode</h3>
                <p className="text-gray-600 dark:text-gray-400">Full-screen display with clean interface for professional use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50 dark:from-blue-950/20 dark:to-green-950/20" />
        <div className="container relative px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">Start Tracking Now</h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Choose from over 1000 cryptocurrencies and start tracking in real-time. No registration required.
          </p>
          <Link href="/bitcoin">
            <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 hover:shadow-xl">
              Launch Tracker
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

