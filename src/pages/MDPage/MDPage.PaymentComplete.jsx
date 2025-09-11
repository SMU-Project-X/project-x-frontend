// MDPage.PaymentComplete.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 40px;
  color: white;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin-bottom: 20px;
  font-family: 'Pretendard', sans-serif;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const OrderInfo = styled.div`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 40px;
  text-align: left;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 18px;
    color: #74B9FF;
  }
`;

const InfoLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #172031;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  
  ${props => props.$primary ? `
    background-color: #74B9FF;
    color: white;
    border: none;
    &:hover { background-color: #5DADE2; }
  ` : `
    background-color: white;
    color: #172031;
    border: 1px solid #e9ecef;
    &:hover { background-color: #f8f9fa; }
  `}
`;

function PaymentComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 결제 페이지에서 넘어온 데이터
  const { orderItems = [], total = 0, orderNumber = 'ORD123456789' } = location.state || {};

  const handleGoHome = () => {
    navigate('/MD/products');
  };

  const handleOrderHistory = () => {
    // 실제로는 마이페이지 주문내역으로 이동
    alert('마이페이지 주문내역 페이지로 이동 (구현 예정)');
  };

  return (
    <Container>
      <ContentWrapper>
        <SuccessIcon>✓</SuccessIcon>
        
        <Title>주문이 완료되었습니다!</Title>
        
        <Message>
          고객님의 주문이 정상적으로 접수되었습니다.<br/>
          주문하신 상품은 1-3일 내에 배송 시작될 예정입니다.
        </Message>

        <OrderInfo>
          <InfoRow>
            <InfoLabel>주문번호</InfoLabel>
            <InfoValue>{orderNumber}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문일시</InfoLabel>
            <InfoValue>{new Date().toLocaleDateString('ko-KR')} {new Date().toLocaleTimeString('ko-KR')}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문상품</InfoLabel>
            <InfoValue>{orderItems.length}개 상품</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제금액</InfoLabel>
            <InfoValue>₩{total.toLocaleString()}</InfoValue>
          </InfoRow>
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