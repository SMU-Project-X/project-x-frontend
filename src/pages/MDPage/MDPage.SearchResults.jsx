// MDPage.SearchResults.jsx
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

  // 필터 상태
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [priceRange, setPriceRange] = useState('all');
  const [categoryId, setCategoryId] = useState(null);
  const [eventOnly, setEventOnly] = useState(false);

  const itemsPerPage = 12; // 한 페이지당 상품 수

  // 검색 실행
  const performSearch = async (page = 0) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

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
      const searchParams = {
        keyword: searchQuery,
        categoryId,
        minPrice,
        maxPrice,
        hasEvent: eventOnly || null,
        sortBy,
        sortDirection,
        page,
        size: itemsPerPage
      };

      const response = await productAPI.searchProducts(searchParams);

      if (response.success) {
        setSearchResults(response.data);
        setTotalElements(response.totalElements);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      } else {
        setError(response.message || '검색 중 오류가 발생했습니다.');
        setSearchResults([]);
      }

    } catch (error) {
      console.error('검색 실행 실패:', error);
      setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 초기 검색 및 검색어 변경 시 재검색
  useEffect(() => {
    setCurrentPage(0);
    performSearch(0);
  }, [searchQuery]);

  // 필터 변경 시 재검색
  useEffect(() => {
    if (searchQuery.trim()) {
      setCurrentPage(0);
      performSearch(0);
    }
  }, [sortBy, sortDirection, priceRange, categoryId, eventOnly]);

  // 페이지 변경 시 검색
  useEffect(() => {
    if (searchQuery.trim() && currentPage > 0) {
      performSearch(currentPage);
    }
  }, [currentPage]);

  // 상품 클릭 핸들러
  const handleProductClick = (productId) => {
    navigate(`/MD/product/${productId}`);
  };

  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 검색어가 없는 경우
  if (!searchQuery.trim()) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>검색 결과</S.Title>
          <S.NoSearchQuery>
            검색어를 입력해주세요.
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

  // 에러 발생
  if (error) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>"{searchQuery}" 검색 결과</S.Title>
          <S.ErrorContainer>
            <S.ErrorText>{error}</S.ErrorText>
            <S.RetryButton onClick={() => performSearch(0)}>
              다시 검색
            </S.RetryButton>
          </S.ErrorContainer>
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
        </S.ResultSummary>

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
              다른 검색어로 다시 시도해보세요.
            </S.NoResultsText>
            <S.SearchSuggestions>
              <S.SuggestionTitle>검색 팁:</S.SuggestionTitle>
              <ul>
                <li>단어의 철자가 정확한지 확인해보세요</li>
                <li>더 일반적인 검색어로 다시 검색해보세요</li>
                <li>검색어를 줄여서 검색해보세요</li>
              </ul>
            </S.SearchSuggestions>
          </S.NoResults>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default SearchResults;