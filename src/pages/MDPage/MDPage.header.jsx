// MDPage.header.jsx - 기존 구조 100% 유지하면서 환율/번역 기능만 추가
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import exchangeRateService, { SUPPORTED_CURRENCIES } from '../../services/exchangeApi';
import deepLTranslatorService from '../../services/translateApi';
import MDTranslationCurrencyController from '../../components/MDTranslationCurrencyController/MDTranslationCurrencyController';
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
  const [loading, setLoading] = useState(false);
  
  // 🚀 로그인 상태 관리
  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: false,
    userId: null,
    username: null,
    isAdmin: false
  });
  
  // API 연동 상태
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('KRW');
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);
  
  // 백엔드에서 가져온 언어 목록
  const [supportedLanguages, setSupportedLanguages] = useState({
    'ko': '한국어'
  });
  
  // API 상태 정보
  const [apiStatus, setApiStatus] = useState({
    deepL: false,
    exchange: true
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  // 🚀 로그인 상태 확인
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/status', {
        withCredentials: true
      });
      
      setLoginStatus(response.data);
      
      // localStorage와 동기화
      if (response.data.isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('isAdmin', response.data.isAdmin);
      } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
      }
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      // 네트워크 오류시 localStorage 정보 사용
      const localLogin = localStorage.getItem('isLoggedIn') === 'true';
      if (localLogin) {
        setLoginStatus({
          isLoggedIn: true,
          userId: localStorage.getItem('userId'),
          username: localStorage.getItem('username'),
          isAdmin: localStorage.getItem('isAdmin') === 'true'
        });
      }
    }
  };

  // 장바구니 개수 로드 (실시간 업데이트 지원)
  const loadCartCount = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalCount);
    } catch (error) {
      console.error('장바구니 개수 로드 실패:', error);
      setCartCount(0);
    }
  };

  // 컴포넌트 마운트 및 언마운트 이벤트
  useEffect(() => {
    // 🚀 로그인 상태 확인 추가
    checkLoginStatus();
    
    // 장바구니 개수 로드
    loadCartCount();
    
    // 언어 지원 확인
    const checkLanguageSupport = async () => {
      try {
        const languages = await deepLTranslatorService.getSupportedLanguages();
        setSupportedLanguages(languages);
        setApiStatus(prev => ({ ...prev, deepL: true }));
      } catch (error) {
        console.warn('언어 API 연결 실패, 기본 설정 사용:', error);
        setApiStatus(prev => ({ ...prev, deepL: false }));
      }
    };

    checkLanguageSupport();

    // 장바구니 변경 이벤트 리스너
    const handleCartUpdate = () => {
      loadCartCount();
    };

    // 🚀 로그인 상태 변경 이벤트 리스너
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    // 🚀 로그인 관련 이벤트 추가
    window.addEventListener('loginStatusChanged', handleLoginStatusChange);
    window.addEventListener('storage', handleLoginStatusChange);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      // 🚀 로그인 관련 이벤트 제거
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  // 🚀 마이페이지 클릭 핸들러
  const handleMyPageClick = () => {
    if (!loginStatus.isLoggedIn) {
      // 비로그인 → 로그인 페이지로
      navigate('/login');
    } else if (loginStatus.isAdmin) {
      // 관리자 → 관리자 페이지로
      navigate('/admin');
    } else {
      // 일반회원 → 마이페이지로
      navigate('/mypage');
    }
  };

  // 네비게이션 핸들러
  const handleNavigation = (path) => {
    navigate(path);
  };

  // 검색 기능
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsExchangeOpen(false);
    setIsLanguageOpen(false);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      try {
        setLoading(true);
        console.log('검색어:', searchQuery);
        
        navigate(`/MD/search?q=${encodeURIComponent(searchQuery.trim())}`);
        
        setIsSearchOpen(false);
        setSearchQuery('');
      } catch (error) {
        console.error('검색 실행 실패:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchButtonClick = async () => {
    if (isSearchOpen && searchQuery.trim()) {
      try {
        setLoading(true);
        console.log('검색어:', searchQuery);
        
        navigate(`/MD/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false);
        setSearchQuery('');
      } catch (error) {
        console.error('검색 실행 실패:', error);
      } finally {
        setLoading(false);
      }
    } else {
      toggleSearch();
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-dropdown]')) {
        setIsExchangeOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 드롭다운 토글 함수들
  const toggleExchange = () => {
    setIsExchangeOpen(!isExchangeOpen);
    setIsLanguageOpen(false);
    setIsSearchOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsExchangeOpen(false);
    setIsSearchOpen(false);
  };

  // 실제 환율 변환 기능 (수정된 버전)
const handleCurrencySelect = async (currency) => {
  if (currency === selectedCurrency) {
    setIsExchangeOpen(false);
    return;
  }

  setIsExchanging(true);
  setIsExchangeOpen(false);

  try {
    // 올바른 함수 호출: convertPagePrices(toCurrency, fromCurrency)
    const result = await exchangeRateService.convertPagePrices(currency, selectedCurrency);
    
    if (result.success) {
      setSelectedCurrency(currency);
      
      window.dispatchEvent(new CustomEvent('currencyChanged', {
        detail: { from: selectedCurrency, to: currency }
      }));
      
      console.log(`환율 변환 완료: ${selectedCurrency} → ${currency}`);
      console.log(`변환된 가격: ${result.data.convertedCount}개`);
    } else {
      throw new Error(result.error || '환율 API 연결 실패');
    }
    
  } catch (error) {
    console.error('환율 변환 실패:', error);
    
    let errorMessage = '환율 변환에 실패했습니다.';
    
    if (error.message.includes('429')) {
      errorMessage = 'API 호출 한도를 초과했습니다.\n잠시 후 다시 시도해주세요.';
    } else if (error.message.includes('network')) {
      errorMessage = '네트워크 연결을 확인해주세요.';
    }
    
    alert(errorMessage);
    
  } finally {
    setIsExchanging(false);
  }
};

  // 실제 번역 기능
  const handleLanguageSelect = async (languageCode) => {
    if (languageCode === selectedLanguage) {
      setIsLanguageOpen(false);
      return;
    }

    setIsTranslating(true);
    setIsLanguageOpen(false);

    try {
      const success = await deepLTranslatorService.translatePage(selectedLanguage, languageCode);
      
      if (success) {
        setSelectedLanguage(languageCode);
        
        window.dispatchEvent(new CustomEvent('languageChanged', {
          detail: { from: selectedLanguage, to: languageCode }
        }));
        
        console.log(`번역 완료: ${selectedLanguage} → ${languageCode}`);
      } else {
        throw new Error('번역 API 연결 실패');
      }
      
    } catch (error) {
      console.error('번역 실패:', error);
      
      let errorMessage = '번역에 실패했습니다.';
      
      if (error.message.includes('429')) {
        errorMessage = 'API 호출 한도를 초과했습니다.\n잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('403')) {
        errorMessage = 'API 키가 유효하지 않습니다.\n설정을 확인해주세요.';
      } else if (error.message.includes('network')) {
        errorMessage = '네트워크 연결을 확인해주세요.';
      }
      
      alert(errorMessage);
      
      setSelectedLanguage('ko');
      
    } finally {
      setIsTranslating(false);
    }
  };

  // 현재 페이지 확인
  const isActivePage = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#B3D1F0' }}>
      <HeaderContainer>
        {/* 로고 섹션 */}
        <LogoSection>
          <Logo onClick={() => handleNavigation('/')} data-translate="Project-X">
            Project-X
          </Logo>
        </LogoSection>

        {/* 네비게이션 메뉴 */}
        <Navigation>
          <NavItem 
            className={isActivePage('/') ? 'active' : ''}
            onClick={() => handleNavigation('/Home')}
            data-translate="Home"
          >
            Home
          </NavItem>
          <NavItem 
            className={isActivePage('/MD') ? 'active' : ''}
            onClick={() => handleNavigation('/MD')}
            data-translate="MD"
          >
            MD
          </NavItem>
          <NavItem 
            className={isActivePage('/Community') ? 'active' : ''}
            onClick={() => handleNavigation('/Community')}
            data-translate="Community"
          >
            Community
          </NavItem>
          <NavItem 
            className={isActivePage('/content') ? 'active' : ''}
            onClick={() => handleNavigation('/picture/select')}
            data-translate="Content"
          >
            Content
          </NavItem>
          <NavItem 
            className={isActivePage('/chat') ? 'active' : ''}
            onClick={() => handleNavigation('/ChatChoice')}
            data-translate="Chat"
          >
            Chat
          </NavItem>
        </Navigation>

        {/* 오른쪽 기능 버튼들 */}
        <RightSection>
          {/* 검색 */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconButton 
              onClick={handleSearchButtonClick}
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
              title="검색"
            >
              {loading ? '⏳' : isSearchOpen ? '❌' : '🔍'}
            </IconButton>
            
            {isSearchOpen && (
              <SearchInput
                type="text"
                placeholder="상품을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                autoFocus
              />
            )}
          </div>

          {/* 환율 변환 */}
          <DropdownContainer data-dropdown>
            <IconButton onClick={toggleExchange} disabled={isExchanging} title="환율 변환">
              {isExchanging ? '⏳' : '💱'}
            </IconButton>
            <DropdownMenu $isOpen={isExchangeOpen}>
              {Object.entries(SUPPORTED_CURRENCIES).map(([code, name]) => (
                <DropdownItem 
                  key={code}
                  onClick={() => handleCurrencySelect(code)}
                  style={{ 
                    backgroundColor: selectedCurrency === code ? '#f0f0f0' : 'transparent',
                    fontWeight: selectedCurrency === code ? 'bold' : 'normal'
                  }}
                >
                  {name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>

          {/* 언어 번역 */}
          <DropdownContainer data-dropdown>
            <IconButton onClick={toggleLanguage} disabled={isTranslating} title="언어 번역">
              {isTranslating ? '⏳' : '🌍'}
            </IconButton>
            <DropdownMenu $isOpen={isLanguageOpen}>
              {Object.entries(supportedLanguages).map(([code, name]) => (
                <DropdownItem 
                  key={code}
                  onClick={() => handleLanguageSelect(code)}
                  style={{ 
                    backgroundColor: selectedLanguage === code ? '#f0f0f0' : 'transparent',
                    fontWeight: selectedLanguage === code ? 'bold' : 'normal'
                  }}
                >
                  {name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>

          {/* 장바구니 */}
          <CartContainer>
            <IconButton onClick={() => handleNavigation('/MD/cart')} title="장바구니">
              🛒
            </IconButton>
            {cartCount > 0 && (
              <CartBadge>{cartCount > 99 ? '99+' : cartCount}</CartBadge>
            )}
          </CartContainer>

          {/* 🚀 마이페이지 - 로그인 상태별 분기 */}
          <IconButton 
            onClick={handleMyPageClick} 
            title={
              !loginStatus.isLoggedIn ? "로그인" :
              loginStatus.isAdmin ? "관리자 페이지" : "마이페이지"
            }
            style={{
              // 🚀 로그인 상태에 따른 시각적 피드백
              background: loginStatus.isLoggedIn ? 
                (loginStatus.isAdmin ? 'linear-gradient(135deg, #fd79a8, #e84393)' : 'linear-gradient(135deg, #74b9ff, #0984e3)') : 
                'transparent',
              color: loginStatus.isLoggedIn ? 'white' : 'inherit',
              borderRadius: '50%'
            }}
          >
            {loginStatus.isLoggedIn ? 
              (loginStatus.isAdmin ? '🔐' : '👤') : 
              '🚪'
            }
          </IconButton>

          {/* About - 회사소개/고객센터 */}
          <IconButton onClick={() => handleNavigation('/MD/about')} title="회사소개">
            📋
          </IconButton>
        </RightSection>
      </HeaderContainer>
      
      {/* API 상태 디버그 정보 */}
      {(isExchanging || isTranslating) && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 9999
        }}>
          {isExchanging && '💱 환율 변환 중...'}
          {isTranslating && '🌍 AI 번역 중...'}
        </div>
      )}

      {/* 🚀 로그인 상태 디버그 정보 (개발용, 실제 배포시 제거) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          {loginStatus.isLoggedIn ? 
            `✅ ${loginStatus.username} ${loginStatus.isAdmin ? '(관리자)' : '(일반)'}` : 
            '❌ 비로그인'
          }
        </div>
      )}
    </div>
  );
}

export default Header;