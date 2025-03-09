"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AudioGenerator } from "@/components/audio-generator"

const bgTracks = [
  "https://cdn.pixabay.com/audio/2024/12/26/audio_5686c7b0c3.mp3",
  "https://cdn.pixabay.com/audio/2025/02/06/audio_97edd31405.mp3", 
  "https://cdn.pixabay.com/audio/2024/12/01/audio_968fc36840.mp3",
  "https://cdn.pixabay.com/audio/2024/11/05/audio_27b3644bf7.mp3",
  "https://cdn.pixabay.com/audio/2022/03/29/audio_321d17982c.mp3"
]

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null)
  const [autoplayAttempted, setAutoplayAttempted] = useState(false)
  const [autoplayFailed, setAutoplayFailed] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const bgAudioRef = useRef<HTMLAudioElement>(null)
  const priceAudioRef = useRef<HTMLAudioElement>(null)
  const lastSoundTimeRef = useRef<number>(0)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      // 组件卸载时清理音频上下文
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [])

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // 随机选择背景音乐
  const getRandomTrack = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * bgTracks.length)
    return bgTracks[randomIndex]
  }, [])

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.src = getRandomTrack()
      bgAudioRef.current.loop = true
      bgAudioRef.current.volume = volume
    }
  }, [getRandomTrack, volume])

  // 当一首歌播放结束时,随机播放下一首
  const handleTrackEnded = useCallback(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.src = getRandomTrack()
      bgAudioRef.current.play()
    }
  }, [getRandomTrack])

  useEffect(() => {
    const bgAudio = bgAudioRef.current
    if (bgAudio) {
      bgAudio.addEventListener('ended', handleTrackEnded)
    }
    return () => {
      if (bgAudio) {
        bgAudio.removeEventListener('ended', handleTrackEnded)
      }
    }
  }, [handleTrackEnded])

  // 修改初始化代码，移除次要音频的循环播放
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mainAudio = new Audio(getRandomTrack());
      const secondaryAudio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=electronic-future-beats-117997.mp3");
      
      mainAudio.loop = true;
      mainAudio.volume = 0.3;
      secondaryAudio.volume = 0.2; // 移除 loop
      
      bgAudioRef.current = mainAudio;
      setBackgroundAudio(secondaryAudio);

      // 监听错误事件
      const handleError = () => {
        console.error("背景音乐加载失败");
        setAutoplayFailed(true);
      };

      mainAudio.addEventListener('error', handleError);
      secondaryAudio.addEventListener('error', handleError);

      return () => {
        mainAudio.removeEventListener('error', handleError);
        secondaryAudio.removeEventListener('error', handleError);
      };
    }
  }, [getRandomTrack]);

  // 修改播放控制逻辑
  useEffect(() => {
    if (!isPlaying) {
      bgAudioRef.current?.pause();
      backgroundAudio?.pause(); // 确保次要音频也会暂停
      return;
    }

    // 只播放主音轨
    bgAudioRef.current?.play().catch(err => {
      console.error("音频播放失败:", err);
      setIsPlaying(false);
      setAutoplayFailed(true);
    });

  }, [isPlaying, backgroundAudio]);

  // 修改价格变化事件处理
  useEffect(() => {
    // 确保只创建一个 AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const currentContext = audioContextRef.current

    const handlePriceChange = (event: CustomEvent) => {
      if (!isPlaying) return

      const { direction, isNewData } = event.detail
      
      const now = Date.now();
      if (now - lastSoundTimeRef.current < 5000) {
        return;
      }
      lastSoundTimeRef.current = now;

      // 确保使用同一个 AudioContext
      if (!currentContext) return
      
      // 只在新数据到达时播放次要音频
      if (isNewData && backgroundAudio) {
        backgroundAudio.currentTime = 0;
        backgroundAudio.play()
          .then(() => {
            setTimeout(() => {
              if (!isPlaying) { // 如果音频被关闭，立即停止
                backgroundAudio.pause();
              } else {
                backgroundAudio.pause();
                backgroundAudio.currentTime = 0;
              }
            }, 3000);
          })
          .catch(console.error);
      }

      // 创建更积极的价格变化声音
      const createChord = () => {
        const frequencies = direction === "up" 
          ? [523.25, 659.25, 783.99] // C5, E5, G5 (C major chord)
          : [493.88, 587.33, 698.46]; // B4, D5, F5 (B diminished chord)
        
        frequencies.forEach(freq => {
          const osc = currentContext.createOscillator();
          const gain = currentContext.createGain();
          
          osc.type = "sine";
          osc.frequency.value = freq;
          
          gain.gain.setValueAtTime(0, currentContext.currentTime);
          gain.gain.linearRampToValueAtTime(0.1, currentContext.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, currentContext.currentTime + 0.5);
          
          osc.connect(gain);
          gain.connect(currentContext.destination);
          
          osc.start();
          osc.stop(currentContext.currentTime + 0.5);
        });
      };

      createChord();
    }

    window.addEventListener("price-change", handlePriceChange as EventListener)

    return () => {
      window.removeEventListener("price-change", handlePriceChange as EventListener)
      // 组件卸载时关闭 AudioContext
      if (currentContext) {
        currentContext.close()
        audioContextRef.current = null
      }
      if (backgroundAudio) {
        backgroundAudio.pause()
        backgroundAudio.currentTime = 0
      }
    }
  }, [isPlaying, backgroundAudio])

  const handleAudioInitialized = () => {
    setIsInitialized(true)
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className={`${autoplayFailed ? "animate-pulse" : ""} w-full flex items-center gap-2`}
        onClick={toggleAudio}
        title={isPlaying ? "Mute" : "Unmute"}
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        <span>音频{isPlaying ? '开启' : '关闭'}</span>
      </Button>
    </div>
  )
}
