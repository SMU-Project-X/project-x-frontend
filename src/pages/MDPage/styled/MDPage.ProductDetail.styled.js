// MDPage.ProductDetail.styled.js
import styled, { keyframes } from 'styled-components';

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
`;

// 로딩 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

export const ErrorText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #e74c3c;
  margin: 0;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const RetryButton = styled.button`
  padding: 12px 24px;
  background-color: #74B9FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5599e5;
  }
`;

export const BackButton = styled.button`
  padding: 12px 24px;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

// 브레드크럼 네비게이션
export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
`;

export const BreadcrumbItem = styled.span`
  color: ${props => props.$active ? '#333' : '#666'};
  cursor: ${props => props.$active ? 'default' : 'pointer'};
  
  &:hover:not([data-active="true"]) {
    color: #74B9FF;
  }
`;

export const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  color: #999;
`;

// 상품 상세 메인 컨테이너
export const ProductDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// 이미지 섹션
export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #E5E5E5;
`;

export const MainImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  color: #999;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EventBadge = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #e74c3c;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 15px;
  font-family: 'Pretendard', sans-serif;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 5px 0;
`;

export const ThumbnailImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${props => props.$active ? '#74B9FF' : '#E5E5E5'};
  cursor: pointer;
  flex-shrink: 0;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #74B9FF;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 상품 정보 섹션
export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProductTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #172031;
  margin: 0;
  line-height: 1.3;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const OriginalPrice = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #999;
  text-decoration: line-through;
`;

export const DiscountRate = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #e74c3c;
`;

export const CurrentPrice = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #74B9FF;
`;

export const ProductDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

// 옵션 섹션
export const OptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OptionLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const OptionSelect = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.2);
  }
`;

// 수량 섹션
export const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const QuantityLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

export const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: #f8f9fa;
  color: #333;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #e9ecef;
  }

  &:disabled {
    color: #999;
    cursor: not-allowed;
  }
`;

export const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  outline: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// 총 가격 섹션
export const TotalPriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const TotalPriceLabel = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const TotalPrice = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #74B9FF;
`;

// 재고 정보
export const StockInfo = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
`;

export const InStock = styled.span`
  color: #28a745;
  font-weight: 500;
`;

export const OutOfStock = styled.span`
  color: #dc3545;
  font-weight: 500;
`;

// 액션 버튼들
export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const AddToCartButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: #74B9FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #5599e5;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const BuyNowButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: #172031;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #2c3e50;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// 상세 정보 섹션
export const DetailInfoSection = styled.section`
  margin-bottom: 60px;
`;

export const DetailInfoTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 20px 0;
  border-bottom: 2px solid #74B9FF;
  padding-bottom: 10px;
`;

export const DetailInfoContent = styled.div`
  font-family: 'Pretendard', sans-serif;
  line-height: 1.6;
  color: #333;
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

// 스펙 섹션
export const SpecSection = styled.section`
  margin-bottom: 60px;
`;

export const SpecTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 20px 0;
  border-bottom: 2px solid #74B9FF;
  padding-bottom: 10px;
`;

export const SpecTable = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
`;

export const SpecRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const SpecLabel = styled.div`
  flex: 0 0 150px;
  padding: 16px;
  background-color: #e9ecef;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  color: #333;
`;

export const SpecValue = styled.div`
  flex: 1;
  padding: 16px;
  font-family: 'Pretendard', sans-serif;
  color: #666;
`;

// 정보 탭 섹션
export const InfoTabSection = styled.section`
  margin-bottom: 60px;
`;

export const InfoTabTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 20px 0;
  border-bottom: 2px solid #74B9FF;
  padding-bottom: 10px;
`;

export const InfoTabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoTabItem = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
`;

export const InfoItemTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
`;

export const InfoItemContent = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;