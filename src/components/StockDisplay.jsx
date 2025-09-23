// components/StockDisplay.jsx - 백엔드 API 연동 가능한 안전 버전
import { useState, useEffect } from 'react';

function StockDisplay({ productId, initialStock = 0, refreshInterval = 30000, enableApiCall = true }) {
  const [stockInfo, setStockInfo] = useState({
    stockQuantity: initialStock,
    isInStock: initialStock > 0,
    stockStatus: initialStock > 10 ? '충분' : initialStock > 0 ? '부족' : '품절'
  });
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [apiAvailable, setApiAvailable] = useState(false);
  const [error, setError] = useState(null);

  // API 사용 가능 여부 체크
  const checkApiAvailability = async () => {
    if (!enableApiCall || !productId) return false;
    
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}/stock`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const isAvailable = response.ok;
      setApiAvailable(isAvailable);
      
      if (isAvailable) {
        console.log('✅ 재고 API 사용 가능');
      } else {
        console.log('⚠️ 재고 API 응답 실패, 오프라인 모드로 전환');
      }
      
      return isAvailable;
    } catch (error) {
      console.log('⚠️ 재고 API 연결 실패, 오프라인 모드 사용:', error.message);
      setApiAvailable(false);
      return false;
    }
  };

  // 재고 정보 조회 함수
  const fetchStockInfo = async () => {
    if (!productId || !enableApiCall) {
      console.log('API 호출 비활성화 - 기본값 사용');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8080/api/products/${productId}/stock`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStockInfo(data);
        setLastUpdated(new Date());
        console.log('📦 재고 정보 실시간 업데이트:', data);
      } else {
        console.log('⚠️ 재고 API 호출 실패 - 기본값 유지');
        setError('API 호출 실패');
      }
      
    } catch (error) {
      console.log('⚠️ 재고 정보 조회 오류:', error.message);
      setError('네트워크 오류');
      
      // 오류 발생해도 기본값 유지
      setStockInfo(prev => ({
        ...prev,
        stockQuantity: initialStock || prev.stockQuantity
      }));
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 초기화
  useEffect(() => {
    // 1. 기본값으로 초기화
    setStockInfo({
      stockQuantity: initialStock,
      isInStock: initialStock > 0,
      stockStatus: initialStock > 10 ? '충분' : initialStock > 0 ? '부족' : '품절'
    });

    // 2. API 활성화 시에만 백엔드 연동 시도
    if (enableApiCall && productId) {
      checkApiAvailability().then(available => {
        if (available) {
          // API 사용 가능하면 즉시 최신 데이터 가져오기
          fetchStockInfo();
          
          // 주기적 업데이트 설정
          const interval = setInterval(() => {
            fetchStockInfo();
          }, refreshInterval);
          
          // cleanup function
          return () => clearInterval(interval);
        }
      });
    }
  }, [productId, initialStock, enableApiCall, refreshInterval]);

  // 재고 상태별 스타일 결정
  const getStockMessage = () => {
    const quantity = stockInfo.stockQuantity || 0;
    
    if (quantity === 0) {
      return {
        icon: '❌',
        text: '품절',
        color: '#d32f2f',
        bgColor: '#ffebee',
        borderColor: '#ffcdd2'
      };
    } else if (quantity <= 5) {
      return {
        icon: '⚠️',
        text: `재고 부족 (${quantity}개 남음)`,
        color: '#f57c00',
        bgColor: '#fff3e0',
        borderColor: '#ffcc02'
      };
    } else if (quantity <= 10) {
      return {
        icon: '🟡',
        text: `재고 ${quantity}개 남음`,
        color: '#f57c00',
        bgColor: '#fff8e1',
        borderColor: '#ffb74d'
      };
    } else {
      return {
        icon: '✅',
        text: `재고 충분 (${quantity}개)`,
        color: '#388e3c',
        bgColor: '#e8f5e8',
        borderColor: '#c8e6c8'
      };
    }
  };

  const stockMessage = getStockMessage();

  return (
    <div style={{
      margin: '16px 0',
      padding: '14px',
      borderRadius: '8px',
      backgroundColor: stockMessage.bgColor,
      border: `2px solid ${stockMessage.borderColor}`,
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '500',
        color: stockMessage.color,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '18px' }}>{stockMessage.icon}</span>
        <span style={{ flex: 1 }}>{stockMessage.text}</span>
        
        {/* 로딩 상태 표시 */}
        {loading && (
          <span style={{
            color: '#666', 
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            🔄 업데이트 중...
          </span>
        )}
        
        {/* API 사용 가능하면 새로고침 버튼 */}
        {enableApiCall && apiAvailable && !loading && (
          <button 
            style={{
              background: 'none',
              border: '1px solid #ddd',
              color: '#666',
              fontSize: '11px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s'
            }}
            onClick={fetchStockInfo} 
            disabled={loading}
            title={`마지막 업데이트: ${lastUpdated.toLocaleTimeString()}`}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f5f5f5';
              e.target.style.color = '#333';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#666';
            }}
          >
            새로고침
          </button>
        )}
        
        {/* 상태 표시 */}
        <span style={{
          fontSize: '10px',
          color: '#999',
          fontWeight: 'normal'
        }}>
          {enableApiCall ? (
            apiAvailable ? '🟢 실시간' : '🟡 오프라인'
          ) : '📍 기본모드'}
        </span>
      </div>
      
      {/* 에러 표시 */}
      {error && (
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: '#f44336',
          opacity: 0.8
        }}>
          ⚠️ {error} (기본값 표시 중)
        </div>
      )}
    </div>
  );
}

export default StockDisplay;