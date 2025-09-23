// MDPage.Cart.styled.js
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

// 빈 장바구니 스타일
export const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
`;

export const EmptyMessage = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  color: #172031;
`;

export const EmptySubMessage = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 30px;
`;

export const ContinueShoppingBtn = styled.button`
  background-color: #74B9FF;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #5DADE2;
  }
`;

// 장바구니 메인 레이아웃
export const CartContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

export const CartItems = styled.div`
  flex: 2;
  background-color: #ffffff;
`;

export const CartSummary = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  position: sticky;
  top: 20px;
`;

// 장바구니 헤더
export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
`;

export const CartHeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
`;

export const ClearAllBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: #dc3545;
  }
`;

// 상품 아이템 스타일
export const CartItem = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #e9ecef;
  gap: 20px;
`;

export const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 4px;
`;

export const ItemPrice = styled.div`
  font-size: 16px;
  color: #74B9FF;
  font-weight: 600;
`;

export const ItemOptions = styled.div`
  font-size: 14px;
  color: #666;
`;

export const ItemControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: #dc3545;
  }
`;

// 수량 조절
export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 4px;
`;

export const QuantityBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: #f8f9fa;
  color: #172031;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  border: none;
  text-align: center;
  font-size: 14px;
  background-color: transparent;
`;

export const ItemTotal = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #172031;
`;

// 주문 요약 스타일
export const SummaryTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 20px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
`;

export const SummaryLabel = styled.span`
  color: #666;
`;

export const SummaryValue = styled.span`
  color: #172031;
  font-weight: 500;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
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

export const CheckoutBtn = styled.button`
  width: 100%;
  background-color: #74B9FF;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #5DADE2;
  }
`;

export const ContinueShoppingLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #74B9FF;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

// 추천 상품 섹션
export const RecommendedSection = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid #e9ecef;
`;

export const RecommendedTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 30px;
  font-family: 'Pretendard', sans-serif;
`;

export const RecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const RecommendedCard = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #74B9FF;
    box-shadow: 0 4px 12px rgba(116, 185, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const RecommendedImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
`;

export const RecommendedName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 8px;
  line-height: 1.4;
`;

export const RecommendedPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #74B9FF;
  margin-bottom: 12px;
`;

export const AddToCartBtn = styled.button`
  width: 100%;
  background-color: #74B9FF;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #5DADE2;
  }
`;