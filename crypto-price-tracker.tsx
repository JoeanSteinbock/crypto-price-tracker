"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CryptoCurrency, DEFAULT_CRYPTOCURRENCIES } from "./data/cryptocurrencies"

// Define cryptocurrency types and data structure
type Crypto = {
  id: string
  symbol: string
  name: string
  icon: string
  color: string
}

type PriceData = {
  current_price: number
  price_change_percentage_24h: number
  high_24h: number
  low_24h: number
  total_volume: number
  market_cap: number
  last_updated: string
}


export default function CryptoPriceTracker() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(DEFAULT_CRYPTOCURRENCIES[0])
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [displayPrice, setDisplayPrice] = useState<number | null>(null)
  const [previousPrice, setPreviousPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch price data from CoinGecko API
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()

        // Save previous price for animation
        if (priceData) {
          setPreviousPrice(priceData.current_price)
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

        setPriceData(newPriceData)
        setDisplayPrice(newPriceData.current_price)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching price data:", error)
        setIsLoading(false)
      }
    }

    fetchPriceData()

    // Set up polling interval (every 8 seconds)
    const intervalId = setInterval(fetchPriceData, 8000)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [selectedCrypto])

  // Effect 2: Create micro-fluctuations every 100ms
  useEffect(() => {
    if (!priceData || isLoading) return

    const createMicroFluctuation = () => {
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

      setDisplayPrice(boundedPrice)
      setPreviousPrice(displayPrice)
    }

    // Run micro-fluctuations every 100ms
    const microIntervalId = setInterval(createMicroFluctuation, 100)

    return () => clearInterval(microIntervalId)
  }, [priceData, displayPrice, isLoading])

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
    const priceStr = price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    // Split into dollars and cents
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

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen text-white bg-black">
      <div className="w-full max-w-3xl">
        {/* Header with crypto selector */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Crypto Price Tracker</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-white bg-transparent border-gray-700 hover:bg-gray-800">
                {selectedCrypto.name}
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              {DEFAULT_CRYPTOCURRENCIES.map((crypto) => (
                <DropdownMenuItem
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto)}
                  className="cursor-pointer hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    <span className="mr-2" style={{ color: crypto.color }}>
                      {crypto.icon}
                    </span>
                    {crypto.name} ({crypto.symbol})
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main price display */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div
              className="flex justify-center items-center mr-4 w-16 h-16 text-2xl rounded-full"
              style={{ backgroundColor: selectedCrypto.color }}
            >
              {selectedCrypto.icon}
            </div>

            <div className="flex items-baseline">
              <span className="mr-2 text-4xl">$</span>
              {!isLoading && priceData && displayPrice !== null && (
                <div className="flex items-baseline text-7xl font-bold">
                  <span
                    className={`transition-colors duration-200 ${
                      priceDirection === "up" ? "text-green-500" : priceDirection === "down" ? "text-red-500" : ""
                    }`}
                  >
                    {formatPrice(displayPrice).dollars}
                  </span>
                  <span className="ml-1 text-4xl">.{formatPrice(displayPrice).cents}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price change indicator */}
          {!isLoading && priceData && (
            <div className="flex items-center">
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
              <span className="ml-2 text-sm text-gray-400">24h</span>
            </div>
          )}
        </div>

        {/* Stats grid */}
        {!isLoading && priceData && (
          <div className="grid grid-cols-2 gap-4 p-6 bg-gray-900 rounded-xl md:grid-cols-4">
            <div className="flex flex-col">
              <span className="mb-1 text-sm text-gray-400">24h Low/High</span>
              <div className="font-medium">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`low-${priceData.low_24h}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${priceData.low_24h.toLocaleString()} / ${priceData.high_24h.toLocaleString()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-sm text-gray-400">Volume (24h)</span>
              <div className="font-medium">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`volume-${priceData.total_volume}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatNumber(priceData.total_volume)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-sm text-gray-400">Mkt. Cap</span>
              <div className="font-medium">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`cap-${priceData.market_cap}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatNumber(priceData.market_cap)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-sm text-gray-400">24h Change</span>
              <div
                className={`font-medium ${priceData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`change-${priceData.price_change_percentage_24h}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    {priceData.price_change_percentage_24h >= 0 ? (
                      <ArrowUp className="mr-1 w-4 h-4" />
                    ) : (
                      <ArrowDown className="mr-1 w-4 h-4" />
                    )}
                    {Math.abs(priceData.price_change_percentage_24h).toFixed(2)}%
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-white animate-spin"></div>
          </div>
        )}

        {/* Last updated */}
        {!isLoading && priceData && (
          <div className="mt-4 text-sm text-right text-gray-400">
            Last updated: {new Date(priceData.last_updated).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}

