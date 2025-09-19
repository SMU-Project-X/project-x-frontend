// MDPage.SearchResults.styled.js
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

export const NoSearchQuery = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
`;

// 필터 섹션
export const FilterSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

export const FilterLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
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

export const EventFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const EventCheckbox = styled.input`
  cursor: pointer;
`;

export const EventLabel = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

// 상품 그리드
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

export const ProductCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #E5E5E5;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #F0F0F0;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-family: 'Pretendard', sans-serif;
  border: 1px solid #E5E5E5;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const ProductName = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #172031;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ProductPrice = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #74B9FF;
  margin: 0;
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
`;

export const EventBadge = styled.span`
  position: absolute;
  top: -5px;
  right: 0;
  background-color: #e74c3c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  font-family: 'Pretendard', sans-serif;
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
  padding: 10px 15px;
  border: 1px solid ${props => props.$active ? '#74B9FF' : '#ddd'};
  background-color: ${props => props.$active ? '#74B9FF' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#5599e5' : '#f8f9fa'};
    border-color: ${props => props.$active ? '#5599e5' : '#74B9FF'};
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

// 검색 결과 없음
export const NoResults = styled.div`
  text-align: center;
  padding: 80px 20px;
  background-color: #f8f9fa;
  border-radius: 15px;
  margin: 40px 0;
`;

export const NoResultsIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

export const NoResultsTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
`;

export const NoResultsText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #666;
  margin: 0 0 30px 0;
`;

export const SearchSuggestions = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  max-width: 400px;
  text-align: left;
`;

export const SuggestionTitle = styled.h4`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
`;

export const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    font-family: 'Pretendard', sans-serif;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    padding-left: 16px;
    position: relative;
    
    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: #74B9FF;
      font-weight: bold;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;