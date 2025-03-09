"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Music, Music2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
// 我们将不再直接导入AudioGenerator，而是在需要时动态加载它
// import { AudioGenerator } from "@/components/audio-generator"

const bgTracks = [
  "https://cdn.pixabay.com/audio/2024/12/26/audio_5686c7b0c3.mp3",
  "https://cdn.pixabay.com/audio/2025/02/06/audio_97edd31405.mp3", 
  "https://cdn.pixabay.com/audio/2024/12/01/audio_968fc36840.mp3",
  "https://cdn.pixabay.com/audio/2024/11/05/audio_27b3644bf7.mp3",
  "https://cdn.pixabay.com/audio/2022/03/29/audio_321d17982c.mp3"
]

// 全局音频管理器
class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private secondaryAudio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private lastSoundTime: number = 0;
  private useAdvancedAudio: boolean = false; // 是否使用高级音频功能
  private audioNodes: any = null; // 存储音频处理节点

  private constructor() {
    // 私有构造函数，防止直接创建实例
    if (typeof window !== 'undefined') {
      // 主背景音乐
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.volume = 0.3;
      this.setRandomTrack();
      
      // 次要音频（用于价格变化等事件）
      this.secondaryAudio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=electronic-future-beats-117997.mp3");
      this.secondaryAudio.volume = 0.2;
      
      // 设置音频上下文（用于生成音调）
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("无法创建音频上下文:", e);
        this.dispatchAudioError();
      }
      
      // 添加错误处理
      if (this.audio) {
        this.audio.addEventListener('error', this.dispatchAudioError.bind(this));
      }
      
      if (this.secondaryAudio) {
        this.secondaryAudio.addEventListener('error', this.dispatchAudioError.bind(this));
      }
      
      // 监听加密货币变化事件
      window.addEventListener('crypto-changed', this.handleCryptoChange.bind(this));
      
      // 监听价格变化事件
      window.addEventListener('price-change', this.handlePriceChange.bind(this) as EventListener);
      
      // 检查是否应该使用高级音频功能
      this.checkAdvancedAudioSupport();
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public setRandomTrack(): void {
    if (!this.audio) return;
    const randomTrack = bgTracks[Math.floor(Math.random() * bgTracks.length)];
    this.audio.src = randomTrack;
    
    // 添加结束事件监听器，播放下一首
    this.audio.onended = () => {
      this.setRandomTrack();
      if (this.isPlaying) {
        this.audio?.play().catch(err => console.error("Failed to play next track:", err));
      }
    };
  }

  public toggle(): void {
    if (!this.audio) return;
    
    if (this.isPlaying) {
      this.audio.pause();
      if (this.secondaryAudio) {
        this.secondaryAudio.pause();
      }
      this.isPlaying = false;
    } else {
      this.audio.play().catch(err => {
        console.error("Failed to play audio:", err);
        this.isPlaying = false;
        this.dispatchAudioError();
      });
      this.isPlaying = true;
    }
    
    // 通知所有监听器
    this.notifyListeners();
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public addListener(callback: (isPlaying: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.isPlaying);
    }
  }
  
  private handleCryptoChange(): void {
    // 确保音频状态一致
    if (this.audio) {
      if (this.isPlaying) {
        if (this.audio.paused) {
          this.audio.play().catch(err => console.error("Failed to play after crypto change:", err));
        }
      } else {
        if (!this.audio.paused) {
          this.audio.pause();
        }
      }
    }
  }
  
  private handlePriceChange(event: CustomEvent): void {
    if (!this.isPlaying) return;
    
    const { direction, isNewData } = event.detail;
    
    // 限制声音频率（至少间隔5秒）
    const now = Date.now();
    if (now - this.lastSoundTime < 5000) {
      return;
    }
    this.lastSoundTime = now;
    
    // 播放次要音频（仅在有新数据时）
    if (isNewData && this.secondaryAudio && this.isPlaying) {
      this.secondaryAudio.currentTime = 0;
      this.secondaryAudio.play()
        .then(() => {
          setTimeout(() => {
            if (!this.isPlaying) {
              this.secondaryAudio?.pause();
            } else {
              this.secondaryAudio?.pause();
              this.secondaryAudio!.currentTime = 0;
            }
          }, 3000);
        })
        .catch(console.error);
    }
    
    // 创建价格变化音调 - 根据音频模式调整音量
    const volume = this.useAdvancedAudio ? 0.2 : 0.1;
    this.createPriceChangeSound(direction, volume);
  }
  
  private createPriceChangeSound(direction: string, volume: number = 0.1): void {
    if (!this.audioContext) return;
    
    const frequencies = direction === "up" 
      ? [523.25, 659.25, 783.99] // C5, E5, G5 (C major chord)
      : [493.88, 587.33, 698.46]; // B4, D5, F5 (B diminished chord)
    
    frequencies.forEach(freq => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      
      osc.type = "sine";
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, this.audioContext!.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.audioContext!.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext!.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      
      osc.start();
      osc.stop(this.audioContext!.currentTime + 0.5);
    });
  }
  
  private dispatchAudioError(): void {
    window.dispatchEvent(new Event('audio-error'));
  }
  
  public cleanup(): void {
    // 清理资源
    this.cleanupAudioNodes();
    
    window.removeEventListener('crypto-changed', this.handleCryptoChange.bind(this));
    window.removeEventListener('price-change', this.handlePriceChange.bind(this) as EventListener);
    
    if (this.audio) {
      this.audio.removeEventListener('error', this.dispatchAudioError.bind(this));
      this.audio.pause();
      this.audio.src = '';
    }
    
    if (this.secondaryAudio) {
      this.secondaryAudio.removeEventListener('error', this.dispatchAudioError.bind(this));
      this.secondaryAudio.pause();
      this.secondaryAudio.src = '';
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.listeners.clear();
  }

  // 检查是否支持高级音频功能
  private checkAdvancedAudioSupport(): void {
    // 这里可以添加检测逻辑，例如检查AudioContext的支持情况
    // 或者根据用户设备性能决定是否启用高级音频
    // 目前简单地设置为false，表示默认不使用高级音频
    this.useAdvancedAudio = false;
  }
  
  // 切换高级音频功能
  public toggleAdvancedAudio(): void {
    this.useAdvancedAudio = !this.useAdvancedAudio;
    
    // 清理之前的音频连接
    this.cleanupAudioNodes();
    
    if (this.useAdvancedAudio) {
      // 高级音频模式：更丰富的音效、更高的音量
      if (this.audio) {
        // 增加音量
        this.audio.volume = 0.5;
      }
      
      if (this.secondaryAudio) {
        this.secondaryAudio.volume = 0.4;
      }
      
      console.log("Enhanced audio mode enabled");
    } else {
      // 基本音频模式：恢复默认设置
      if (this.audio) {
        this.audio.volume = 0.3;
      }
      
      if (this.secondaryAudio) {
        this.secondaryAudio.volume = 0.2;
      }
      
      console.log("Basic audio mode enabled");
    }
    
    // 通知所有监听器状态变化
    this.notifyListeners();
  }
  
  // 清理音频处理节点
  private cleanupAudioNodes(): void {
    if (this.audioNodes) {
      try {
        // 断开连接
        if (this.audioNodes.source) {
          this.audioNodes.source.disconnect();
        }
        if (this.audioNodes.equalizer) {
          this.audioNodes.equalizer.disconnect();
        }
        if (this.audioNodes.compressor) {
          this.audioNodes.compressor.disconnect();
        }
      } catch (e) {
        console.error("Error cleaning up audio nodes:", e);
      }
      
      this.audioNodes = null;
    }
  }
  
  // 获取高级音频状态
  public getAdvancedAudioStatus(): boolean {
    return this.useAdvancedAudio;
  }
}

