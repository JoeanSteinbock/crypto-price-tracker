"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Search, Heart, Coffee, X, Copy, Check, ChevronRight } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { ToolbarMenu } from "@/components/toolbar-menu"
import { PriceChart } from "@/components/price-chart"
import Image from "next/image"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TOP_CRYPTOCURRENCIES, DEFAULT_CRYPTOCURRENCIES, CryptoCurrency } from "../data/cryptocurrencies"
import { AnimatedGradientText } from "./animated-logo-text"
import { DonationButton } from "@/components/donation-button"
import Link from "next/link"

type PriceData = {
  current_price: number
  price_change_percentage_24h: number
  high_24h: number
  low_24h: number
  total_volume: number
  market_cap: number
  last_updated: string
}

// Default cryptocurrencies
const DEFAULT_CRYPTOS: CryptoCurrency[] = DEFAULT_CRYPTOCURRENCIES;

// 更新所有的本地存储键名
const STORAGE_KEY = "cryptotick-favorites"

// 在组件的顶部添加一个日志函数
const logDebug = (message: string, data?: any) => {
  console.debug(`[CryptoTick] ${message}`, data || '');
};

export default function CryptoPriceTracker({ 
  initialCrypto = "bitcoin", 
  presentationMode = false 
}: { 
  initialCrypto?: string,
  presentationMode?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const apiIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const microIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastFetchTimeRef = useRef<number>(0)

  // 先初始化状态变量
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(() => {
    // 简化的初始化逻辑，只从默认列表中查找
    const cryptoFromDefault = TOP_CRYPTOCURRENCIES.find((c) => c.id === initialCrypto);
    return cryptoFromDefault || DEFAULT_CRYPTOCURRENCIES[0];
  });

  // 初始化占位价格数据
  const placeholderPriceData: PriceData = {
    current_price: 0,
    price_change_percentage_24h: 0,
    high_24h: 0,
    low_24h: 0,
    total_volume: 0,
    market_cap: 0,
    last_updated: new Date().toISOString()
  };

  const [priceData, setPriceData] = useState<PriceData | null>(placeholderPriceData)
  const [displayPrice, setDisplayPrice] = useState<number | null>(0)
  const [previousPrice, setPreviousPrice] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<CryptoCurrency[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [favoriteCoins, setFavoriteCoins] = useState<CryptoCurrency[]>([])
  const [availableCryptos, setAvailableCryptos] = useState<CryptoCurrency[]>(DEFAULT_CRYPTOCURRENCIES)

  // 在状态初始化后，添加一个 useEffect 来处理初始加密货币
  useEffect(() => {
    // 这个函数现在可以安全地访问所有状态变量
    const findAndSetInitialCrypto = () => {
      logDebug(`Finding initial crypto from URL param: ${initialCrypto}`);

      // 首先在默认列表中查找
      const cryptoFromDefault = DEFAULT_CRYPTOCURRENCIES.find((c) => c.id === initialCrypto);
      if (cryptoFromDefault) {
        logDebug(`Found matching crypto in defaults: ${cryptoFromDefault.name}`);
        setSelectedCrypto(cryptoFromDefault);
        return;
      }

      // 然后在收藏夹中查找
      const cryptoFromFavorites = favoriteCoins.find((c) => c.id === initialCrypto);
      if (cryptoFromFavorites) {
        logDebug(`Found matching crypto in favorites: ${cryptoFromFavorites.name}`);
        setSelectedCrypto(cryptoFromFavorites);
        return;
      }

      // 如果都找不到，创建一个临时的加密货币对象
      if (initialCrypto !== selectedCrypto.id) {
        logDebug(`Creating temporary crypto object for: ${initialCrypto}`);

        // 设置临时对象
        setSelectedCrypto({
          id: initialCrypto,
          symbol: "...",
          name: "Loading...",
          icon: "",
          color: "#808080"
        });

        // 尝试从 API 获取详细信息
        fetchCryptoInfo(initialCrypto);
      }
    };

    findAndSetInitialCrypto();
  }, [initialCrypto, favoriteCoins]); // 依赖项包括 initialCrypto 和 favoriteCoins

  // Load favorite cryptocurrencies from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEY)
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        setFavoriteCoins(parsed)
        setAvailableCryptos([...DEFAULT_CRYPTOCURRENCIES, ...parsed.filter(
          (coin: CryptoCurrency) => !DEFAULT_CRYPTOCURRENCIES.some(defaultCoin => defaultCoin.id === coin.id)
        )])
      } catch (e) {
        console.error("Failed to parse saved favorites:", e)
      }
    }
  }, [])

  // Save favorite cryptocurrencies to local storage
  useEffect(() => {
    if (favoriteCoins && favoriteCoins.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteCoins))
    }
  }, [favoriteCoins])

  // Search for cryptocurrencies
  const searchCryptos = async (term: string) => {
    if (!term || term.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(term)}`
      )

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()

      // Convert search results to our CryptoCurrency type
      const formattedResults = data.coins.slice(0, 10).map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        icon: coin.thumb || "",
        color: "#808080" // Default color
      }))

      setSearchResults(formattedResults)
    } catch (error) {
      console.error("Error searching cryptos:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Add to favorites
  const addToFavorites = (crypto: CryptoCurrency) => {
    if (!favoriteCoins.some(coin => coin.id === crypto.id)) {
      logDebug(`Adding ${crypto.name} to favorites`);
      const updatedFavorites = [...favoriteCoins, crypto]
      setFavoriteCoins(updatedFavorites)
      setAvailableCryptos([...DEFAULT_CRYPTOS, ...updatedFavorites.filter(
        coin => !DEFAULT_CRYPTOS.some(defaultCoin => defaultCoin.id === coin.id)
      )])
      
      // 保存到本地存储
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))
      
      // 发送Google Analytics事件
      try {
        // 检查用户是否已同意Cookie
        const hasConsented = localStorage.getItem('cookie-consent')
        if (hasConsented === 'true' && typeof window !== 'undefined' && 'gtag' in window) {
          window.gtag('event', 'add_to_favorites', {
            'crypto_id': crypto.id,
            'crypto_name': crypto.name
          });
        }
      } catch (e) {
        console.error('Failed to send analytics event:', e);
      }
    }
  }

  // Remove from favorites
  const removeFromFavorites = (cryptoId: string) => {
    logDebug(`Removing ${cryptoId} from favorites`);
    const updatedFavorites = favoriteCoins.filter(coin => coin.id !== cryptoId)
    setFavoriteCoins(updatedFavorites)
    
    // Save to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))
    
    // If the currently selected crypto is removed, switch to bitcoin
    if (selectedCrypto.id === cryptoId) {
      handleCryptoChange(DEFAULT_CRYPTOS[0])
    }

    // Update available cryptocurrencies list
    setAvailableCryptos([...DEFAULT_CRYPTOS, ...updatedFavorites.filter(
      coin => !DEFAULT_CRYPTOS.some(defaultCoin => defaultCoin.id === coin.id)
    )])
    
    // 发送Google Analytics事件
    try {
      // 检查用户是否已同意Cookie
      const hasConsented = localStorage.getItem('cookie-consent')
      if (hasConsented === 'true' && typeof window !== 'undefined' && 'gtag' in window) {
        window.gtag('event', 'remove_from_favorites', {
          'crypto_id': cryptoId
        });
      }
    } catch (e) {
      console.error('Failed to send analytics event:', e);
    }
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    // Debounce search
    const handler = setTimeout(() => {
      searchCryptos(term)
    }, 500)

    return () => clearTimeout(handler)
  }

  // Update URL when crypto changes
  useEffect(() => {
    // 检查当前路径是否与选定的加密货币匹配
    const currentCryptoId = pathname.substring(1); // 移除开头的 '/'

    logDebug(`URL update check - Current path: ${pathname}, Selected crypto: ${selectedCrypto.id}`);
    logDebug(`Loading state: ${isLoading}, Has price data: ${priceData !== null}`);

    // 只有在以下情况下才更新 URL：
    // 1. 当前路径不是空（不是首页）
    // 2. 当前路径与选定的加密货币不匹配
    // 3. 不是在初始加载过程中
    if (currentCryptoId &&
      currentCryptoId !== selectedCrypto.id &&
      !isLoading &&
      priceData !== null) {
      logDebug(`Updating URL to match selected crypto: ${selectedCrypto.id}`);
      router.push(`/${selectedCrypto.id}`, { scroll: false })
    }
  }, [selectedCrypto.id, router, pathname, isLoading, priceData])

  // Fetch price data from CoinGecko API
  const fetchPriceData = useCallback(async (retryCount = 0) => {
    logDebug(`Fetching price data for ${selectedCrypto.id}, attempt ${retryCount + 1}`);

    try {
      // Prevent too frequent API calls
      const now = Date.now()
      if (now - lastFetchTimeRef.current < 5000 && !isLoading) {
        logDebug(`Skipping API call, too frequent (${now - lastFetchTimeRef.current}ms since last call)`);
        return
      }

      lastFetchTimeRef.current = now

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      )

      logDebug(`Price data API response status: ${response.status}`);

      if (!response.ok) {
        // 检查是否是 429 错误
        if (response.status === 429) {
          throw new Error("Rate limit exceeded (429)")
        }
        throw new Error(`Failed to fetch data: ${response.status}`)
      }

      const data = await response.json()

      // Save previous price for animation
      if (priceData) {
        setPreviousPrice(priceData.current_price)
      }

      // Extract icon URL if available
      const iconUrl = data.image?.large || data.image?.small || null;
      if (iconUrl && selectedCrypto.icon !== iconUrl) {
        // Update the crypto object with the real icon URL
        setSelectedCrypto(prev => ({
          ...prev,
          icon: iconUrl
        }));
      }

      const newPriceData = {
        current_price: data.market_data.current_price.usd,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        high_24h: data.market_data.high_24h.usd,
        low_24h: data.market_data.low_24h.usd,
        total_volume: data.market_data.total_volume.usd,
        market_cap: data.market_data.market_cap.usd,
        last_updated: data.market_data.last_updated,
      }

      // 添加显著价格变化的阈值检测
      if (previousPrice !== null) {
        const priceChange = Math.abs(newPriceData.current_price - previousPrice)
        const changePercentage = (priceChange / previousPrice) * 100

        // 只有当价格变化超过 0.1% 时才触发声音
        if (changePercentage > 0.1) {
          const event = new CustomEvent("price-change", {
            detail: {
              direction: newPriceData.current_price > previousPrice ? "up" : "down",
              isNewData: true, // 标记这是新数据
            },
          })
          window.dispatchEvent(event)
        }
      }

      setPriceData(newPriceData)
      setDisplayPrice(newPriceData.current_price)
      setPreviousPrice(newPriceData.current_price)
      setIsLoading(false)

      logDebug(`Price data updated: ${newPriceData.current_price}`);
    } catch (error: any) {
      console.error("Error fetching price data:", error)

      // 如果是 429 错误，并且重试次数小于最大重试次数，则延迟后重试
      if (error.message && error.message.includes("429") && retryCount < 3) {
        logDebug(`Rate limit hit, retrying price data in ${(retryCount + 1) * 2} seconds... (Attempt ${retryCount + 1}/3)`);

        // 延迟时间随重试次数增加
        const delayTime = (retryCount + 1) * 2000 // 2秒, 4秒, 6秒

        setTimeout(() => {
          fetchPriceData(retryCount + 1)
        }, delayTime)

        return
      }

      logDebug(`Failed to fetch price data after retries`);
      setIsLoading(false)
    }
  }, [selectedCrypto.id, isLoading, priceData, previousPrice])

  // Set up API polling
  useEffect(() => {
    // Clear existing intervals when crypto changes
    if (apiIntervalRef.current) {
      clearInterval(apiIntervalRef.current)
    }

    // Initial fetch
    fetchPriceData()

    // Set up polling interval (every 8 seconds)
    apiIntervalRef.current = setInterval(fetchPriceData, 8000)

    // Clean up interval on unmount or when crypto changes
    return () => {
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current)
        apiIntervalRef.current = null
      }
    }
  }, [selectedCrypto.id, fetchPriceData])

  // Create micro-fluctuations
  const createMicroFluctuation = useCallback(() => {
    if (!priceData || !displayPrice) return

    // Generate a smaller fluctuation (±0.02% of current price)
    const fluctuationPercent = Math.random() * 0.04 - 0.02
    const fluctuationAmount = priceData.current_price * (fluctuationPercent / 100)

    // Calculate new display price with the fluctuation
    const newDisplayPrice = displayPrice + fluctuationAmount

    // Ensure the price stays within a reasonable range (±0.2%)
    const maxDeviation = priceData.current_price * 0.002
    const upperBound = priceData.current_price + maxDeviation
    const lowerBound = priceData.current_price - maxDeviation

    const boundedPrice = Math.min(Math.max(newDisplayPrice, lowerBound), upperBound)

    // Store previous price before updating
    const oldPrice = displayPrice

    // Update display price
    setDisplayPrice(boundedPrice)
    setPreviousPrice(oldPrice)

    // Determine price direction and dispatch custom event for audio
    const direction = boundedPrice > oldPrice ? "up" : boundedPrice < oldPrice ? "down" : null

    // Only dispatch event if direction changed
    if (direction) {
      logDebug("Dispatching price-change event:", direction)
      const event = new CustomEvent("price-change", {
        detail: { direction },
      })
      window.dispatchEvent(event)
    }
  }, [priceData, displayPrice])

  // Set up micro-fluctuations
  useEffect(() => {
    if (!priceData || isLoading) return

    // Clear existing interval
    if (microIntervalRef.current) {
      clearInterval(microIntervalRef.current)
    }

    // Run micro-fluctuations every 100ms
    microIntervalRef.current = setInterval(createMicroFluctuation, 100)

    // Clean up interval on unmount or when dependencies change
    return () => {
      if (microIntervalRef.current) {
        clearInterval(microIntervalRef.current)
        microIntervalRef.current = null
      }
    }
  }, [priceData, isLoading, createMicroFluctuation])

  // Handle crypto selection change
  const handleCryptoChange = (crypto: CryptoCurrency) => {
    // 只有当选择了不同的加密货币时才更新
    if (crypto.id !== selectedCrypto.id) {
      logDebug(`User selected new crypto: ${crypto.id} (${crypto.name})`);
      setSelectedCrypto(crypto)
      setIsLoading(true)
      setPriceData(null)
      setDisplayPrice(null)
      setPreviousPrice(null)

      // 更新 URL 以反映所选加密货币
      logDebug(`Pushing new URL: /${crypto.id}`);
      router.push(`/${crypto.id}`, { scroll: false })
      
      // 触发加密货币变化事件，用于同步音频状态
      window.dispatchEvent(new Event('crypto-changed'));
      
      // 发送Google Analytics事件
      try {
        // 检查用户是否已同意Cookie
        const hasConsented = localStorage.getItem('cookie-consent')
        if (hasConsented === 'true' && typeof window !== 'undefined' && 'gtag' in window) {
          // @ts-ignore - 我们已经检查了gtag是否存在
          window.gtag('event', 'select_crypto', {
            'crypto_id': crypto.id,
            'crypto_name': crypto.name,
            'crypto_symbol': crypto.symbol
          });
        }
      } catch (e) {
        console.error('Failed to send analytics event:', e);
      }
    } else {
      logDebug(`User selected same crypto: ${crypto.id}, no change needed`);
    }
  }

  // 从 API 获取加密货币信息
  const fetchCryptoInfo = async (cryptoId: string, attemptCount = 0) => {
    logDebug(`Fetching crypto info for ${cryptoId}, attempt ${attemptCount + 1}`);

    try {
      // 显示加载状态
      setIsLoading(true)
      // 如果是重试，设置重试状态
      if (attemptCount > 0) {
        setIsRetrying(true)
        setRetryCount(attemptCount)
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
      )

      logDebug(`API response status for ${cryptoId}: ${response.status}`);

      if (!response.ok) {
        // 检查是否是 429 错误
        if (response.status === 429) {
          throw new Error("Rate limit exceeded (429)")
        }
        throw new Error(`Failed to fetch crypto info: ${response.status}`)
      }

      // 成功获取数据，重置重试状态
      setIsRetrying(false)
      setRetryCount(0)

      const data = await response.json()
      logDebug(`Successfully fetched data for ${cryptoId}:`, data.id);

      // 创建新的加密货币对象
      const newCrypto: CryptoCurrency = {
        id: data.id,
        symbol: data.symbol.toUpperCase(),
        name: data.name,
        icon: data.image?.thumb || "",
        color: "#808080" // 默认颜色
      }

      logDebug(`Created new crypto object:`, newCrypto);

      // 设置为当前选中的加密货币
      setSelectedCrypto(newCrypto)

      // 如果这个加密货币不在收藏夹中，添加它
      if (!favoriteCoins.some(coin => coin.id === newCrypto.id) &&
        !DEFAULT_CRYPTOCURRENCIES.some(coin => coin.id === newCrypto.id)) {
        logDebug(`Adding ${newCrypto.id} to favorites`);
        addToFavorites(newCrypto)
      }

      // 成功获取信息后，获取价格数据
      logDebug(`Fetching price data for ${newCrypto.id}`);
      fetchPriceData()
    } catch (error: any) {
      console.error(`Error fetching crypto info for ${cryptoId}:`, error)

      // 如果是 429 错误，并且重试次数小于最大重试次数，则延迟后重试
      if (error.message && error.message.includes("429") && attemptCount < 3) {
        logDebug(`Rate limit hit, retrying in ${(attemptCount + 1) * 2} seconds... (Attempt ${attemptCount + 1}/3)`);

        // 显示重试状态
        setIsLoading(true)
        setIsRetrying(true)
        setRetryCount(attemptCount + 1)

        // 延迟时间随重试次数增加
        const delayTime = (attemptCount + 1) * 2000 // 2秒, 4秒, 6秒

        setTimeout(() => {
          fetchCryptoInfo(cryptoId, attemptCount + 1)
        }, delayTime)

        return
      }

      // 重置重试状态
      setIsRetrying(false)
      setRetryCount(0)
      
      // 设置占位数据，而不是显示空白
      logDebug(`Failed to fetch info for ${cryptoId} after retries, showing placeholder data`);
      
      // 尝试获取一个合理的基准价格
      let basePrice = 0;
      
      // 如果是已知的加密货币，使用一个合理的默认价格
      if (cryptoId === 'bitcoin') basePrice = 50000;
      else if (cryptoId === 'ethereum') basePrice = 3000;
      else if (cryptoId === 'binancecoin') basePrice = 500;
      else if (cryptoId === 'solana') basePrice = 100;
      else if (cryptoId === 'cardano') basePrice = 0.5;
      else if (cryptoId === 'ripple') basePrice = 0.5;
      else basePrice = 100; // 默认价格
      
      // 设置占位价格数据
      const placeholderPriceData: PriceData = {
        current_price: basePrice,
        price_change_percentage_24h: 0,
        high_24h: basePrice * 1.05, // 高点比当前价格高5%
        low_24h: basePrice * 0.95,  // 低点比当前价格低5%
        total_volume: basePrice * 1000000, // 交易量
        market_cap: basePrice * 100000000, // 市值
        last_updated: new Date().toISOString()
      };
      
      setPriceData(placeholderPriceData);
      setDisplayPrice(basePrice);
      setPreviousPrice(basePrice);
      setIsLoading(false);
    }
  }

  // Format large numbers with commas and abbreviations
  const formatNumber = (num: number, digits = 2) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`
    return `$${num.toFixed(digits)}`
  }

  // Format price with commas
  const formatPrice = (price: number) => {
    // 确定需要显示的小数位数
    let decimalPlaces = 2; // 默认显示2位小数

    // 根据价格大小动态调整小数位数
    if (price < 0.0001) {
      decimalPlaces = 8; // 极小价格显示8位小数
    } else if (price < 0.001) {
      decimalPlaces = 6; // 很小价格显示6位小数
    } else if (price < 0.01) {
      decimalPlaces = 5; // 小价格显示5位小数
    } else if (price < 0.1) {
      decimalPlaces = 4; // 较小价格显示4位小数
    } else if (price < 1) {
      decimalPlaces = 3; // 小于1的价格显示3位小数
    }

    // 使用toLocaleString格式化价格，应用动态小数位数
    const priceStr = price.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    })

    // 分割为整数部分和小数部分
    const [dollars, cents] = priceStr.split(".")

    return { dollars, cents }
  }

  // Determine if price has increased or decreased
  const getPriceDirection = () => {
    if (!previousPrice || displayPrice === null) return null
    if (displayPrice > previousPrice) return "up"
    if (displayPrice < previousPrice) return "down"
    return null
  }

  const priceDirection = getPriceDirection()

  // Define a function to get a crypto emoji based on its ID
  const getCryptoEmoji = (id: string) => {
    switch (id) {
      case "bitcoin":
        return "₿"
      case "ethereum":
        return "Ξ"
      case "solana":
        return "Ⓢ"
      case "dogecoin":
        return "Ð"
      case "pi-network":
        return "π"
      default:
        return "🪙"
    }
  }

  useEffect(() => {
    // 如果启用了演示模式，添加演示模式类
    if (presentationMode) {
      // 检查是否在演示容器中
      const isInDemoContainer = document.querySelector('.demo-container') !== null;
      
      // 只有在不是演示容器中时才添加演示模式类到 body
      if (!isInDemoContainer) {
        document.body.classList.add('presentation-mode');
      } else {
        // 如果在演示容器中，添加特殊的类到当前组件
        const container = document.querySelector('.demo-presentation-mode');
        if (container) {
          const innerContainer = container.querySelector('div');
          if (innerContainer) {
            innerContainer.classList.add('force-presentation-mode', 'dark:bg-black');
          }
        }
      }
    }

    // 清理函数
    return () => {
      if (presentationMode) {
        document.body.classList.remove('presentation-mode');
      }
    };
  }, [presentationMode]);

  return (
    <div className={`relative ${!presentationMode ? 'min-h-screen w-[100vw]' : ''}`}>
      <div className="flex flex-col justify-center items-center p-4 min-h-[100dvh] lg:w-[100vw] text-gray-900 bg-white transition-colors duration-200 dark:bg-black dark:text-white mobileLandscape:pt-0 mobileLandscape:justify-start">
        <div className="relative w-full max-w-3xl h-auto">
          {/* 将图表移到最上层，使用更高的z-index */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <PriceChart currentPrice={displayPrice} cryptoId={selectedCrypto.id} />
          </div>

          {/* 头部导航栏 */}
          <div className="flex relative z-30 justify-between items-center mb-4 sm:mb-8 controls-container mobileLandscape:flex-row-reverse mobileLandscape:mb-4 mobileLandscape:mt-[-60px]">
            <div className="flex gap-2 items-center logo-container">
              <Link href="/">
                <div className="flex gap-2 items-center cursor-pointer">
                  <Image
                    src="/logo.svg"
                    alt="CryptoTick.live Logo"
                    width={32}
                    height={32}
                    priority
                  />
                  <h1 className="text-xl font-bold sm:text-2xl">CryptoTick
                    <AnimatedGradientText
                      className="text-sm font-bold"
                      colorFrom="#00ff87"
                      colorTo="#60a5fa"
                      speed={6}
                    >
                      <span className="animate-[blink_1s_infinite] text-md">.</span>
                      live
                    </AnimatedGradientText>
                  </h1>
                </div>
              </Link>
            </div>
            <div className="flex z-30 gap-2 items-center">
              <ToolbarMenu />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-gray-900 bg-transparent border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {selectedCrypto.symbol.toUpperCase()}
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto w-72 max-h-80 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                  {/* 搜索框 */}
                  <div className="sticky top-0 z-10 p-2 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        placeholder="Search cryptocurrencies..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-8 h-9"
                      />
                    </div>
                    {isSearching && (
                      <div className="flex justify-center py-2">
                        <div className="w-4 h-4 rounded-full border-t-2 border-b-2 border-gray-900 animate-spin dark:border-white"></div>
                      </div>
                    )}
                  </div>

                  {/* 搜索结果 */}
                  {!isSearching && searchResults.length > 0 && searchTerm.length > 0 && (
                    <>
                      <div className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">Search Results</div>
                      {searchResults.map(crypto => (
                        <DropdownMenuItem
                          key={crypto.id}
                          className="flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <div
                            className="flex flex-1 items-center"
                            onClick={() => {
                              addToFavorites(crypto);
                              handleCryptoChange(crypto);
                            }}
                          >
                            {crypto.image ? (
                              <img 
                                src={crypto.image.startsWith('http') ? crypto.image : `https://assets.coingecko.com/coins${crypto.image}`}
                                alt={crypto.name} 
                                className="mr-2 w-5 h-5" 
                              />
                            ) : crypto.icon && crypto.icon.startsWith('http') ? (
                              <img src={crypto.icon} alt={crypto.name} className="mr-2 w-5 h-5" />
                            ) : (
                              <span className="mr-2">{crypto.icon || '🪙'}</span>
                            )}
                            <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-2 h-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToFavorites(crypto);
                            }}
                          >
                            +
                          </Button>
                        </DropdownMenuItem>
                      ))}
                      <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
                    </>
                  )}

                  {/* 热门加密货币 - 改为英文 */}
                  <div className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">Popular Cryptocurrencies</div>
                  <div className="grid grid-cols-3 gap-1 p-2">
                    {DEFAULT_CRYPTOCURRENCIES.map((crypto) => (
                      <div
                        key={crypto.id}
                        onClick={() => handleCryptoChange(crypto)}
                        className="flex relative flex-col items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                        title={`${crypto.name} (${crypto.symbol.toUpperCase()})`}
                      >
                        {crypto.image ? (
                          <img 
                            src={crypto.image.startsWith('http') ? crypto.image : `https://assets.coingecko.com/coins${crypto.image}`}
                            alt={crypto.name}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <span className="text-xl" style={{ color: crypto.color }}>
                            {crypto.icon}
                          </span>
                        )}
                        <span className="mt-1 text-xs">{crypto.symbol.toUpperCase()}</span>

                        {/* 悬停时显示的完整名称 */}
                        <div className="absolute bottom-full left-1/2 px-2 py-1 mb-1 text-xs text-white whitespace-nowrap bg-gray-800 rounded opacity-0 transition-opacity transform -translate-x-1/2 pointer-events-none group-hover:opacity-100">
                          {crypto.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 收藏的加密货币 - 改为英文 */}
                  {favoriteCoins.length > 0 && !DEFAULT_CRYPTOCURRENCIES.some(coin => favoriteCoins.map(f => f.id).includes(coin.id)) && (
                    <>
                      <div className="px-2 py-1 mt-2 text-xs text-gray-500 border-t border-gray-200 dark:text-gray-400 dark:border-gray-700">My Favorites</div>
                      {favoriteCoins
                        .filter(coin => !DEFAULT_CRYPTOCURRENCIES.some(defaultCoin => defaultCoin.id === coin.id))
                        .map((crypto) => (
                          <DropdownMenuItem
                            key={crypto.id}
                            className="flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <div
                              className="flex flex-1 items-center"
                              onClick={() => handleCryptoChange(crypto)}
                            >
                              {crypto.image ? (
                                <img 
                                  src={crypto.image.startsWith('http') ? crypto.image : `https://assets.coingecko.com/coins${crypto.image}`}
                                  alt={crypto.name} 
                                  className="mr-2 w-5 h-5" 
                                />
                              ) : crypto.icon && crypto.icon.startsWith('http') ? (
                                <img src={crypto.icon} alt={crypto.name} className="mr-2 w-5 h-5" />
                              ) : (
                                <span className="mr-2">{crypto.icon || '🪙'}</span>
                              )}
                              {crypto.name} ({crypto.symbol})
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="px-2 h-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromFavorites(crypto.id);
                              }}
                            >
                              ✕
                            </Button>
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 主价格显示区域 - 完全透明，只有文字 */}
          <div className="relative z-10 p-4 mb-4 sm:mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {selectedCrypto.image ? (
                  <img
                    src={selectedCrypto.image.startsWith('http') ? selectedCrypto.image : `https://assets.coingecko.com/coins${selectedCrypto.image}`}
                    alt={selectedCrypto.name}
                    className="mr-4 w-12 h-12 rounded-full"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.currentTarget.style.display = 'none';
                      // Show fallback element
                      const fallback = document.getElementById(`crypto-icon-fallback-${selectedCrypto.id}`);
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : selectedCrypto.icon && selectedCrypto.icon.startsWith('http') ? (
                  <img
                    src={selectedCrypto.icon}
                    alt={selectedCrypto.name}
                    className="mr-4 w-12 h-12 rounded-full"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.currentTarget.style.display = 'none';
                      // Show fallback element
                      const fallback = document.getElementById(`crypto-icon-fallback-${selectedCrypto.id}`);
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div
                    id={`crypto-icon-fallback-${selectedCrypto.id}`}
                    className="flex justify-center items-center mr-4 w-12 h-12 text-3xl bg-orange-400 rounded-full"
                  >
                    {getCryptoEmoji(selectedCrypto.id)}
                  </div>
                )}

                <h1 className="text-2xl font-bold">{selectedCrypto.name}</h1>
              </div>

              <div className="presentation-logo">
                <Image
                  src="/logo.svg"
                  alt="CryptoTick.live Logo"
                  width={24}
                  height={24}
                  priority
                />
                <h1 className="text-xl font-bold">
                  CryptoTick
                  <AnimatedGradientText
                    className="text-sm font-bold"
                    colorFrom="#00ff87"
                    colorTo="#60a5fa"
                    speed={6}
                  >
                    <span className="animate-[blink_1s_infinite] text-md">.</span>
                    live
                  </AnimatedGradientText>
                </h1>
              </div>
            </div>

            <div className="flex items-baseline">
              <span className="mr-2 text-3xl sm:text-4xl">$</span>
              {!isLoading && priceData && displayPrice !== null ? (
                <div className="flex items-baseline text-5xl font-bold sm:text-7xl price-display">
                  <span
                    className={`transition-colors duration-200 ${priceDirection === "up" ? "text-green-500" : priceDirection === "down" ? "text-red-500" : ""
                      }`}
                  >
                    {formatPrice(displayPrice).dollars}
                  </span>
                  <span className="ml-1 text-2xl sm:text-4xl">.{formatPrice(displayPrice).cents}</span>
                </div>
              ) : (
                <div className="flex items-baseline text-5xl font-bold text-gray-300 animate-pulse dark:text-gray-700 sm:text-7xl price-display">
                  <span>0</span>
                  <span className="ml-1 text-2xl sm:text-4xl">.00000000</span>
                </div>
              )}
            </div>

            {/* 价格下方的百分比显示 - 添加占位符 */}
            {!isLoading && priceData ? (
              <div className="flex items-center mt-2 mobileLandscape:hidden">
                <div
                  className={`flex items-center ${priceData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {priceData.price_change_percentage_24h >= 0 ? (
                    <ArrowUp className="mr-1 w-4 h-4" />
                  ) : (
                    <ArrowDown className="mr-1 w-4 h-4" />
                  )}
                  <span className="font-medium">{Math.abs(priceData.price_change_percentage_24h).toFixed(2)}%</span>
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">24h</span>
              </div>
            ) : (
              <div className="flex items-center mt-2 mobileLandscape:hidden">
                <div className="flex items-center text-gray-300 animate-pulse dark:text-gray-700">
                  <ArrowUp className="mr-1 w-4 h-4 opacity-50" />
                  <span className="font-medium">0.00%</span>
                </div>
                <span className="ml-2 text-sm text-gray-300 dark:text-gray-700">24h</span>
              </div>
            )}
          </div>

          {/* Stats grid */}
          {(
            <div className="grid relative z-10 md:grid-cols-4 gap-3 p-3 rounded-xl border backdrop-blur-md border-gray-300/80 bg-gray-100/70 grid-cols-1 sm:p-4 sm:gap-6 dark:bg-gray-800/70 dark:border-gray-600/80 mobileLandscape:fixed mobileLandscape:bottom-2 mobileLandscape:left-1/2 mobileLandscape:-translate-x-1/2 mobileLandscape:grid-cols-4 mobileLandscape:w-auto mobileLandscape:min-w-[600px] mobileLandscape:max-w-[90vw] mobileLandscape:p-4 mobileLandscape:gap-8 mobileLandscape:bg-white/90 mobileLandscape:dark:bg-black/90">
              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-500 dark:text-gray-400 mobileLandscape:text-xs">24h Low/High</span>
                <div className="text-sm font-medium whitespace-nowrap sm:text-base mobileLandscape:text-base">
                  {!isLoading && priceData ? (
                    `$${priceData.low_24h.toLocaleString()} / $${priceData.high_24h.toLocaleString()}`
                  ) : (
                    <span className="text-gray-300 animate-pulse dark:text-gray-700">$0.00 / $0.00</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-500 dark:text-gray-400 mobileLandscape:text-xs">Volume (24h)</span>
                <div className="text-sm font-medium sm:text-base mobileLandscape:text-base">
                  {!isLoading && priceData ? (
                    formatNumber(priceData.total_volume)
                  ) : (
                    <span className="text-gray-300 animate-pulse dark:text-gray-700">$0</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-500 dark:text-gray-400 mobileLandscape:text-xs">Mkt. Cap</span>
                <div className="text-sm font-medium sm:text-base mobileLandscape:text-base">
                  {!isLoading && priceData ? (
                    formatNumber(priceData.market_cap)
                  ) : (
                    <span className="text-gray-300 animate-pulse dark:text-gray-700">$0</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-500 dark:text-gray-400 mobileLandscape:text-xs">24h Change</span>
                {!isLoading && priceData && priceData.price_change_percentage_24h !== 0 ? (
                  <div className="flex items-center text-sm sm:text-base mobileLandscape:text-base">
                    <span
                      className={
                        priceData.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {priceData.price_change_percentage_24h > 0 ? "+" : ""}
                      {priceData.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm sm:text-base mobileLandscape:text-base">
                    <span className="text-gray-300 animate-pulse dark:text-gray-700">0.00%</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading state - 绝对定位覆盖在主要内容区域上 */}
          {isLoading && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-25">
              <div className="flex flex-col justify-center items-center px-6 py-4 rounded-full shadow-sm backdrop-blur-sm pointer-events-auto bg-white/90 dark:bg-black/90">
                <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
                {isRetrying && (
                  <div className="mt-2 max-w-xs text-center">
                    <div className="flex gap-1 justify-center items-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${retryCount >= 1 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}></span>
                      <span className={`w-1.5 h-1.5 rounded-full ${retryCount >= 2 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}></span>
                      <span className={`w-1.5 h-1.5 rounded-full ${retryCount >= 3 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Last updated and CoinGecko Attribution */}
          <div className="flex relative z-10 justify-between items-center mt-3 text-sm text-gray-500 dark:text-gray-400 attribution mobileLandscape:fixed mobileLandscape:top-0 mobileLandscape:left-1/2 mobileLandscape:-translate-x-1/2 mobileLandscape:mt-0 mobileLandscape:px-4 mobileLandscape:py-1.5 mobileLandscape:rounded-full mobileLandscape:bg-white/80 mobileLandscape:dark:bg-black/80 mobileLandscape:backdrop-blur-md mobileLandscape:shadow-lg mobileLandscape:border mobileLandscape:border-gray-200/50 mobileLandscape:dark:border-gray-700/50">
            {/* CoinGecko Attribution - 左侧 */}
            <a
              href={`https://www.coingecko.com/en/coins/${selectedCrypto.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center opacity-70 transition-opacity hover:opacity-100"
            >
              <span className="hidden sm:inline mobileLandscape:hidden">Powered by</span>
              <img
                src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
                alt="CoinGecko Logo"
                className="h-5 dark:invert"
              />
            </a>
            
            {/* 支持按钮 - 中间 */}
            <div className="flex flex-1 justify-center mx-4">
              <DonationButton />
            </div>

            {/* Last Updated - 右侧 */}
            <div className="text-xs opacity-70">
              <span className="hidden sm:inline mobileLandscape:hidden">Last updated: </span>
              {!isLoading && priceData ? (
                new Date(priceData.last_updated).toLocaleTimeString()
              ) : (
                "--:--:--"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

