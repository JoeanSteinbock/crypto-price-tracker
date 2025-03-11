'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { API_KEY_STORAGE, API_KEY_TYPE_STORAGE, reverseString } from '@/lib/api-service';

type ApiKeyType = "demo" | "pro";

interface ApiSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ApiSettingsModal({ open, onClose }: ApiSettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyType, setApiKeyType] = useState<ApiKeyType>("pro");
  const [apiKeyError, setApiKeyError] = useState("");
  const [urlApiKeyDetected, setUrlApiKeyDetected] = useState(false);
  const searchParams = useSearchParams();
  
  // 加载 API 密钥
  useEffect(() => {
    try {
      // 首先检查 URL 参数
      const apiKeyFromUrl = searchParams.get('api_key');
      const apiTypeFromUrl = searchParams.get('api_type') as ApiKeyType;
      
      if (apiKeyFromUrl) {
        // 如果是从 URL 参数获取的 API key，需要先反转回来
        setApiKey(reverseString(apiKeyFromUrl));
        setUrlApiKeyDetected(true);
        
        if (apiTypeFromUrl && (apiTypeFromUrl === 'demo' || apiTypeFromUrl === 'pro')) {
          setApiKeyType(apiTypeFromUrl);
        } else {
          // 根据密钥前缀推断类型
          setApiKeyType(reverseString(apiKeyFromUrl).startsWith('demo_') ? 'demo' : 'pro');
        }
      } else {
        // 如果 URL 中没有参数，从本地存储中加载
        const savedKey = localStorage.getItem(API_KEY_STORAGE);
        if (savedKey) {
          setApiKey(savedKey);
          
          // 同时加载密钥类型
          const savedKeyType = localStorage.getItem(API_KEY_TYPE_STORAGE) as ApiKeyType;
          if (savedKeyType) {
            setApiKeyType(savedKeyType);
          } else {
            setApiKeyType("pro"); // 默认为 pro
          }
        }
      }
    } catch (e) {
      console.error("Failed to load API key:", e);
    }
  }, [searchParams]);

  // 清除 API 密钥
  const clearApiKey = () => {
    setApiKey("");
    localStorage.removeItem(API_KEY_STORAGE);
    localStorage.removeItem(API_KEY_TYPE_STORAGE);
    
    // 触发自定义事件
    const event = new CustomEvent(API_KEY_STORAGE, { 
      detail: { 
        apiKey: "",
        apiKeyType: null
      } 
    });
    window.dispatchEvent(event);
    
    onClose();
  };

  // 验证 API 密钥
  const validateApiKey = (key: string): boolean => {
    if (!key) return true; // 空密钥是有效的（使用免费API）
    return key.length >= 8; // 简单的长度验证
  };

  // 保存 API 密钥
  const saveApiKey = () => {
    if (!validateApiKey(apiKey)) {
      setApiKeyError("Invalid API key format");
      return;
    }
    
    // 保存到本地存储
    if (apiKey) {
      localStorage.setItem(API_KEY_STORAGE, apiKey);
      localStorage.setItem(API_KEY_TYPE_STORAGE, apiKeyType);
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
      localStorage.removeItem(API_KEY_TYPE_STORAGE);
    }
    
    // 触发自定义事件以通知其他组件API密钥已更改
    const event = new CustomEvent(API_KEY_STORAGE, { 
      detail: { 
        apiKey: apiKey,
        apiKeyType: apiKey ? apiKeyType : null
      } 
    });
    window.dispatchEvent(event);
    
    setApiKeyError("");
    setUrlApiKeyDetected(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>CoinGecko API Key Settings</DialogTitle>
          <DialogDescription>
            Enter your CoinGecko API key to increase API call limits
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {apiKeyError && (
            <div className="p-2 text-sm text-red-500 bg-red-100 rounded-md">
              {apiKeyError}
            </div>
          )}
          
          {urlApiKeyDetected && (
            <div className="p-2 text-sm text-blue-700 bg-blue-50 rounded-md border border-blue-200">
              API key detected from URL parameters. Save to store it locally.
            </div>
          )}
          
          <div className="grid gap-2">
            <label htmlFor="apiKeyType" className="text-sm font-medium">
              API Key Type
            </label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1.5">
                <input 
                  type="radio" 
                  name="apiKeyType" 
                  value="demo" 
                  checked={apiKeyType === "demo"} 
                  onChange={() => setApiKeyType("demo")}
                  className="w-4 h-4"
                />
                <span>Demo</span>
              </label>
              <label className="flex items-center gap-1.5">
                <input 
                  type="radio" 
                  name="apiKeyType" 
                  value="pro" 
                  checked={apiKeyType === "pro"} 
                  onChange={() => setApiKeyType("pro")}
                  className="w-4 h-4"
                />
                <span>Pro</span>
              </label>
            </div>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your CoinGecko API key"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500">
              Leave empty to use free API with limited calls
            </p>
          </div>
          
          <div className="space-y-2 text-xs text-gray-500">
            <div>API keys are only stored locally on your device</div>
            <div>
              Key type information:
              <ul className="ml-4 list-disc">
                <li>Demo API key - 30 calls per minute</li>
                <li>Pro API key - Higher call limits</li>
              </ul>
            </div>
            <a 
              href="https://www.coingecko.com/en/api/pricing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-blue-500 hover:underline"
            >
              Get an API key
            </a>
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={clearApiKey}>
            Clear Key
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={saveApiKey}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 