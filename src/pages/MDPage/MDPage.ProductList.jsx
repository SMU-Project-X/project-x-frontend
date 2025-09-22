// MDPage.ProductList.jsx - 페이지네이션 및 필터링 완전 수정
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productAPI } from '../../services/productApi';
import * as S from './styled/MDPage.ProductList.styled';

function ProductList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL에서 카테고리 파라미터 가져오기
  const categoryFromUrl = searchParams.get('category') || 'all';
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]); // 전체 상품 데이터
  const [displayProducts, setDisplayProducts] = useState([]); // 화면에 표시할 상품
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // 필터 상태
  const [filters, setFilters] = useState({
    sortBy: 'createdAt',
    sortDirection: 'desc',
    priceRange: 'all',
    eventOnly: false,
    selectedCategory: categoryFromUrl
  });

  // 탑 버튼 표시 여부
  const [showTopBtn, setShowTopBtn] = useState(false);

  const itemsPerPage = 20;

  // 🔧 클라이언트 사이드 필터링 함수
  const applyFilters = (products, filters) => {
    let filtered = [...products];

    console.log('ProductList 필터링 시작:', {
      원본상품수: products.length,
      필터: filters
    });

    // 1. 가격 필터
    if (filters.priceRange !== 'all') {
      const originalLength = filtered.length;
      switch (filters.priceRange) {
        case 'under-10000':
          filtered = filtered.filter(product => product.price < 10000);
          break;
        case '10000-20000':
          filtered = filtered.filter(product => product.price >= 10000 && product.price <= 20000);
          break;
        case '20000-30000':
          filtered = filtered.filter(product => product.price >= 20000 && product.price <= 30000);
          break;
        case 'over-30000':
          filtered = filtered.filter(product => product.price > 30000);
          break;
      }
      console.log(`가격 필터 적용: ${originalLength} → ${filtered.length}`);
    }

    // 2. 이벤트 필터
    if (filters.eventOnly) {
      const originalLength = filtered.length;
      filtered = filtered.filter(product => product.hasEvent === true);
      console.log(`이벤트 필터 적용: ${originalLength} → ${filtered.length}`);
    }

    // 3. 정렬
    filtered.sort((a, b) => {
      const direction = filters.sortDirection === 'asc' ? 1 : -1;
      
      switch (filters.sortBy) {
        case 'price':
          return (a.price - b.price) * direction;
        case 'name':
          return a.name.localeCompare(b.name) * direction;
        case 'rating':
          return ((a.averageRating || 0) - (b.averageRating || 0)) * direction;
        case 'createdAt':
        default:
          const dateA = new Date(a.createdAt || a.id);
          const dateB = new Date(b.createdAt || b.id);
          return (dateA - dateB) * direction;
      }
    });

    console.log('ProductList 필터링 완료:', {
      최종상품수: filtered.length,
      정렬: `${filters.sortBy}-${filters.sortDirection}`
    });

    return filtered;
  };

  // 🔧 페이지네이션 적용 함수
  const applyPagination = (products, page) => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    
    return {
      content: products.slice(startIndex, endIndex),
      totalElements: products.length,
      totalPages,
      currentPage: page
    };
  };

  // 🔧 상품 데이터 로드 함수
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`상품 로드 시작 - 카테고리: ${filters.selectedCategory}`);

      let response;

      // 카테고리에 따른 API 호출
      try {
        if (filters.selectedCategory === 'all') {
          response = await productAPI.getAllProducts(0, 100); // 모든 데이터 가져와서 클라이언트에서 처리
        } else if (filters.selectedCategory === 'new') {
          response = await productAPI.getNewProducts(0, 100);
        } else if (filters.selectedCategory === 'best') {
          response = await productAPI.getBestProducts(0, 100);
        } else if (filters.selectedCategory === 'event') {
          response = await productAPI.getEventProducts(0, 100);
        } else if (!isNaN(filters.selectedCategory)) {
          response = await productAPI.getProductsByCategory(parseInt(filters.selectedCategory), 0, 100);
        } else {
          response = await productAPI.getAllProducts(0, 100);
        }

        if (response.success && response.data) {
          console.log('✅ 실제 API 데이터 사용:', response.data.length, '개');
          setAllProducts(response.data);
        } else {
          throw new Error('API 응답 실패');
        }
      } catch (apiError) {
        console.warn('⚠️ API 호출 실패, 목업 데이터 사용:', apiError.message);
        
        // 목업 데이터 생성
        const mockProducts = generateMockProducts(filters.selectedCategory);
        setAllProducts(mockProducts);
        setError('서버 연결 문제로 임시 데이터를 표시합니다.');
      }

      console.log('상품 로드 완료');

    } catch (error) {
      console.error('상품 로드 실패:', error);
      setError('상품을 불러오는데 실패했습니다.');
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔧 목업 데이터 생성
  const generateMockProducts = (category) => {
    const baseProducts = [
      {
        id: 1,
        name: 'Project X 키링세트',
        price: 8000,
        originalPrice: 10000,
        description: 'Project X 공식 키링 세트입니다.',
        imageUrls: ['/placeholder-product.jpg'],
        stockQuantity: 120,
        isNew: true,
        hasEvent: false,
        averageRating: 4.6,
        reviewCount: 92,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Project X 에코백',
        price: 15000,
        originalPrice: 18000,
        description: '친환경 소재로 만든 에코백입니다.',
        imageUrls: ['/placeholder-product2.jpg'],
        stockQuantity: 85,
        isNew: false,
        hasEvent: true,
        averageRating: 4.3,
        reviewCount: 56,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        name: 'Project X 머그컵',
        price: 25000,
        originalPrice: 25000,
        description: '특별한 머그컵입니다.',
        imageUrls: ['/placeholder-product3.jpg'],
        stockQuantity: 60,
        isNew: true,
        hasEvent: false,
        averageRating: 4.4,
        reviewCount: 73,
        createdAt: '2024-01-20'
      },
      {
        id: 4,
        name: 'Project X 라이트스틱',
        price: 35000,
        originalPrice: 40000,
        description: '콘서트 필수 아이템!',
        imageUrls: ['/placeholder-product4.jpg'],
        stockQuantity: 40,
        isNew: false,
        hasEvent: true,
        averageRating: 4.6,
        reviewCount: 312,
        createdAt: '2024-01-05'
      },
      {
        id: 5,
        name: 'Project X 포토북',
        price: 28000,
        originalPrice: 30000,
        description: '한정판 포토북입니다.',
        imageUrls: ['/placeholder-product5.jpg'],
        stockQuantity: 50,
        isNew: true,
        hasEvent: true,
        averageRating: 4.8,
        reviewCount: 125,
        createdAt: '2024-01-25'
      },
      {
        id: 6,
        name: 'Project X 스티커팩',
        price: 5000,
        originalPrice: 5000,
        description: '홀로그램 스티커팩입니다.',
        imageUrls: ['/placeholder-product6.jpg'],
        stockQuantity: 200,
        isNew: false,
        hasEvent: false,
        averageRating: 4.7,
        reviewCount: 203,
        createdAt: '2024-01-12'
      },
      {
        id: 7,
        name: 'Project X 티셔츠',
        price: 18000,
        originalPrice: 20000,
        description: '편안한 면 티셔츠입니다.',
        imageUrls: ['/placeholder-product7.jpg'],
        stockQuantity: 150,
        isNew: false,
        hasEvent: false,
        averageRating: 4.2,
        reviewCount: 88,
        createdAt: '2024-01-08'
      },
      {
        id: 8,
        name: 'Project X 한정판 굿즈',
        price: 45000,
        originalPrice: 50000,
        description: '한정판 특별 굿즈입니다.',
        imageUrls: ['/placeholder-product8.jpg'],
        stockQuantity: 30,
        isNew: true,
        hasEvent: true,
        averageRating: 4.9,
        reviewCount: 67,
        createdAt: '2024-01-30'
      }
    ];

    // 카테고리별 필터링
    switch (category) {
      case 'new':
        return baseProducts.filter(p => p.isNew);
      case 'best':
        return baseProducts.filter(p => p.averageRating >= 4.5);
      case 'event':
        return baseProducts.filter(p => p.hasEvent);
      default:
        return baseProducts;
    }
  };

  // 🔧 화면 결과 업데이트
  const updateDisplayProducts = () => {
    if (allProducts.length === 0) {
      setDisplayProducts([]);
      setTotalElements(0);
      setTotalPages(0);
      return;
    }

    console.log('🔄 ProductList 화면 결과 업데이트:', {
      전체상품: allProducts.length,
      현재페이지: currentPage,
      필터: filters
    });

    // 1. 필터링 적용
    const filteredProducts = applyFilters(allProducts, filters);
    
    // 2. 페이지네이션 적용
    const paginatedResults = applyPagination(filteredProducts, currentPage);
    
    // 3. 상태 업데이트
    setDisplayProducts(paginatedResults.content);
    setTotalElements(paginatedResults.totalElements);
    setTotalPages(paginatedResults.totalPages);

    console.log('✅ ProductList 화면 결과 업데이트 완료:', {
      표시상품: paginatedResults.content.length,
      전체필터링상품: paginatedResults.totalElements,
      총페이지: paginatedResults.totalPages
    });
  };

  // 🔧 필터 변경 핸들러
  const handleFilterChange = (filterType, value) => {
    console.log('🎛️ ProductList 필터 변경:', filterType, '=', value);
    
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // 필터 변경 시 첫 페이지로 이동
    setCurrentPage(0);
  };

  // 🔧 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    console.log('📂 카테고리 변경:', category);
    
    setFilters(prev => ({
      ...prev,
      selectedCategory: category
    }));
    setCurrentPage(0);
    
    // URL 업데이트
    if (category === 'all') {
      navigate('/MD/products', { replace: true });
    } else {
      navigate(`/MD/products?category=${category}`, { replace: true });
    }
  };

  // 🔧 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      console.log('📄 ProductList 페이지 변경:', currentPage, '→', newPage);
      setCurrentPage(newPage);
      scrollToTop();
    }
  };

  // 상품 클릭
  const handleProductClick = (productId) => {
    navigate(`/MD/product/${productId}`);
  };

  // 탑으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // 스크롤 이벤트 (탑 버튼)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔧 Effect: 카테고리 변경 시 데이터 로드
  useEffect(() => {
    console.log('📂 카테고리 변경 감지:', filters.selectedCategory);
    setCurrentPage(0);
    loadProducts();
  }, [filters.selectedCategory]);

  // 🔧 Effect: 필터나 페이지 변경 시 화면 업데이트
  useEffect(() => {
    if (allProducts.length > 0) {
      updateDisplayProducts();
    }
  }, [allProducts, filters.sortBy, filters.sortDirection, filters.priceRange, filters.eventOnly, currentPage]);

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

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>{getCategoryDisplayName(filters.selectedCategory)}</S.Title>

        {error && (
          <div style={{
            padding: '15px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            color: '#856404',
            marginBottom: '20px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* 카테고리 탭 */}
        <S.CategoryTabs>
          <S.CategoryTab 
            $active={filters.selectedCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
          >
            전체
          </S.CategoryTab>
          <S.CategoryTab 
            $active={filters.selectedCategory === 'new'}
            onClick={() => handleCategoryChange('new')}
          >
            신상품
          </S.CategoryTab>
          <S.CategoryTab 
            $active={filters.selectedCategory === 'best'}
            onClick={() => handleCategoryChange('best')}
          >
            베스트
          </S.CategoryTab>
          <S.CategoryTab 
            $active={filters.selectedCategory === 'event'}
            onClick={() => handleCategoryChange('event')}
          >
            이벤트
          </S.CategoryTab>
        </S.CategoryTabs>

        {/* 필터 및 정렬 */}
        <S.FilterSection>
          <S.FilterGroup>
            <S.FilterLabel>정렬:</S.FilterLabel>
            <S.FilterSelect 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="createdAt">최신순</option>
              <option value="name">이름순</option>
              <option value="price">가격순</option>
              <option value="rating">평점순</option>
            </S.FilterSelect>

            <S.FilterSelect 
              value={filters.sortDirection} 
              onChange={(e) => handleFilterChange('sortDirection', e.target.value)}
            >
              <option value="desc">내림차순</option>
              <option value="asc">오름차순</option>
            </S.FilterSelect>

            <S.FilterLabel>가격대:</S.FilterLabel>
            <S.FilterSelect 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
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
                checked={filters.eventOnly}
                onChange={(e) => handleFilterChange('eventOnly', e.target.checked)}
              />
              <S.EventLabel htmlFor="eventOnly">이벤트 상품만</S.EventLabel>
            </S.EventFilter>
          </S.FilterGroup>

          <S.ResultInfo>
            총 {totalElements}개 상품 (전체 {allProducts.length}개) - 페이지 {currentPage + 1}/{totalPages}
          </S.ResultInfo>
        </S.FilterSection>

        {/* 상품 그리드 */}
        {displayProducts.length > 0 ? (
          <S.ProductGrid>
            {displayProducts.map(product => (
              <S.ProductCard 
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                <S.ProductImage>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  ) : product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  ) : (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      height: '100%',
                      backgroundColor: '#f8f9fa',
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      상품 이미지
                    </div>
                  )}
                  {product.isNew && <S.NewBadge>NEW</S.NewBadge>}
                  {product.hasEvent && <S.EventBadge>이벤트</S.EventBadge>}
                </S.ProductImage>
                <S.ProductInfo>
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>₩{product.price?.toLocaleString() || '0'}</S.ProductPrice>
                  <S.ProductDescription>{product.description}</S.ProductDescription>
                  {product.averageRating && (
                    <div style={{ fontSize: '14px', color: '#f39c12', marginTop: '8px' }}>
                      ⭐ {product.averageRating} ({product.reviewCount || 0})
                    </div>
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

            {Array.from({ length: totalPages }, (_, i) => i)
              .filter(pageNum => {
                const start = Math.max(0, currentPage - 2);
                const end = Math.min(totalPages - 1, currentPage + 2);
                return pageNum >= start && pageNum <= end;
              })
              .map(pageNum => (
                <S.PaginationBtn
                  key={pageNum}
                  $active={currentPage === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum + 1}
                </S.PaginationBtn>
              ))}

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