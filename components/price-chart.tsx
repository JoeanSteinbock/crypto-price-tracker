"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"

type PricePoint = {
  timestamp: number
  price: number
}

interface PriceChartProps {
  currentPrice: number | null
  cryptoId: string
}

export function PriceChart({ currentPrice, cryptoId }: PriceChartProps) {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const chartRef = useRef<HTMLDivElement>(null)
  const maxDataPoints = 100 // Maximum number of data points to show
  const hasInitializedRef = useRef(false) // Track if we've already fetched initial data

  // Initialize with historical data - only once per crypto
  useEffect(() => {
    // Prevent multiple fetches for the same crypto
    if (hasInitializedRef.current) {
      return;
    }

    const fetchHistoricalData = async () => {
      setIsLoading(true)
      try {
        // Fetch the last 24 hours of price data
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=1`,
          { cache: 'no-store' } // Disable caching to get fresh data
        )

        if (!response.ok) {
          throw new Error("Failed to fetch historical data")
        }

        const data = await response.json()

        // Format the data for the chart
        const formattedData = data.prices.map((item: [number, number]) => ({
          timestamp: item[0],
          price: item[1],
        }));

        // Ensure data is sorted by timestamp
        formattedData.sort((a: PricePoint, b: PricePoint) => a.timestamp - b.timestamp);

        // If we have too many points, sample them intelligently
        if (formattedData.length > maxDataPoints) {
          // Always include the first and last points
          const result = [formattedData[0]];

          // Find local minimums and maximums to preserve the shape
          const step = Math.floor(formattedData.length / (maxDataPoints - 2));

          for (let i = 1; i < formattedData.length - 1; i += step) {
            // For each segment, find the min and max
            const segment = formattedData.slice(i, Math.min(i + step, formattedData.length - 1));
            if (segment.length > 0) {
              // Fix TypeScript errors by adding proper type annotations
              const minPoint = segment.reduce((min: PricePoint, p: PricePoint) =>
                p.price < min.price ? p : min, segment[0]);
              const maxPoint = segment.reduce((max: PricePoint, p: PricePoint) =>
                p.price > max.price ? p : max, segment[0]);

              // Add the min and max if they're different points
              if (minPoint.timestamp !== maxPoint.timestamp) {
                // Add them in chronological order
                if (minPoint.timestamp < maxPoint.timestamp) {
                  result.push(minPoint, maxPoint);
                } else {
                  result.push(maxPoint, minPoint);
                }
              } else {
                // If they're the same point, just add one
                result.push(minPoint);
              }
            }
          }

          // Add the last point
          result.push(formattedData[formattedData.length - 1]);

          // Sort again to ensure chronological order
          result.sort((a: PricePoint, b: PricePoint) => a.timestamp - b.timestamp);

          setPriceHistory(result);
        } else {
          setPriceHistory(formattedData);
        }

        hasInitializedRef.current = true; // Mark that we've initialized
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching historical data:", error)
        
        // 创建更好的占位数据，使用波浪形图表
        const now = Date.now();
        const dayAgo = now - 86400000;
        const steps = 20;
        const fallbackData = [];
        
        // 使用正弦函数创建波浪效果
        for (let i = 0; i <= steps; i++) {
          const timestamp = dayAgo + (now - dayAgo) * (i / steps);
          // 如果有当前价格，则围绕当前价格创建波动；否则使用默认值
          const basePrice = currentPrice || 50000;
          // 创建±5%的波动
          const price = basePrice * (1 + Math.sin((i / steps) * Math.PI * 2) * 0.05);
          fallbackData.push({ timestamp, price });
        }
        
        setPriceHistory(fallbackData);
        hasInitializedRef.current = true; // Mark as initialized even with fallback data
        setIsLoading(false)
      }
    }

    fetchHistoricalData()
  }, [cryptoId]) // Remove currentPrice from dependencies

  // Reset initialization flag when crypto changes
  useEffect(() => {
    return () => {
      hasInitializedRef.current = false;
    };
  }, [cryptoId]);

  // Add new price point when currentPrice changes
  useEffect(() => {
    if (isLoading || currentPrice === null || priceHistory.length === 0) return

    const now = Date.now();
    const newPoint = {
      timestamp: now,
      price: currentPrice,
    }

    setPriceHistory((prevHistory) => {
      // Create a copy of the history
      const updatedHistory = [...prevHistory];

      // If the last point is very recent, just update it
      const lastPoint = updatedHistory[updatedHistory.length - 1];
      if (now - lastPoint.timestamp < 30000) { // Less than 30 seconds
        updatedHistory[updatedHistory.length - 1] = {
          ...lastPoint,
          price: currentPrice
        };
      } else {
        // Add the new point
        updatedHistory.push(newPoint);

        // If we have too many points, remove some older ones
        if (updatedHistory.length > maxDataPoints) {
          // Remove every other point from the first half of the data
          const midpoint = Math.floor(updatedHistory.length / 2);
          const firstHalf = updatedHistory.slice(0, midpoint);
          const secondHalf = updatedHistory.slice(midpoint);

          // Keep every other point from first half
          const reducedFirstHalf = firstHalf.filter((_, i) => i % 2 === 0);

          return [...reducedFirstHalf, ...secondHalf];
        }
      }

      return updatedHistory;
    })
  }, [currentPrice, isLoading, priceHistory.length])

  // Determine chart colors based on theme
  const getChartColor = () => {
    return resolvedTheme === "dark"
      ? "rgba(255, 255, 255, 0.3)" // Dark mode
      : "rgba(0, 0, 0, 0.2)" // Light mode
  }

  if (isLoading || priceHistory.length === 0) {
    // 创建一个更明显的占位图表，使用更多的数据点和更大的波动
    const placeholderData = [];
    const now = Date.now();
    const dayAgo = now - 86400000;
    const steps = 20;
    
    // 创建一个波浪形的占位图表
    for (let i = 0; i <= steps; i++) {
      const timestamp = dayAgo + (now - dayAgo) * (i / steps);
      // 使用正弦函数创建波浪效果
      const price = 100 + Math.sin((i / steps) * Math.PI * 2) * 10;
      placeholderData.push({ timestamp, price });
    }
    
    return (
      <div
        className="absolute inset-0 z-0 w-full h-full opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={placeholderData}>
            <YAxis hide />
            <Line
              type="monotone"
              dataKey="price"
              stroke={resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)"}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div
      ref={chartRef}
      className="absolute inset-0 z-0 w-full h-full opacity-50 pointer-events-none"
      aria-hidden="true"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceHistory}>
          <YAxis
            domain={[(dataMin: number) => dataMin * 0.999, (dataMax: number) => dataMax * 1.001]}
            hide
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={getChartColor()}
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

