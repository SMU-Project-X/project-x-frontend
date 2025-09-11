// MDPage.ProductList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled/MDPage.ProductList.styled';

function ProductList() {
  const navigate = useNavigate();
  
  // 더미 상품 데이터 (24개)
  const [allProducts] = useState([
    { id: 1, name: '한정판 포토북', price: 25000, originalPrice: 30000, image: '상품 이미지 1', isEvent: true, category: 'photobook', description: 'Project X 한정판 포토북입니다.' },
    { id: 2, name: 'Project X 굿즈 세트', price: 18000, image: '상품 이미지 2', isEvent: false, category: 'goods', description: '프로젝트 X 공식 굿즈 세트' },
    { id: 3, name: '한정판 스티커팩', price: 8000, originalPrice: 10000, image: '상품 이미지 3', isEvent: true, category: 'sticker', description: '홀로그램 스티커 10종 세트' },
    { id: 4, name: 'Project X 에코백', price: 15000, image: '상품 이미지 4', isEvent: false, category: 'bag', description: '친환경 캔버스 에코백' },
    { id: 5, name: '한정판 키링', price: 12000, originalPrice: 15000, image: '상품 이미지 5', isEvent: true, category: 'keyring', description: '메탈 키링 한정판' },
    { id: 6, name: 'Project X 머그컵', price: 20000, image: '상품 이미지 6', isEvent: false, category: 'cup', description: '세라믹 머그컵 화이트' },
    { id: 7, name: '한정판 파우치', price: 13000, originalPrice: 16000, image: '상품 이미지 7', isEvent: true, category: 'pouch', description: '방수 파우치 블랙' },
    { id: 8, name: 'Project X 노트', price: 9000, image: '상품 이미지 8', isEvent: false, category: 'note', description: 'A5 사이즈 노트' },
    { id: 9, name: '한정판 배지 세트', price: 7000, originalPrice: 9000, image: '상품 이미지 9', isEvent: true, category: 'badge', description: '배지 5종 세트' },
    { id: 10, name: 'Project X 볼펜', price: 5000, image: '상품 이미지 10', isEvent: false, category: 'pen', description: '젤 볼펜 블랙' },
    { id: 11, name: '한정판 엽서 세트', price: 6000, originalPrice: 8000, image: '상품 이미지 11', isEvent: true, category: 'postcard', description: '엽서 8종 세트' },
    { id: 12, name: 'Project X 마우스패드', price: 14000, image: '상품 이미지 12', isEvent: false, category: 'mousepad', description: '고무 마우스패드 대형' },
    { id: 13, name: '한정판 폰케이스', price: 22000, originalPrice: 25000, image: '상품 이미지 13', isEvent: true, category: 'phonecase', description: '투명 하드케이스' },
    { id: 14, name: 'Project X 캘린더', price: 11000, image: '상품 이미지 14', isEvent: false, category: 'calendar', description: '2024 벽걸이 캘린더' },
    { id: 15, name: '한정판 책갈피', price: 4000, originalPrice: 5000, image: '상품 이미지 15', isEvent: true, category: 'bookmark', description: '메탈 책갈피 골드' },
    { id: 16, name: 'Project X 텀블러', price: 28000, image: '상품 이미지 16', isEvent: false, category: 'tumbler', description: '스테인리스 텀블러 500ml' },
    { id: 17, name: '한정판 타올', price: 16000, originalPrice: 20000, image: '상품 이미지 17', isEvent: true, category: 'towel', description: '마이크로파이버 타올' },
    { id: 18, name: 'Project X 슬리퍼', price: 24000, image: '상품 이미지 18', isEvent: false, category: 'slipper', description: '실내 슬리퍼 260mm' },
    { id: 19, name: '한정판 코스터', price: 8000, originalPrice: 10000, image: '상품 이미지 19', isEvent: true, category: 'coaster', description: '코르크 코스터 4종' },
    { id: 20, name: 'Project X 양말', price: 7000, image: '상품 이미지 20', isEvent: false, category: 'socks', description: '면 양말 화이트' },
    { id: 21, name: '한정판 스마트톡', price: 10000, originalPrice: 12000, image: '상품 이미지 21', isEvent: true, category: 'smarttok', description: '스마트톡 홀더' },
    { id: 22, name: 'Project X 우산', price: 19000, image: '상품 이미지 22', isEvent: false, category: 'umbrella', description: '3단 자동 우산' },
    { id: 23, name: '한정판 티셔츠', price: 32000, originalPrice: 40000, image: '상품 이미지 23', isEvent: true, category: 'tshirt', description: '면 100% 티셔츠 L' },
    { id: 24, name: 'Project X 후드티', price: 45000, image: '상품 이미지 24', isEvent: false, category: 'hoodie', description: '기모 후드티 그레이' }
  ]);

  // 상태 관리
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular'); // popular, newest, price-low, price-high, name
  const [priceRange, setPriceRange] = useState('all'); // all, under-10000, 10000-20000, 20000-30000, over-30000
  const [eventOnly, setEventOnly] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const itemsPerPage = 12;

  // 스크롤 이벤트 (탑 버튼 표시)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = [...allProducts];

    // 이벤트 상품 필터
    if (eventOnly) {
      filtered = filtered.filter(product => product.isEvent);
    }

    // 가격대 필터
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-10000':
          filtered = filtered.filter(product => product.price < 10000);
          break;
        case '10000-20000':
          filtered = filtered.filter(product => product.price >= 10000 && product.price < 20000);
          break;
        case '20000-30000':
          filtered = filtered.filter(product => product.price >= 20000 && product.price < 30000);
          break;
        case 'over-30000':
          filtered = filtered.filter(product => product.price >= 30000);
          break;
      }
    }

    // 정렬
    switch (sortBy) {
      case 'popular':
        // 인기순 (더미로 id 역순)
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'newest':
        // 최신순 (id 순)
        filtered.sort((a, b) => a.id - b.id);
        break;
      case 'price-low':
        // 가격 낮은 순
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        // 가격 높은 순
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        // 이름순
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // 필터 변경시 첫 페이지로
  }, [allProducts, sortBy, priceRange, eventOnly]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // 상품 클릭
  const handleProductClick = (productId) => {
    navigate(`/MD/product/${productId}`);
  };

  // 탑으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>전체 상품</S.Title>

        {/* 필터 및 정렬 */}
        <S.FilterSection>
          <S.FilterGroup>
            <S.FilterLabel>정렬:</S.FilterLabel>
            <S.FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">인기순</option>
              <option value="newest">최신순</option>
              <option value="price-low">가격 낮은순</option>
              <option value="price-high">가격 높은순</option>
              <option value="name">이름순</option>
            </S.FilterSelect>

            <S.FilterLabel>가격대:</S.FilterLabel>
            <S.FilterSelect value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">전체</option>
              <option value="under-10000">1만원 미만</option>
              <option value="10000-20000">1만원 - 2만원</option>
              <option value="20000-30000">2만원 - 3만원</option>
              <option value="over-30000">3만원 이상</option>
            </S.FilterSelect>

            <S.EventFilter>
              <S.EventCheckbox
                type="checkbox"
                id="eventOnly"
                checked={eventOnly}
                onChange={(e) => setEventOnly(e.target.checked)}
              />
              <S.EventLabel htmlFor="eventOnly">이벤트 상품만</S.EventLabel>
            </S.EventFilter>
          </S.FilterGroup>

          <S.ResultInfo>
            총 {filteredProducts.length}개 상품
          </S.ResultInfo>
        </S.FilterSection>

        {/* 상품 그리드 */}
        {currentProducts.length > 0 ? (
          <S.ProductGrid>
            {currentProducts.map(product => (
              <S.ProductCard 
                key={product.id} 
                onClick={() => handleProductClick(product.id)}
              >
                <S.ProductImageContainer>
                  <S.ProductImage>{product.image}</S.ProductImage>
                  {product.isEvent && <S.EventBadge>이벤트</S.EventBadge>}
                </S.ProductImageContainer>
                
                <S.ProductInfo>
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>
                    {product.originalPrice && (
                      <S.ProductOriginalPrice>
                        ₩{product.originalPrice.toLocaleString()}
                      </S.ProductOriginalPrice>
                    )}
                    ₩{product.price.toLocaleString()}
                    {product.originalPrice && (
                      <S.ProductDiscount>
                        {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </S.ProductDiscount>
                    )}
                  </S.ProductPrice>
                  <S.ProductDescription>{product.description}</S.ProductDescription>
                </S.ProductInfo>
              </S.ProductCard>
            ))}
          </S.ProductGrid>
        ) : (
          <S.EmptyWrapper>
            <S.EmptyMessage>조건에 맞는 상품이 없습니다</S.EmptyMessage>
            <S.EmptySubMessage>필터 조건을 변경해보세요</S.EmptySubMessage>
          </S.EmptyWrapper>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <S.PaginationWrapper>
            <S.PaginationBtn
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </S.PaginationBtn>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <S.PaginationBtn
                  key={pageNum}
                  active={currentPage === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </S.PaginationBtn>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <S.PaginationDots>...</S.PaginationDots>
                <S.PaginationBtn onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </S.PaginationBtn>
              </>
            )}

            <S.PaginationBtn
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음
            </S.PaginationBtn>
          </S.PaginationWrapper>
        )}

        {/* 플로팅 탑 버튼 */}
        {showTopBtn && (
          <S.FloatingTopBtn onClick={scrollToTop}>
            ↑
          </S.FloatingTopBtn>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default ProductList;