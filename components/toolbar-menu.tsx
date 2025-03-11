'use client'

import { useState, useEffect } from 'react'
import { Settings, VolumeOff, Maximize2, Monitor, Cast, Key, X } from 'lucide-react'
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
import { ApiSettingsModal } from './api-settings-modal'
import { API_KEY_STORAGE, API_KEY_TYPE_STORAGE } from '@/lib/api-service'

export function ToolbarMenu() {
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  const checkIfMobile = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }

  useEffect(() => {
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return isMobile ? <MobileToolbar /> : <DesktopToolbar />
}

// Icon component wrapper
type IconName = 'settings' | 'cast' | 'audio' | 'fullscreen' | 'monitor' | 'key' | 'x';

interface IconProps {
  name: IconName;
  className?: string;
}

function Icon({ name, className = "w-5 h-5" }: IconProps) {
  const icons = {
    settings: Settings,
    cast: Cast,
    audio: VolumeOff,
    fullscreen: Maximize2,
    monitor: Monitor,
    key: Key,
    x: X
  };
  
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent className={className} /> : null;
}

function DesktopToolbar() {
  const [apiKey, setApiKey] = useState("")
  const [apiKeyType, setApiKeyType] = useState<"demo" | "pro">("pro")
  const [showApiSettingsModal, setShowApiSettingsModal] = useState(false)
  
  // Load API key
  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE)
    if (savedKey) {
      setApiKey(savedKey)
      
      // Also load key type
      const savedKeyType = localStorage.getItem(API_KEY_TYPE_STORAGE) as "demo" | "pro"
      if (savedKeyType) {
        setApiKeyType(savedKeyType)
      } else {
        setApiKeyType("pro") // Default to pro
      }
    }
  }, [])

  // Open API settings modal
  const openApiSettings = () => {
    setShowApiSettingsModal(true);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0 w-9 h-9 rounded-full shadow-sm backdrop-blur bg-white/90">
            <Settings className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* API Key Settings */}
          <DropdownMenuItem onClick={openApiSettings} className="cursor-pointer">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <Icon name="key" />
                <span>API Key</span>
              </div>
              <div className="text-sm text-right text-gray-500">
                {apiKey ? (
                  <div className="flex gap-2 justify-end items-center">
                    <span>●●●● ({apiKeyType})</span>
                  </div>
                ) : (
                  <div className="flex gap-2 justify-end items-center">
                    <span>Free API</span>
                  </div>
                )}
              </div>
            </div>
          </DropdownMenuItem>

          {/* Audio Controls */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-2">
            <div className="w-full">
              <div className="mb-1 text-sm">Audio Controls</div>
              <AudioController className="w-full" />
            </div>
          </DropdownMenuItem>

          {/* Broadcast Controls */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-2">
            <div className="w-full">
              <div className="mb-1 text-sm">Broadcast Controls</div>
              <BroadcastControls layout="vertical" />
            </div>
          </DropdownMenuItem>

          {/* Theme Toggle */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-2">
            <div className="w-full">
              <div className="mb-1 text-sm">Theme Settings</div>
              <ThemeToggle />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* API Settings Modal */}
      <ApiSettingsModal 
        open={showApiSettingsModal} 
        onClose={() => setShowApiSettingsModal(false)} 
      />
    </div>
  )
}

function MobileToolbar() {
  const [apiKey, setApiKey] = useState("")
  const [apiKeyType, setApiKeyType] = useState<"demo" | "pro">("pro")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showApiSettingsModal, setShowApiSettingsModal] = useState(false)

  // Load API key
  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE)
    if (savedKey) {
      setApiKey(savedKey)
      
      // Also load key type
      const savedKeyType = localStorage.getItem(API_KEY_TYPE_STORAGE) as "demo" | "pro"
      if (savedKeyType) {
        setApiKeyType(savedKeyType)
      } else {
        setApiKeyType("pro") // Default to pro
      }
    }
  }, [])

  // Open API settings modal
  const openApiSettings = () => {
    setShowApiSettingsModal(true);
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="p-0 w-10 h-10 rounded-full shadow-sm backdrop-blur bg-white/90 dark:bg-slate-900/90"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Settings className="w-5 h-5" />
        </Button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-12 p-4 w-64 bg-white rounded-lg border shadow-lg dark:bg-slate-900 dark:border-slate-800">
            <div className="space-y-3">
              {/* API Key Settings */}
              <div 
                onClick={openApiSettings}
                className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <div className="flex gap-2 items-center">
                  <Icon name="key" />
                  <span>API Key</span>
                </div>
                <div className="text-sm text-right text-gray-600">
                  {apiKey ? (
                    <div className="flex gap-2 justify-end items-center">
                      <span>●●●● ({apiKeyType})</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end items-center">
                      <span>Free API</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Audio Controls */}
              <div className="p-2">
                <div className="mb-1 text-sm">Audio Controls</div>
                <AudioController className="w-full" />
              </div>

              {/* Broadcast Controls */}
              <div className="p-2">
                <div className="mb-1 text-sm">Broadcast Controls</div>
                <BroadcastControls layout="vertical" />
              </div>

              {/* Theme Toggle */}
              <div className="p-2">
                <div className="mb-1 text-sm">Theme Settings</div>
                <ThemeToggle />
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex justify-center items-center w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="mr-2 w-4 h-4" />
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* API Settings Modal */}
      <ApiSettingsModal 
        open={showApiSettingsModal} 
        onClose={() => setShowApiSettingsModal(false)} 
      />
    </div>
  )
} 