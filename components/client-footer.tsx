"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function ClientFooter() {
  const pathname = usePathname()
  const showFooter = pathname === "/" // 如果是首页，不显示页脚
  
  return showFooter ? <Footer /> : null
} 