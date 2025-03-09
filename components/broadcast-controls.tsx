'use client'

import { useState, useCallback } from 'react'
import { Maximize2, Monitor, Cast } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type BroadcastControlsProps = {
  layout?: 'horizontal' | 'vertical' | 'mobile'
  onAction?: () => void
}

export function BroadcastControls({ layout = 'horizontal', onAction }: BroadcastControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
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
  }, [onAction])

  // Enter presentation mode (hide UI elements)
  const enterPresentationMode = useCallback(() => {
    document.body.classList.toggle('presentation-mode')
    toast.success('Presentation mode toggled')
    if (onAction) onAction()
  }, [onAction])

  // Start screen sharing/broadcasting
  const startScreenShare = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
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
  }, [onAction])

  if (layout === 'mobile') {
    return (
      <>
        <Button 
          variant="outline" 
          className="flex flex-col justify-center items-center p-2 h-16"
          onClick={toggleFullscreen}
        >
          <Maximize2 className="mb-1 w-5 h-5" />
          <span className="text-xs">Fullscreen</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col justify-center items-center p-2 h-16"
          onClick={enterPresentationMode}
        >
          <Monitor className="mb-1 w-5 h-5" />
          <span className="text-xs">Present</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col justify-center items-center p-2 h-16"
          onClick={startScreenShare}
        >
          <Cast className="mb-1 w-5 h-5" />
          <span className="text-xs">Cast</span>
        </Button>
      </>
    )
  }

  if (layout === 'vertical') {
    return (
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="justify-start"
          onClick={toggleFullscreen}
        >
          <Maximize2 className="mr-2 w-4 h-4" />
          Fullscreen
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="justify-start"
          onClick={enterPresentationMode}
        >
          <Monitor className="mr-2 w-4 h-4" />
          Presentation Mode
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="justify-start"
          onClick={startScreenShare}
        >
          <Cast className="mr-2 w-4 h-4" />
          Screen Share
        </Button>
      </div>
    )
  }

  // Default horizontal layout
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleFullscreen}
        title="Fullscreen Mode"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={enterPresentationMode}
        title="Presentation Mode"
      >
        <Monitor className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={startScreenShare}
        title="Screen Share"
      >
        <Cast className="w-4 h-4" />
      </Button>
    </div>
  )
} 