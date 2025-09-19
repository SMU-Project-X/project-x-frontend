// MDPage.SearchResults.jsx - 완전히 개선된 버전
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
  const [searchResults, setSearchResults] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFromMockData, setIsFromMockData] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // 필터 상태
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [priceRange, setPriceRange] = useState('all');
  const [categoryId, setCategoryId] = useState(null);
  const [eventOnly, setEventOnly] = useState(false);

  const itemsPerPage = 12;
  const maxRetries = 2;

  // 🔧 목업 검색 결과 생성 함수
  const generateMockSearchResults = (keyword, page, size) => {
    const mockProducts = [
      {
        id: 1,
        name: `Project X ${keyword || '검색'} 타일 세트`,
        price: 30000,
        originalPrice: 35000,
        description: `${keyword || '검색'}과 관련된 고품질 제품입니다. 부드러운 마이크로파이버 소재로 제작되었습니다.`,
        imageUrl: '/placeholder-product.jpg',
        stockQuantity: 120,
        category: '타일',
        isNew: true,
        hasEvent: false
      },
      {
        id: 2,
        name: `${keyword || '검색'} 전용 청소용품 세트`,
        price: 25000,
        originalPrice: 25000,
        description: `${keyword || '검색'}을 위한 전문 청소용품입니다. 효과적인 청소가 가능합니다.`,
        imageUrl: '/placeholder-product2.jpg',
        stockQuantity: 85,
        category: '청소용품',
        isNew: false,
        hasEvent: true
      },
      {
        id: 3,
        name: `프리미엄 ${keyword || '검색'} 관리 세트`,
        price: 45000,
        originalPrice: 50000,
        description: `최고급 ${keyword || '검색'} 관련 제품입니다. 프리미엄 품질을 자랑합니다.`,
        imageUrl: '/placeholder-product3.jpg',
        stockQuantity: 60,
        category: '프리미엄',
        isNew: true,
        hasEvent: true
      },
      {
        id: 4,
        name: `${keyword || '검색'} 스페셜 에디션`,
        price: 35000,
        originalPrice: 40000,
        description: `특별한 ${keyword || '검색'} 제품입니다. 한정판으로 출시됩니다.`,
        imageUrl: '/placeholder-product4.jpg',
        stockQuantity: 40,
        category: '스페셜',
        isNew: true,
        hasEvent: false
      },
      {
        id: 5,
        name: `베이직 ${keyword || '검색'} 패키지`,
        price: 20000,
        originalPrice: 20000,
        description: `기본적인 ${keyword || '검색'} 상품입니다. 실용적이고 경제적입니다.`,
        imageUrl: '/placeholder-product5.jpg',
        stockQuantity: 150,
        category: '베이직',
        isNew: false,
        hasEvent: false
      },
      {
        id: 6,
        name: `${keyword || '검색'} 컴플리트 세트`,
        price: 55000,
        originalPrice: 60000,
        description: `모든 ${keyword || '검색'} 관련 용품이 포함된 완전한 세트입니다.`,
        imageUrl: '/placeholder-product6.jpg',
        stockQuantity: 30,
        category: '컴플리트',
        isNew: true,
        hasEvent: true
      }
    ];

    // 가격 필터 적용
    let filteredProducts = mockProducts;
    
    if (priceRange !== 'all') {
      filteredProducts = mockProducts.filter(product => {
        switch (priceRange) {
          case 'under-10000':
            return product.price < 10000;
          case '10000-20000':
            return product.price >= 10000 && product.price <= 20000;
          case '20000-30000':
            return product.price >= 20000 && product.price <= 30000;
          case 'over-30000':
            return product.price > 30000;
          default:
            return true;
        }
      });
    }

    // 이벤트 필터 적용
    if (eventOnly) {
      filteredProducts = filteredProducts.filter(product => product.hasEvent);
    }

    // 정렬 적용
    filteredProducts.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortBy) {
        case 'price':
          return (a.price - b.price) * direction;
        case 'name':
          return a.name.localeCompare(b.name) * direction;
        case 'createdAt':
        default:
          return (a.id - b.id) * direction;
      }
    });

    const startIndex = page * size;
    const endIndex = startIndex + size;
    const totalElements = filteredProducts.length;
    const totalPages = Math.ceil(totalElements / size);

    return {
      content: filteredProducts.slice(startIndex, endIndex),
      totalPages,
      totalElements,
      number: page,
      size,
      first: page === 0,
      last: page >= totalPages - 1
    };
  };

  // 🔧 안전한 API 호출 함수 (재시도 로직 포함)
  const safeApiCall = async (apiFunction, currentRetry = 0) => {
    try {
      return await apiFunction();
    } catch (error) {
      console.error(`API 호출 실패 (시도 ${currentRetry + 1}/${maxRetries + 1}):`, error);
      
      // 403 에러 또는 네트워크 오류시 재시도
      if ((error.response?.status === 403 || error.code === 'ERR_NETWORK') && currentRetry < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (currentRetry + 1))); // 점진적 대기
        return safeApiCall(apiFunction, currentRetry + 1);
      }
      
      throw error;
    }
  };

  // 🔧 검색 실행 함수 - 완전히 개선된 버전
  const performSearch = async (page = 0, isRetry = false) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      if (!isRetry) {
        setError(null);
        setRetryCount(0);
      }

      console.log(`검색 실행 (페이지 ${page}):`, {
        keyword: searchQuery,
        sortBy,
        sortDirection,
        priceRange,
        eventOnly
      });

      // 가격 범위 계산
      let minPrice, maxPrice;
      switch (priceRange) {
        case 'under-10000':
          maxPrice = 10000;
          break;
        case '10000-20000':
          minPrice = 10000;
          maxPrice = 20000;
          break;
        case '20000-30000':
          minPrice = 20000;
          maxPrice = 30000;
          break;
        case 'over-30000':
          minPrice = 30000;
          break;
        default:
          minPrice = null;
          maxPrice = null;
      }

      // 검색 파라미터 구성
      const searchRequestParams = {
        keyword: searchQuery.trim(),
        categoryId,
        minPrice,
        maxPrice,
        hasEvent: eventOnly || null,
        sortBy,
        sortDirection,
        page,
        size: itemsPerPage
      };

      // 🔧 안전한 API 호출
      const response = await safeApiCall(async () => {
        return await productAPI.searchProducts(searchRequestParams);
      });

      if (response.success) {
        setSearchResults(response.data || []);
        setTotalElements(response.totalElements || 0);
        setTotalPages(response.totalPages || 0);
        setCurrentPage(response.currentPage || page);
        setIsFromMockData(response.isFromMockData || false);

        // 목업 데이터 사용시 알림
        if (response.isFromMockData && !isRetry) {
          setError('서버 연결 문제로 임시 검색 결과를 표시하고 있습니다.');
        }

        console.log('검색 성공:', {
          결과수: response.data?.length || 0,
          전체수: response.totalElements || 0,
          목업데이터: response.isFromMockData
        });

      } else {
        throw new Error(response.message || '검색에 실패했습니다.');
      }

    } catch (error) {
      console.error('검색 실행 실패:', error);
      
      // 🔧 에러 상황에서 목업 데이터 사용
      const mockResult = generateMockSearchResults(searchQuery, page, itemsPerPage);
      
      setSearchResults(mockResult.content);
      setTotalElements(mockResult.totalElements);
      setTotalPages(mockResult.totalPages);
      setCurrentPage(mockResult.number);
      setIsFromMockData(true);

      if (error.response?.status === 403) {
        setError('서버 권한 문제로 임시 검색 결과를 표시하고 있습니다.');
      } else if (error.code === 'ERR_NETWORK') {
        setError('네트워크 연결 문제로 임시 검색 결과를 표시하고 있습니다.');
      } else {
        setError('검색 중 오류가 발생하여 임시 결과를 표시하고 있습니다.');
      }

      console.log('목업 데이터로 대체:', {
        검색어: searchQuery,
        결과수: mockResult.content.length,
        에러: error.message
      });

    } finally {
      setLoading(false);
    }
  };

  // 🔧 재시도 함수
  const handleRetry = async () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      await performSearch(currentPage, true);
    } else {
      alert('최대 재시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  // 초기 검색 및 검색어 변경 시 재검색
  useEffect(() => {
    setCurrentPage(0);
    setRetryCount(0);
    performSearch(0);
  }, [searchQuery]);

  // 필터 변경 시 재검색
  useEffect(() => {
    if (searchQuery.trim()) {
      setCurrentPage(0);
      setRetryCount(0);
      performSearch(0);
    }
  }, [sortBy, sortDirection, priceRange, categoryId, eventOnly]);

  // 페이지 변경 시 검색
  useEffect(() => {
    if (searchQuery.trim() && currentPage > 0) {
      performSearch(currentPage);
    }
  }, [currentPage]);

  // 상품 클릭 핸들러 - 라우트 수정
  const handleProductClick = (productId) => {
    navigate(`/MD/products/${productId}`); // 올바른 라우트로 수정
  };

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🔧 필터 리셋 함수
  const resetFilters = () => {
    setSortBy('createdAt');
    setSortDirection('desc');
    setPriceRange('all');
    setCategoryId(null);
    setEventOnly(false);
  };

  // 검색어가 없는 경우
  if (!searchQuery.trim()) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>검색 결과</S.Title>
          <S.NoSearchQuery>
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>검색어를 입력해주세요</h3>
              <p style={{ margin: '0 0 30px 0', color: '#666' }}>
                원하는 상품을 검색해보세요.
              </p>
              <button
                onClick={() => navigate('/MD/products')}
                style={{
                  padding: '12px 24px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                전체 상품 보기
              </button>
            </div>
          </S.NoSearchQuery>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 로딩 중
  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>"{searchQuery}" 검색 결과</S.Title>
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
        <S.Title>"{searchQuery}" 검색 결과</S.Title>
        
        <S.ResultSummary>
          총 <S.ResultCount>{totalElements}</S.ResultCount>개의 상품을 찾았습니다.
          {isFromMockData && (
            <span style={{ 
              color: '#e74c3c', 
              fontSize: '14px', 
              marginLeft: '10px',
              fontWeight: 'normal'
            }}>
              (임시 데이터)
            </span>
          )}
        </S.ResultSummary>

        {/* 🔧 개선된 에러 메시지 */}
        {error && (
          <div style={{
            padding: '15px',
            background: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{error}</span>
            {retryCount < maxRetries && (
              <button
                onClick={handleRetry}
                style={{
                  padding: '6px 12px',
                  background: '#f39c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                재시도 ({retryCount + 1}/{maxRetries + 1})
              </button>
            )}
          </div>
        )}

        {/* 필터 및 정렬 */}
        <S.FilterSection>
          <S.FilterGroup>
            <S.FilterLabel>정렬:</S.FilterLabel>
            <S.FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdAt">최신순</option>
              <option value="price">가격순</option>
              <option value="name">이름순</option>
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

            {/* 🔧 필터 초기화 버튼 추가 */}
            <button
              onClick={resetFilters}
              style={{
                padding: '6px 12px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                marginLeft: '10px'
              }}
            >
              필터 초기화
            </button>
          </S.FilterGroup>
        </S.FilterSection>

        {/* 검색 결과 */}
        {searchResults.length > 0 ? (
          <>
            <S.ProductGrid>
              {searchResults.map(product => (
                <S.ProductCard 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <S.ProductImage>
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px 8px 0 0'
                        }}
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        background: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        borderRadius: '8px 8px 0 0'
                      }}>
                        상품 이미지 {product.id}
                      </div>
                    )}
                  </S.ProductImage>
                  <S.ProductInfo style={{ padding: '15px' }}>
                    <S.ProductName style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {product.name}
                    </S.ProductName>
                    
                    <S.ProductPrice style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#e74c3c',
                      marginBottom: '8px'
                    }}>
                      ₩{product.price?.toLocaleString()}
                    </S.ProductPrice>
                    
                    {/* 🔧 할인 정보 표시 */}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          textDecoration: 'line-through',
                          color: '#999',
                          fontSize: '14px'
                        }}>
                          ₩{product.originalPrice.toLocaleString()}
                        </span>
                        <span style={{
                          background: '#e74c3c',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                    
                    <S.ProductDescription style={{
                      color: '#666',
                      fontSize: '14px',
                      height: '40px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      marginBottom: '10px'
                    }}>
                      {product.description}
                    </S.ProductDescription>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      <span>재고: {product.stockQuantity || 0}개</span>
                      {product.hasEvent && (
                        <S.EventBadge style={{
                          background: '#f39c12',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '10px'
                        }}>
                          이벤트
                        </S.EventBadge>
                      )}
                      {product.isNew && (
                        <span style={{
                          background: '#27ae60',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '10px'
                        }}>
                          NEW
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
          </>
        ) : (
          <S.NoResults>
            <S.NoResultsIcon>🔍</S.NoResultsIcon>
            <S.NoResultsTitle>검색 결과가 없습니다.</S.NoResultsTitle>
            <S.NoResultsText>
              "{searchQuery}"에 대한 검색 결과를 찾을 수 없습니다.
            </S.NoResultsText>
            <S.SearchSuggestions>
              <S.SuggestionTitle>검색 팁:</S.SuggestionTitle>
              <ul style={{ textAlign: 'left', color: '#666' }}>
                <li>단어의 철자가 정확한지 확인해보세요</li>
                <li>더 일반적인 검색어로 다시 검색해보세요</li>
                <li>검색어를 줄여서 검색해보세요</li>
                <li>다른 필터 조건을 사용해보세요</li>
              </ul>
            </S.SearchSuggestions>
            
            {/* 🔧 추천 액션 버튼들 */}
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
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
                onClick={() => navigate('/MD/products')}
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
          </S.NoResults>
        )}

        {/* 🔧 개발용 디버그 정보 */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            marginTop: '40px',
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666',
            border: '1px solid #ddd'
          }}>
            <strong>디버그 정보:</strong>
            <div>검색어: {searchQuery}</div>
            <div>현재 페이지: {currentPage + 1}/{totalPages}</div>
            <div>총 결과: {totalElements}개</div>
            <div>목업 데이터 사용: {isFromMockData ? 'Yes' : 'No'}</div>
            <div>재시도 횟수: {retryCount}/{maxRetries}</div>
            <div>필터: 정렬={sortBy}-{sortDirection}, 가격={priceRange}, 이벤트={eventOnly}</div>
          </div>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default SearchResults;