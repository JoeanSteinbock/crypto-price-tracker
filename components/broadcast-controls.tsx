'use client'

import { useState, useCallback } from 'react'
import { Maximize2, Monitor, Cast } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function BroadcastControls() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 切换全屏
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      toast.error('全屏模式不可用')
    }
  }, [])

  // 启动演示模式（隐藏UI元素）
  const enterPresentationMode = useCallback(() => {
    document.body.classList.toggle('presentation-mode')
    toast.success('演示模式已切换')
  }, [])

  // 开始屏幕共享/广播
  const startScreenShare = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always"
        },
        audio: false
      })
      
      // 这里可以添加将流发送到广播服务的逻辑
      toast.success('屏幕共享已启动')
      
      // 监听流结束
      mediaStream.getVideoTracks()[0].onended = () => {
        toast.info('屏幕共享已结束')
      }
    } catch (err) {
      toast.error('无法启动屏幕共享')
    }
  }, [])

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleFullscreen}
        title="全屏模式"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={enterPresentationMode}
        title="演示模式"
      >
        <Monitor className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={startScreenShare}
        title="屏幕共享"
      >
        <Cast className="h-4 w-4" />
      </Button>
    </div>
  )
} 