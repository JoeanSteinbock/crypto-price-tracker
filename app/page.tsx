"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Cast, Maximize2, Volume2, Zap, ArrowDown, Sparkles, Heart, Coffee, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CryptoCurrency, getTopNCryptos, TOP_CRYPTOCURRENCIES } from "@/data/cryptocurrencies"
import Link from "next/link"
import Image from "next/image"
import CryptoPriceTracker from "@/components/crypto-price-tracker"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { DonationButton } from "@/components/donation-button"

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

// 随机选择加密货币
function getRandomCryptos(count: number, excludeIds: string[] = []) {
  // 稳定币列表
  
  // 过滤掉已排除的加密货币和稳定币
  const availableCryptos = getTopNCryptos(count, excludeIds);
  // 随机打乱数组
  const shuffled = [...availableCryptos].sort(() => 0.5 - Math.random());
  
  // 返回指定数量的加密货币
  return shuffled.slice(0, count);
}

// 自定义 Hero 组件，使用 BackgroundPaths
function Hero() {
  return (
    <BackgroundPaths 
      title="CryptoTick.live" 
      subtitle="Real-time Cryptocurrency Price Tracker for Live Streaming and Broadcasting"
      buttonText="Launch Tracker"
      buttonLink="/bitcoin"
    />
  );
}

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [randomCryptos, setRandomCryptos] = useState<typeof TOP_CRYPTOCURRENCIES>([]);

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

    // 选择随机加密货币，排除前4个常见的
    const topCryptoIds = getTopNCryptos(4).map(c => c.id);
    setRandomCryptos(getRandomCryptos(8, topCryptoIds));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <main className="overflow-hidden relative min-h-screen bg-white dark:bg-black">
      {/* 使用新的 Hero 组件 */}
      <Hero />

      {/* Popular Cryptocurrencies Section */}
      <section className="relative py-24 bg-white dark:bg-black">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Popular Cryptocurrencies</h2>
          <div className="grid grid-cols-2 gap-4 mx-auto max-w-4xl md:grid-cols-4">
            {getTopNCryptos(4).map((crypto) => (
              <Link key={crypto.id} href={`/${crypto.id}`}>
                <Button
                  variant="outline"
                  className="flex flex-col gap-2 justify-center items-center w-full h-24 text-lg transition-all hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-900 group"
                >
                  {/* <span style={{ color: crypto.color }} className="text-3xl transition-transform transform group-hover:scale-110">{crypto.icon || crypto.symbol}</span> */}
                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                  <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Discover More Cryptocurrencies */}
      <section className="relative py-16 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container px-4 mx-auto">
          <h2 className="flex gap-2 justify-center items-center mb-8 text-2xl font-semibold text-center">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Discover More
          </h2>
          <div className="grid grid-cols-2 gap-3 mx-auto max-w-4xl sm:grid-cols-4">
            {randomCryptos.map((crypto) => (
              <Link key={crypto.id} href={`/${crypto.id}`}>
                <Button
                  variant="ghost"
                  className="flex gap-2 justify-start items-center px-3 py-2 w-full text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {crypto.image ? (
                    <img src={crypto.image} alt={crypto.name} className="w-5 h-5" />
                  ) : (
                    <span>{crypto.icon || crypto.symbol}</span>
                  )}
                  <span>{crypto.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
            <div className="p-2 mx-auto max-w-4xl bg-white rounded-xl border border-white shadow-2xl backdrop-blur-md dark:bg-gray-800/50 dark:border-gray-700/50">
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

      {/* Final CTA Section with Donation Button */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50 dark:from-blue-950/20 dark:to-green-950/20" />
        <div className="container relative px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">Start Tracking Now</h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Choose from over 1000 cryptocurrencies and start tracking in real-time. No registration required.
          </p>
          <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
            <Link href="/bitcoin">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 hover:shadow-xl">
                Launch Tracker
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <div className="flex justify-center items-center p-2 h-12 rounded-lg shadow-md backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
              <div className="flex gap-2 items-center px-8 py-0">
                  <DonationButton className="!text-lg" hideTextOnMobile={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

