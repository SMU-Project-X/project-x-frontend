// MDPage.main.jsx - 번역/환율 지원 버전
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../../services/productApi';
import * as S from './styled/MDPage.main.styled';

function MDMain() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 상품 데이터 상태 관리
  const [newProducts, setNewProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [eventProducts, setEventProducts] = useState([]);
  
  // 개별 섹션 로딩/에러 상태 관리
  const [sectionsState, setSectionsState] = useState({
    new: { loading: true, error: null },
    best: { loading: true, error: null },
    event: { loading: true, error: null }
  });

  // 캐러셀 더미 데이터 (번역 속성 추가)
  const carouselData = [
    { 
      id: 1, 
      title: '신규 회원 10% 할인', 
      content: '첫 구매 시 특별 혜택을 만나보세요!' 
    },
    { 
      id: 2, 
      title: '한정판 굿즈 출시', 
      content: 'Project X 한정판 상품들을 확인해보세요!' 
    },
    { 
      id: 3, 
      title: '무료배송 이벤트', 
      content: '5만원 이상 구매 시 무료배송 혜택!' 
    }
  ];

  // 공지사항 더미 데이터 (번역 속성 추가)
  const notices = [
    { id: 1, title: '신규 회원 가입 이벤트 안내', date: '2024.12.15' },
    { id: 2, title: '배송 지연 안내 (12월 말 연휴)', date: '2024.12.14' },
    { id: 3, title: '한정판 상품 재입고 알림', date: '2024.12.13' },
    { id: 4, title: '웹사이트 유지보수 안내', date: '2024.12.12' },
    { id: 5, title: '고객센터 운영시간 변경 안내', date: '2024.12.11' }
  ];

  // 컴포넌트 마운트 시 데이터 로딩 및 번역/환율 설정
  useEffect(() => {
    loadAllProducts();
    setupTranslationAndCurrency();
  }, []);

  // 번역 및 환율 요소 설정
  const setupTranslationAndCurrency = () => {
    // 페이지 로드 후 약간의 지연을 두고 실행 (DOM 렌더링 완료 대기)
    setTimeout(() => {
      setupTranslatableElements();
      setupPriceElements();
    }, 500);
  };

  // 번역 가능한 요소들에 data-translate 속성 추가
  const setupTranslatableElements = () => {
    const translatableTexts = [
      '신상품', '베스트', '이벤트', '더보기', '공지사항',
      '등록된 신상품이 없습니다.', '등록된 베스트 상품이 없습니다.', '등록된 이벤트 상품이 없습니다.',
      '상품을 불러오는 중...', '신상품을 불러오는 중...', '베스트 상품을 불러오는 중...', '이벤트 상품을 불러오는 중...',
      '다시 시도'
    ];

    // 정확한 텍스트 매칭으로 data-translate 속성 추가
    document.querySelectorAll('*').forEach(element => {
      if (element.children.length === 0) { // 텍스트만 있는 요소
        const text = element.textContent?.trim();
        if (text && translatableTexts.includes(text)) {
          element.setAttribute('data-translate', text);
          console.log('번역 속성 추가:', text);
        }
      }
    });

    // 상품명과 설명에도 번역 속성 추가 (동적 콘텐츠)
    setTimeout(() => {
      document.querySelectorAll('[data-product-name], [data-product-description]').forEach(element => {
        const text = element.textContent?.trim();
        if (text) {
          element.setAttribute('data-translate', text);
        }
      });
    }, 1000);
  };

  // 가격 요소들에 data-price 속성 추가
  const setupPriceElements = () => {
    setTimeout(() => {
      document.querySelectorAll('[data-product-price]').forEach(element => {
        const priceText = element.textContent;
        if (priceText) {
          // ₩1,000,000 형태에서 숫자만 추출
          const priceMatch = priceText.match(/[\d,]+/);
          if (priceMatch) {
            const price = parseInt(priceMatch[0].replace(/,/g, ''));
            element.setAttribute('data-price', price.toString());
            element.setAttribute('data-original-currency', 'KRW');
            console.log('가격 속성 추가:', priceText, '→', price);
          }
        }
      });
    }, 1000);
  };

  // 개별 섹션 상태 업데이트 헬퍼 함수
  const updateSectionState = (section, updates) => {
    setSectionsState(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  // 모든 상품 데이터 로딩 (기존 코드와 동일)
  const loadAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // 신상품 로딩
      const loadNewProducts = async () => {
        try {
          updateSectionState('new', { loading: true, error: null });
          const response = await productAPI.getNewProducts(0, 3);
          if (response.success) {
            setNewProducts(response.data);
          } else {
            updateSectionState('new', { error: '신상품을 불러올 수 없습니다.' });
          }
        } catch (error) {
          console.error('신상품 로딩 실패:', error);
          updateSectionState('new', { error: '신상품 로딩 중 오류가 발생했습니다.' });
        } finally {
          updateSectionState('new', { loading: false });
        }
      };

      // 베스트 상품 로딩
      const loadBestProducts = async () => {
        try {
          updateSectionState('best', { loading: true, error: null });
          const response = await productAPI.getBestProducts(0, 3);
          if (response.success) {
            setBestProducts(response.data);
          } else {
            updateSectionState('best', { error: '베스트 상품을 불러올 수 없습니다.' });
          }
        } catch (error) {
          console.error('베스트 상품 로딩 실패:', error);
          updateSectionState('best', { error: '베스트 상품 로딩 중 오류가 발생했습니다.' });
        } finally {
          updateSectionState('best', { loading: false });
        }
      };

      // 이벤트 상품 로딩
      const loadEventProducts = async () => {
        try {
          updateSectionState('event', { loading: true, error: null });
          const response = await productAPI.getEventProducts(0, 3);
          
          if (response.success && response.data) {
            setEventProducts(response.data);
            console.log('이벤트 상품 로딩 성공:', response.data.length, '개');
          } else {
            console.warn('이벤트 상품 API 응답 실패:', response);
            updateSectionState('event', { error: '이벤트 상품을 불러올 수 없습니다.' });
            setEventProducts([]);
          }
        } catch (error) {
          console.error('이벤트 상품 로딩 실패:', error);
          updateSectionState('event', { error: '이벤트 상품 로딩 중 오류가 발생했습니다.' });
          setTimeout(() => {
            console.log('이벤트 상품 자동 재시도...');
            loadEventProducts();
          }, 3000);
        } finally {
          updateSectionState('event', { loading: false });
        }
      };

      // 모든 섹션을 병렬로 로딩
      await Promise.all([
        loadNewProducts(),
        loadBestProducts(),
        loadEventProducts()
      ]);

      // 상품 로딩 완료 후 번역/환율 요소 재설정
      setupTranslationAndCurrency();

    } catch (error) {
      console.error('전체 상품 데이터 로딩 실패:', error);
      setError('상품을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 개별 섹션 재시도 함수 (기존과 동일)
  const retrySectionLoad = async (section) => {
    switch (section) {
      case 'new':
        const newResponse = await productAPI.getNewProducts(0, 3);
        if (newResponse.success) {
          setNewProducts(newResponse.data);
          updateSectionState('new', { error: null });
        }
        break;
      case 'best':
        const bestResponse = await productAPI.getBestProducts(0, 3);
        if (bestResponse.success) {
          setBestProducts(bestResponse.data);
          updateSectionState('best', { error: null });
        }
        break;
      case 'event':
        const eventResponse = await productAPI.getEventProducts(0, 3);
        if (eventResponse.success) {
          setEventProducts(eventResponse.data);
          updateSectionState('event', { error: null });
        }
        break;
    }
    // 재시도 후 번역/환율 요소 재설정
    setupTranslationAndCurrency();
  };

  // 캐러셀 네비게이션 (기존과 동일)
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

  // 더보기 버튼 클릭 핸들러
  const handleMoreProducts = () => {
    navigate('/MD/products');
  };

  // 전체 로딩 중일 때
  if (loading) {
    return (
      <S.Container>
        <S.MainContent>
          <S.LoadingContainer>
            <S.LoadingSpinner />
            <S.LoadingText data-translate="상품을 불러오는 중...">상품을 불러오는 중...</S.LoadingText>
          </S.LoadingContainer>
        </S.MainContent>
      </S.Container>
    );
  }

  // 전체 에러 발생 시
  if (error) {
    return (
      <S.Container>
        <S.MainContent>
          <S.ErrorContainer>
            <S.ErrorText>{error}</S.ErrorText>
            <S.RetryButton onClick={loadAllProducts} data-translate="다시 시도">다시 시도</S.RetryButton>
          </S.ErrorContainer>
        </S.MainContent>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.MainContent>
        {/* 캐러셀 섹션 */}
        <S.CarouselSection>
          <S.CarouselContainer>
            <S.CarouselNavButton $direction="left" onClick={handlePrevSlide}>
              ‹
            </S.CarouselNavButton>
            <S.CarouselContent>
              <h2 data-translate={carouselData[currentSlide].title}>{carouselData[currentSlide].title}</h2>
              <p data-translate={carouselData[currentSlide].content}>{carouselData[currentSlide].content}</p>
            </S.CarouselContent>
            <S.CarouselNavButton $direction="right" onClick={handleNextSlide}>
              ›
            </S.CarouselNavButton>
          </S.CarouselContainer>
          <S.CarouselIndicators>
            {carouselData.map((_, index) => (
              <S.Indicator 
                key={index}
                $active={index === currentSlide}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </S.CarouselIndicators>
        </S.CarouselSection>

        {/* 신상품 섹션 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle data-translate="신상품">신상품</S.SectionTitle>
          </S.SectionHeader>
          
          {sectionsState.new.loading ? (
            <S.LoadingContainer style={{ minHeight: '200px' }}>
              <S.LoadingSpinner />
              <S.LoadingText data-translate="신상품을 불러오는 중...">신상품을 불러오는 중...</S.LoadingText>
            </S.LoadingContainer>
          ) : sectionsState.new.error ? (
            <S.ErrorContainer style={{ minHeight: '200px' }}>
              <S.ErrorText>{sectionsState.new.error}</S.ErrorText>
              <S.RetryButton onClick={() => retrySectionLoad('new')} data-translate="다시 시도">다시 시도</S.RetryButton>
            </S.ErrorContainer>
          ) : newProducts.length > 0 ? (
            <S.ProductGridWrapper>
              <S.ProductGrid>
                {newProducts.map(product => (
                  <S.ProductCard 
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <S.ProductImage>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} />
                      ) : (
                        `상품 이미지 ${product.id}`
                      )}
                    </S.ProductImage>
                    <S.ProductInfo>
                      <S.ProductName data-product-name data-translate={product.name}>{product.name}</S.ProductName>
                      <S.ProductPrice data-product-price data-price={product.price} data-original-currency="KRW">
                        ₩{product.price?.toLocaleString()}
                      </S.ProductPrice>
                      <S.ProductDescription data-product-description data-translate={product.description}>
                        {product.description}
                      </S.ProductDescription>
                    </S.ProductInfo>
                  </S.ProductCard>
                ))}
              </S.ProductGrid>
              <S.MoreButtonOverlay onClick={handleMoreProducts} data-translate="더보기">
                더보기
              </S.MoreButtonOverlay>
            </S.ProductGridWrapper>
          ) : (
            <S.NoProductsMessage data-translate="등록된 신상품이 없습니다.">등록된 신상품이 없습니다.</S.NoProductsMessage>
          )}
        </S.Section>

        {/* 베스트 섹션 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle data-translate="베스트">베스트</S.SectionTitle>
          </S.SectionHeader>
          
          {sectionsState.best.loading ? (
            <S.LoadingContainer style={{ minHeight: '200px' }}>
              <S.LoadingSpinner />
              <S.LoadingText data-translate="베스트 상품을 불러오는 중...">베스트 상품을 불러오는 중...</S.LoadingText>
            </S.LoadingContainer>
          ) : sectionsState.best.error ? (
            <S.ErrorContainer style={{ minHeight: '200px' }}>
              <S.ErrorText>{sectionsState.best.error}</S.ErrorText>
              <S.RetryButton onClick={() => retrySectionLoad('best')} data-translate="다시 시도">다시 시도</S.RetryButton>
            </S.ErrorContainer>
          ) : bestProducts.length > 0 ? (
            <S.ProductGridWrapper>
              <S.ProductGrid>
                {bestProducts.map(product => (
                  <S.ProductCard 
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <S.ProductImage>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} />
                      ) : (
                        `상품 이미지 ${product.id}`
                      )}
                    </S.ProductImage>
                    <S.ProductInfo>
                      <S.ProductName data-product-name data-translate={product.name}>{product.name}</S.ProductName>
                      <S.ProductPrice data-product-price data-price={product.price} data-original-currency="KRW">
                        ₩{product.price?.toLocaleString()}
                      </S.ProductPrice>
                      <S.ProductDescription data-product-description data-translate={product.description}>
                        {product.description}
                      </S.ProductDescription>
                    </S.ProductInfo>
                  </S.ProductCard>
                ))}
              </S.ProductGrid>
              <S.MoreButtonOverlay onClick={handleMoreProducts} data-translate="더보기">
                더보기
              </S.MoreButtonOverlay>
            </S.ProductGridWrapper>
          ) : (
            <S.NoProductsMessage data-translate="등록된 베스트 상품이 없습니다.">등록된 베스트 상품이 없습니다.</S.NoProductsMessage>
          )}
        </S.Section>

        {/* 이벤트 섹션 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle data-translate="이벤트">이벤트</S.SectionTitle>
          </S.SectionHeader>
          
          {sectionsState.event.loading ? (
            <S.LoadingContainer style={{ minHeight: '200px' }}>
              <S.LoadingSpinner />
              <S.LoadingText data-translate="이벤트 상품을 불러오는 중...">이벤트 상품을 불러오는 중...</S.LoadingText>
            </S.LoadingContainer>
          ) : sectionsState.event.error ? (
            <S.ErrorContainer style={{ minHeight: '200px' }}>
              <S.ErrorText>{sectionsState.event.error}</S.ErrorText>
              <S.RetryButton onClick={() => retrySectionLoad('event')} data-translate="다시 시도">다시 시도</S.RetryButton>
            </S.ErrorContainer>
          ) : eventProducts.length > 0 ? (
            <S.ProductGridWrapper>
              <S.ProductGrid>
                {eventProducts.map(product => (
                  <S.ProductCard 
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <S.ProductImage>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} />
                      ) : (
                        `상품 이미지 ${product.id}`
                      )}
                    </S.ProductImage>
                    <S.ProductInfo>
                      <S.ProductName data-product-name data-translate={product.name}>{product.name}</S.ProductName>
                      <S.ProductPrice data-product-price data-price={product.price} data-original-currency="KRW">
                        ₩{product.price?.toLocaleString()}
                      </S.ProductPrice>
                      <S.ProductDescription data-product-description data-translate={product.description}>
                        {product.description}
                      </S.ProductDescription>
                    </S.ProductInfo>
                  </S.ProductCard>
                ))}
              </S.ProductGrid>
              <S.MoreButtonOverlay onClick={handleMoreProducts} data-translate="더보기">
                더보기
              </S.MoreButtonOverlay>
            </S.ProductGridWrapper>
          ) : (
            <S.NoProductsMessage data-translate="등록된 이벤트 상품이 없습니다.">등록된 이벤트 상품이 없습니다.</S.NoProductsMessage>
          )}
        </S.Section>

        {/* 공지사항 섹션 */}
        <S.NoticeSection>
          <S.NoticeTitle data-translate="📢 공지사항">📢 공지사항</S.NoticeTitle>
          <S.NoticeList>
            {notices.map(notice => (
              <S.NoticeItem key={notice.id}>
                <span data-translate={notice.title}>{notice.title}</span>
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