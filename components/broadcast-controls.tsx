'use client'

import { useState, useCallback, useEffect } from 'react'
import { Maximize2, Monitor, Cast } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type BroadcastControlsProps = {
  layout?: 'horizontal' | 'vertical' | 'mobile'
  onAction?: () => void
}

export function BroadcastControls({ layout = 'horizontal', onAction }: BroadcastControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFullscreenSupported, setIsFullscreenSupported] = useState(false);
  const [isScreenShareSupported, setIsScreenShareSupported] = useState(false);

  // Check feature support on mount
  useEffect(() => {
    // Check fullscreen support
    const fullscreenSupported = document.documentElement.requestFullscreen !== undefined ||
      (document.documentElement as any).webkitRequestFullscreen !== undefined;
    setIsFullscreenSupported(fullscreenSupported);

    // Check screen sharing support
    const screenShareSupported = navigator.mediaDevices?.getDisplayMedia !== undefined;
    setIsScreenShareSupported(screenShareSupported);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreenSupported) {
      toast.error('Fullscreen mode not supported on this device');
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
      if (onAction) onAction()
    } catch (err) {
      toast.error('Fullscreen mode unavailable')
    }
  }, [onAction, isFullscreenSupported])

  // Enter presentation mode (hide UI elements)
  const enterPresentationMode = useCallback(() => {
    const body = document.body;
    const isInPresentationMode = body.classList.contains('presentation-mode');
    
    // 关闭所有打开的菜单和对话框，但不删除它们
    const openMenus = document.querySelectorAll('[role="dialog"], [role="menu"], [data-state="open"]');
    openMenus.forEach(menu => {
      if (menu instanceof HTMLElement) {
        menu.setAttribute('data-presentation-hidden', 'true');
      }
    });
    
    // Toggle presentation mode
    body.classList.toggle('presentation-mode');
    
    // Add click handler to exit presentation mode
    if (!isInPresentationMode) {
      const exitHandler = (e: MouseEvent) => {
        // Ignore clicks on stats grid to prevent accidental exits
        if ((e.target as HTMLElement).closest('.stats-grid')) {
          return;
        }
        
        // Exit presentation mode
        body.classList.remove('presentation-mode');
        document.removeEventListener('click', exitHandler);
        
        if (onAction) onAction();
      };
      
      // Add a small delay before enabling the click handler to prevent immediate exit
      setTimeout(() => {
        document.addEventListener('click', exitHandler);
      }, 300);
    }
  }, [onAction])

  // Start screen sharing/broadcasting
  const startScreenShare = useCallback(async () => {
    if (!isScreenShareSupported) {
      toast.error('Screen sharing not supported on this device');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          // @ts-ignore - cursor is supported in modern browsers but not in TypeScript definitions
          cursor: "always"
        },
        audio: false
      })
      
      toast.success('Screen sharing started')
      
      // Listen for stream end
      mediaStream.getVideoTracks()[0].onended = () => {
        toast.info('Screen sharing ended')
      }
      
      if (onAction) onAction()
    } catch (err) {
      toast.error('Unable to start screen sharing')
    }
  }, [onAction, isScreenShareSupported])

  if (layout === 'mobile') {
    // Only show controls if they are supported
    const hasControls = isFullscreenSupported || isScreenShareSupported;
    if (!hasControls) return null;

    return (
      <>
        {isFullscreenSupported && (
          <Button 
            variant="outline" 
            className="flex flex-col justify-center items-center p-2 h-16"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="mb-1 w-5 h-5" />
            <span className="text-xs">Fullscreen</span>
          </Button>
        )}
        
        {isScreenShareSupported && (
          <Button 
            variant="outline" 
            className="flex flex-col justify-center items-center p-2 h-16"
            onClick={startScreenShare}
          >
            <Cast className="mb-1 w-5 h-5" />
            <span className="text-xs">Cast</span>
          </Button>
        )}
      </>
    )
  }

  if (layout === 'vertical') {
    return (
      <div className="flex flex-col gap-2">
        {isFullscreenSupported && (
          <Button
            variant="outline"
            size="sm"
            className="justify-start"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="mr-2 w-4 h-4" />
            Fullscreen
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="justify-start hidden md:flex"
          onClick={enterPresentationMode}
        >
          <Monitor className="mr-2 w-4 h-4" />
          Presentation Mode
        </Button>
        {isScreenShareSupported && (
          <Button
            variant="outline"
            size="sm"
            className="justify-start"
            onClick={startScreenShare}
          >
            <Cast className="mr-2 w-4 h-4" />
            Screen Share
          </Button>
        )}
      </div>
    )
  }

  // Default horizontal layout
  return (
    <div className="flex gap-2">
      {isFullscreenSupported && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          title="Fullscreen Mode"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={enterPresentationMode}
        title="Presentation Mode"
        className="hidden md:inline-flex"
      >
        <Monitor className="w-4 h-4" />
      </Button>
      
      {isScreenShareSupported && (
        <Button
          variant="outline"
          size="icon"
          onClick={startScreenShare}
          title="Screen Share"
        >
          <Cast className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
} 