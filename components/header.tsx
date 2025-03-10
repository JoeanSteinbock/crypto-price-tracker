"use client"

import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const pathname = usePathname()

  if (pathname !== "/") {
    return null
  }

  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      <ThemeToggle showBorder={false} />
    </header>
  );
}