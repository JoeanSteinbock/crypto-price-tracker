// API 密钥存储键名
export const API_KEY_STORAGE = "cryptotick-api-key";
export const API_KEY_TYPE_STORAGE = "cryptotick-api-key-type";

// API类型定义
export type ApiKeyType = "demo" | "pro" | null;

// 价格数据类型
export type PriceData = {
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  total_volume: number;
  market_cap: number;
  last_updated: string;
};

// 加密货币类型
export type CryptoCurrency = {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  image?: string;
  color?: string;
};

// API服务类
export class ApiService {
  private apiKey: string = "";
  private apiKeyType: ApiKeyType = null;
  private apiCallTimestamps: number[] = [];
  private logDebug: (message: string, data?: any) => void;

  constructor(
    apiKey: string = "", 
    apiKeyType: ApiKeyType = null,
    logDebug?: (message: string, data?: any) => void
  ) {
    // 设置日志函数
    this.logDebug = logDebug || ((message: string, data?: any) => {});
    
    // 如果构造函数中提供了API密钥和类型，则直接使用
    if (apiKey) {
      this.apiKey = apiKey;
      this.apiKeyType = apiKeyType || (apiKey.startsWith('demo_') ? 'demo' : 'pro');
      this.logDebug(`ApiService initialized with provided key: ${apiKey.substring(0, 4)}..., type: ${this.apiKeyType}`);
    } else {
      // 否则从本地存储加载
      this.loadApiKeyFromStorage();
    }
  }

