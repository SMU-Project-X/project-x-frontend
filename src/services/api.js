// services/api.js
export const cartAPI = {
  getCartItems: async () => {
    // 임시 더미 데이터 (나중에 실제 API로 교체)
    return {
      data: [
        { id: 1, productId: 1, quantity: 2 },
        { id: 2, productId: 2, quantity: 1 }
      ]
    };
  },
  
  addToCart: async (productId, quantity = 1) => {
    // 임시 성공 응답
    return { success: true, message: '장바구니에 추가되었습니다.' };
  },

  removeFromCart: async (itemId) => {
    // 임시 성공 응답
    return { success: true, message: '장바구니에서 삭제되었습니다.' };
  },

  updateCartItem: async (itemId, quantity) => {
    // 임시 성공 응답
    return { success: true, message: '수량이 업데이트되었습니다.' };
  }
};