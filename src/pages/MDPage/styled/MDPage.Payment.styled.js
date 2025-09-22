// MDPage.Payment.styled.js - 완전한 스타일 컴포넌트
import styled, { keyframes } from 'styled-components';

// 로딩 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 컨테이너 스타일
export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 0;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 80px);
  
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin-bottom: 40px;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }
`;

// 개발용 디버그 정보
export const DebugInfo = styled.div`
  padding: 15px;
  background: #e8f4fd;
  border: 1px solid #74B9FF;
  border-radius: 8px;
  margin-bottom: 20px;
  fontSize: 14px;
  color: #333;
  font-family: 'Pretendard', sans-serif;
`;

// 로딩 상태
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  text-align: center;
  
  h2 {
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    color: #172031;
    margin: 0;
  }
  
  p {
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    color: #666;
    margin: 0;
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #74B9FF;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// 빈 상태
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 20px;
  
  h2 {
    font-family: 'Pretendard', sans-serif;
    font-size: 24px;
    color: #172031;
    margin: 0;
  }
  
  p {
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }
`;

// 메인 레이아웃
export const PaymentContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const PaymentForm = styled.div`
  flex: 2;
  background-color: transparent;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

export const OrderSummary = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 20px;
  min-width: 350px;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    min-width: auto;
    position: static;
    margin-top: 20px;
  }
`;

// 섹션 스타일
export const Section = styled.div`
  margin-bottom: 30px;
  padding: 30px;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 25px;
  font-family: 'Pretendard', sans-serif;
  border-bottom: 2px solid #f1f3f4;
  padding-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

// 폼 스타일
export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
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
  font-family: 'Pretendard', sans-serif;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  background-color: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
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
  gap: 15px;
`;

export const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border: 2px solid ${props => props.$selected ? '#74B9FF' : '#e9ecef'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.$selected ? 'rgba(116, 185, 255, 0.05)' : 'white'};
  
  &:hover {
    border-color: #74B9FF;
    background-color: rgba(116, 185, 255, 0.05);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(116, 185, 255, 0.15);
  }
`;

export const RadioInput = styled.input`
  margin-right: 15px;
  width: 18px;
  height: 18px;
  accent-color: #74B9FF;
  cursor: pointer;
`;

export const PaymentLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #172031;
  cursor: pointer;
  flex: 1;
  font-family: 'Pretendard', sans-serif;
`;

// 계좌 정보
export const AccountInfo = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #ddd;
  
  strong {
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    color: #172031;
    display: block;
    margin-bottom: 8px;
  }
  
  span {
    font-family: 'Pretendard', sans-serif;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
`;

// 주문 상품 아이템
export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }
`;

export const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  margin-right: 15px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  margin-right: 15px;
`;

export const ItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 6px;
  font-family: 'Pretendard', sans-serif;
  line-height: 1.3;
`;

export const ItemOptions = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
  font-family: 'Pretendard', sans-serif;
`;

export const ItemQuantity = styled.div`
  font-size: 13px;
  color: #999;
  font-family: 'Pretendard', sans-serif;
`;

export const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #74B9FF;
  text-align: right;
  font-family: 'Pretendard', sans-serif;
`;

// 가격 요약
export const SummaryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 25px;
  font-family: 'Pretendard', sans-serif;
  text-align: center;
`;

export const PriceSummary = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f1f3f4;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
`;

export const PriceLabel = styled.span`
  color: #666;
  font-weight: 400;
`;

export const PriceValue = styled.span`
  color: #172031;
  font-weight: 500;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  margin-top: 15px;
  border-top: 2px solid #e9ecef;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
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
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BackBtn = styled.button`
  padding: 14px 20px;
  background-color: #f8f9fa;
  color: #172031;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const PayBtn = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #74B9FF 0%, #0984e3 100%);
  color: white;
  border: none;
  padding: 18px 20px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0984e3 0%, #74B9FF 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(116, 185, 255, 0.4);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
`;

// 반응형 미디어 쿼리 개선
export const ResponsiveContainer = styled.div`
  @media (max-width: 480px) {
    ${Section} {
      padding: 15px;
      border-radius: 10px;
    }
    
    ${SectionTitle} {
      font-size: 16px;
    }
    
    ${Input}, ${Select} {
      padding: 12px 14px;
      font-size: 14px;
    }
    
    ${PaymentMethod} {
      padding: 15px;
    }
    
    ${ItemImage} {
      width: 60px;
      height: 60px;
    }
    
    ${ItemName} {
      font-size: 14px;
    }
    
    ${ItemPrice} {
      font-size: 14px;
    }
  }
`;