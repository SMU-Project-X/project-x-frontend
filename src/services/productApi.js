// services/productApi.js
// 실제 Spring Boot 백엔드와 연동하는 API 서비스

import axios from 'axios';

// 백엔드 서버 URL (Spring Boot는 기본적으로 8080 포트에서 실행)
const API_BASE_URL = 'http://localhost:8080/api';

// Axios 인스턴스 생성 (공통 설정)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 상품 API 서비스
export const productAPI = {
  // 전체 상품 목록 조회 (페이징)
  getAllProducts: async (page = 0, size = 20) => {
    try {
      const response = await apiClient.get('/products', {
        params: { page, size }
      });
      return {
        success: true,
        data: response.data.content || [], // Spring Page 응답의 content 배열
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0,
        currentPage: response.data.number || 0
      };
    } catch (error) {
      console.error('전체 상품 조회 실패:', error);
      return {
        success: false,
        message: '상품을 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 상품 상세 조회
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      return {
        success: false,
        message: '상품을 찾을 수 없습니다.'
      };
    }
  },

  // 카테고리별 상품 조회
  getProductsByCategory: async (categoryId, page = 0, size = 20) => {
    try {
      const response = await apiClient.get(`/products/category/${categoryId}`, {
        params: { page, size }
      });
      return {
        success: true,
        data: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0,
        currentPage: response.data.number || 0
      };
    } catch (error) {
      console.error('카테고리별 상품 조회 실패:', error);
      return {
        success: false,
        message: '상품을 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 신상품 조회
  getNewProducts: async (page = 0, size = 9) => {
    try {
      const response = await apiClient.get('/products/new', {
        params: { page, size }
      });
      return {
        success: true,
        data: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0
      };
    } catch (error) {
      console.error('신상품 조회 실패:', error);
      return {
        success: false,
        message: '신상품을 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 인기 상품 조회
  getPopularProducts: async (page = 0, size = 9) => {
    try {
      const response = await apiClient.get('/products/popular', {
        params: { page, size }
      });
      return {
        success: true,
        data: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0
      };
    } catch (error) {
      console.error('인기상품 조회 실패:', error);
      return {
        success: false,
        message: '인기상품을 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 베스트 상품 조회
  getBestProducts: async (page = 0, size = 9) => {
    try {
      const response = await apiClient.get('/products/best', {
        params: { page, size }
      });
      return {
        success: true,
        data: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0
      };
    } catch (error) {
      console.error('베스트상품 조회 실패:', error);
      return {
        success: false,
        message: '베스트상품을 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 이벤트 상품 조회
  getEventProducts: async (page = 0, size = 9) => {
    try {
      const response = await apiClient.get('/products/events', {
        params: { page, size }
      });
      return {
        success: true,
        data: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0
      };
    } catch (error) {
      console.error('이벤트상품 조회 실패:', error);
      return {
        success: false,
        message: '이벤트상품을 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 상품 검색 (복합 조건)
  searchProducts: async (searchParams) => {
    try {
      const {
        keyword,
        categoryId,
        minPrice,
        maxPrice,
        isNew,
        hasEvent,
        sortBy = 'createdAt',
        sortDirection = 'desc',
        page = 0,
        size = 20
      } = searchParams;

      const response = await apiClient.get('/products/search', {
        params: {
          keyword,
          categoryId,
          minPrice,
          maxPrice,
          isNew,
          hasEvent,
          sortBy,
          sortDirection,
          page,
          size
        }
      });

      return {
        success: true,
        data: response.data.content || [],
        totalPages: response.data.totalPages || 0,
        totalElements: response.data.totalElements || 0,
        currentPage: response.data.number || 0
      };
    } catch (error) {
      console.error('상품 검색 실패:', error);
      return {
        success: false,
        message: '검색 결과를 불러오는데 실패했습니다.',
        data: []
      };
    }
  },

  // 재고 확인
  checkStock: async (productId, quantity) => {
    try {
      const response = await apiClient.get(`/products/${productId}/stock`, {
        params: { quantity }
      });
      return {
        success: true,
        inStock: response.data
      };
    } catch (error) {
      console.error('재고 확인 실패:', error);
      return {
        success: false,
        message: '재고를 확인할 수 없습니다.',
        inStock: false
      };
    }
  }
};

// 장바구니 API 서비스 (기존 localStorage 방식 유지하되 백엔드 연동 준비)
export const cartAPI = {
  // 현재는 localStorage 사용, 추후 백엔드 연동 시 수정
  getCartItems: async () => {
    try {
      // TODO: 백엔드 장바구니 API 연동 시 수정
      // const response = await apiClient.get('/cart');
      // return response.data;
      
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

  addToCart: async (item) => {
    try {
      // TODO: 백엔드 장바구니 API 연동 시 수정
      // const response = await apiClient.post('/cart', item);
      
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

  updateCartItem: async (itemId, updates) => {
    try {
      // TODO: 백엔드 장바구니 API 연동 시 수정
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

  removeFromCart: async (itemId) => {
    try {
      // TODO: 백엔드 장바구니 API 연동 시 수정
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
  }
};

export default apiClient;