"use client"

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Search, Clock } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ToolbarMenu } from "@/components/toolbar-menu"
import { PriceChart } from "@/components/price-chart"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TOP_CRYPTOCURRENCIES, DEFAULT_CRYPTOCURRENCIES, CryptoCurrency } from "../data/cryptocurrencies"
import { AnimatedGradientText } from "./animated-logo-text"
import { DonationButton } from "@/components/donation-button"
import Link from "next/link"
import { getApiService, PriceData, ApiKeyType } from '@/lib/api-service'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { toast } from "../hooks/use-toast"


// 更新所有的本地存储键名
const STORAGE_KEY = "cryptotick-favorites"
const API_KEY_STORAGE = "cryptotick-api-key"

// 在组件的顶部添加一个日志函数
const logDebug = (message: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).DEBUG_MODE) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
};

export default function CryptoPriceTracker({
  initialCrypto = "bitcoin",
  presentationMode = false,
  initialApiKey,
  initialApiKeyType
}: {
  initialCrypto?: string,
  presentationMode?: boolean,
  initialApiKey?: string,
  initialApiKeyType?: "demo" | "pro" | null
}) {
  const renderCount = useRef(0);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const apiIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const microIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastFetchTimeRef = useRef<number>(0)
  const urlApiKeyRef = useRef<string | null>(null);
  const urlApiKeyTypeRef = useRef<ApiKeyType>(null);
  const prevInitialCryptoRef = useRef(initialCrypto);

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

  // 使用 useMemo 缓存 API 服务实例
  const apiService = useMemo(() => getApiService(logDebug), []);

  // 从本地存储加载收藏列表
  const [favoriteCoins, setFavoriteCoins] = useState<CryptoCurrency[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading favorites:', e);
      return [];
    }
  });

  // 使用 useMemo 来缓存初始加密货币状态
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(() => {
    const cryptoFromDefault = TOP_CRYPTOCURRENCIES.find((c) => c.id === initialCrypto);
    logDebug(`Initializing selectedCrypto with ${cryptoFromDefault?.name || initialCrypto}`);
    return cryptoFromDefault || { id: initialCrypto, name: initialCrypto, symbol: initialCrypto } as CryptoCurrency;
  });

  // 初始化其他状态
  const [priceData, setPriceData] = useState<PriceData | null>(placeholderPriceData)
  const [displayPrice, setDisplayPrice] = useState<number | null>(0)
  const [previousPrice, setPreviousPrice] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<CryptoCurrency[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [availableCryptos, setAvailableCryptos] = useState<CryptoCurrency[]>(DEFAULT_CRYPTOCURRENCIES)
  const [currentTime, setCurrentTime] = useState<string>("");
  const [animatingPrice, setAnimatingPrice] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    renderCount.current += 1;
    logDebug(`Component rendered ${renderCount.current} times. Initial crypto: ${initialCrypto}`);
  });

  // 只在 initialCrypto 真正改变时更新
  useEffect(() => {
    if (prevInitialCryptoRef.current !== initialCrypto) {
      logDebug(`initialCrypto changed from ${prevInitialCryptoRef.current} to ${initialCrypto}`);
      prevInitialCryptoRef.current = initialCrypto;
      
      const cryptoFromDefault = TOP_CRYPTOCURRENCIES.find((c) => c.id === initialCrypto);
      if (cryptoFromDefault) {
        logDebug(`Found matching crypto in defaults: ${cryptoFromDefault.name}`);
        setSelectedCrypto(cryptoFromDefault);
        return;
      }

      const cryptoFromFavorites = favoriteCoins.find((c) => c.id === initialCrypto);
      if (cryptoFromFavorites) {
        logDebug(`Found matching crypto in favorites: ${cryptoFromFavorites.name}`);
        setSelectedCrypto(cryptoFromFavorites);
        return;
      }

      logDebug(`Crypto not found in defaults or favorites, fetching info for: ${initialCrypto}`);
      fetchCryptoInfo(initialCrypto);
    }
  }, [initialCrypto, favoriteCoins, apiService]);

  // 从URL参数中获取API密钥和类型
  useEffect(() => {
    // 检查URL参数中是否有API密钥和类型
    const apiKeyFromUrl = searchParams.get('api_key');
    const apiTypeFromUrl = searchParams.get('api_type') as ApiKeyType;

    if (apiKeyFromUrl) {
      // 保存URL中的API密钥，用于后续API调用
      urlApiKeyRef.current = apiKeyFromUrl;
      logDebug(`Found API key in URL parameters: ${apiKeyFromUrl.substring(0, 4)}...`);

      // 如果URL中也提供了类型，则使用它
      if (apiTypeFromUrl && (apiTypeFromUrl === 'demo' || apiTypeFromUrl === 'pro')) {
        urlApiKeyTypeRef.current = apiTypeFromUrl;
        logDebug(`Found API key type in URL: ${apiTypeFromUrl}`);
      } else {
        // 如果URL中没有类型但有密钥，默认为pro，除非密钥前缀为demo_
        urlApiKeyTypeRef.current = apiKeyFromUrl.startsWith('demo_') ? 'demo' : 'pro';
        logDebug(`No API key type in URL, defaulting to: ${urlApiKeyTypeRef.current}`);
      }

      // 直接设置API密钥到服务（使用原始的API key，不需要反转）
      apiService.setApiKey(apiKeyFromUrl, urlApiKeyTypeRef.current);

      // 触发自定义事件以通知其他组件
      const event = new CustomEvent(API_KEY_STORAGE, {
        detail: {
          apiKey: apiKeyFromUrl,
          apiKeyType: urlApiKeyTypeRef.current
        }
      });
      window.dispatchEvent(event);
    }
  }, [searchParams]);

  // 监听错误状态并显示为toast
  useEffect(() => {
    if (error) {
      // Display error message using toast
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        duration: 5000,
      });
      
      // Log error to console
      logDebug(`Displaying error toast: ${error}`);
    }
  }, [error]);

  // 监听 API 密钥变化事件
  useEffect(() => {
    const handleApiKeyChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newApiKey = customEvent.detail?.apiKey || "";
      const newApiKeyType = customEvent.detail?.apiKeyType || null;

      logDebug(`API key changed via event: ${newApiKey ? "New key set" : "Key cleared"}, Type: ${newApiKeyType || "none"}`);

      // 更新API服务
      apiService.setApiKey(newApiKey, newApiKeyType as ApiKeyType);

      // 立即获取数据以测试新密钥
      fetchPriceData();
    };

    // 添加事件监听器
    window.addEventListener(API_KEY_STORAGE, handleApiKeyChange);

    // 清理函数
    return () => {
      window.removeEventListener(API_KEY_STORAGE, handleApiKeyChange);

      // 确保组件卸载时清除所有间隔
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
        apiIntervalRef.current = null;
      }

      if (microIntervalRef.current) {
        clearInterval(microIntervalRef.current);
        microIntervalRef.current = null;
      }
    };
  }, []);

  // 从本地存储加载收藏列表
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavoriteCoins(parsedFavorites);

        // 将收藏列表添加到可用加密货币列表中
        setAvailableCryptos([
          ...TOP_CRYPTOCURRENCIES,
          ...parsedFavorites.filter(
            (coin: CryptoCurrency) => !TOP_CRYPTOCURRENCIES.some(defaultCoin => defaultCoin.id === coin.id)
          )
        ]);
      }
    } catch (e) {
      console.error("Failed to load favorites:", e);
    }
  }, []);

  // 搜索加密货币
  const searchCryptos = useCallback(async (term: string) => {
    if (!term || term.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    try {
      const results = await apiService.searchCryptos(term);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching cryptos:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [apiService]);

  // Add to favorites
  const addToFavorites = (crypto: CryptoCurrency) => {
    if (!favoriteCoins.some(coin => coin.id === crypto.id)) {
      logDebug(`Adding ${crypto.name} to favorites`);
      const updatedFavorites = [...favoriteCoins, crypto]
      setFavoriteCoins(updatedFavorites)
      setAvailableCryptos([...TOP_CRYPTOCURRENCIES, ...updatedFavorites.filter(
        coin => !TOP_CRYPTOCURRENCIES.some(defaultCoin => defaultCoin.id === coin.id)
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
      handleCryptoChange(DEFAULT_CRYPTOCURRENCIES[0])
    }

    // Update available cryptocurrencies list
    setAvailableCryptos([...TOP_CRYPTOCURRENCIES, ...updatedFavorites.filter(
      coin => !TOP_CRYPTOCURRENCIES.some(defaultCoin => defaultCoin.id === coin.id)
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

    // 只有当路径与当前加密货币不匹配，且已经加载了价格数据时才更新URL
    if (!presentationMode && (currentCryptoId !== selectedCrypto.id && !isLoading && priceData !== null)) {
      logDebug(`Updating URL to: /${selectedCrypto.id}`);
      router.push(`/${selectedCrypto.id}`, { scroll: false })
    }
  }, [selectedCrypto.id, router, pathname, isLoading, priceData])

  // Fetch price data from CoinGecko API
  const fetchPriceData = useCallback(async () => {
    if (!selectedCrypto) return;

    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTimeRef.current;
    const minFetchInterval = 2000; // 最小获取间隔为2秒

    if (timeSinceLastFetch < minFetchInterval) {
      logDebug(`Skipping fetch, too soon (${timeSinceLastFetch}ms since last fetch)`);
      return;
    }

    try {
      logDebug(`Fetching price data for ${selectedCrypto.id}`);
      // 使用API服务获取价格数据
      const newPriceData = await apiService.fetchPriceData(selectedCrypto.id);

      if (!newPriceData) {
        if (retryCount < 3) {
          logDebug(`Retrying price fetch in ${(retryCount + 1) * 2} seconds...`);
          setTimeout(() => {
            setRetryCount(retryCount + 1);
            fetchPriceData();
          }, (retryCount + 1) * 2000);
        } else {
          setError("Failed to fetch price data after 3 retries");
          setIsRetrying(false);
        }
        return;
      }

      // 更新状态
      setPriceData(newPriceData);
      setDisplayPrice(newPriceData.current_price);
      setPreviousPrice(priceData?.current_price || 0);
      setError(null);
      setRetryCount(0);
      setIsRetrying(false);
      setIsLoading(false);
      lastFetchTimeRef.current = now;

    } catch (error) {
      console.error("Error fetching price data:", error);
      setIsLoading(false);
      setError("Failed to fetch price data");
    }
  }, [selectedCrypto, retryCount, apiService, priceData]);

  // 根据 API 密钥设置轮询间隔
  useEffect(() => {
    // 获取轮询间隔时间
    const pollInterval = apiService.getPollingInterval();
    logDebug(`Setting up polling with interval: ${pollInterval}ms`);

    // 清除现有轮询
    if (apiIntervalRef.current) {
      clearInterval(apiIntervalRef.current);
      apiIntervalRef.current = null;
    }

    // 立即获取初始数据
    fetchPriceData();

    // 设置新轮询
    apiIntervalRef.current = setInterval(() => {
      logDebug('Polling interval triggered');
      fetchPriceData();
    }, pollInterval);

    // 清理函数
    return () => {
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
        apiIntervalRef.current = null;
      }
    };
  }, [selectedCrypto.id, fetchPriceData, apiService]);

  // Create micro-fluctuations
  const createMicroFluctuation = useCallback(() => {
    if (!priceData || !displayPrice) return

    // 根据价格大小调整波动比例
    let fluctuationPercent;
    if (priceData.current_price < 0.01) {
      // 对于非常小的价格，使用更大的波动比例
      fluctuationPercent = Math.random() * 0.2 - 0.1; // ±0.1%
    } else if (priceData.current_price < 1) {
      // 对于小价格，使用适中的波动比例
      fluctuationPercent = Math.random() * 0.1 - 0.05; // ±0.05%
    } else {
      // 对于正常价格，使用标准波动比例
      fluctuationPercent = Math.random() * 0.04 - 0.02; // ±0.02%
    }

    const fluctuationAmount = priceData.current_price * (fluctuationPercent / 100);

    // 计算新的显示价格
    const newDisplayPrice = displayPrice + fluctuationAmount;

    // 确保价格保持在合理范围内（根据价格大小调整偏差范围）
    let maxDeviation;
    if (priceData.current_price < 0.01) {
      maxDeviation = priceData.current_price * 0.005; // 0.5% for very small prices
    } else if (priceData.current_price < 1) {
      maxDeviation = priceData.current_price * 0.003; // 0.3% for small prices
    } else {
      maxDeviation = priceData.current_price * 0.002; // 0.2% for normal prices
    }

    const upperBound = priceData.current_price + maxDeviation;
    const lowerBound = priceData.current_price - maxDeviation;

    const boundedPrice = Math.min(Math.max(newDisplayPrice, lowerBound), upperBound);

    // Store previous price before updating
    const oldPrice = displayPrice;

    // Update display price
    setDisplayPrice(boundedPrice);
    setPreviousPrice(oldPrice);

    // Determine price direction and dispatch custom event for audio
    const direction = boundedPrice > oldPrice ? "up" : boundedPrice < oldPrice ? "down" : null;

    // Only dispatch event if direction changed
    if (direction) {
      logDebug("Dispatching price-change event:", direction);
      const event = new CustomEvent("price-change", {
        detail: { direction },
      });
      window.dispatchEvent(event);
    }
  }, [priceData, displayPrice]);

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

  // Handle micro-animation of price changes
  useEffect(() => {
    if (priceData && previousPrice !== null && previousPrice !== priceData.current_price) {
      // Animate price
      setAnimatingPrice(true)

      // Use a timeout to end animation
      const timeout = setTimeout(() => {
        setAnimatingPrice(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [priceData, previousPrice])

  // Handle user changing crypto
  const handleCryptoChange = (crypto: CryptoCurrency) => {
    if (crypto.id !== selectedCrypto.id) {
      logDebug(`User selected new crypto: ${crypto.id}`);

      // Reset states
      setIsLoading(true);
      setError(null);
      setRetryCount(0);
      setIsRetrying(false);
      setPriceData(null);
      setDisplayPrice(null);
      setPreviousPrice(null);

      // Update selected crypto
      setSelectedCrypto(crypto);

      // 发送Google Analytics事件
      try {
        // 检查用户是否已同意Cookie
        const hasConsented = localStorage.getItem('cookie-consent')
        if (hasConsented === 'true' && typeof window !== 'undefined' && 'gtag' in window) {
          window.gtag('event', 'change_crypto', {
            'crypto_id': crypto.id,
            'crypto_name': crypto.name
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
  const fetchCryptoInfo = useCallback(async (cryptoId: string, attemptCount = 0) => {
    try {
      logDebug(`Fetching crypto info for ${cryptoId}, attempt ${attemptCount + 1}`);
      
      // 使用API服务获取加密货币信息
      const cryptoInfo = await apiService.fetchCryptoInfo(cryptoId);

      if (!cryptoInfo) {
        if (attemptCount < 3) {
          // 重试逻辑
          setTimeout(() => {
            fetchCryptoInfo(cryptoId, attemptCount + 1);
          }, (attemptCount + 1) * 2000);
          return;
        }
        throw new Error(`Failed to fetch info for ${cryptoId} after 3 attempts`);
      }

      setError(null);
      setSelectedCrypto(cryptoInfo);
      
    } catch (error) {
      console.error(`Error fetching crypto info: ${error}`);
      setError(`Unable to fetch information for ${cryptoId}. Please try again later or check if the cryptocurrency ID is correct.`);
    }
  }, [apiService]);

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

  // 添加时间戳更新逻辑
  useEffect(() => {
    if (presentationMode) {
      // 更新时间的函数
      const updateTime = () => {
        const now = new Date();
        // 添加8小时得到 UTC+8 时间
        const utc8Time = new Date(now.getTime() + (8 * 60 * 60 * 1000));

        // 格式化日期和时间
        const year = utc8Time.getUTCFullYear();
        const month = (utc8Time.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = utc8Time.getUTCDate().toString().padStart(2, '0');
        const hours = utc8Time.getUTCHours().toString().padStart(2, '0');
        const minutes = utc8Time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = utc8Time.getUTCSeconds().toString().padStart(2, '0');

        setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
      };

      // 立即更新一次
      updateTime();

      // 每秒更新一次
      const timeInterval = setInterval(updateTime, 1000);

      return () => clearInterval(timeInterval);
    }
  }, [presentationMode]);

  // 初始化时设置 API key（如果提供）
  useEffect(() => {
    if (initialApiKey) {
      logDebug(`Setting initial API key: ${initialApiKey.substring(0, 4)}..., type: ${initialApiKeyType}`);
      // 使用原始的 API key，不需要反转
      apiService.setApiKey(initialApiKey, initialApiKeyType || 'pro');
    }
  }, [initialApiKey, initialApiKeyType, apiService]);

  return (
    <div className={`relative ${!presentationMode ? 'min-h-screen w-[100vw]' : ''}`}>
      <div className={`flex flex-col justify-${presentationMode ? "start" : "center"} items-center p-4 min-h-[100dvh] lg:w-[100vw] text-gray-900 bg-white transition-colors duration-200 dark:bg-black dark:text-white mobileLandscape:pt-0 mobileLandscape:min-w-[100dvw]`}>
        {/* 修改 UTC+8 时间戳组件位置 */}
        {presentationMode && (
          <div className="flex fixed top-4 left-1/2 z-50 gap-2 items-center px-3 py-2 text-white rounded-md border shadow-lg backdrop-blur-sm transform -translate-x-1/2 bg-black/40 dark:bg-white/15 border-white/10">
            <Clock className="w-4 h-4" />
            <span>{currentTime}</span>
            <span className="text-xs opacity-70">(UTC+8)</span>
          </div>
        )}

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
                          onSelect={(e) => {
                            // 阻止下拉菜单项的默认关闭行为
                            e.preventDefault();
                          }}
                        >
                          <div
                            className="flex flex-1 items-center"
                            onClick={(e) => {
                              // 阻止事件冒泡，避免触发DropdownMenuItem的默认关闭行为
                              e.stopPropagation();
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCryptoChange(crypto);
                        }}
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
                            onSelect={(e) => {
                              // 阻止下拉菜单项的默认关闭行为
                              e.preventDefault();
                            }}
                          >
                            <div
                              className="flex flex-1 items-center"
                              onClick={(e) => {
                                // 阻止事件冒泡，避免触发DropdownMenuItem的默认关闭行为
                                e.stopPropagation();
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