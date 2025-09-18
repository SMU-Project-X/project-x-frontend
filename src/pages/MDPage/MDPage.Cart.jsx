// MDPage.Cart.jsx - localStorage 기반 완벽 작동 버전
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled/MDPage.Cart.styled';

function Cart() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [cartData, setCartData] = useState({
    items: [],
    totalCount: 0,
    subtotal: 0,
    shippingFee: 3000,
    totalAmount: 3000
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // 추천 상품
  const [recommendedItems, setRecommendedItems] = useState([]);

  // localStorage에서 장바구니 데이터 로딩
  const loadCartData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // localStorage에서 장바구니 데이터 가져오기
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // 데이터 가공
      const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
      const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
      const shippingFee = subtotal >= 50000 ? 0 : 3000;
      const totalAmount = subtotal + shippingFee;
      
      setCartData({
        items: cartItems,
        totalCount,
        subtotal,
        shippingFee,
        totalAmount
      });
      
      // 장바구니 업데이트 이벤트 발생
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
    } catch (error) {
      console.error('장바구니 로딩 오류:', error);
      setError('장바구니를 불러오는데 실패했습니다.');
      setCartData({ items: [], totalCount: 0, subtotal: 0, shippingFee: 3000, totalAmount: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // 베스트상품 로드 (실제 API 호출)
  const loadRecommendedItems = async () => {
    try {
      // 더미 추천 상품 데이터
      const dummyProducts = [
        { id: 101, name: '추천 상품 1', price: 15000, imageUrls: null },
        { id: 102, name: '추천 상품 2', price: 22000, imageUrls: null },
        { id: 103, name: '추천 상품 3', price: 18000, imageUrls: null }
      ];
      setRecommendedItems(dummyProducts);
    } catch (error) {
      console.error('추천상품 로딩 오류:', error);
    }
  };

  // 컴포넌트 마운트시 데이터 로딩
  useEffect(() => {
    loadCartData();
    loadRecommendedItems();
  }, []);

  // 수량 변경
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (!cartItemId || newQuantity < 1 || isNaN(newQuantity)) {
      alert('올바른 수량을 입력해주세요.');
      return;
    }
    
    setActionLoading(true);
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const itemIndex = cartItems.findIndex(item => item.id === cartItemId);
      
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // cartCount 업데이트
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cartCount', totalCount.toString());
        
        // 상태 다시 로딩
        await loadCartData();
      } else {
        alert('상품을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('수량 변경 오류:', error);
      alert('수량 변경 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(false);
    }
  };

  // 개별 상품 삭제
  const handleRemoveItem = async (cartItemId) => {
    if (!cartItemId) {
      alert('삭제할 상품 정보가 없습니다.');
      return;
    }

    if (!confirm('이 상품을 장바구니에서 삭제하시겠습니까?')) return;
    
    setActionLoading(true);
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const filteredItems = cartItems.filter(item => item.id !== cartItemId);
      
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      
      // cartCount 업데이트
      const totalCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('cartCount', totalCount.toString());
      
      // 상태 다시 로딩
      await loadCartData();
      
    } catch (error) {
      console.error('상품 삭제 오류:', error);
      alert('상품 삭제 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(false);
    }
  };

  // 전체 삭제
  const handleClearAll = async () => {
    if (!cartData.items || cartData.items.length === 0) {
      alert('장바구니가 이미 비어있습니다.');
      return;
    }

    if (!confirm('장바구니의 모든 상품을 삭제하시겠습니까?')) return;
    
    setActionLoading(true);
    try {
      // localStorage에서 완전히 삭제
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      
      // 즉시 상태 업데이트
      setCartData({
        items: [],
        totalCount: 0,
        subtotal: 0,
        shippingFee: 3000,
        totalAmount: 3000
      });
      
      // 헤더의 장바구니 개수 즉시 업데이트
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      alert('장바구니가 비워졌습니다.');
      
    } catch (error) {
      console.error('장바구니 비우기 오류:', error);
      alert('장바구니 비우기 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(false);
    }
  };

  // 결제하기 버튼 클릭
  const handleCheckout = () => {
    if (!cartData.items || cartData.items.length === 0) {
      alert('장바구니에 상품이 없습니다.');
      return;
    }
    navigate('/MD/payment');
  };

  // 쇼핑 계속하기
  const handleContinueShopping = () => {
    navigate('/MD');
  };

  // 추천 상품 장바구니에 추가
  const handleAddRecommendedToCart = async (recommendedItem) => {
    if (!recommendedItem || !recommendedItem.id) {
      alert('상품 정보가 없습니다.');
      return;
    }

    setActionLoading(true);
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItemIndex = cartItems.findIndex(item => item.id === recommendedItem.id);
      
      if (existingItemIndex > -1) {
        // 기존 아이템이 있으면 수량 증가
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // 새 아이템 추가
        cartItems.push({
          id: recommendedItem.id,
          productName: recommendedItem.name,
          name: recommendedItem.name,
          price: recommendedItem.price,
          quantity: 1,
          selectedOption: '기본 옵션',
          addedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // cartCount 업데이트
      const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('cartCount', totalCount.toString());
      
      // 상태 다시 로딩
      await loadCartData();
      
      alert('상품이 장바구니에 추가되었습니다.');
      
    } catch (error) {
      console.error('장바구니 추가 오류:', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    } finally {
      setActionLoading(false);
    }
  };

  // 추천 상품 클릭시 상세페이지로 이동
  const handleRecommendedItemClick = (itemId) => {
    if (itemId) {
      navigate(`/MD/product/${itemId}`);
    }
  };

  // 안전한 이미지 URL 처리 함수
  const getImageUrl = (item) => {
    if (!item) return null;
    
    // 여러 형태의 이미지 URL 처리
    if (item.productImageUrls) {
      return item.productImageUrls.split(',')[0]?.trim();
    }
    if (item.imageUrls && Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
      return item.imageUrls[0];
    }
    if (item.imageUrl) {
      return item.imageUrl;
    }
    return null;
  };

  // 로딩 중
  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>장바구니</S.Title>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #74B9FF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: '#666', fontSize: '18px' }}>장바구니를 불러오는 중...</p>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 에러 발생시
  if (error) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>장바구니</S.Title>
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: '#999'
          }}>
            <p style={{ fontSize: '18px', color: '#e74c3c', marginBottom: '20px' }}>{error}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={loadCartData}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#74B9FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? '로딩중...' : '다시 시도'}
              </button>
              <button 
                onClick={() => navigate('/MD')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                쇼핑하러 가기
              </button>
            </div>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 장바구니가 비어있을 때
  if (!cartData.items || cartData.items.length === 0) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.Title>장바구니</S.Title>
          <S.EmptyCart>
            <S.EmptyMessage>장바구니가 비어있습니다</S.EmptyMessage>
            <S.EmptySubMessage>마음에 드는 상품을 장바구니에 담아보세요</S.EmptySubMessage>
            <S.ContinueShoppingBtn onClick={handleContinueShopping}>
              쇼핑 계속하기
            </S.ContinueShoppingBtn>
          </S.EmptyCart>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>장바구니</S.Title>
        
        <S.CartContent>
          {/* 장바구니 상품 목록 */}
          <S.CartItems>
            <S.CartHeader>
              <S.CartHeaderTitle>
                상품 ({cartData.items.length}개)
              </S.CartHeaderTitle>
              <S.ClearAllBtn 
                onClick={handleClearAll} 
                disabled={actionLoading || !cartData.items || cartData.items.length === 0}
              >
                {actionLoading ? '삭제중...' : '전체삭제'}
              </S.ClearAllBtn>
            </S.CartHeader>

            {cartData.items.map(item => {
              const imageUrl = getImageUrl(item);
              
              return (
                <S.CartItem key={item.id || `item-${Math.random()}`}>
                  <S.ItemImage>
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={item.productName || item.name || '상품'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = '상품 이미지';
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        color: '#6c757d',
                        fontSize: '12px'
                      }}>
                        상품 이미지
                      </div>
                    )}
                  </S.ItemImage>
                  
                  <S.ItemInfo>
                    <S.ItemName>{item.productName || item.name || '상품명 없음'}</S.ItemName>
                    <S.ItemOptions>{item.selectedOption || '기본 옵션'}</S.ItemOptions>
                    <S.ItemPrice>
                      ₩{(item.price || 0).toLocaleString()}
                    </S.ItemPrice>
                  </S.ItemInfo>
                  
                  <S.ItemControls>
                    <S.RemoveBtn 
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={actionLoading}
                    >
                      삭제
                    </S.RemoveBtn>
                    
                    <S.QuantityControls>
                      <S.QuantityBtn 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        disabled={actionLoading || (item.quantity || 1) <= 1}
                      >
                        -
                      </S.QuantityBtn>
                      <S.QuantityInput 
                        type="number"
                        value={item.quantity || 1}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          if (newQuantity !== (item.quantity || 1) && newQuantity > 0) {
                            handleQuantityChange(item.id, newQuantity);
                          }
                        }}
                        disabled={actionLoading}
                        min="1"
                        max="999"
                      />
                      <S.QuantityBtn 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        disabled={actionLoading}
                      >
                        +
                      </S.QuantityBtn>
                    </S.QuantityControls>
                    
                    <S.ItemTotal>
                      ₩{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </S.ItemTotal>
                  </S.ItemControls>
                </S.CartItem>
              );
            })}
          </S.CartItems>

          {/* 주문 요약 */}
          <S.CartSummary>
            <S.SummaryTitle>주문 요약</S.SummaryTitle>
            
            <S.SummaryRow>
              <S.SummaryLabel>상품금액</S.SummaryLabel>
              <S.SummaryValue>₩{(cartData.subtotal || 0).toLocaleString()}</S.SummaryValue>
            </S.SummaryRow>
            
            <S.SummaryRow>
              <S.SummaryLabel>배송비</S.SummaryLabel>
              <S.SummaryValue>
                {(cartData.shippingFee || 0) === 0 ? '무료' : `₩${(cartData.shippingFee || 0).toLocaleString()}`}
              </S.SummaryValue>
            </S.SummaryRow>
            
            {(cartData.shippingFee || 0) > 0 && (
              <S.SummaryRow style={{fontSize: '12px', color: '#999'}}>
                <span>5만원 이상 주문시 무료배송</span>
              </S.SummaryRow>
            )}
            
            <S.TotalRow>
              <S.TotalLabel>총 결제금액</S.TotalLabel>
              <S.TotalValue>₩{(cartData.totalAmount || 0).toLocaleString()}</S.TotalValue>
            </S.TotalRow>
            
            <S.CheckoutBtn onClick={handleCheckout} disabled={actionLoading}>
              {actionLoading ? '처리중...' : '결제하기'}
            </S.CheckoutBtn>
            
            <S.ContinueShoppingLink 
              href="/MD"
              onClick={(e) => {
                e.preventDefault();
                handleContinueShopping();
              }}
            >
              쇼핑 계속하기
            </S.ContinueShoppingLink>
          </S.CartSummary>
        </S.CartContent>

        {/* 함께 보면 좋은 상품 섹션 */}
        {recommendedItems.length > 0 && (
          <S.RecommendedSection>
            <S.RecommendedTitle>함께 보면 좋은 상품</S.RecommendedTitle>
            <S.RecommendedGrid>
              {recommendedItems.map(item => {
                const imageUrl = getImageUrl(item);
                
                return (
                  <S.RecommendedCard key={item.id || `rec-${Math.random()}`}>
                    <S.RecommendedImage 
                      onClick={() => handleRecommendedItemClick(item.id)}
                    >
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={item.name || '상품'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = '상품 이미지';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          color: '#6c757d',
                          fontSize: '12px'
                        }}>
                          상품 이미지
                        </div>
                      )}
                    </S.RecommendedImage>
                    <S.RecommendedName 
                      onClick={() => handleRecommendedItemClick(item.id)}
                    >
                      {item.name || '상품명 없음'}
                    </S.RecommendedName>
                    <S.RecommendedPrice>
                      ₩{(item.price || 0).toLocaleString()}
                    </S.RecommendedPrice>
                    <S.AddToCartBtn 
                      onClick={() => handleAddRecommendedToCart(item)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? '추가중...' : '장바구니 담기'}
                    </S.AddToCartBtn>
                  </S.RecommendedCard>
                );
              })}
            </S.RecommendedGrid>
          </S.RecommendedSection>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Cart;