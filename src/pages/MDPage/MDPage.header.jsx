// Header.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  LogoSection,
  Logo,
  Navigation,
  NavItem,
  RightSection,
  IconButton,
  CartContainer,
  CartBadge,
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
  SearchInput
} from './styled/MDPage.Header.styled';

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // 장바구니 개수 로드 (임시 더미 데이터)
  const loadCartCount = async () => {
    try {
      // API 호출 대신 임시로 로컬스토리지나 상태에서 가져오기
      const savedCartCount = localStorage.getItem('cartCount') || '3';
      setCartCount(parseInt(savedCartCount));
    } catch (error) {
      console.error('장바구니 개수 로드 실패:', error);
      setCartCount(3); // 기본값
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  // 네비게이션 클릭 핸들러
  const handleNavigation = (path) => {
    navigate(path);
  };

  // 검색 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  // 검색 실행
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('검색어:', searchQuery);
      // 검색 페이지로 이동하거나 검색 로직 구현
      navigate(`/MD/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // 드롭다운 토글 함수들
  const toggleExchange = () => {
    setIsExchangeOpen(!isExchangeOpen);
    setIsLanguageOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsExchangeOpen(false);
  };

  // 현재 페이지 확인 (정확한 활성화 로직)
  const isActivePage = (path) => {
    // 홈(Home) 메뉴는 정확히 '/' 경로일 때만 활성화
    if (path === '/') {
      return location.pathname === '/';
    }
    // 다른 메뉴들은 해당 경로로 시작하면 활성화
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#B3D1F0' }}>
      <HeaderContainer>
        {/* 로고 섹션 */}
        <LogoSection>
          <Logo onClick={() => handleNavigation('/')}>
            Project-X
          </Logo>
        </LogoSection>

        {/* 네비게이션 메뉴 */}
        <Navigation>
          <NavItem 
            className={isActivePage('/') ? 'active' : ''}
            onClick={() => handleNavigation('/')}
          >
            Home
          </NavItem>
          <NavItem 
            className={isActivePage('/MD') ? 'active' : ''}
            onClick={() => handleNavigation('/MD')}
          >
            MD
          </NavItem>
          <NavItem 
            className={isActivePage('/Community') ? 'active' : ''}
            onClick={() => handleNavigation('/CommunityHome')}
          >
            Community
          </NavItem>
          <NavItem 
            className={isActivePage('/content') ? 'active' : ''}
            onClick={() => handleNavigation('/content')}
          >
            Content
          </NavItem>
          <NavItem 
            className={isActivePage('/chat') ? 'active' : ''}
            onClick={() => handleNavigation('/chat')}
          >
            Chat
          </NavItem>
        </Navigation>

        {/* 오른쪽 기능 버튼들 */}
        <RightSection>
          {/* 검색 */}
          <IconButton onClick={toggleSearch}>
            🔍
          </IconButton>
          
          {isSearchOpen && (
            <SearchInput
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              autoFocus
            />
          )}

          {/* 장바구니 */}
          <CartContainer>
            <IconButton onClick={() => navigate('/MD/cart')}>
              🛒
            </IconButton>
            {cartCount > 0 && (
              <CartBadge>{cartCount}</CartBadge>
            )}
          </CartContainer>

          {/* 마이페이지 */}
          <IconButton onClick={() => navigate('/profile')}>
            👤
          </IconButton>

          {/* 환율 드롭다운 */}
          <DropdownContainer>
            <IconButton onClick={toggleExchange}>
              💰
            </IconButton>
            <DropdownMenu $isOpen={isExchangeOpen}>
              <DropdownItem onClick={() => console.log('원화 선택')}>
                원화 (KRW)
              </DropdownItem>
              <DropdownItem onClick={() => console.log('달러 선택')}>
                달러 (USD)
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>

          {/* 언어 드롭다운 */}
          <DropdownContainer>
            <IconButton onClick={toggleLanguage}>
              🌏
            </IconButton>
            <DropdownMenu $isOpen={isLanguageOpen}>
              <DropdownItem onClick={() => console.log('한국어 선택')}>
                한국어
              </DropdownItem>
              <DropdownItem onClick={() => console.log('English 선택')}>
                English
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>

          {/* About - 회사소개/고객센터 */}
          <IconButton onClick={() => navigate('/MD/about')}>
            📋
          </IconButton>
        </RightSection>
      </HeaderContainer>
    </div>
  );
}

export default Header;