interface AudioControllerProps {
  className?: string
}

export function AudioController({ className }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [advancedAudio, setAdvancedAudio] = useState(false);
  const audioManager = useRef<AudioManager | null>(null);

  useEffect(() => {
    // 初始化音频管理器
    if (typeof window !== 'undefined') {
      audioManager.current = AudioManager.getInstance();
      
      // 同步初始状态
      setIsPlaying(audioManager.current.getStatus());
      setAdvancedAudio(audioManager.current.getAdvancedAudioStatus());
      
      // 添加状态变化监听器
      const removeListener = audioManager.current.addListener((playing) => {
        setIsPlaying(playing);
      });
      
      // 添加错误处理
      const handleAudioError = () => {
        setAutoplayFailed(true);
      };
      
      window.addEventListener('audio-error', handleAudioError);
      
      return () => {
        removeListener();
        window.removeEventListener('audio-error', handleAudioError);
        // 注意：不要在这里调用cleanup，因为其他组件可能仍在使用AudioManager
      };
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (audioManager.current) {
      audioManager.current.toggle();
    }
  }, []);
  
  const toggleAdvancedAudio = useCallback(() => {
    if (audioManager.current) {
      audioManager.current.toggleAdvancedAudio();
      setAdvancedAudio(audioManager.current.getAdvancedAudioStatus());
    }
  }, []);

  const extraClass = autoplayFailed ? "animate-pulse" : "";
  return (
    <div className={className}>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          className={`flex flex-1 gap-2 items-center ${extraClass}`}
          onClick={toggleAudio}
          title={isPlaying ? "Mute" : "Unmute"}
        >
          {isPlaying ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4 text-muted-foreground" />}
          <span>Audio {isPlaying ? 'On' : 'Off'}</span>
        </Button>
        
        {/* 高级音频切换按钮 */}
        {isPlaying && (
          <Button
            variant={advancedAudio ? "default" : "outline"}
            size="sm"
            className={`text-xs transition-all duration-300 ${advancedAudio ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' : ''}`}
            onClick={toggleAdvancedAudio}
            title={advancedAudio ? "Switch to basic audio mode" : "Switch to enhanced audio mode with louder sounds"}
          >
            {advancedAudio ? "Louder" : "Normal"}
          </Button>
        )}
      </div>
      
      {/* 音频模式说明 - 移除以简化界面 */}
    </div>
  )
}
