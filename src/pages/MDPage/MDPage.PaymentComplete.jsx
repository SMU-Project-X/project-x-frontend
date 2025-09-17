// pages/MDPage/MDPage.PaymentComplete.jsx - 토스페이 연동 버전
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tossPaymentsService from '../../services/paymentApi';
import { cartAPI } from '../../services/api';



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

const SuccessIcon = styled.div`
  font-size: 80px;
  margin-bottom: 30px;
  color: #28a745;
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
    background: #74B9FF;
    color: white;
    
    &:hover {
      background: #0984e3;
      transform: translateY(-2px);
    }
  ` : `
    background: white;
    color: #74B9FF;
    border: 2px solid #74B9FF;
    
    &:hover {
      background: #74B9FF;
      color: white;
      transform: translateY(-2px);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #74B9FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #f5c6cb;
`;

function PaymentComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  // URL 파라미터 또는 state에서 결제 정보 추출
  const getPaymentData = () => {
    const urlParams = new URLSearchParams(location.search);
    const stateData = location.state;
    
    // 토스페이먼츠 성공 콜백에서 오는 파라미터들
    const paymentKey = urlParams.get('paymentKey');
    const orderId = urlParams.get('orderId');
    const amount = urlParams.get('amount');
    
    return {
      // URL 파라미터 (토스페이먼츠)
      paymentKey,
      orderId,
      amount: amount ? parseInt(amount) : null,
      
      // React Router state (일반 결제)
      stateData
    };
  };

  // 토스페이먼츠 결제 정보 확인
  const verifyTossPayment = async (paymentKey, orderId, amount) => {
    try {
      console.log('토스페이먼츠 결제 검증 시작:', { paymentKey, orderId, amount });
      
      // 결제 정보 검증
      const validation = tossPaymentsService.validatePaymentResult(paymentKey, orderId, amount);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      // 백엔드에서 결제 정보 조회 (현재는 더미 데이터)
      const paymentResult = await tossPaymentsService.getPayment(paymentKey);
      
      if (paymentResult.success) {
        setPaymentInfo({
          paymentKey,
          orderId,
          amount,
          method: 'TOSS',
          status: 'COMPLETED',
          paidAt: new Date().toISOString()
        });
        
        console.log('토스페이먼츠 결제 검증 완료');
        return true;
      } else {
        throw new Error(paymentResult.error || '결제 정보 조회 실패');
      }
      
    } catch (error) {
      console.error('토스페이먼츠 결제 검증 실패:', error);
      setError(`결제 검증 실패: ${error.message}`);
      return false;
    }
  };

  // 주문 정보 로드
  const loadOrderInfo = async () => {
    try {
      // sessionStorage에서 주문 정보 가져오기 (결제 페이지에서 저장한 것)
      const savedOrderInfo = sessionStorage.getItem('pendingOrder');
      if (savedOrderInfo) {
        const parsedOrderInfo = JSON.parse(savedOrderInfo);
        setOrderInfo(parsedOrderInfo);
        console.log('주문 정보 로드 성공:', parsedOrderInfo);
        
        // 사용 후 삭제
        sessionStorage.removeItem('pendingOrder');
        return true;
      }
      
      // sessionStorage에 없으면 location.state에서 가져오기
      const { stateData } = getPaymentData();
      if (stateData && stateData.orderItems) {
        setOrderInfo(stateData);
        console.log('State에서 주문 정보 로드:', stateData);
        return true;
      }
      
      // 둘 다 없으면 localStorage에서 최근 주문 정보 복원 시도
      const recentOrder = localStorage.getItem('lastCompletedOrder');
      if (recentOrder) {
        const parsedOrder = JSON.parse(recentOrder);
        setOrderInfo(parsedOrder);
        console.log('마지막 주문 정보 복원:', parsedOrder);
        return true;
      }
      
      throw new Error('주문 정보를 찾을 수 없습니다.');
      
    } catch (error) {
      console.error('주문 정보 로드 실패:', error);
      setError(error.message);
      return false;
    }
  };

  // 장바구니 비우기
  const clearCartAfterPayment = async () => {
    try {
      await cartAPI.clearCart();
      console.log('결제 완료 후 장바구니 비움');
      
      // 헤더의 장바구니 개수 업데이트
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (error) {
      console.error('장바구니 비우기 실패:', error);
    }
  };

  // 주문 정보를 localStorage에 저장 (주문 내역 용)
  const saveCompletedOrder = () => {
    if (orderInfo && paymentInfo) {
      const completedOrder = {
        ...orderInfo,
        payment: paymentInfo,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem('lastCompletedOrder', JSON.stringify(completedOrder));
      
      // 주문 내역에 추가 (기존 주문 내역과 병합)
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      orderHistory.unshift(completedOrder); // 최신 주문을 앞에 추가
      
      // 최대 50개까지만 보관
      if (orderHistory.length > 50) {
        orderHistory.splice(50);
      }
      
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      console.log('완료된 주문 정보 저장');
    }
  };

  // 페이지 로드 시 결제 정보 처리
  useEffect(() => {
    const processPayment = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { paymentKey, orderId, amount } = getPaymentData();
        
        // 주문 정보 먼저 로드
        const orderLoaded = await loadOrderInfo();
        if (!orderLoaded) {
          throw new Error('주문 정보를 불러올 수 없습니다.');
        }
        
        // 토스페이먼츠 결제인 경우
        if (paymentKey && orderId && amount) {
          const paymentVerified = await verifyTossPayment(paymentKey, orderId, amount);
          if (!paymentVerified) {
            return; // 에러는 verifyTossPayment에서 처리됨
          }
        } else {
          // 일반 결제인 경우
          setPaymentInfo({
            orderId: orderInfo?.orderNumber || 'ORD' + Date.now(),
            amount: orderInfo?.total || 0,
            method: 'GENERAL',
            status: 'COMPLETED',
            paidAt: new Date().toISOString()
          });
        }
        
        // 장바구니 비우기
        await clearCartAfterPayment();
        
        // 완료된 주문 정보 저장
        setTimeout(saveCompletedOrder, 1000);
        
        console.log('결제 완료 처리 성공');
        
      } catch (error) {
        console.error('결제 완료 처리 실패:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [location]);

  // 홈으로 가기
  const handleGoHome = () => {
    navigate('/MD');
  };

  // 주문 내역 확인
  const handleOrderHistory = () => {
    // 실제로는 마이페이지 > 주문내역으로 이동
    navigate('/profile/orders');
  };

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingSpinner />
          <Title>결제 정보 확인 중...</Title>
          <Message>잠시만 기다려주세요.</Message>
        </ContentWrapper>
      </Container>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Container>
        <ContentWrapper>
          <SuccessIcon>❌</SuccessIcon>
          <Title>결제 처리 오류</Title>
          <ErrorMessage>{error}</ErrorMessage>
          <ButtonGroup>
            <Button onClick={() => navigate('/MD/cart')}>장바구니로</Button>
            <Button $primary onClick={handleGoHome}>홈으로</Button>
          </ButtonGroup>
        </ContentWrapper>
      </Container>
    );
  }

  // 성공 표시
  return (
    <Container>
      <ContentWrapper>
        <SuccessIcon>✅</SuccessIcon>
        <Title>결제가 완료되었습니다!</Title>
        <Message>
          주문이 성공적으로 처리되었습니다.<br/>
          빠른 시일 내에 배송 준비를 시작하겠습니다.
        </Message>

        <OrderInfo>
          <InfoRow>
            <InfoLabel>주문번호</InfoLabel>
            <InfoValue>{paymentInfo?.orderId || orderInfo?.orderNumber}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제일시</InfoLabel>
            <InfoValue>
              {paymentInfo?.paidAt 
                ? new Date(paymentInfo.paidAt).toLocaleString('ko-KR')
                : new Date().toLocaleString('ko-KR')
              }
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문상품</InfoLabel>
            <InfoValue>
              {orderInfo?.orderItems?.length 
                ? `${orderInfo.orderItems.length}개 상품`
                : '상품 정보 없음'
              }
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제금액</InfoLabel>
            <InfoValue>₩{(paymentInfo?.amount || orderInfo?.total || 0).toLocaleString()}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제수단</InfoLabel>
            <InfoValue>
              {paymentInfo?.method === 'TOSS' ? '토스페이' : 
               orderInfo?.paymentSubMethod === 'toss' ? '토스페이' :
               orderInfo?.paymentMethod === 'card' ? '카드결제' : '기타'}
            </InfoValue>
          </InfoRow>
          {orderInfo?.deliveryRequest && (
            <InfoRow>
              <InfoLabel>배송요청</InfoLabel>
              <InfoValue>{orderInfo.deliveryRequest}</InfoValue>
            </InfoRow>
          )}
        </OrderInfo>

        <ButtonGroup>
          <Button onClick={handleGoHome}>쇼핑 계속하기</Button>
          <Button $primary onClick={handleOrderHistory}>주문내역 확인</Button>
        </ButtonGroup>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e8f4fd',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#172031'
        }}>
          <strong>배송 안내</strong><br/>
          • 배송조회는 마이페이지 &gt; 주문내역에서 확인하실 수 있습니다.<br/>
          • 주문 관련 문의사항은 고객센터로 연락해주세요.<br/>
          • 교환/환불은 상품 수령 후 7일 이내 가능합니다.
        </div>
      </ContentWrapper>
    </Container>
  );
}

export default PaymentComplete;