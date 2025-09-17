// MDPage.main.styled.js
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

export const MainContent = styled.main`
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

// 로딩 컨테이너
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

// 로딩 스피너
export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #74B9FF;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// 로딩 텍스트
export const LoadingText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #666;
  margin: 0;
`;

// 에러 컨테이너
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
`;

// 에러 텍스트
export const ErrorText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #e74c3c;
  margin: 0;
  text-align: center;
`;

// 재시도 버튼
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

// 상품 없음 메시지
export const NoProductsMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
`;

// 캐러셀 섹션
export const CarouselSection = styled.section`
  margin-bottom: 60px;
  position: relative;
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  border-radius: 25px;
  opacity: 0.8;
  background-color: #B3D1F0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const CarouselContent = styled.div`
  color: #172031;
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  
  h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }
  
  p {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
  }
`;

export const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background-color: #B3D1F0;
  border: 1px solid #172031;
  border-radius: 50%;
  color: #172031;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.$direction === 'left' ? 'left: 40px;' : 'right: 40px;'}
  
  &:hover {
    background-color: #172031;
    color: #ffffff;
    transform: translateY(-50%) scale(1.1);
  }
`;

export const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 5px; 
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
`;

export const Indicator = styled.button`
  width: 40px;
  height: 17px;
  border: 2px solid #A259FF;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.$active ? '#A259FF' : '#ffffff'};
  
  &:hover {
    opacity: 0.8;
  }
`;

// 섹션 공통 스타일
export const Section = styled.section`
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
`;

// 섹션 헤더 (더보기 버튼 제거됨)
export const SectionHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`;

// 섹션 제목
export const SectionTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #172031;
  margin: 0;
`;

// 상품 그리드 래퍼 (더보기 버튼을 위한 포지셔닝 컨테이너)
export const ProductGridWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// 상품 그리드
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// 더보기 버튼 오버레이 (세 번째 상품 위에 위치)
export const MoreButtonOverlay = styled.button`
  position: absolute;
  top: -12%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 20;
  
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #74B9FF, #5DADE2);
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #5DADE2, #4A9AE1);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(116, 185, 255, 0.4);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.98);
  }
  
  // 모바일에서는 하단에 표시
  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin: 20px auto 0;
    display: block;
    width: fit-content;
  }
`;

export const ProductCard = styled.div`
  width: 300px;
  height: 350px;
  background-color: #F8F8F8;
  border: 1px solid #E5E5E5;
  border-radius: 15px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 180px;
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
  font-size: 16px;
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

// 공지사항 섹션
export const NoticeSection = styled.section`
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
`;

export const NoticeTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 20px 0;
`;

export const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NoticeItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e9ecef;
  font-family: 'Pretendard', sans-serif;
  color: #333;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(116, 185, 255, 0.05);
    margin: 0 -15px;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export const NoticeDate = styled.span`
  color: #999;
  font-size: 14px;
  font-weight: 400;
`;