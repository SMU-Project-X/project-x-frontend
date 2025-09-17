// MDPage.PaymentComplete.jsx - 일반 결제 전용 (무통장입금, 계좌이체)
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
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
    background: #28a745;
    color: white;
    
    &:hover {
      background: #218838;
      transform: translateY(-2px);
    }
  ` : `
    background: white;
    color: #28a745;
    border: 2px solid #28a745;
    
    &:hover {
      background: #28a745;
      color: white;
      transform: translateY(-2px);
    }
  `}
`;

const AccountInfo = styled.div`
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #c3e6cb;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #28a745;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function PaymentComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState(null);
  const [error, setError] = useState(null);

  // URL 파라미터에서 정보 추출
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentMethod = searchParams.get('method');

  useEffect(() => {
    const loadOrderInfo = async () => {
      try {
        setLoading(true);
        
        // 🎯 일반 결제만 처리 (토스페이먼츠는 Success 페이지 사용)
        if (!orderId || !amount || !paymentMethod) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        // 카드 결제는 Success 페이지로 리디렉션
        if (paymentMethod === 'card') {
          console.log('🔄 카드 결제는 Success 페이지로 이동');
          navigate('/MD/payment/success', { replace: true });
          return;
        }

        // 세션에서 주문 정보 가져오기
        let orderData = null;
        
        const completedOrder = sessionStorage.getItem('completedOrder');
        if (completedOrder) {
          orderData = JSON.parse(completedOrder);
          sessionStorage.removeItem('completedOrder'); // 사용 후 삭제
        } else {
          // location.state에서 가져오기
          orderData = location.state;
        }

        if (!orderData) {
          // 기본 주문 정보 생성
          orderData = {
            orderNumber: orderId,
            totalAmount: parseInt(amount),
            paymentMethod: paymentMethod,
            items: [{ name: '주문 상품', quantity: 1 }],
            recipient: { name: '고객', phone: '010-0000-0000' },
            createdAt: new Date().toISOString()
          };
        }

        setOrderInfo(orderData);
        
        // 완료된 주문을 로컬 스토리지에 저장
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.unshift({
          ...orderData,
          completedAt: new Date().toISOString(),
          status: 'COMPLETED'
        });
        
        if (orderHistory.length > 50) {
          orderHistory.splice(50);
        }
        
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        
        console.log('✅ 일반 결제 완료 처리 성공');
        
      } catch (error) {
        console.error('❌ 주문 정보 로드 실패:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrderInfo();
  }, [orderId, amount, paymentMethod, location, navigate]);

  // 홈으로 가기
  const handleGoHome = () => {
    navigate('/MD');
  };

  // 주문 내역 확인
  const handleOrderHistory = () => {
    navigate('/profile/orders');
  };

  // 결제 방법별 메시지
  const getPaymentMethodMessage = (method) => {
    switch (method) {
      case 'transfer':
        return {
          title: '계좌이체 주문이 완료되었습니다!',
          message: '실시간 계좌이체로 결제가 완료되었습니다.\n빠른 시일 내에 배송 준비를 시작하겠습니다.',
          icon: '🏦'
        };
      case 'deposit':
        return {
          title: '무통장입금 주문이 접수되었습니다!',
          message: '입금 확인 후 배송 준비를 시작하겠습니다.\n입금 완료 시 SMS로 알려드립니다.',
          icon: '💰'
        };
      default:
        return {
          title: '주문이 완료되었습니다!',
          message: '주문이 성공적으로 처리되었습니다.\n빠른 시일 내에 배송 준비를 시작하겠습니다.',
          icon: '✅'
        };
    }
  };

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingSpinner />
          <Title>주문 정보 확인 중...</Title>
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
          <Title>주문 처리 오류</Title>
          <Message style={{ color: '#dc3545' }}>{error}</Message>
          <ButtonGroup>
            <Button onClick={() => navigate('/MD/cart')}>장바구니로</Button>
            <Button $primary onClick={handleGoHome}>홈으로</Button>
          </ButtonGroup>
        </ContentWrapper>
      </Container>
    );
  }

  const paymentMethodInfo = getPaymentMethodMessage(paymentMethod);

  return (
    <Container>
      <ContentWrapper>
        <SuccessIcon>{paymentMethodInfo.icon}</SuccessIcon>
        <Title>{paymentMethodInfo.title}</Title>
        <Message>{paymentMethodInfo.message}</Message>

        <OrderInfo>
          <InfoRow>
            <InfoLabel>주문번호</InfoLabel>
            <InfoValue>{orderInfo?.orderNumber || orderId}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문일시</InfoLabel>
            <InfoValue>
              {orderInfo?.createdAt 
                ? new Date(orderInfo.createdAt).toLocaleString('ko-KR')
                : new Date().toLocaleString('ko-KR')
              }
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문상품</InfoLabel>
            <InfoValue>
              {orderInfo?.items?.length 
                ? `${orderInfo.items[0]?.name || '상품'} ${orderInfo.items.length > 1 ? `외 ${orderInfo.items.length - 1}개` : ''}`
                : '주문 상품'
              }
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문금액</InfoLabel>
            <InfoValue style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
              ₩{(orderInfo?.totalAmount || parseInt(amount) || 0).toLocaleString()}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제수단</InfoLabel>
            <InfoValue>
              {paymentMethod === 'transfer' ? '실시간 계좌이체' :
               paymentMethod === 'deposit' ? '무통장입금' : '기타'}
            </InfoValue>
          </InfoRow>
          {orderInfo?.recipient && (
            <>
              <InfoRow>
                <InfoLabel>받는분</InfoLabel>
                <InfoValue>{orderInfo.recipient.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>연락처</InfoLabel>
                <InfoValue>{orderInfo.recipient.phone}</InfoValue>
              </InfoRow>
            </>
          )}
        </OrderInfo>

        {/* 무통장입금 안내 */}
        {paymentMethod === 'deposit' && orderInfo?.accountNumber && (
          <AccountInfo>
            <strong>📋 입금 안내</strong><br/>
            <div style={{ marginTop: '10px', fontSize: '16px' }}>
              <strong>입금계좌: {orderInfo.accountNumber}</strong><br/>
              예금주: (주)Project-X<br/>
              입금금액: ₩{(orderInfo?.totalAmount || parseInt(amount) || 0).toLocaleString()}<br/>
              <span style={{ color: '#dc3545', fontSize: '14px' }}>
                ※ 주문번호를 반드시 입금자명에 포함해주세요.
              </span>
            </div>
          </AccountInfo>
        )}

        <ButtonGroup>
          <Button onClick={handleGoHome}>쇼핑 계속하기</Button>
          <Button $primary onClick={handleOrderHistory}>주문내역 확인</Button>
        </ButtonGroup>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#172031'
        }}>
          <strong>📦 배송 및 주문 안내</strong><br/>
          {paymentMethod === 'deposit' ? (
            <>
              • 입금 확인 후 1-2일 내에 상품이 발송됩니다.<br/>
              • 입금 완료 시 SMS로 알려드립니다.<br/>
            </>
          ) : (
            <>
              • 결제 완료 후 1-2일 내에 상품이 발송됩니다.<br/>
            </>
          )}
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
            주문번호: {orderId}<br/>
            금액: {amount}<br/>
            결제방법: {paymentMethod}<br/>
            페이지: Complete (일반결제 전용)<br/>
            상태: {orderInfo ? '정상' : '정보없음'}
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
}

export default PaymentComplete;