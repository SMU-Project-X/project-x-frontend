// MDPage.main.styled.js (비율 조정 및 캐러셀 개선)
export const mdPageStyles = {
  // 메인 컨테이너 - 화면 전체를 꽉 채움
  container: {
    width: '100vw',
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 73px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 100px', // 패딩 조정
    margin: 0,
    boxSizing: 'border-box'
  },

  // 캐러셀 섹션 - 비율 조정
  carouselSection: {
    width: '100%',
    maxWidth: '1200px', // 캐러셀 폭 증가
    height: '400px', // 캐러셀 높이 증가
    flexShrink: 0,
    borderRadius: '25px',
    opacity: 0.8,
    background: '#B3D1F0',
    marginBottom: '50px', // 여백 줄임
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // 캐러셀 내비게이션 버튼 - 동그라미 제거, 위치 조정
  carouselNavButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none', // 배경 제거
    border: 'none',
    width: '60px', // 크기 증가
    height: '60px',
    cursor: 'pointer',
    fontSize: '2.5rem', // 폰트 크기 증가
    color: '#172031',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },

  carouselNavLeft: {
    left: '40px' // 위치 조정
  },

  carouselNavRight: {
    right: '40px' // 위치 조정
  },

  // 캐러셀 페이지 인디케이터 - 크기 조정
  carouselIndicators: {
    position: 'absolute',
    bottom: '25px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px'
  },

  carouselIndicator: {
    width: '35px', // 크기 조정
    height: '15px',
    flexShrink: 0,
    borderRadius: '50px',
    cursor: 'pointer',
    border: 'none'
  },

  carouselIndicatorActive: {
    background: '#A259FF'
  },

  carouselIndicatorInactive: {
    background: '#ffffff'
  },

  // 섹션 컨테이너 - 비율 조정
  sectionContainer: {
    width: '100%',
    maxWidth: '1200px', // 캐러셀과 동일한 폭
    marginBottom: '60px' // 간격 조정
  },

  // 섹션 헤더
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px' // 간격 줄임
  },

  // 섹션 제목 - 크기 조정
  sectionTitle: {
    color: '#000',
    fontFamily: 'Inter, sans-serif',
    fontSize: '28px', // 폰트 크기 조정
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 'normal',
    margin: 0
  },

  // 더보기 버튼 - 크기 축소
  moreButton: {
    width: '60px', // 폭 축소
    height: '32px', // 높이 축소
    flexShrink: 0,
    background: '#74B9FF',
    border: 'none',
    borderRadius: '16px', // 라운드 조정
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '11px', // 폰트 크기 축소
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // 상품 그리드 - 비율 조정
  productGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px', // 간격 증가
    justifyItems: 'center',
    maxWidth: '1000px', // 최대 폭 증가
    margin: '0 auto'
  },

  // 상품 카드 - 크기 조정
  productCard: {
    width: '300px', // 폭 증가
    height: '350px', // 높이 증가
    flexShrink: 0,
    background: '#F8F8F8',
    border: '1px solid #E5E5E5',
    borderRadius: '15px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },

  // 상품 이미지 컨테이너 - 크기 조정
  productImageContainer: {
    width: '260px', // 폭 증가
    height: '180px', // 높이 증가
    flexShrink: 0,
    background: '#F0F0F0',
    borderRadius: '10px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: '#999'
  },

  // 상품 정보
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  productName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
    fontFamily: 'Pretendard, sans-serif',
    textAlign: 'center'
  },

  productPriceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  },

  productPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#172031',
    fontFamily: 'Pretendard, sans-serif'
  },

  productOriginalPrice: {
    fontSize: '14px',
    color: '#999',
    textDecoration: 'line-through',
    fontFamily: 'Pretendard, sans-serif'
  },

  // 공지사항 섹션 - 비율 조정
  noticeSection: {
    width: '100%',
    maxWidth: '1200px', // 캐러셀과 동일한 폭
    marginBottom: '40px'
  },

  noticeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px' // 간격 줄임
  },

  noticeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 25px', // 패딩 조정
    background: '#f8f9fa',
    borderRadius: '12px', // 라운드 조정
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    minHeight: '50px' // 높이 조정
  },

  noticeTitle: {
    fontSize: '15px', // 폰트 크기 조정
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Pretendard, sans-serif'
  },

  noticeDate: {
    fontSize: '13px', // 폰트 크기 조정
    color: '#666',
    fontFamily: 'Pretendard, sans-serif'
  }
};

// 호버 효과 함수들
export const hoverEffects = {
  productCard: {
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  },
  
  noticeItem: {
    onMouseEnter: (e) => {
      e.currentTarget.style.backgroundColor = '#e9ecef';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.backgroundColor = '#f8f9fa';
    }
  },

  moreButton: {
    onMouseEnter: (e) => {
      e.currentTarget.style.backgroundColor = '#5a9cfc';
      e.currentTarget.style.transform = 'scale(1.05)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.backgroundColor = '#74B9FF';
      e.currentTarget.style.transform = 'scale(1)';
    }
  },

  carouselNavButton: {
    onMouseEnter: (e) => {
      e.currentTarget.style.color = '#000';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = '#172031';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
    }
  }
};