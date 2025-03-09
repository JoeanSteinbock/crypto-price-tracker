'use client'

import { Settings, VolumeOff, Maximize2, Monitor, Cast } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { BroadcastControls } from './broadcast-controls'
import { AudioController } from './audio-controller'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'

export function ToolbarMenu() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 检测窗口大小变化
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // 初始检查
    checkIfMobile()

    // 添加事件监听器
    window.addEventListener('resize', checkIfMobile)

    // 清理事件监听器
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return (
    <DesktopToolbar />
  )
}

function DesktopToolbar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2 space-y-4">
          <div>
            <span className="text-xs text-muted-foreground">Audio Controls</span>
            <AudioController className="flex justify-start mt-1" />
          </div>

          <div>
            <span className="text-xs text-muted-foreground">Display Controls</span>
            <div className="mt-1">
              <BroadcastControls layout="vertical" />
            </div>
          </div>

          <div>
            <span className="text-xs text-muted-foreground">Theme Settings</span>
            <div className="mt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileToolbar() {
  const [isOpen, setIsOpen] = useState(false)

  // 当菜单打开时，禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-background/80" onClick={() => setIsOpen(false)}>
          <div
            className="fixed right-0 bottom-0 left-0 p-4 border-t bg-background border-border"
            onClick={e => e.stopPropagation()}
          >
            <div className="grid grid-cols-4 gap-2">
              <AudioController onAction={() => setIsOpen(false)} />
              <BroadcastControls onAction={() => setIsOpen(false)} />
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm">Theme</span>
              <ThemeToggle />
            </div>

            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  )
} 