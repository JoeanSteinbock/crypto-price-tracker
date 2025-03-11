import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import TOP_CRYPTOCURRENCIES from '@/data/cryptocurrencies'
import { getServerApiService } from '@/lib/api-service'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { cryptoId: string } }
) {
  try {
    const { cryptoId } = params
    
    // First try to get cryptocurrency info from local data
    let cryptoInfo = TOP_CRYPTOCURRENCIES.find(c => c.id === cryptoId)
    let priceData = null
    
    // If not found in local data or need to get price data, use API service
    if (!cryptoInfo || true) { // Always get the latest price data
      const apiService = getServerApiService((message) => console.log(`[OG API] ${message}`))
      
      // Fetch cryptocurrency info and price data in parallel
      const [apiCryptoInfo, apiPriceData] = await Promise.all([
        !cryptoInfo ? apiService.fetchCryptoInfo(cryptoId) : Promise.resolve(null),
        apiService.fetchPriceData(cryptoId)
      ])
      
      // If API returned cryptocurrency info, use it
      if (apiCryptoInfo) {
        cryptoInfo = apiCryptoInfo
      }
      
      // Save price data
      priceData = apiPriceData
    }
    
    // If cryptocurrency info not found, use default value
    if (!cryptoInfo) {
      cryptoInfo = TOP_CRYPTOCURRENCIES[0]
    }
    
    // Format price and change percentage
    const formattedPrice = priceData 
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 8
        }).format(priceData.current_price)
      : '$0.00'
    
    const changePercent = priceData?.price_change_percentage_24h || 0
    const isPositiveChange = changePercent >= 0
    const formattedChange = `${isPositiveChange ? '+' : ''}${changePercent.toFixed(2)}%`
    
    // Create OG image response
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            color: 'white',
            fontFamily: 'sans-serif',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
              zIndex: 0,
            }}
          />
          
          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              width: '100%',
              gap: '20px',
            }}
          >
            {/* Cryptocurrency icon and name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              {cryptoInfo.image ? (
                <img
                  src={cryptoInfo.image}
                  width={80}
                  height={80}
                  alt={cryptoInfo.name}
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 'bold',
                  }}
                >
                  {cryptoInfo.symbol.substring(0, 1).toUpperCase()}
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                  {cryptoInfo.name}
                </span>
                <span style={{ fontSize: '24px', color: '#aaa' }}>
                  {cryptoInfo.symbol.toUpperCase()}
                </span>
              </div>
            </div>
            
            {/* Price and change */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '72px', fontWeight: 'bold' }}>
                {formattedPrice}
              </span>
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: isPositiveChange ? '#4ade80' : '#ef4444',
                }}
              >
                {formattedChange}
              </span>
            </div>
            
            {/* Bottom info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px', color: '#aaa' }}>
                CryptoTick.live
              </span>
              <span style={{ fontSize: '24px', color: '#666' }}>|</span>
              <span style={{ fontSize: '24px', color: '#aaa' }}>
                Real-time cryptocurrency price tracking
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    
    // Return a default OG image
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            color: 'white',
            fontFamily: 'sans-serif',
            padding: '40px',
          }}
        >
          <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
            CryptoTick.live
          </span>
          <span style={{ fontSize: '32px', marginTop: '20px' }}>
            Real-time cryptocurrency price tracking
          </span>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
} 