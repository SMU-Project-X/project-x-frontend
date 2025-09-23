// MDPage.Payment.styled.js
import styled from 'styled-components';

// 컨테이너 스타일
export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 80px);
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin-bottom: 40px;
  font-family: 'Pretendard', sans-serif;
`;

// 메인 레이아웃
export const PaymentContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const PaymentForm = styled.div`
  flex: 2;
  background-color: #ffffff;
`;

export const OrderSummary = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  position: sticky;
  top: 20px;
`;

// 섹션 스타일
export const Section = styled.div`
  margin-bottom: 40px;
  padding: 30px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  background-color: #ffffff;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 20px;
  font-family: 'Pretendard', sans-serif;
`;

// 폼 스타일
export const FormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
  }
`;

// 결제 수단 선택
export const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid ${props => props.$selected ? '#74B9FF' : '#e9ecef'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #74B9FF;
    background-color: rgba(116, 185, 255, 0.05);
  }
`;

export const RadioInput = styled.input`
  margin-right: 12px;
  width: 18px;
  height: 18px;
  accent-color: #74B9FF;
`;

export const PaymentLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #172031;
  cursor: pointer;
  flex: 1;
`;

export const PaymentIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
`;

// 주문 상품 아이템
export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #999;
  margin-right: 12px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 4px;
`;

export const ItemOptions = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

export const ItemQuantity = styled.div`
  font-size: 12px;
  color: #999;
`;

export const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #172031;
`;

// 가격 요약
export const SummaryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 20px;
`;

export const PriceSummary = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e9ecef;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const PriceLabel = styled.span`
  color: #666;
`;

export const PriceValue = styled.span`
  color: #172031;
  font-weight: 500;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  margin-top: 15px;
  border-top: 2px solid #e9ecef;
  font-size: 18px;
  font-weight: 700;
`;

export const TotalLabel = styled.span`
  color: #172031;
`;

export const TotalValue = styled.span`
  color: #74B9FF;
`;

// 버튼들
export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

export const BackBtn = styled.button`
  flex: 1;
  background-color: #f8f9fa;
  color: #172031;
  border: 1px solid #e9ecef;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

export const PayBtn = styled.button`
  flex: 2;
  background-color: #74B9FF;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #5DADE2;
  }
  
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;