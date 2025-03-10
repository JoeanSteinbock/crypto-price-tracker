"use client"

import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      <ThemeToggle showBorder={false} />
    </header>
  );
}