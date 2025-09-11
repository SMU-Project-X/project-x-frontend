// MDPage.ProductList.styled.js
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

// 필터 및 정렬 영역
export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #172031;
  margin-right: 8px;
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
  }
`;

export const EventFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EventCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #74B9FF;
`;

export const EventLabel = styled.label`
  font-size: 14px;
  color: #172031;
  cursor: pointer;
`;

export const ResultInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

// 상품 그리드 (기존 MD 페이지와 동일)
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

// 상품 카드 (기존 스타일 재사용하되 일부 수정)
export const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: #74B9FF;
  }
`;

export const ProductImageContainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
`;

export const EventBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #dc3545;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

export const ProductInfo = styled.div`
  padding: 20px;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #74B9FF;
  margin-bottom: 8px;
`;

export const ProductOriginalPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-right: 8px;
`;

export const ProductDiscount = styled.span`
  font-size: 14px;
  color: #dc3545;
  font-weight: 600;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 페이지네이션
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 5px;
`;

export const PaginationBtn = styled.button`
  padding: 10px 15px;
  border: 1px solid #e9ecef;
  background-color: ${props => props.active ? '#74B9FF' : 'white'};
  color: ${props => props.active ? 'white' : '#172031'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? '#5DADE2' : '#f8f9fa'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const PaginationDots = styled.span`
  padding: 10px 5px;
  color: #999;
`;

// 로딩 및 빈 상태
export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
`;

export const EmptyWrapper = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
`;

export const EmptyMessage = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  color: #172031;
`;

export const EmptySubMessage = styled.div`
  font-size: 14px;
  color: #999;
`;

// 플로팅 탑 버튼
export const FloatingTopBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #74B9FF;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(116, 185, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background-color: #5DADE2;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
`;