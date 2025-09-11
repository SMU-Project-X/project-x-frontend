// MDPage.main.styled.js
import styled from 'styled-components';

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

// 캐러셀 섹션
export const CarouselSection = styled.section`
  margin-bottom: 60px;
  position: relative; /* 자식 요소인 캐러셀 컨테이너를 기준으로 위치 잡기 위함 */
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
  font-size: 24px;
  font-weight: 600;
  text-align: center;
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

// 캐러셀 하단 인디케이터 컨테이너
export const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 5px; 
  z-index: 10;
  
  /* 캐러셀 중앙 정렬을 위한 코드 추가 */
  left: 50%;
  transform: translateX(-50%);
`;

// 개별 인디케이터 버튼
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

// 섹션 헤더 - 제목과 more 버튼을 한 줄에 정렬
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
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

// More 버튼
export const MoreButton = styled.a`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #74B9FF;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #5599e5;
  }
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
`;

// 공지사항 섹션
export const NoticeSection = styled.section`
  max-width: 1400px;
  margin: 80px auto 0;
  padding: 30px;
  background-color: #F8F8F8;
  border-radius: 15px;
  border: 1px solid #E5E5E5;
`;

export const NoticeTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #172031;
  margin: 0 0 20px 0;
  border-bottom: 2px solid #B3D1F0;
  padding-bottom: 10px;
`;

export const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NoticeItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #E5E5E5;
  font-family: 'Pretendard', sans-serif;
  color: #172031;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #74B9FF;
    padding-left: 10px;
  }
`;

export const NoticeDate = styled.span`
  color: #999;
  font-size: 13px;
  margin-left: 10px;
`;