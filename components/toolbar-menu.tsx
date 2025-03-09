'use client'

import { Settings, Volume2, Maximize2, Monitor, Cast } from 'lucide-react'
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

export function ToolbarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>工具栏</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2 space-y-4">
          <div>
            <span className="text-xs text-muted-foreground">音频控制</span>
            <AudioController className="mt-1 flex justify-start" />
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground">显示控制</span>
            <div className="mt-1 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => document.documentElement.requestFullscreen()}
              >
                <Maximize2 className="mr-2 h-4 w-4" />
                全屏模式
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => document.body.classList.toggle('presentation-mode')}
              >
                <Monitor className="mr-2 h-4 w-4" />
                演示模式
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={async () => {
                  try {
                    await navigator.mediaDevices.getDisplayMedia({
                      video: { cursor: "always" },
                      audio: false
                    });
                  } catch (err) {
                    console.error('屏幕共享失败:', err);
                  }
                }}
              >
                <Cast className="mr-2 h-4 w-4" />
                屏幕共享
              </Button>
            </div>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground">主题设置</span>
            <div className="mt-1">
              <ThemeToggle className="w-full justify-start" />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 