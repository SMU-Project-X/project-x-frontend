// services/api.js
// 임시 API 서비스 - 실제 백엔드 연결 전까지 로컬스토리지 사용

// 장바구니 API
export const cartAPI = {
  // 장바구니 아이템 가져오기
  getCartItems: async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      return {
        success: true,
        data: cartItems
      };
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
      return {
        success: false,
        data: []
      };
    }
  },

  // 장바구니에 아이템 추가
  addToCart: async (item) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += item.quantity || 1;
      } else {
        cartItems.push({
          ...item,
          quantity: item.quantity || 1,
          addedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartCount', cartItems.reduce((sum, item) => sum + item.quantity, 0).toString());
      
      return {
        success: true,
        data: cartItems
      };
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      return {
        success: false,
        message: '장바구니 추가에 실패했습니다.'
      };
    }
  },

  // 장바구니 아이템 업데이트
  updateCartItem: async (itemId, updates) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const itemIndex = cartItems.findIndex(item => item.id === itemId);
      
      if (itemIndex > -1) {
        cartItems[itemIndex] = { ...cartItems[itemIndex], ...updates };
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartItems.reduce((sum, item) => sum + item.quantity, 0).toString());
      }
      
      return {
        success: true,
        data: cartItems
      };
    } catch (error) {
      console.error('장바구니 업데이트 실패:', error);
      return {
        success: false,
        message: '장바구니 업데이트에 실패했습니다.'
      };
    }
  },

  // 장바구니 아이템 삭제
  removeFromCart: async (itemId) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const filteredItems = cartItems.filter(item => item.id !== itemId);
      
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      localStorage.setItem('cartCount', filteredItems.reduce((sum, item) => sum + item.quantity, 0).toString());
      
      return {
        success: true,
        data: filteredItems
      };
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
      return {
        success: false,
        message: '장바구니 삭제에 실패했습니다.'
      };
    }
  },

  // 장바구니 비우기
  clearCart: async () => {
    try {
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      
      return {
        success: true,
        data: []
      };
    } catch (error) {
      console.error('장바구니 비우기 실패:', error);
      return {
        success: false,
        message: '장바구니 비우기에 실패했습니다.'
      };
    }
  }
};

// 상품 API
export const productAPI = {
  // 전체 상품 목록 가져오기
  getAllProducts: async () => {
    try {
      // 임시 더미 데이터
      const products = [
        { id: 1, name: '한정판 포토북', price: 25000, originalPrice: 30000, image: '상품 이미지 1', isEvent: true, category: 'photobook', description: 'Project X 한정판 포토북입니다.' },
        { id: 2, name: 'Project X 굿즈 세트', price: 18000, image: '상품 이미지 2', isEvent: false, category: 'goods', description: '프로젝트 X 공식 굿즈 세트' },
        // ... 더 많은 상품들
      ];
      
      return {
        success: true,
        data: products
      };
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      return {
        success: false,
        data: []
      };
    }
  },

  // 특정 상품 상세 정보 가져오기
  getProductById: async (productId) => {
    try {
      // 임시로 더미 데이터 반환
      const product = {
        id: productId,
        name: '한정판 포토북',
        price: 25000,
        images: ['상품 이미지 1', '상품 이미지 2', '상품 이미지 3'],
        description: 'Project X 한정판 포토북입니다.',
        specs: [
          { label: '크기', value: '210 x 297mm (A4)' },
          { label: '페이지', value: '총 100페이지' },
          { label: '재질', value: '고급 아트지' }
        ]
      };
      
      return {
        success: true,
        data: product
      };
    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      return {
        success: false,
        message: '상품 정보를 불러올 수 없습니다.'
      };
    }
  }
};

// 주문 API
export const orderAPI = {
  // 주문 생성
  createOrder: async (orderData) => {
    try {
      const orderId = 'ORD' + Date.now();
      const order = {
        id: orderId,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // 주문 완료 후 장바구니 비우기
      await cartAPI.clearCart();
      
      return {
        success: true,
        data: order
      };
    } catch (error) {
      console.error('주문 생성 실패:', error);
      return {
        success: false,
        message: '주문 처리에 실패했습니다.'
      };
    }
  }
};