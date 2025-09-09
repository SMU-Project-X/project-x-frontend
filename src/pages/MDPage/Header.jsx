import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cartAPI } from '../../services/api';  // 경로 수정
import { headerStyles, hoverEffects } from './styled/MDPage.Header.styled';  // 경로 수정

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currency, setCurrency] = useState('KRW');
  const [language, setLanguage] = useState('KO');

  useEffect(() => {
    loadCartCount();
  }, []);

  const loadCartCount = async () => {
    try {
      const response = await cartAPI.getCartItems();
      const totalItems = response.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(totalItems);
    } catch (error) {
      console.error('장바구니 개수 로드 실패:', error);
      setCartCount(0);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchBar(false);
      setSearchQuery('');
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 150);
    }
  };

  const getNavLinkStyle = (path) => ({
    ...headerStyles.navLink,
    ...(location.pathname === path ? headerStyles.navLinkActive : {})
  });

  return (
    <>
      <header style={headerStyles.header}>
        {/* 왼쪽 로고 */}
        <Link to="/" style={headerStyles.logo}>
          Project-X
        </Link>
        
        {/* 가운데 메인 네비게이션 */}
        <nav style={headerStyles.nav}>
          <Link to="/home" style={getNavLinkStyle('/home')}>
            Home
          </Link>
          <Link to="/MD" style={getNavLinkStyle('/MD')}>
            MD
          </Link>
          <Link to="/community" style={getNavLinkStyle('/community')}>
            Community
          </Link>
          <Link to="/content" style={getNavLinkStyle('/content')}>
            Content
          </Link>
          <Link to="/chat" style={getNavLinkStyle('/chat')}>
            Chat
          </Link>
        </nav>
        
        {/* 오른쪽 아이콘들 */}
        <div style={headerStyles.rightSection}>
          {/* 검색 */}
          <div style={headerStyles.searchContainer}>
            {!showSearchBar ? (
              <button
                onClick={toggleSearchBar}
                style={headerStyles.searchButton}
                onMouseEnter={hoverEffects.onMouseEnter}
                onMouseLeave={hoverEffects.onMouseLeave}
                title="검색"
              >
                🔍
              </button>
            ) : (
              <form onSubmit={handleSearch} style={headerStyles.searchForm}>
                <div style={headerStyles.searchInputContainer}>
                  <span style={headerStyles.searchIcon}>🔍</span>
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="상품을 검색하세요..."
                    style={headerStyles.searchInput}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearchBar(false);
                      setSearchQuery('');
                    }}
                    style={headerStyles.searchCloseButton}
                  >
                    ✕
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 다른 아이콘들 */}
          <div style={{
            ...headerStyles.iconSection,
            ...(showSearchBar ? headerStyles.iconSectionHidden : {})
          }}>
            {/* 장바구니 */}
            <Link 
              to="/cart" 
              style={headerStyles.cartLink}
              onMouseEnter={hoverEffects.onMouseEnter}
              onMouseLeave={hoverEffects.onMouseLeave}
              title="장바구니"
            >
              <span style={headerStyles.cartIcon}>🛒</span>
              {cartCount > 0 && (
                <span style={headerStyles.cartBadge}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* 마이페이지 */}
            <button
              style={headerStyles.iconButton}
              onMouseEnter={hoverEffects.onMouseEnter}
              onMouseLeave={hoverEffects.onMouseLeave}
              title="마이페이지"
              onClick={() => navigate('/mypage')}
            >
              👤
            </button>

            {/* 환율 */}
            <div style={headerStyles.dropdownContainer}>
              <button
                onClick={() => {
                  setShowCurrencyMenu(!showCurrencyMenu);
                  setShowLanguageMenu(false);
                }}
                style={headerStyles.iconButton}
                onMouseEnter={hoverEffects.onMouseEnter}
                onMouseLeave={hoverEffects.onMouseLeave}
                title="환율 변경"
              >
                💱
              </button>
              {showCurrencyMenu && (
                <div style={headerStyles.dropdown}>
                  {['KRW', 'USD', 'JPY', 'CNY'].map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setShowCurrencyMenu(false);
                      }}
                      style={{
                        ...headerStyles.dropdownItem,
                        ...(currency === curr ? headerStyles.dropdownItemActive : headerStyles.dropdownItemInactive)
                      }}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 언어 */}
            <div style={headerStyles.dropdownContainer}>
              <button
                onClick={() => {
                  setShowLanguageMenu(!showLanguageMenu);
                  setShowCurrencyMenu(false);
                }}
                style={headerStyles.iconButton}
                onMouseEnter={hoverEffects.onMouseEnter}
                onMouseLeave={hoverEffects.onMouseLeave}
                title="언어 변경"
              >
                🌐
              </button>
              {showLanguageMenu && (
                <div style={headerStyles.dropdown}>
                  {[
                    { code: 'KO', name: '한국어' },
                    { code: 'EN', name: 'English' },
                    { code: 'JA', name: '日本語' },
                    { code: 'ZH', name: '中文' }
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      style={{
                        ...headerStyles.dropdownItem,
                        ...(language === lang.code ? headerStyles.dropdownItemActive : headerStyles.dropdownItemInactive)
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PIX 메뉴 - 통합 바로이동 */}
            <button
              onClick={() => navigate('/about-support')}
              style={headerStyles.iconButton}
              onMouseEnter={hoverEffects.onMouseEnter}
              onMouseLeave={hoverEffects.onMouseLeave}
              title="회사소개 고객센터"
            >
              🅿️
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;