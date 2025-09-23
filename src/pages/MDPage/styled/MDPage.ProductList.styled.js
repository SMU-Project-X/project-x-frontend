// MDPage.ProductList.styled.js - 스타일 컴포넌트
import styled, { keyframes } from 'styled-components';

// 로딩 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 컨테이너
export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

export const ContentWrapper = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 100px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// 제목
export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 30px 0;
`;

// 카테고리 탭
export const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #f1f3f4;
  padding-bottom: 0;
`;

export const CategoryTab = styled.button`
  background: none;
  border: none;
  padding: 15px 25px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$active ? '#74B9FF' : '#666'};
  cursor: pointer;
  position: relative;
  border-bottom: 3px solid ${props => props.$active ? '#74B9FF' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: #74B9FF;
    background-color: rgba(116, 185, 255, 0.05);
  }
`;

// 필터 섹션
export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background-color: #f8f9fa;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const FilterLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
`;

export const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.2);
  }
  
  &:hover {
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
  cursor: pointer;
  accent-color: #74B9FF;
`;

export const EventLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
`;

export const ResultInfo = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 10px;
  }
`;

// 로딩 상태
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #74B9FF;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #666;
  margin: 0;
`;

// 에러 상태
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 20px;
  padding: 40px;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 15px;
`;

export const ErrorText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #e74c3c;
  margin: 0;
  text-align: center;
`;

export const RetryButton = styled.button`
  padding: 12px 24px;
  background-color: #74B9FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0984e3;
  }
`;

// 상품 그리드
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background-color: #f8f9fa;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const NewBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #74B9FF 0%, #0984e3 100%);
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(116, 185, 255, 0.3);
`;

export const EventBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(253, 121, 168, 0.3);
`;

export const ProductInfo = styled.div`
  padding: 20px;
  position: relative;
`;

export const ProductName = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #172031;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 42px;
`;

export const ProductPrice = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #74B9FF;
  margin: 8px 0;
`;

export const ProductDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 40px;
`;

// 상품 없음 메시지
export const NoProductsMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #999;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  background-color: #f8f9fa;
  border-radius: 15px;
  margin: 40px 0;
  border: 2px dashed #ddd;
`;

// 페이지네이션
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const PaginationBtn = styled.button`
  padding: 12px 16px;
  border: 1px solid ${props => props.$active ? '#74B9FF' : '#ddd'};
  background-color: ${props => props.$active ? '#74B9FF' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 44px;

  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#0984e3' : '#f8f9fa'};
    border-color: ${props => props.$active ? '#0984e3' : '#74B9FF'};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
    transform: none;
  }
`;

// 플로팅 탑 버튼
export const FloatingTopBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #74B9FF 0%, #0984e3 100%);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: linear-gradient(135deg, #0984e3 0%, #74B9FF 100%);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(116, 185, 255, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;