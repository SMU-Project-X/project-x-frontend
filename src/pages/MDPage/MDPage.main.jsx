// MDPage.main.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled/MDPage.main.styled';

function MDMain() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 캐러셀 더미 데이터
  const carouselData = [
    { id: 1, title: '신규 회원 10% 할인', content: '첫 구매 시 특별 혜택을 만나보세요!' },
    { id: 2, title: '한정판 굿즈 출시', content: 'Project X 한정판 상품들을 확인해보세요!' },
    { id: 3, title: '무료배송 이벤트', content: '5만원 이상 구매 시 무료배송 혜택!' }
  ];

  // 인기 상품 더미 데이터
  const popularProducts = [
    { id: 1, name: '한정판 포토북', price: 25000, image: '상품 이미지 1', description: 'Project X 한정판 포토북' },
    { id: 2, name: 'Project X 굿즈 세트', price: 18000, image: '상품 이미지 2', description: '프로젝트 X 공식 굿즈' },
    { id: 3, name: '한정판 스티커팩', price: 8000, image: '상품 이미지 3', description: '홀로그램 스티커 세트' }
  ];

  // 신상품 더미 데이터
  const newProducts = [
    { id: 4, name: 'Project X 에코백', price: 15000, image: '상품 이미지 4', description: '친환경 캔버스 에코백' },
    { id: 5, name: '한정판 키링', price: 12000, image: '상품 이미지 5', description: '메탈 키링 한정판' },
    { id: 6, name: 'Project X 머그컵', price: 20000, image: '상품 이미지 6', description: '세라믹 머그컵' }
  ];

  // 공지사항 더미 데이터
  const notices = [
    { id: 1, title: '신규 회원 가입 이벤트 안내', date: '2024.12.15' },
    { id: 2, title: '배송 지연 안내 (12월 말 연휴)', date: '2024.12.14' },
    { id: 3, title: '한정판 상품 재입고 알림', date: '2024.12.13' },
    { id: 4, title: '웹사이트 유지보수 안내', date: '2024.12.12' },
    { id: 5, title: '고객센터 운영시간 변경 안내', date: '2024.12.11' }
  ];

  // 캐러셀 네비게이션
  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? carouselData.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === carouselData.length - 1 ? 0 : currentSlide + 1);
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  // 상품 클릭 핸들러
  const handleProductClick = (productId) => {
    navigate(`/MD/product/${productId}`);
  };

  // 더보기 버튼 핸들러
  const handleMoreProducts = () => {
    navigate('/MD/products');
  };

  return (
    <S.Container>
      <S.MainContent>
        {/* 캐러셀 섹션 */}
        <S.CarouselSection>
          <S.CarouselContainer>
            <S.CarouselNavButton 
              $direction="left" 
              onClick={handlePrevSlide}
            >
              ‹
            </S.CarouselNavButton>
            
            <S.CarouselContent>
              <h2>{carouselData[currentSlide].title}</h2>
              <p>{carouselData[currentSlide].content}</p>
            </S.CarouselContent>
            
            <S.CarouselNavButton 
              $direction="right" 
              onClick={handleNextSlide}
            >
              ›
            </S.CarouselNavButton>
          </S.CarouselContainer>
          
          <S.CarouselIndicators>
            {carouselData.map((_, index) => (
              <S.Indicator
                key={index}
                $active={currentSlide === index}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </S.CarouselIndicators>
        </S.CarouselSection>

        {/* 신상품 섹션 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>신상품</S.SectionTitle>
            <S.MoreButton onClick={handleMoreProducts}>더보기</S.MoreButton>
          </S.SectionHeader>
          
          <S.ProductGrid>
            {popularProducts.map(product => (
              <S.ProductCard 
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                <S.ProductImage>
                  {product.image}
                </S.ProductImage>
                <S.ProductInfo>
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>₩{product.price.toLocaleString()}</S.ProductPrice>
                  <S.ProductDescription>{product.description}</S.ProductDescription>
                </S.ProductInfo>
              </S.ProductCard>
            ))}
          </S.ProductGrid>
        </S.Section>

        {/* 베스트 섹션 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>베스트</S.SectionTitle>
            <S.MoreButton onClick={handleMoreProducts}>더보기</S.MoreButton>
          </S.SectionHeader>
          
          <S.ProductGrid>
            {newProducts.map(product => (
              <S.ProductCard 
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                <S.ProductImage>
                  {product.image}
                </S.ProductImage>
                <S.ProductInfo>
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>₩{product.price.toLocaleString()}</S.ProductPrice>
                  <S.ProductDescription>{product.description}</S.ProductDescription>
                </S.ProductInfo>
              </S.ProductCard>
            ))}
          </S.ProductGrid>
        </S.Section>

   {/* 이벤트 섹션 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>이벤트</S.SectionTitle>
            <S.MoreButton onClick={handleMoreProducts}>더보기</S.MoreButton>
          </S.SectionHeader>
          
          <S.ProductGrid>
            {newProducts.map(product => (
              <S.ProductCard 
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                <S.ProductImage>
                  {product.image}
                </S.ProductImage>
                <S.ProductInfo>
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>₩{product.price.toLocaleString()}</S.ProductPrice>
                  <S.ProductDescription>{product.description}</S.ProductDescription>
                </S.ProductInfo>
              </S.ProductCard>
            ))}
          </S.ProductGrid>
        </S.Section>
        {/* 공지사항 섹션 - 더보기 버튼 제거 */}
        <S.NoticeSection>
          <S.NoticeTitle>📢 공지사항</S.NoticeTitle>
          <S.NoticeList>
            {notices.map(notice => (
              <S.NoticeItem key={notice.id}>
                {notice.title}
                <S.NoticeDate>{notice.date}</S.NoticeDate>
              </S.NoticeItem>
            ))}
          </S.NoticeList>
        </S.NoticeSection>
      </S.MainContent>
    </S.Container>
  );
}

export default MDMain;