  // 从本地存储加载API密钥
  private loadApiKeyFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const savedApiKey = localStorage.getItem(API_KEY_STORAGE);
      if (savedApiKey) {
        this.apiKey = savedApiKey;
        
        // 尝试加载API密钥类型
        const savedApiKeyType = localStorage.getItem(API_KEY_TYPE_STORAGE) as ApiKeyType;
        if (savedApiKeyType && (savedApiKeyType === 'demo' || savedApiKeyType === 'pro')) {
          this.apiKeyType = savedApiKeyType;
        } else {
          // 根据API密钥前缀推断类型
          this.apiKeyType = savedApiKey.startsWith('demo_') ? 'demo' : 'pro';
        }
        
        this.logDebug(`Loaded API key from storage: ${savedApiKey.substring(0, 4)}..., type: ${this.apiKeyType}`);
      } else {
        this.logDebug('No API key found in storage, using free tier');
        this.apiKey = "";
        this.apiKeyType = null;
      }
    } catch (error) {
      this.logDebug(`Error loading API key from storage: ${error}`);
      this.apiKey = "";
      this.apiKeyType = null;
    }
  }

  // 设置新的API密钥
  public setApiKey(apiKey: string, apiKeyType: ApiKeyType): void {
    // 不允许设置空字符串为密钥
    if (apiKey === "") {
      this.apiKey = "";
      this.apiKeyType = null;
      this.logDebug('API key cleared');
      return;
    }
    
    this.apiKey = apiKey;
    this.apiKeyType = apiKeyType || (apiKey.startsWith('demo_') ? 'demo' : 'pro');
    this.logDebug(`API key set to: ${apiKey.substring(0, 4)}..., type: ${this.apiKeyType}`);
    
    // 重置API调用计数
    this.apiCallTimestamps = [];
  }

  // 检查速率限制
  public checkRateLimit(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60000; // 1分钟前
    
    // 移除超过1分钟的时间戳
    this.apiCallTimestamps = this.apiCallTimestamps.filter(
      timestamp => timestamp > oneMinuteAgo
    );
    
    // 检查是否超过速率限制
    const callsInLastMinute = this.apiCallTimestamps.length;
    
    // 根据 API 密钥类型确定速率限制
    let rateLimit = 10; // 默认免费 API
    
    if (this.apiKey) {
      if (this.apiKeyType === "demo") {
        rateLimit = 30; // Demo API 密钥
        this.logDebug('Using Demo API key rate limit: 30 calls/min');
      } else if (this.apiKeyType === "pro") {
        rateLimit = 50; // Pro API 密钥
        this.logDebug('Using Pro API key rate limit: 50 calls/min');
      }
    } else {
      this.logDebug('Using Free API rate limit: 10 calls/min');
    }
    
    if (callsInLastMinute >= rateLimit) {
      this.logDebug(`Rate limit reached: ${callsInLastMinute}/${rateLimit} calls in the last minute`);
      return false;
    }
    
    // 记录这次调用
    this.apiCallTimestamps.push(now);
    return true;
  }

  // 获取轮询间隔时间（毫秒）
  public getPollingInterval(): number {
    if (this.apiKey) {
      if (this.apiKeyType === "demo") {
        this.logDebug('Using Demo API polling interval: 10 seconds');
        return 10000; // Demo API 10秒
      } else if (this.apiKeyType === "pro") {
        this.logDebug('Using Pro API polling interval: 6 seconds');
        return 6000; // Pro API 6秒
      }
    }
    
    this.logDebug('Using Free API polling interval: 15 seconds');
    return 15000; // 免费 API 15秒
  }

  // 准备API请求配置
  private prepareApiRequest(endpointUrl: string): { url: string; headers: HeadersInit } {
    let apiUrl = endpointUrl;
    const headers: HeadersInit = {};
    
    if (this.apiKey) {
      if (this.apiKeyType === "demo") {
        // Demo API 使用 x-cg-demo-api-key 请求头
        headers['x-cg-demo-api-key'] = this.apiKey;
        this.logDebug('Using Demo API with x-cg-demo-api-key header');
      } else if (this.apiKeyType === "pro") {
        // Pro API 使用 x-cg-pro-api-key 请求头并使用 pro-api 端点
        headers['x-cg-pro-api-key'] = this.apiKey;
        apiUrl = apiUrl.replace('api.coingecko.com/api', 'pro-api.coingecko.com/api');
        this.logDebug('Using Pro API with x-cg-pro-api-key header and pro-api endpoint');
      }
    } else {
      this.logDebug('Using Free API without API key');
    }
    
    return { url: apiUrl, headers };
  }

  // 处理API响应错误
  private handleApiError(error: any, status?: number): void {
    // 检查是否是 API 密钥错误
    if (status === 401 && this.apiKey) {
      this.logDebug(`Invalid API key, clearing`);
      this.apiKey = "";
      this.apiKeyType = null;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem(API_KEY_STORAGE);
        localStorage.removeItem(API_KEY_TYPE_STORAGE);
        
        // 发送事件通知其他组件 API 密钥已被清除
        const event = new CustomEvent('apikey-changed', { 
          detail: { 
            apiKey: "",
            apiKeyType: null
          } 
        });
        window.dispatchEvent(event);
      }
    }
  }

  // 获取加密货币价格数据
  public async fetchPriceData(cryptoId: string): Promise<PriceData | null> {
    if (!this.checkRateLimit()) {
      this.logDebug(`Skipping API call due to rate limit`);
      return null;
    }
    
    const endpointUrl = `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const { url, headers } = this.prepareApiRequest(endpointUrl);
    
    try {
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        this.handleApiError(null, response.status);
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        current_price: data.market_data.current_price.usd,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        high_24h: data.market_data.high_24h.usd,
        low_24h: data.market_data.low_24h.usd,
        total_volume: data.market_data.total_volume.usd,
        market_cap: data.market_data.market_cap.usd,
        last_updated: data.market_data.last_updated,
      };
    } catch (error) {
      this.logDebug(`Error fetching price data: ${error}`);
      throw error;
    }
  }

  // 搜索加密货币
  public async searchCryptos(term: string): Promise<CryptoCurrency[]> {
    if (!term || term.length < 2) {
      return [];
    }
    
    if (!this.checkRateLimit()) {
      this.logDebug(`Skipping search API call due to rate limit`);
      return [];
    }
    
    const endpointUrl = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(term)}`;
    const { url, headers } = this.prepareApiRequest(endpointUrl);
    
    try {
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        this.handleApiError(null, response.status);
        throw new Error(`Failed to search: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 转换为标准格式
      return data.coins.slice(0, 10).map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        icon: coin.thumb || "",
        image: coin.image?.large || coin.image?.small,
        color: "#808080" // 默认颜色
      }));
    } catch (error) {
      this.logDebug(`Error searching cryptos: ${error}`);
      return [];
    }
  }

  // 获取加密货币详细信息
  public async fetchCryptoInfo(cryptoId: string): Promise<CryptoCurrency | null> {
    if (!this.checkRateLimit()) {
      this.logDebug(`Skipping API call due to rate limit`);
      return null;
    }
    
    const endpointUrl = `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
    const { url, headers } = this.prepareApiRequest(endpointUrl);
    
    try {
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        this.handleApiError(null, response.status);
        throw new Error(`Failed to fetch crypto info: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        id: data.id,
        symbol: data.symbol.toLowerCase(),
        name: data.name,
        icon: data.symbol,
        image: data.image?.large || data.image?.small || "",
        color: "#808080" // 默认颜色
      };
      
    } catch (error) {
      this.handleApiError(error);
      return null;
    }
  }

  // 获取加密货币历史价格数据
  public async fetchHistoricalData(cryptoId: string, days: number = 1): Promise<{timestamp: number, price: number}[]> {
    if (!this.checkRateLimit()) {
      this.logDebug(`Skipping historical data API call due to rate limit`);
      return [];
    }
    
    const endpointUrl = `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`;
    const { url, headers } = this.prepareApiRequest(endpointUrl);
    
    try {
      this.logDebug(`Fetching historical data for ${cryptoId}, days: ${days}`);
      const response = await fetch(url, { 
        headers,
        cache: 'no-store' // 禁用缓存以获取新数据
      });
      
      if (!response.ok) {
        this.handleApiError(null, response.status);
        throw new Error(`Failed to fetch historical data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 返回格式化的数据
      return data.prices.map((item: [number, number]) => ({
        timestamp: item[0],
        price: item[1],
      }));
      
    } catch (error) {
      this.handleApiError(error);
      this.logDebug(`Error fetching historical data: ${error}`);
      return [];
    }
  }
}

// 创建全局单例实例
let apiServiceInstance: ApiService | null = null;

// 获取API服务实例
export function getApiService(
  logDebug?: (message: string, data?: any) => void
): ApiService {
  if (!apiServiceInstance) {
    apiServiceInstance = new ApiService("", null, logDebug);
  }
  
  return apiServiceInstance;
}
