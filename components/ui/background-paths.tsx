"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// 黄金比例 - 用于创建更加和谐的动画时间
const PHI = 1.618033988749895;

function generatePriceChartPath(width: number, height: number, segments: number, volatility: number, position: number): string {
    // 起始点
    let path = `M0,${height / 2}`;
    
    // 生成随机价格点
    const points = [];
    const segmentWidth = width / segments;
    
    for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        // 使用正弦波和随机值的组合来模拟价格波动
        const randomFactor = Math.random() * volatility - volatility / 2;
        const sinFactor = Math.sin(i * 0.5) * volatility * 1.5;
        const trendFactor = (i / segments) * volatility * position * 2; // 添加整体趋势
        
        const y = height / 2 + randomFactor + sinFactor + trendFactor;
        points.push({ x, y });
    }
    
    // 使用贝塞尔曲线连接点，使曲线更平滑
    for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        
        // 控制点 - 在两点之间创建平滑过渡
        const controlX1 = current.x + (next.x - current.x) / 3;
        const controlY1 = current.y;
        const controlX2 = current.x + (next.x - current.x) * 2 / 3;
        const controlY2 = next.y;
        
        path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${next.x},${next.y}`;
    }
    
    return path;
}

function FloatingPaths({ position }: { position: number }) {
    // 创建多条价格图表线，每条有不同的波动性和颜色
    const chartPaths = Array.from({ length: 8 }, (_, i) => {
        // 使用黄金比例创建更加和谐的波动性
        const volatility = 25 + i * (PHI * 3);
        const width = 1200;
        const height = 600;
        // 使用斐波那契数列创建更加和谐的段数
        const segments = 13 + Math.floor(i * PHI); 
        
        // 使用不同的颜色透明度，创建深度感
        const opacity = 0.05 + (i / 20);
        
        // 使用不同的颜色，创建渐变效果
        const hue = position > 0 
            ? 210 + (i * 3) // 蓝色系
            : 140 - (i * 3); // 绿色系
            
        return {
            id: i,
            d: generatePriceChartPath(width, height, segments, volatility, position * (i % 2 === 0 ? 1 : -1)),
            color: position > 0 
                ? `hsla(${hue}, 80%, 50%, ${opacity})` // 蓝色系
                : `hsla(${hue}, 80%, 50%, ${opacity})`, // 绿色系
            width: 1 + i * 0.4,
            // 使用斐波那契数列创建更加和谐的动画时间
            duration: 15 + (i * PHI * 2),
            delay: i * PHI,
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 1200 600"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Crypto Price Charts</title>
                {chartPaths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.width}
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: 0.8,
                            pathOffset: [0, 1],
                        }}
                        transition={{
                            pathLength: {
                                duration: 3 + path.id * 0.5,
                                ease: "easeInOut",
                                delay: path.delay,
                            },
                            opacity: {
                                duration: 3 + path.id * 0.5,
                                ease: "easeInOut",
                                delay: path.delay,
                            },
                            pathOffset: {
                                duration: path.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 3 + path.delay,
                            }
                        }}
                    />
                ))}
                
                {/* 添加移动的点，模拟价格变动 */}
                {chartPaths.filter((_, i) => i % 3 === 0).map((path, pathIndex) => (
                    Array.from({ length: 2 }, (_, i) => {
                        // 使用黄金比例创建更加和谐的动画时间
                        const duration = 10 + (pathIndex * PHI) + (i * PHI * 2);
                        const delay = (pathIndex * PHI * 1.5) + (i * PHI * 3);
                        
                        return (
                            <motion.circle
                                key={`moving-dot-${pathIndex}-${i}`}
                                cx={100 + (i * 400)}
                                cy={300 + (Math.sin(i * 0.8) * 50 * position)}
                                r={3 + (pathIndex * 0.5)}
                                fill={path.color.replace('0.05', '0.9')}
                                filter={`blur(${pathIndex * 0.3}px)`}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: [0, 0.8, 0.8, 0],
                                    x: [0, 1200],
                                    y: [
                                        300 + (Math.sin(0) * 50 * position),
                                        300 + (Math.sin(1) * 50 * position),
                                        300 + (Math.sin(2) * 50 * position),
                                        300 + (Math.sin(3) * 50 * position),
                                        300 + (Math.sin(4) * 50 * position),
                                        300 + (Math.sin(5) * 50 * position),
                                    ],
                                }}
                                transition={{
                                    opacity: {
                                        duration: duration,
                                        times: [0, 0.1, 0.9, 1],
                                        repeat: Infinity,
                                        repeatDelay: duration / 2,
                                        delay: delay,
                                    },
                                    x: {
                                        duration: duration,
                                        repeat: Infinity,
                                        repeatDelay: duration / 2,
                                        delay: delay,
                                    },
                                    y: {
                                        duration: duration,
                                        repeat: Infinity,
                                        repeatDelay: duration / 2,
                                        delay: delay,
                                    }
                                }}
                            />
                        );
                    })
                ))}
                
                {/* 添加价格波动点 */}
                {Array.from({ length: 12 }, (_, i) => {
                    // 使用黄金比例创建更加和谐的动画时间
                    const duration = 1 + (i % 3) * PHI / 2;
                    const delay = i * PHI / 2;
                    const x = 50 + (i * 100);
                    const y = 300 + (Math.sin(i * 0.5) * 80 * position);
                    
                    return (
                        <motion.circle
                            key={`pulse-dot-${i}`}
                            cx={x}
                            cy={y}
                            r={2 + (i % 3)}
                            fill={position > 0 
                                ? `hsla(${210 + (i * 5)}, 80%, 50%, 0.8)` 
                                : `hsla(${140 - (i * 5)}, 80%, 50%, 0.8)`
                            }
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                                scale: [0, 1 + (i % 3) * 0.5, 0],
                                opacity: [0, 0.8, 0],
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                repeatDelay: duration * PHI,
                                delay: delay,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
                
                {/* 添加价格标签 */}
                {position > 0 && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4, duration: 1 }}
                    >
                        <rect x="1000" y="150" width="80" height="30" rx="4" fill="rgba(59,130,246,0.2)" />
                        <text x="1040" y="170" textAnchor="middle" fill="rgba(59,130,246,0.8)" fontSize="14" fontFamily="monospace">+2.4%</text>
                    </motion.g>
                )}
                
                {position < 0 && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4, duration: 1 }}
                    >
                        <rect x="900" y="350" width="80" height="30" rx="4" fill="rgba(34,197,94,0.2)" />
                        <text x="940" y="370" textAnchor="middle" fill="rgba(34,197,94,0.8)" fontSize="14" fontFamily="monospace">+1.8%</text>
                    </motion.g>
                )}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
    subtitle = "Real-time Cryptocurrency Price Tracker for Live Streaming and Broadcasting",
    buttonText = "Launch Tracker",
    buttonLink = "/bitcoin"
}: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}) {
    const words = title.split(" ");
    const subtitleWords = subtitle.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
            <div className="absolute inset-0 opacity-30 dark:opacity-40">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-blue-600 to-green-500 
                                        dark:from-blue-400 dark:to-green-300"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        {subtitleWords.map((word, index) => {
                            if (word === "Live") {
                                return <span key={index} className="text-blue-500 font-semibold"> {word} </span>;
                            }
                            if (word === "Broadcasting") {
                                return <span key={index} className="text-green-500 font-semibold"> {word} </span>;
                            }
                            return <span key={index}> {word} </span>;
                        })}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.8 }}
                    >
                        <div
                            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                            dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                            overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <Button
                                variant="ghost"
                                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                text-black dark:text-white transition-all duration-300 
                                group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                hover:shadow-md dark:hover:shadow-neutral-800/50"
                                asChild
                            >
                                <Link href={buttonLink}>
                                    <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                        {buttonText}
                                    </span>
                                    <span
                                        className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                        transition-all duration-300"
                                    >
                                        →
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        className="mt-12"
                    >
                        <button 
                            onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex mx-auto gap-2 items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            See It In Action
                            <motion.span
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                ↓
                            </motion.span>
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
} 