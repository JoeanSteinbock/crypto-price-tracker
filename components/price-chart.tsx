"use client"

import React, { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"
import { getApiService } from "@/lib/api-service"

// 添加自定义的水流动画组件
const FlowingGradient = ({ id, color }: { id: string, color: string }) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const animate = () => {
      // 减小增量，使动画变慢（从1减小到0.2）
      setOffset((prevOffset) => (prevOffset + 0.2) % 100);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
      <stop offset={`${offset}%`} stopColor="rgba(255,255,255,0)" />
      <stop offset={`${Math.min(offset + 10, 100)}%`} stopColor={color} />
      <stop offset={`${Math.min(offset + 30, 100)}%`} stopColor="rgba(255,255,255,0)" />
    </linearGradient>
  );
};

type PricePoint = {
  timestamp: number
  price: number
}

interface PriceChartProps {
  currentPrice: number | null
  cryptoId: string
}

// Helper function to log debug messages
const logChartDebug = (message: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).DEBUG_MODE) {
    console.log(`[CHART DEBUG] ${message}`, data || '');
  }
};

export function PriceChart({ currentPrice, cryptoId }: PriceChartProps) {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const chartRef = useRef<HTMLDivElement>(null)
  const maxDataPoints = 100 // Maximum number of data points to show
  const hasInitializedRef = useRef(false) // Track if we've already fetched initial data
  // Create API service instance
  const apiService = useRef(getApiService(logChartDebug))

  // 从 URL 参数获取 API key
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const apiKeyFromUrl = searchParams.get('api_key');
    const apiTypeFromUrl = searchParams.get('api_type') as "demo" | "pro" | null;
    
    if (apiKeyFromUrl) {
      logChartDebug(`Setting API key from URL: ${apiKeyFromUrl.substring(0, 4)}...`);
      apiService.current.setApiKey(
        apiKeyFromUrl,
        apiTypeFromUrl || (apiKeyFromUrl.startsWith('demo_') ? 'demo' : 'pro')
      );
    }
  }, []);

  // Initialize with historical data - only once per crypto
  useEffect(() => {
    // Prevent multiple fetches for the same crypto
    if (hasInitializedRef.current) {
      return;
    }

    const fetchHistoricalData = async () => {
      setIsLoading(true)
      try {
        logChartDebug(`Fetching historical data for ${cryptoId}`);
        
        // 使用API服务获取历史数据
        const formattedData = await apiService.current.fetchHistoricalData(cryptoId, 1);
        
        if (!formattedData || formattedData.length === 0) {
          logChartDebug('No historical data received');
          setIsLoading(false);
          return;
        }

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

        // 创建上升趋势的占位数据
        const now = Date.now();
        const dayAgo = now - 86400000;
        const steps = 20;
        const fallbackData = [];

        // 基础价格，如果有当前价格则使用，否则使用默认值
        const basePrice = currentPrice || 50000;

        // 创建一个上升趋势的图表，带有一些小波动
        for (let i = 0; i <= steps; i++) {
          const timestamp = dayAgo + (now - dayAgo) * (i / steps);

          // 主要趋势是上升的（从基础价格的80%上升到120%）
          const trendComponent = basePrice * (0.8 + (i / steps) * 0.4);

          // 添加一些小波动，使图表看起来更自然
          const volatilityComponent = basePrice * 0.05 * Math.sin((i / steps) * Math.PI * 3);

          // 最终价格是趋势加上波动
          const price = trendComponent + volatilityComponent;

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

    // 确保价格不为0（可能是API错误的结果）
    if (currentPrice <= 0) {
      logChartDebug('Skipping invalid price point:', currentPrice);
      return;
    }

    const now = Date.now();
    const newPoint = {
      timestamp: now,
      price: currentPrice,
    }

    setPriceHistory((prevHistory) => {
      // 创建历史记录的副本
      const updatedHistory = [...prevHistory];

      // 如果最后一个点是最近的，只更新它
      const lastPoint = updatedHistory[updatedHistory.length - 1];
      
      // 确保最后一个点的价格也是有效的
      if (lastPoint && lastPoint.price <= 0) {
        logChartDebug('Removing invalid last point:', lastPoint);
        updatedHistory.pop();
      }

      if (lastPoint && now - lastPoint.timestamp < 30000) { // 少于30秒
        updatedHistory[updatedHistory.length - 1] = {
          ...lastPoint,
          price: currentPrice
        };
      } else {
        // 添加新的点
        updatedHistory.push(newPoint);

        // 如果我们有太多点，移除一些旧的
        if (updatedHistory.length > maxDataPoints) {
          // 从数据的前半部分每隔一个点删除
          const midpoint = Math.floor(updatedHistory.length / 2);
          const firstHalf = updatedHistory.slice(0, midpoint);
          const secondHalf = updatedHistory.slice(midpoint);

          // 保留前半部分的每隔一个点
          const reducedFirstHalf = firstHalf.filter((_, i) => i % 2 === 0);

          return [...reducedFirstHalf, ...secondHalf];
        }
      }

      return updatedHistory;
    })
  }, [currentPrice, isLoading, priceHistory.length])

  // Determine chart colors based on theme
  const getChartColor = () => {

    // const isUptrend = priceHistory.length > 1 &&
    //   priceHistory[priceHistory.length - 1].price > priceHistory[0].price;

    // if (isUptrend) {
    //   return resolvedTheme === "dark"
    //     ? "rgba(0, 255, 0, 0.3)" // 暗色模式下的绿色
    //     : "rgba(0, 200, 0, 0.2)" // 亮色模式下的绿色
    // } else {
    //   return resolvedTheme === "dark"
    //     ? "rgba(255, 0, 0, 0.3)" // 暗色模式下的红色
    //     : "rgba(200, 0, 0, 0.2)" // 亮色模式下的红色
    // }

    return resolvedTheme === "dark"
      ? "rgba(255, 255, 255, 0.3)" // Dark mode
      : "rgba(0, 0, 0, 0.2)" // Light mode
  }

  if (isLoading || priceHistory.length === 0) {
    // 创建一个上升趋势的占位图表
    const placeholderData = [];
    const now = Date.now();
    const dayAgo = now - 86400000;
    const steps = 20;

    // 基础价格，如果有当前价格则使用，否则使用默认值
    const basePrice = currentPrice || 100;

    // 创建一个上升趋势的图表，带有一些小波动
    for (let i = 0; i <= steps; i++) {
      const timestamp = dayAgo + (now - dayAgo) * (i / steps);

      // 主要趋势是上升的（从基础价格的80%上升到120%）
      const trendComponent = basePrice * (0.8 + (i / steps) * 0.4);

      // 添加一些小波动，使图表看起来更自然
      // 使用正弦函数创建波动，但波动幅度较小
      const volatilityComponent = basePrice * 0.05 * Math.sin((i / steps) * Math.PI * 3);

      // 最终价格是趋势加上波动
      const price = trendComponent + volatilityComponent;

      placeholderData.push({ timestamp, price });
    }

    return (
      <div
        className="absolute inset-0 z-0 w-full h-full opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={placeholderData}>
            <defs>
              <FlowingGradient 
                id="placeholderFlowingGradient" 
                color={resolvedTheme === "dark" ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 200, 0, 0.2)"} 
              />
            </defs>
            <YAxis 
              domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]}
              hide 
            />
            {/* 基础线 */}
            <Line
              type="monotone"
              dataKey="price"
              stroke={resolvedTheme === "dark" ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 200, 0, 0.2)"}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            {/* 流动效果线 */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#placeholderFlowingGradient)"
              strokeWidth={4}
              dot={false}
              isAnimationActive={false}
              strokeLinecap="round"
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
          <defs>
            <FlowingGradient id="flowingGradient" color={getChartColor()} />
          </defs>
          <YAxis
            domain={[(dataMin: number) => dataMin * 0.999, (dataMax: number) => dataMax * 1.001]}
            hide
          />
          {/* 基础线 */}
          <Line
            type="monotone"
            dataKey="price"
            stroke={getChartColor()}
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
          {/* 流动效果线 */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#flowingGradient)"
            strokeWidth={5}
            dot={false}
            isAnimationActive={false}
            strokeLinecap="round"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

