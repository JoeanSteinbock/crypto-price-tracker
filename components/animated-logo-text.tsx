'use client'

import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 4, // 默认动画速度
  colorFrom = "#00ff87", // CryptoTick的绿色
  colorTo = "#60a5fa", // 蓝色调
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-gradient-x bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        backgroundSize: "200% 100%",
        animation: `gradient-x ${speed}s linear infinite`,
      }}
    >
      {children}
    </span>
  )
} 