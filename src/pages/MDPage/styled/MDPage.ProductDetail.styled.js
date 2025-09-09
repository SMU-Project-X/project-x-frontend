// MDPage.ProductDetail.styled.js
export const productDetailStyles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    padding: '0',
    margin: '0'
  },
  
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 80px',
    display: 'flex',
    gap: '60px'
  },
  
  // 왼쪽 이미지 영역
  imageSection: {
    flex: '1',
    maxWidth: '500px'
  },
  
  mainImage: {
    width: '100%',
    height: '400px',
    backgroundColor: '#F8F8F8',
    border: '1px solid #E5E5E5',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    overflow: 'hidden'
  },
  
  mainImagePlaceholder: {
    color: '#999',
    fontSize: '18px',
    fontFamily: 'Pretendard, sans-serif'
  },
  
  thumbnailContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px'
  },
  
  thumbnail: {
    width: '80px',
    height: '80px',
    backgroundColor: '#F0F0F0',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  
  thumbnailActive: {
    border: '2px solid #A259FF'
  },
  
  // 오른쪽 정보 영역
  infoSection: {
    flex: '1',
    maxWidth: '500px',
    padding: '20px 0'
  },
  
  productTitle: {
    fontSize: '32px',
    fontWeight: '700',
    fontFamily: 'Pretendard, sans-serif',
    color: '#172031',
    marginBottom: '20px',
    lineHeight: '1.4'
  },
  
  productPrice: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Pretendard, sans-serif',
    color: '#A259FF',
    marginBottom: '30px'
  },
  
  optionSection: {
    marginBottom: '40px'
  },
  
  optionLabel: {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Pretendard, sans-serif',
    color: '#172031',
    marginBottom: '12px',
    display: 'block'
  },
  
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px'
  },
  
  quantityInput: {
    width: '60px',
    height: '40px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '16px',
    fontFamily: 'Pretendard, sans-serif'
  },
  
  quantityButton: {
    width: '40px',
    height: '40px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: '#F8F8F8',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: '#172031'
  },
  
  // 버튼 섹션
  buttonSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '40px'
  },
  
  cartButton: {
    flex: '1',
    height: '50px',
    backgroundColor: '#B3D1F0',
    color: '#172031',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Pretendard, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  buyButton: {
    flex: '1',
    height: '50px',
    backgroundColor: '#74B9FF',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Pretendard, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  // 상품 상세 정보 영역
  detailSection: {
    width: '100%',
    maxWidth: '1200px',
    margin: '60px auto 0',
    padding: '0 80px'
  },
  
  // 탭 네비게이션
  tabContainer: {
    display: 'flex',
    borderBottom: '2px solid #E5E5E5',
    marginBottom: '30px'
  },
  
  tabButton: {
    padding: '15px 30px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    fontFamily: 'Pretendard, sans-serif',
    color: '#666',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s ease'
  },
  
  tabButtonActive: {
    color: '#172031',
    borderBottom: '3px solid #B3D1F0'
  },
  
  detailContent: {
    backgroundColor: '#F8F8F8',
    borderRadius: '15px',
    padding: '40px',
    minHeight: '300px',
    border: '1px solid #E5E5E5'
  },
  
  detailText: {
    fontSize: '16px',
    lineHeight: '1.6',
    fontFamily: 'Pretendard, sans-serif',
    color: '#172031',
    marginBottom: '20px'
  },
  
  specList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  
  specItem: {
    display: 'flex',
    padding: '12px 0',
    borderBottom: '1px solid #E5E5E5',
    fontSize: '15px',
    fontFamily: 'Pretendard, sans-serif'
  },
  
  specLabel: {
    width: '120px',
    fontWeight: '600',
    color: '#172031'
  },
  
  specValue: {
    color: '#666',
    flex: '1'
  }
};

// 호버 및 인터랙션 효과
export const productDetailEffects = {
  thumbnail: {
    onMouseEnter: (e) => {
      e.target.style.transform = 'scale(1.05)';
      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    },
    onMouseLeave: (e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.boxShadow = 'none';
    }
  },
  
  cartButton: {
    onMouseEnter: (e) => {
      e.target.style.backgroundColor = '#9CC5E8';
      e.target.style.transform = 'translateY(-2px)';
    },
    onMouseLeave: (e) => {
      e.target.style.backgroundColor = '#B3D1F0';
      e.target.style.transform = 'translateY(0)';
    }
  },
  
  buyButton: {
    onMouseEnter: (e) => {
      e.target.style.backgroundColor = '#5A9FEE';
      e.target.style.transform = 'translateY(-2px)';
    },
    onMouseLeave: (e) => {
      e.target.style.backgroundColor = '#74B9FF';
      e.target.style.transform = 'translateY(0)';
    }
  },
  
  quantityButton: {
    onMouseEnter: (e) => {
      e.target.style.backgroundColor = '#E5E5E5';
    },
    onMouseLeave: (e) => {
      e.target.style.backgroundColor = '#F8F8F8';
    }
  }
};