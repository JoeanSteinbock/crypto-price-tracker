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
          <Settings className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Toolbar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2 space-y-4">
          <div>
            <span className="text-xs text-muted-foreground">Audio Control</span>
            <AudioController className="flex justify-start mt-1" />
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground">Display Control</span>
            <div className="flex flex-col gap-2 mt-1">
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => document.documentElement.requestFullscreen()}
              >
                <Maximize2 className="mr-2 w-4 h-4" />
                Fullscreen Mode
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => document.body.classList.toggle('presentation-mode')}
              >
                <Monitor className="mr-2 w-4 h-4" />
                Presentation Mode
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
                    console.error('Screen share failed:', err);
                  }
                }}
              >
                <Cast className="mr-2 w-4 h-4" />
                Screen Share
              </Button>
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