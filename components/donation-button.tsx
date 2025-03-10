"use client"

import { useState, useEffect } from "react"
import { Heart, Coffee, X, Copy, Check, ChevronDown, ChevronRight } from "lucide-react"
import { useIsMobile } from "../hooks/use-mobile";

interface DonationButtonProps {
  className?: string;
  hideTextOnMobile?: boolean;
}

export function DonationButton({ className = "", hideTextOnMobile = true }: DonationButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("BTC_TAPROOT");
  const [copied, setCopied] = useState(false);
  const [showBtcMenu, setShowBtcMenu] = useState(false);
  const isMobile = useIsMobile();
  
  // 从环境变量中读取捐赠地址
  const addresses: Record<string, string> = {
    BTC_TAPROOT: process.env.NEXT_PUBLIC_DONATION_BTC_TAPROOT || "bc1pd3xneatx2wglt8j92g747wpjyvjyga6j4ljyycc0mc2uxuddfzes8ald73",
    BTC_LEGACY: process.env.NEXT_PUBLIC_DONATION_BTC_LEGACY || "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    BTC_SEGWIT: process.env.NEXT_PUBLIC_DONATION_BTC_SEGWIT || "bc1q8r8y66zy2vne6xycm58tzp2vd067pl7dwyraan",
    ETH: process.env.NEXT_PUBLIC_DONATION_ETH || "0xc96d85fa4adb61331f50a2045d0a35d78060ed91",
    SOL: process.env.NEXT_PUBLIC_DONATION_SOL || "22YZJuq1ZoBWDqN2Xn7Eqn7qspf46X7TmxSFEHEmp1eU",
    TRX: process.env.NEXT_PUBLIC_DONATION_TRX || "TVBGY69nsozZPbjPHf4iu5mUMRdxSjX6jA",
    DOGE: process.env.NEXT_PUBLIC_DONATION_DOGE || "DNmLcdVRN1TY6q1cD5HPiX8L9zi1txwfNx"
  };
  
  // 加密货币显示名称
  const cryptoNames: Record<string, string> = {
    BTC_TAPROOT: "Bitcoin (Taproot)",
    BTC_LEGACY: "Bitcoin (Legacy)",
    BTC_SEGWIT: "Bitcoin (SegWit)",
    ETH: "Ethereum",
    SOL: "Solana",
    TRX: "Tron",
    DOGE: "Dogecoin"
  };
  
  // 加密货币URI前缀
  const cryptoUriPrefixes: Record<string, string> = {
    BTC_TAPROOT: "bitcoin:",
    BTC_LEGACY: "bitcoin:",
    BTC_SEGWIT: "bitcoin:",
    ETH: "ethereum:",
    SOL: "solana:",
    TRX: "tron:",
    DOGE: "dogecoin:"
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText(addresses[selectedCrypto]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // 获取加密货币的简短名称（用于按钮显示）
  const getShortName = (cryptoId: string) => {
    if (cryptoId.startsWith('BTC_')) {
      return 'BTC';
    }
    return cryptoId;
  };
  
  // 检查是否是比特币地址类型
  const isBitcoinType = (cryptoId: string) => cryptoId.startsWith('BTC_');
  
  // 获取当前选择的加密货币的QR码URL
  const getQrCodeUrl = () => {
    const prefix = cryptoUriPrefixes[selectedCrypto];
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${prefix}${addresses[selectedCrypto]}`;
  };
  
  // 切换比特币菜单显示状态
  const toggleBtcMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止事件冒泡
    setShowBtcMenu(!showBtcMenu);
  };
  
  // 选择比特币地址类型
  const selectBtcType = (type: string) => {
    setSelectedCrypto(type);
    setShowBtcMenu(false);
  };
  
  // 点击其他地方关闭比特币菜单
  useEffect(() => {
    if (!showBtcMenu) return;
    
    const handleClickOutside = () => {
      setShowBtcMenu(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showBtcMenu]);

  // 防止模态框打开时页面滚动
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);
  
  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 group ${className}`}
        title="Support this project"
      >
        <Coffee className="w-3.5 h-3.5" />
        <span className={`${isMobile && hideTextOnMobile ? "hidden xs:inline" : ""}`}>Support</span>
        <Heart className="w-3 h-3 text-red-500 opacity-70 heartbeat group-hover:opacity-100" />
      </button>
      
      {showModal && (
        <div className="min-w-[480px] bottom-[200px] fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div 
            className="overflow-hidden relative m-4 w-full max-w-md bg-white rounded-xl shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close donation modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center">
                <h2 className="mb-1 text-xl font-bold">Support CryptoTick.live</h2>
                <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400">
                  Your support helps keep this project free and updated
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {/* 非比特币加密货币 */}
                  {Object.keys(addresses)
                    .filter(crypto => !isBitcoinType(crypto))
                    .map(crypto => (
                      <button
                        key={crypto}
                        onClick={() => setSelectedCrypto(crypto)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedCrypto === crypto 
                            ? 'bg-blue-600 text-white dark:bg-blue-500' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        {crypto}
                      </button>
                    ))}
                  
                  {/* 比特币下拉菜单 */}
                  <div className="relative">
                    <button
                      onClick={toggleBtcMenu}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        isBitcoinType(selectedCrypto)
                          ? 'bg-blue-600 text-white dark:bg-blue-500' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      BTC
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    
                    {showBtcMenu && (
                      <div className="overflow-hidden absolute left-0 top-full z-10 mt-1 bg-white rounded-md border border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-700">
                        {Object.keys(addresses)
                          .filter(crypto => isBitcoinType(crypto))
                          .map(crypto => (
                            <button
                              key={crypto}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectBtcType(crypto);
                              }}
                              className={`flex items-center w-full px-4 py-2 text-xs text-left transition-colors ${
                                selectedCrypto === crypto
                                  ? 'bg-gray-100 dark:bg-gray-800 font-medium'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                            >
                              {selectedCrypto === crypto && (
                                <ChevronRight className="mr-1 w-3 h-3 text-blue-500" />
                              )}
                              {crypto.replace('BTC_', '')}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-3 mb-3 bg-white rounded-lg">
                  <img 
                    src={getQrCodeUrl()}
                    alt={`${cryptoNames[selectedCrypto]} donation QR code`} 
                    width={200} 
                    height={200}
                    className="rounded"
                  />
                </div>
                
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{cryptoNames[selectedCrypto]}</span>
                    <button 
                      onClick={copyAddress}
                      className="flex gap-1 items-center text-xs text-blue-500 hover:text-blue-600"
                      title={copied ? "Address copied" : "Copy address"}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2 font-mono text-xs break-all bg-gray-100 rounded dark:bg-gray-800">
                    {addresses[selectedCrypto]}
                  </div>
                </div>
                
                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                  Thank you for your support! ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 