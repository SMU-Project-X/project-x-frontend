// MDPage.SearchResults.jsx - 필터링 및 페이지네이션 완전 수정
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productAPI } from '../../services/productApi';
import * as S from './styled/MDPage.SearchResults.styled';

function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSearchResults, setAllSearchResults] = useState([]); // 전체 검색 결과
  const [displayResults, setDisplayResults] = useState([]); // 화면에 표시할 결과
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFromMockData, setIsFromMockData] = useState(false);

  // 필터 상태
  const [filters, setFilters] = useState({
    sortBy: 'createdAt',
    sortDirection: 'desc',
    priceRange: 'all',
    eventOnly: false
  });

  const itemsPerPage = 12;

  // 🔧 목업 데이터 생성 - 필터링 테스트를 위해 다양한 데이터
  const generateMockData = (keyword) => {
    return [
      {
        id: 1,
        name: `${keyword} 키링세트`,
        price: 8000,
        originalPrice: 10000,
        description: `Project X 공식 ${keyword} 키링 세트입니다.`,
        imageUrls: ['/placeholder-product.jpg'],
        stockQuantity: 120,
        isNew: true,
        hasEvent: false, // 이벤트 아님
        averageRating: 4.6,
        reviewCount: 92,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: `${keyword} 에코백`,
        price: 15000,
        originalPrice: 18000,
        description: `친환경 소재로 만든 ${keyword} 에코백입니다.`,
        imageUrls: ['/placeholder-product2.jpg'],
        stockQuantity: 85,
        isNew: false,
        hasEvent: true, // 이벤트 상품
        averageRating: 4.3,
        reviewCount: 56,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        name: `${keyword} 머그컵`,
        price: 25000,
        originalPrice: 25000,
        description: `${keyword}을 위한 특별한 머그컵입니다.`,
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
        name: `${keyword} 라이트스틱`,
        price: 35000,
        originalPrice: 40000,
        description: `콘서트 필수 아이템! ${keyword} 라이트스틱입니다.`,
        imageUrls: ['/placeholder-product4.jpg'],
        stockQuantity: 40,
        isNew: false,
        hasEvent: true, // 이벤트 상품
        averageRating: 4.6,
        reviewCount: 312,
        createdAt: '2024-01-05'
      },
      {
        id: 5,
        name: `${keyword} 포토북`,
        price: 28000,
        originalPrice: 30000,
        description: `${keyword} 관련 한정판 포토북입니다.`,
        imageUrls: ['/placeholder-product5.jpg'],
        stockQuantity: 50,
        isNew: true,
        hasEvent: true, // 이벤트 상품
        averageRating: 4.8,
        reviewCount: 125,
        createdAt: '2024-01-25'
      },
      {
        id: 6,
        name: `${keyword} 스티커팩`,
        price: 5000,
        originalPrice: 5000,
        description: `홀로그램 ${keyword} 스티커팩입니다.`,
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
        name: `${keyword} 티셔츠`,
        price: 18000,
        originalPrice: 20000,
        description: `편안한 ${keyword} 면 티셔츠입니다.`,
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
        name: `${keyword} 한정판 굿즈`,
        price: 45000,
        originalPrice: 50000,
        description: `${keyword} 한정판 특별 굿즈입니다.`,
        imageUrls: ['/placeholder-product8.jpg'],
        stockQuantity: 30,
        isNew: true,
        hasEvent: true, // 이벤트 상품
        averageRating: 4.9,
        reviewCount: 67,
        createdAt: '2024-01-30'
      }
    ];
  };

  // 🔧 클라이언트 사이드 필터링 함수
  const applyFilters = (products, filters) => {
    let filtered = [...products];

    console.log('필터링 시작:', {
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
          const dateA = new Date(a.createdAt || '2024-01-01');
          const dateB = new Date(b.createdAt || '2024-01-01');
          return (dateA - dateB) * direction;
      }
    });

    console.log('필터링 완료:', {
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

  // 🔧 초기 검색 데이터 로드
  const performInitialSearch = async () => {
    if (!searchQuery.trim()) {
      setAllSearchResults([]);
      setDisplayResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 초기 검색 실행:', searchQuery);

      // API 호출 시도
      try {
        const response = await productAPI.searchProducts({
          keyword: searchQuery.trim(),
          page: 0,
          size: 100 // 모든 결과를 가져와서 클라이언트에서 필터링
        });

        if (response.success && response.data && response.data.length > 0) {
          console.log('✅ 실제 API 데이터 사용:', response.data.length, '개');
          setAllSearchResults(response.data);
          setIsFromMockData(false);
        } else {
          throw new Error('API 데이터 없음');
        }
      } catch (apiError) {
        console.warn('⚠️ API 호출 실패, 목업 데이터 사용:', apiError.message);
        const mockData = generateMockData(searchQuery);
        setAllSearchResults(mockData);
        setIsFromMockData(true);
        setError('서버 연결 문제로 임시 검색 결과를 표시합니다.');
      }

    } catch (error) {
      console.error('❌ 검색 실행 실패:', error);
      setError('검색 중 오류가 발생했습니다.');
      setAllSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔧 필터 및 페이지네이션 적용
  const updateDisplayResults = () => {
    console.log('🔄 화면 결과 업데이트:', {
      전체결과: allSearchResults.length,
      현재페이지: currentPage,
      필터: filters
    });

    if (allSearchResults.length === 0) {
      setDisplayResults([]);
      setTotalElements(0);
      setTotalPages(0);
      return;
    }

    // 1. 필터링 적용
    const filteredResults = applyFilters(allSearchResults, filters);
    
    // 2. 페이지네이션 적용
    const paginatedResults = applyPagination(filteredResults, currentPage);
    
    // 3. 상태 업데이트
    setDisplayResults(paginatedResults.content);
    setTotalElements(paginatedResults.totalElements);
    setTotalPages(paginatedResults.totalPages);

    console.log('✅ 화면 결과 업데이트 완료:', {
      표시상품: paginatedResults.content.length,
      전체필터링상품: paginatedResults.totalElements,
      총페이지: paginatedResults.totalPages
    });
  };

  // 🔧 필터 변경 핸들러
  const handleFilterChange = (filterType, value) => {
    console.log('🎛️ 필터 변경:', filterType, '=', value);
    
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // 필터 변경 시 첫 페이지로 이동
    setCurrentPage(0);
  };

  // 🔧 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      console.log('📄 페이지 변경:', currentPage, '→', newPage);
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 상품 클릭 핸들러
  const handleProductClick = (productId) => {
    navigate(`/MD/product/${productId}`);
  };

  // 필터 초기화
  const resetFilters = () => {
    console.log('🔄 필터 초기화');
    setFilters({
      sortBy: 'createdAt',
      sortDirection: 'desc',
      priceRange: 'all',
      eventOnly: false
    });
    setCurrentPage(0);
  };

  // 🔧 Effect: 검색어 변경 시 초기 데이터 로드
  useEffect(() => {
    console.log('🔍 검색어 변경 감지:', searchQuery);
    setCurrentPage(0);
    performInitialSearch();
  }, [searchQuery]);

  // 🔧 Effect: 필터나 페이지 변경 시 화면 업데이트
  useEffect(() => {
    if (allSearchResults.length > 0) {
      updateDisplayResults();
    }
  }, [allSearchResults, filters, currentPage]);

  // 검색어가 없는 경우
  if (!searchQuery.trim()) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>검색 결과</S.Title>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>검색어를 입력해주세요</h3>
            <p style={{ margin: '0 0 30px 0', color: '#666' }}>원하는 상품을 검색해보세요.</p>
            <button
              onClick={() => navigate('/MD')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#74B9FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              전체 상품 보기
            </button>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 로딩 중
  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingContainer>
            <S.LoadingSpinner />
            <S.LoadingText>검색 중...</S.LoadingText>
          </S.LoadingContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>검색 결과</S.Title>
        <S.ResultSummary>
          "<S.ResultCount>{searchQuery}</S.ResultCount>"에 대한 검색 결과 
          <S.ResultCount> {totalElements}개</S.ResultCount>
          {isFromMockData && (
            <span style={{ color: '#e67e22', marginLeft: '10px' }}>
              (임시 데이터)
            </span>
          )}
        </S.ResultSummary>

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

        {/* 🎛️ 필터 섹션 */}
        <S.FilterSection>
          <S.FilterGroup>
            <S.FilterLabel>정렬</S.FilterLabel>
            <S.FilterSelect 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="createdAt">최신순</option>
              <option value="price">가격순</option>
              <option value="name">이름순</option>
              <option value="rating">평점순</option>
            </S.FilterSelect>

            <S.FilterSelect 
              value={filters.sortDirection} 
              onChange={(e) => handleFilterChange('sortDirection', e.target.value)}
            >
              <option value="desc">내림차순</option>
              <option value="asc">오름차순</option>
            </S.FilterSelect>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterLabel>가격대</S.FilterLabel>
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
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterCheckbox>
              <input
                type="checkbox"
                id="eventOnly"
                checked={filters.eventOnly}
                onChange={(e) => handleFilterChange('eventOnly', e.target.checked)}
              />
              <label htmlFor="eventOnly">이벤트 상품만</label>
            </S.FilterCheckbox>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.ResetButton onClick={resetFilters}>
              필터 초기화
            </S.ResetButton>
          </S.FilterGroup>
        </S.FilterSection>

       
        {/* 검색 결과 */}
        {displayResults.length > 0 ? (
          <>
            <S.ProductGrid>
              {displayResults.map((product) => (
                <S.ProductCard 
                  key={product.id} 
                  onClick={() => handleProductClick(product.id)}
                >
                  <S.ProductImage>
                    <img 
                      src={product.imageUrls?.[0] || '/placeholder-product.jpg'} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                    {product.isNew && <S.NewBadge>NEW</S.NewBadge>}
                    {product.hasEvent && <S.EventBadge>EVENT</S.EventBadge>}
                  </S.ProductImage>
                  <S.ProductInfo>
                    <S.ProductName>{product.name}</S.ProductName>
                    <S.ProductDescription>{product.description}</S.ProductDescription>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <S.ProductPrice>
                        {product.price?.toLocaleString() || '0'}원
                      </S.ProductPrice>
                      {product.originalPrice && product.originalPrice !== product.price && (
                        <S.OriginalPrice>
                          {product.originalPrice.toLocaleString()}원
                        </S.OriginalPrice>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {product.averageRating && (
                        <span style={{ fontSize: '14px', color: '#f39c12' }}>
                          ⭐ {product.averageRating}
                        </span>
                      )}
                      {product.reviewCount && (
                        <span style={{ fontSize: '14px', color: '#95a5a6' }}>
                          ({product.reviewCount})
                        </span>
                      )}
                    </div>
                  </S.ProductInfo>
                </S.ProductCard>
              ))}
            </S.ProductGrid>

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
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>😅</div>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>검색 결과가 없습니다</h3>
            <p style={{ margin: '0 0 30px 0', color: '#666' }}>
              "{searchQuery}"에 대한 검색 결과를 찾을 수 없습니다.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={resetFilters}
                style={{
                  padding: '10px 20px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                필터 초기화
              </button>
              <button
                onClick={() => navigate('/MD')}
                style={{
                  padding: '10px 20px',
                  background: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                전체 상품 보기
              </button>
            </div>
          </div>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default SearchResults;