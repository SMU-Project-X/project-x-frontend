// MDPage.PaymentSuccess.jsx - 재고 차감 기능 완전 활성화 버전
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tossPaymentsService from '../../services/paymentApi';
import * as S from './styled/MDPage.PaymentComplete.styled';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const [stockProcessed, setStockProcessed] = useState(false);
  
  // 토스페이먼츠에서 전달하는 파라미터들
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  // 재고 차감 처리 함수
  const handleStockDecrease = async (paymentData) => {
    try {
      console.log('🔥 재고 차감 프로세스 시작...');
      
      // 구매한 상품 정보 가져오기 (여러 저장소에서 시도)
      let purchasedItems = [];
      
      // 1. 장바구니 결제인 경우
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      if (cartItems.length > 0) {
        purchasedItems = cartItems;
        console.log('💳 장바구니 결제 감지:', purchasedItems);
      } else {
        // 2. 바로구매인 경우
        const directPurchase = JSON.parse(sessionStorage.getItem('directPurchase') || 'null');
        const tempDirectPurchase = JSON.parse(localStorage.getItem('tempDirectPurchase') || 'null');
        
        if (directPurchase && directPurchase.items) {
          purchasedItems = directPurchase.items;
          console.log('⚡ 바로구매 결제 감지:', purchasedItems);
        } else if (tempDirectPurchase && tempDirectPurchase.items) {
          purchasedItems = tempDirectPurchase.items;
          console.log('⚡ 임시 바로구매 데이터 사용:', purchasedItems);
        }
      }
      
      if (purchasedItems.length === 0) {
        console.warn('⚠️ 구매 상품 정보 없음 - 재고 차감 건너뜀');
        return { success: false, reason: 'NO_ITEMS' };
      }
      
      // 재고 차감 API 호출용 데이터 구성
      const stockDecreaseData = {
        orderId: paymentData.orderId || orderId,
        paymentKey: paymentData.paymentKey || paymentKey,
        items: purchasedItems.map(item => ({
          productId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
          name: item.name // 로그용
        })),
        timestamp: new Date().toISOString(),
        totalAmount: Number(amount)
      };
      
      console.log('📦 재고 차감 요청 데이터:', stockDecreaseData);
      
      // 재고 차감 API 호출
      const response = await fetch('http://localhost:8080/api/products/stock/decrease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockDecreaseData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('✅ 재고 차감 성공:', result);
        
        // 성공 시 임시 저장 데이터 정리
        sessionStorage.removeItem('directPurchase');
        localStorage.removeItem('tempDirectPurchase');
        
        return { 
          success: true, 
          processedItems: result.processedItems,
          message: result.message 
        };
      } else {
        console.error('❌ 재고 차감 실패:', result);
        return { 
          success: false, 
          reason: 'API_ERROR', 
          message: result.message 
        };
      }
      
    } catch (error) {
      console.error('💥 재고 차감 처리 중 네트워크 오류:', error);
      return { 
        success: false, 
        reason: 'NETWORK_ERROR', 
        message: error.message 
      };
    }
  };

  // 결제 승인 처리
  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log('🚀 토스페이먼츠 결제 승인 프로세스 시작:', {
          paymentKey,
          orderId,
          amount
        });

        // URL 파라미터 유효성 검사
        if (!paymentKey || !orderId || !amount) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        // 결제 승인 요청
        const confirmResult = await tossPaymentsService.confirmPayment(
          paymentKey,
          orderId,
          Number(amount)
        );

        if (confirmResult.success) {
          setPaymentData(confirmResult.data);
          console.log('✅ 결제 승인 성공:', confirmResult.data);
          
          // ⭐⭐ 결제 성공시 재고 차감 처리 (완전 활성화!) ⭐⭐
          const stockResult = await handleStockDecrease(confirmResult.data);
          setStockProcessed(stockResult.success);
          
          if (stockResult.success) {
            console.log('🎉 재고 차감까지 완료!');
          } else {
            console.log(`⚠️ 재고 차감 실패 (${stockResult.reason}):`, stockResult.message);
            // 재고 차감 실패해도 결제는 성공이므로 계속 진행
          }
          
          // 장바구니 비우기
          localStorage.removeItem('cartItems');
          localStorage.removeItem('cartCount');
          
          // 장바구니 업데이트 이벤트 발생
          window.dispatchEvent(new CustomEvent('cartUpdated'));
          
          // 성공 알림
          setTimeout(() => {
            alert('결제가 성공적으로 완료되었습니다!');
          }, 500);
          
        } else {
          throw new Error(confirmResult.error || '결제 승인 실패');
        }

      } catch (error) {
        console.error('💥 결제 승인 처리 오류:', error);
        setError(error.message);
        
        // 심각한 오류 시 결제 실패 페이지로 이동
        setTimeout(() => {
          navigate(`/MD/payment/fail?message=${encodeURIComponent(error.message)}`, {
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
      <S.Container>
        <S.ContentWrapper>
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔄</div>
            <h2 style={{ marginBottom: '10px' }}>결제 처리 중입니다...</h2>
            <p style={{ color: '#666' }}>잠시만 기다려주세요.</p>
            <div style={{ 
              marginTop: '20px', 
              fontSize: '14px', 
              color: '#999',
              lineHeight: '1.5'
            }}>
              • 결제 승인 확인<br/>
              • 재고 차감 처리<br/>
              • 주문 정보 저장
            </div>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 오류 발생 시 표시
  if (error) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
            <h2 style={{ marginBottom: '20px' }}>결제 처리 중 오류가 발생했습니다</h2>
            <p style={{ color: '#f44336', marginBottom: '30px' }}>{error}</p>
            <p style={{ color: '#666', marginBottom: '30px' }}>3초 후 결제 실패 페이지로 이동합니다...</p>
            <S.Button onClick={() => navigate('/MD/payment/fail')}>
              즉시 이동하기
            </S.Button>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 결제 성공 표시
  if (!paymentData) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
            <h2 style={{ marginBottom: '20px' }}>결제 정보를 불러올 수 없습니다</h2>
            <S.Button onClick={() => navigate('/MD')}>
              쇼핑 계속하기
            </S.Button>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.StatusIcon>✅</S.StatusIcon>
        <S.Title>결제가 완료되었습니다!</S.Title>
        <S.Message>
          토스페이먼츠로 결제가 성공적으로 처리되었습니다.<br />
          {stockProcessed ? '재고 차감도 완료되었습니다.' : '주문 처리 중입니다.'}<br />
          주문 내역은 마이페이지에서 확인하실 수 있습니다.
        </S.Message>

        {/* 재고 처리 상태 표시 */}
        <div style={{
          margin: '20px 0',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: stockProcessed ? '#e8f5e8' : '#fff3e0',
          border: `1px solid ${stockProcessed ? '#c8e6c8' : '#ffcc02'}`,
          fontSize: '14px',
          textAlign: 'center'
        }}>
          <span style={{ 
            color: stockProcessed ? '#388e3c' : '#f57c00',
            fontWeight: '500'
          }}>
            {stockProcessed ? '📦 재고 차감 완료' : '⏳ 재고 처리 중'}
          </span>
        </div>

        <S.OrderInfo>
          <S.InfoRow>
            <S.InfoLabel>결제키</S.InfoLabel>
            <S.InfoValue style={{ fontSize: '12px', wordBreak: 'break-all' }}>
              {paymentData.paymentKey}
            </S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>주문번호</S.InfoLabel>
            <S.InfoValue>{paymentData.orderId}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>결제일시</S.InfoLabel>
            <S.InfoValue>
              {paymentData.approvedAt ? 
                new Date(paymentData.approvedAt).toLocaleString('ko-KR') :
                new Date().toLocaleString('ko-KR')
              }
            </S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>결제수단</S.InfoLabel>
            <S.InfoValue>
              {paymentData.method === 'CARD' ? '신용카드' : 
               paymentData.method === 'TRANSFER' ? '계좌이체' :
               paymentData.method === 'VIRTUAL_ACCOUNT' ? '가상계좌' :
               paymentData.method || '토스페이먼츠'}
            </S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>결제금액</S.InfoLabel>
            <S.InfoValue style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
              ₩{Number(paymentData.amount).toLocaleString()}
            </S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>결제상태</S.InfoLabel>
            <S.InfoValue>
              <span style={{ 
                color: paymentData.status === 'DONE' ? '#4CAF50' : '#666',
                fontWeight: 'bold'
              }}>
                {paymentData.status === 'DONE' ? '결제완료' : paymentData.status}
              </span>
            </S.InfoValue>
          </S.InfoRow>
        </S.OrderInfo>

        <S.ButtonGroup>
          <S.Button onClick={() => navigate('/MD')}>
            쇼핑 계속하기
          </S.Button>
          <S.Button $primary onClick={() => navigate('/profile/orders')}>
            주문내역 확인
          </S.Button>
        </S.ButtonGroup>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e8f4fd',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#172031'
        }}>
          <strong>🚚 배송 안내</strong><br/>
          • 결제 완료 후 1-2일 내에 상품이 발송됩니다.<br/>
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
            재고차감: {stockProcessed ? '성공 ✅' : '실패/처리중 ⚠️'}<br/>
            백엔드 연동: {paymentData.approvedAt ? '실제 API' : '테스트 모드'}
          </div>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default PaymentSuccess;