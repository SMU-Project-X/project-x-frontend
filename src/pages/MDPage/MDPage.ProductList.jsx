// MDPage.ProductList.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productAPI } from '../../services/productApi';
import * as S from './styled/MDPage.ProductList.styled';

function ProductList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL에서 카테고리 파라미터 가져오기
  const categoryFromUrl = searchParams.get('category');
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 필터 상태
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [priceRange, setPriceRange] = useState('all');
  const [eventOnly, setEventOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'all');

  // 탑 버튼 표시 여부
  const [showTopBtn, setShowTopBtn] = useState(false);

  const itemsPerPage = 20;

  // 상품 데이터 로드
  const loadProducts = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);

      let response;

      // 카테고리에 따른 API 호출
      if (selectedCategory === 'all') {
        response = await productAPI.getAllProducts(page, itemsPerPage);
      } else if (selectedCategory === 'new') {
        response = await productAPI.getNewProducts(page, itemsPerPage);
      } else if (selectedCategory === 'best') {
        response = await productAPI.getBestProducts(page, itemsPerPage);
      } else if (selectedCategory === 'event') {
        response = await productAPI.getEventProducts(page, itemsPerPage);
      } else if (!isNaN(selectedCategory)) {
        // 숫자인 경우 카테고리 ID로 조회
        response = await productAPI.getProductsByCategory(parseInt(selectedCategory), page, itemsPerPage);
      } else {
        response = await productAPI.getAllProducts(page, itemsPerPage);
      }

      if (response.success) {
        setAllProducts(response.data);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setCurrentPage(response.currentPage || page);
      } else {
        setError(response.message || '상품을 불러오는데 실패했습니다.');
        setAllProducts([]);
      }

    } catch (error) {
      console.error('상품 로드 실패:', error);
      setError('상품을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 및 카테고리 변경 시 재로드
  useEffect(() => {
    setCurrentPage(0);
    loadProducts(0);
  }, [selectedCategory]);

  // 페이지 변경 시 로드
  useEffect(() => {
    if (currentPage > 0) {
      loadProducts(currentPage);
    }
  }, [currentPage]);

  // 스크롤 이벤트 (탑 버튼)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 필터링 및 정렬 (클라이언트 사이드에서 처리)
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // 이벤트 상품 필터
    if (eventOnly) {
      filtered = filtered.filter(product => product.hasEvent);
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

    // 정렬 (클라이언트 사이드)
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => {
          if (sortDirection === 'asc') {
            return a.name.localeCompare(b.name);
          }
          return b.name.localeCompare(a.name);
        });
        break;
      case 'price':
        filtered.sort((a, b) => {
          if (sortDirection === 'asc') {
            return a.price - b.price;
          }
          return b.price - a.price;
        });
        break;
      case 'createdAt':
      default:
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.id);
          const dateB = new Date(b.createdAt || b.id);
          if (sortDirection === 'asc') {
            return dateA - dateB;
          }
          return dateB - dateA;
        });
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

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

  // 카테고리 변경
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    // URL 업데이트
    if (category === 'all') {
      navigate('/MD/products', { replace: true });
    } else {
      navigate(`/MD/products?category=${category}`, { replace: true });
    }
  };

  // 카테고리 이름 매핑
  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'all': '전체 상품',
      'new': '신상품',
      'best': '베스트 상품',
      'event': '이벤트 상품'
    };
    return categoryNames[category] || '전체 상품';
  };

  // 로딩 중
  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingContainer>
            <S.LoadingSpinner />
            <S.LoadingText>상품을 불러오는 중...</S.LoadingText>
          </S.LoadingContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.ErrorContainer>
            <S.ErrorText>{error}</S.ErrorText>
            <S.RetryButton onClick={() => loadProducts(0)}>
              다시 시도
            </S.RetryButton>
          </S.ErrorContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>{getCategoryDisplayName(selectedCategory)}</S.Title>

        {/* 카테고리 탭 */}
        <S.CategoryTabs>
          <S.CategoryTab 
            $active={selectedCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
          >
            전체
          </S.CategoryTab>
          <S.CategoryTab 
            $active={selectedCategory === 'new'}
            onClick={() => handleCategoryChange('new')}
          >
            신상품
          </S.CategoryTab>
          <S.CategoryTab 
            $active={selectedCategory === 'best'}
            onClick={() => handleCategoryChange('best')}
          >
            베스트
          </S.CategoryTab>
          <S.CategoryTab 
            $active={selectedCategory === 'event'}
            onClick={() => handleCategoryChange('event')}
          >
            이벤트
          </S.CategoryTab>
        </S.CategoryTabs>

        {/* 필터 및 정렬 */}
        <S.FilterSection>
          <S.FilterGroup>
            <S.FilterLabel>정렬:</S.FilterLabel>
            <S.FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdAt">최신순</option>
              <option value="name">이름순</option>
              <option value="price">가격순</option>
            </S.FilterSelect>

            <S.FilterSelect 
              value={sortDirection} 
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="desc">내림차순</option>
              <option value="asc">오름차순</option>
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
            총 {filteredProducts.length}개 상품 (전체 {totalElements}개)
          </S.ResultInfo>
        </S.FilterSection>

        {/* 상품 그리드 */}
        {filteredProducts.length > 0 ? (
          <S.ProductGrid>
            {filteredProducts.map(product => (
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
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>₩{product.price?.toLocaleString()}</S.ProductPrice>
                  <S.ProductDescription>{product.description}</S.ProductDescription>
                  {product.hasEvent && (
                    <S.EventBadge>이벤트</S.EventBadge>
                  )}
                </S.ProductInfo>
              </S.ProductCard>
            ))}
          </S.ProductGrid>
        ) : (
          <S.NoProductsMessage>
            등록된 상품이 없습니다.
          </S.NoProductsMessage>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <S.PaginationWrapper>
            <S.PaginationBtn
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </S.PaginationBtn>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + Math.max(0, currentPage - 2);
              if (pageNum >= totalPages) return null;

              return (
                <S.PaginationBtn
                  key={pageNum}
                  $active={currentPage === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum + 1}
                </S.PaginationBtn>
              );
            })}

            <S.PaginationBtn
              disabled={currentPage === totalPages - 1}
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