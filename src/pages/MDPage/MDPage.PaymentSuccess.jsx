// MDPage.PaymentSuccess.jsx - 토스페이먼츠 전용 최종 버전
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tossPaymentsService from '../../services/paymentApi';
import styled from 'styled-components';

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const StatusIcon = styled.div`
  font-size: 80px;
  margin-bottom: 30px;
  color: #2196F3;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #172031;
  margin-bottom: 15px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const OrderInfo = styled.div`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: left;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const InfoValue = styled.span`
  color: #666;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  flex: 1;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$primary ? `
    background: #2196F3;
    color: white;
    
    &:hover {
      background: #1976D2;
      transform: translateY(-2px);
    }
  ` : `
    background: white;
    color: #2196F3;
    border: 2px solid #2196F3;
    
    &:hover {
      background: #2196F3;
      color: white;
      transform: translateY(-2px);
    }
  `}
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin: 15px 0;
  
  ${props => props.$success ? `
    background: #e8f5e8;
    color: #2e7d32;
    border: 1px solid #c8e6c8;
  ` : `
    background: #fff3e0;
    color: #f57c00;
    border: 1px solid #ffcc02;
  `}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const [stockProcessed, setStockProcessed] = useState(false);
  const [stockError, setStockError] = useState(null);
  
  // 토스페이먼츠에서 전달하는 파라미터들
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  // 재고 차감 처리 함수
  const handleStockDecrease = async (paymentData) => {
    try {
      console.log('📦 재고 차감 프로세스 시작...');
      
      // 구매한 상품 정보 가져오기
      let purchasedItems = [];
      
      // 1. 세션에서 주문 정보 가져오기
      const pendingOrder = sessionStorage.getItem('pendingOrder');
      if (pendingOrder) {
        const orderData = JSON.parse(pendingOrder);
        purchasedItems = orderData.items || [];
        console.log('📋 세션에서 주문 정보 로드:', purchasedItems);
      } else {
        // 2. 장바구니에서 가져오기
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (cartItems.length > 0) {
          purchasedItems = cartItems;
          console.log('🛒 장바구니에서 상품 정보 로드:', purchasedItems);
        } else {
          // 3. 바로구매에서 가져오기
          const directPurchase = JSON.parse(sessionStorage.getItem('directPurchase') || 'null');
          if (directPurchase && directPurchase.items) {
            purchasedItems = directPurchase.items;
            console.log('⚡ 바로구매에서 상품 정보 로드:', purchasedItems);
          }
        }
      }
      
      if (purchasedItems.length === 0) {
        console.warn('⚠️ 구매 상품 정보가 없습니다. 재고 차감을 건너뜁니다.');
        return { success: false, reason: 'NO_ITEMS' };
      }
      
      // 재고 차감 API 호출용 데이터 구성
      const stockDecreaseData = {
        orderId: paymentData.orderId || orderId,
        paymentKey: paymentData.paymentKey || paymentKey,
        items: purchasedItems.map(item => ({
          productId: item.id || item.productId,
          quantity: item.quantity || 1,
          price: item.price,
          name: item.name
        })),
        timestamp: new Date().toISOString(),
        totalAmount: Number(amount)
      };
      
      console.log('📤 재고 차감 API 요청:', stockDecreaseData);
      
      // 재고 차감 API 호출
      const response = await fetch('http://localhost:8080/api/products/stock/decrease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(stockDecreaseData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '재고 차감 API 요청 실패');
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ 재고 차감 성공:', result);
        
        // 성공 시 세션 데이터 정리
        sessionStorage.removeItem('pendingOrder');
        sessionStorage.removeItem('directPurchase');
        localStorage.removeItem('tempDirectPurchase');
        
        return { 
          success: true, 
          processedItems: result.processedItems || purchasedItems.length,
          message: result.message 
        };
      } else {
        console.error('❌ 재고 차감 API 실패:', result);
        return { 
          success: false, 
          reason: 'API_ERROR', 
          message: result.message 
        };
      }
      
    } catch (error) {
      console.error('💥 재고 차감 처리 중 오류:', error);
      return { 
        success: false, 
        reason: 'NETWORK_ERROR', 
        message: error.message 
      };
    }
  };

  // 장바구니 정리
  const clearCartData = () => {
    try {
      // 장바구니 비우기
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      
      // 헤더 카운트 업데이트
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { count: 0, items: [] } 
      }));
      
      console.log('🛒 장바구니 정리 완료');
    } catch (error) {
      console.error('장바구니 정리 실패:', error);
    }
  };

  // 결제 승인 및 후처리
  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log('🚀 토스페이먼츠 성공 처리 시작:', {
          paymentKey,
          orderId,
          amount
        });

        // URL 파라미터 유효성 검사
        if (!paymentKey || !orderId || !amount) {
          throw new Error('토스페이먼츠 결제 정보가 올바르지 않습니다.');
        }

        // 일반 결제는 Complete 페이지로 리디렉션
        if (!paymentKey.startsWith('payment_')) {
          console.log('🔄 일반 결제는 Complete 페이지로 이동');
          navigate(`/MD/payment/complete?orderId=${orderId}&amount=${amount}&method=general`, { replace: true });
          return;
        }

        // 🎯 토스페이먼츠 결제 승인 요청
        console.log('💳 토스페이먼츠 결제 승인 요청 중...');
        const confirmResult = await tossPaymentsService.confirmPayment(
          paymentKey,
          orderId,
          Number(amount)
        );

        if (confirmResult.success) {
          setPaymentData(confirmResult.data);
          console.log('✅ 토스페이먼츠 결제 승인 성공:', confirmResult.data);
          
          // 🔥 재고 차감 처리
          console.log('📦 재고 차감 처리 시작...');
          const stockResult = await handleStockDecrease(confirmResult.data);
          
          if (stockResult.success) {
            setStockProcessed(true);
            console.log('🎉 재고 차감 완료!');
          } else {
            setStockError(stockResult.message || '재고 차감 실패');
            console.log(`⚠️ 재고 차감 실패 (${stockResult.reason}):`, stockResult.message);
          }
          
          // 🛒 장바구니 정리
          clearCartData();
          
          // 주문 내역 저장
          const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
          orderHistory.unshift({
            ...confirmResult.data,
            items: JSON.parse(sessionStorage.getItem('pendingOrder') || '{}').items || [],
            completedAt: new Date().toISOString(),
            status: 'COMPLETED',
            stockProcessed: stockResult.success
          });
          
          if (orderHistory.length > 50) {
            orderHistory.splice(50);
          }
          
          localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
          
        } else {
          throw new Error(confirmResult.error || '토스페이먼츠 결제 승인 실패');
        }

      } catch (error) {
        console.error('💥 토스페이먼츠 성공 처리 오류:', error);
        setError(error.message);
        
        // 3초 후 실패 페이지로 이동
        setTimeout(() => {
          navigate(`/MD/payment/fail?code=PROCESS_ERROR&message=${encodeURIComponent(error.message)}`, {
            replace: true
          });
        }, 3000);
        
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [paymentKey, orderId, amount, navigate]);

  // 로딩 중 표시
  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingSpinner />
          <Title>토스페이먼츠 결제 처리 중...</Title>
          <Message>
            결제 승인 및 재고 처리를 진행하고 있습니다.<br/>
            잠시만 기다려주세요.
          </Message>
          <div style={{ 
            marginTop: '20px', 
            fontSize: '14px', 
            color: '#999',
            lineHeight: '1.5'
          }}>
            • 결제 승인 확인 중<br/>
            • 재고 차감 처리 중<br/>
            • 주문 정보 저장 중
          </div>
        </ContentWrapper>
      </Container>
    );
  }

  // 오류 발생 시 표시
  if (error) {
    return (
      <Container>
        <ContentWrapper>
          <StatusIcon>❌</StatusIcon>
          <Title>결제 처리 중 오류가 발생했습니다</Title>
          <Message style={{ color: '#f44336' }}>{error}</Message>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            3초 후 결제 실패 페이지로 이동합니다...
          </p>
          <Button onClick={() => navigate('/MD/payment/fail')}>
            즉시 이동하기
          </Button>
        </ContentWrapper>
      </Container>
    );
  }

  // 결제 데이터가 없는 경우
  if (!paymentData) {
    return (
      <Container>
        <ContentWrapper>
          <StatusIcon>⚠️</StatusIcon>
          <Title>결제 정보를 불러올 수 없습니다</Title>
          <Message>
            토스페이먼츠 결제 정보가 올바르지 않습니다.<br/>
            고객센터로 문의해주세요.
          </Message>
          <ButtonGroup>
            <Button onClick={() => navigate('/MD')}>홈으로</Button>
            <Button $primary onClick={() => navigate('/MD/cart')}>장바구니로</Button>
          </ButtonGroup>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <StatusIcon>🎉</StatusIcon>
        <Title>토스페이먼츠 결제 완료!</Title>
        <Message>
          토스페이먼츠로 결제가 성공적으로 완료되었습니다.<br/>
          주문 내역은 마이페이지에서 확인하실 수 있습니다.
        </Message>

        {/* 재고 처리 상태 표시 */}
        <StatusBadge $success={stockProcessed}>
          {stockProcessed ? '📦 재고 차감 완료' : '⏳ 재고 처리 중'}
        </StatusBadge>

        {stockError && (
          <div style={{
            margin: '10px 0',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#ffebee',
            border: '1px solid #f5c6cb',
            fontSize: '14px',
            color: '#721c24'
          }}>
            ⚠️ 재고 처리 알림: {stockError}
          </div>
        )}

        <OrderInfo>
          <InfoRow>
            <InfoLabel>결제키</InfoLabel>
            <InfoValue style={{ fontSize: '12px', wordBreak: 'break-all' }}>
              {paymentData.paymentKey}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문번호</InfoLabel>
            <InfoValue>{paymentData.orderId}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제일시</InfoLabel>
            <InfoValue>
              {paymentData.approvedAt ? 
                new Date(paymentData.approvedAt).toLocaleString('ko-KR') :
                new Date().toLocaleString('ko-KR')
              }
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제수단</InfoLabel>
            <InfoValue>
              토스페이먼츠 ({paymentData.method === 'CARD' ? '신용카드' : 
               paymentData.method === 'TRANSFER' ? '계좌이체' :
               paymentData.method === 'VIRTUAL_ACCOUNT' ? '가상계좌' : '기타'})
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제금액</InfoLabel>
            <InfoValue style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
              ₩{Number(paymentData.amount || amount).toLocaleString()}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제상태</InfoLabel>
            <InfoValue>
              <span style={{ 
                color: paymentData.status === 'DONE' ? '#4CAF50' : '#666',
                fontWeight: 'bold'
              }}>
                {paymentData.status === 'DONE' ? '✅ 결제완료' : paymentData.status}
              </span>
            </InfoValue>
          </InfoRow>
        </OrderInfo>

        <ButtonGroup>
          <Button onClick={() => navigate('/MD')}>
            쇼핑 계속하기
          </Button>
          <Button $primary onClick={() => navigate('/profile/orders')}>
            주문내역 확인
          </Button>
        </ButtonGroup>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#172031'
        }}>
          <strong>🚚 배송 안내</strong><br/>
          • 토스페이먼츠 결제 완료 후 1-2일 내에 상품이 발송됩니다.<br/>
          • 배송조회는 마이페이지 &gt; 주문내역에서 확인하실 수 있습니다.<br/>
          • 주문 관련 문의사항은 고객센터로 연락해주세요.<br/>
          • 교환/환불은 상품 수령 후 7일 이내 가능합니다.
        </div>

        {/* 개발용 디버그 정보 */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            <strong>🔧 개발자 정보:</strong><br/>
            결제키: {paymentKey}<br/>
            주문ID: {orderId}<br/>
            금액: {amount}<br/>
            승인시간: {paymentData.approvedAt}<br/>
            재고차감: {stockProcessed ? '성공 ✅' : '실패/진행중 ⚠️'}<br/>
            페이지: Success (토스페이먼츠 전용)<br/>
            API상태: {paymentData.approvedAt ? '실제연동' : '테스트모드'}
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
}

export default PaymentSuccess;