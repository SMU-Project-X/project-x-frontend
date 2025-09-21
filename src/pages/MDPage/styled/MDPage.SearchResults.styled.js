// MDPage.SearchResults.styled.js - 완전한 스타일 컴포넌트
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
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 20px 0;
`;

export const ResultSummary = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

export const ResultCount = styled.span`
  color: #74B9FF;
  font-weight: 600;
`;

// 🔥 필터 섹션 스타일 추가
export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
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
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
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

export const FilterCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  label {
    font-family: 'Pretendard', sans-serif;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    white-space: nowrap;
  }
`;

export const ResetButton = styled.button`
  padding: 8px 16px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #7f8c8d;
  }
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
  min-height: 200px;
  gap: 20px;
  padding: 30px;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 12px;
  margin-bottom: 30px;
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
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  
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
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const EventBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProductInfo = styled.div`
  padding: 20px;
`;

export const ProductName = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #2d3436;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #636e72;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductPrice = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #74B9FF;
`;

export const OriginalPrice = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #95a5a6;
  text-decoration: line-through;
`;

// 페이지네이션
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

export const PaginationBtn = styled.button`
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: ${props => props.$active ? '#74B9FF' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#0984e3' : '#f8f9fa'};
    border-color: #74B9FF;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 검색 결과 없음
export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 40px 20px;
`;

export const NoResultsIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

export const NoResultsTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #2d3436;
  margin: 0 0 10px 0;
`;

export const NoResultsText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #636e72;
  margin: 0 0 30px 0;
  line-height: 1.5;
`;

export const SearchSuggestions = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  max-width: 400px;
`;

export const SuggestionTitle = styled.h4`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #2d3436;
  margin: 0 0 10px 0;
`;

export const NoSearchQuery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
`;