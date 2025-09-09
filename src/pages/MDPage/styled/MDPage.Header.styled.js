// MDPage.Header.styled.js (화면 완전히 꽉 채우기)
export const headerStyles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100vw', // 뷰포트 전체 폭
    height: '73px',
    backgroundColor: '#B3D1F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 80px', // 좌우 패딩
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    margin: 0
  },

  logo: {
    color: '#172031',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },

  nav: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'center'
  },

  navLink: {
    textDecoration: 'none',
    color: '#172031',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '25px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    padding: '0.5rem 0',
    transition: 'all 0.3s ease'
  },

  navLinkActive: {
    borderBottom: '3px solid #172031'
  },

  rightSection: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  },

  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  },

  searchButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    color: '#172031'
  },

  searchForm: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  searchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    border: '2px solid #172031',
    padding: '0.25rem 0.75rem',
    width: '250px',
    transition: 'all 0.3s ease'
  },

  searchIcon: {
    fontSize: '1rem',
    color: '#172031',
    marginRight: '0.5rem'
  },

  searchInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '0.9rem',
    padding: '0.25rem 0',
    color: '#172031'
  },

  searchCloseButton: {
    background: 'none',
    border: 'none',
    fontSize: '0.8rem',
    cursor: 'pointer',
    color: '#172031',
    padding: '0.2rem',
    marginLeft: '0.25rem'
  },

  iconSection: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    transition: 'transform 0.3s ease'
  },

  iconSectionHidden: {
    transform: 'scale(0.9)',
    opacity: 0.7
  },

  cartLink: {
    textDecoration: 'none',
    position: 'relative',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  cartIcon: {
    fontSize: '1.5rem',
    color: '#172031'
  },

  cartBadge: {
    position: 'absolute',
    top: '0.2rem',
    right: '0.2rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '0.7rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },

  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
    color: '#172031'
  },

  dropdownContainer: {
    position: 'relative'
  },

  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '0.5rem 0',
    minWidth: '120px',
    zIndex: 1001
  },

  dropdownItem: {
    width: '100%',
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'Pretendard, sans-serif'
  },

  dropdownItemActive: {
    background: '#B3D1F0',
    color: '#172031'
  },

  dropdownItemInactive: {
    color: '#333'
  }
};

// 호버 효과 함수들
export const hoverEffects = {
  onMouseEnter: (e) => {
    e.target.style.backgroundColor = 'rgba(23, 32, 49, 0.1)';
  },
  onMouseLeave: (e) => {
    e.target.style.backgroundColor = 'transparent';
  }
};