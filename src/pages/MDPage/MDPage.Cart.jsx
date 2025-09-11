// MDPage.Cart.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled/MDPage.Cart.styled';

function Cart() {
  const navigate = useNavigate();
  
  // 장바구니 상품 더미 데이터 (실제로는 전역 상태나 API에서 가져올 것)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '한정판 포토북',
      price: 25000,
      quantity: 2,
      image: '상품 이미지 1',
      options: '사이즈: A4'
    },
    {
      id: 2, 
      name: 'Project X 굿즈 세트',
      price: 18000,
      quantity: 1,
      image: '상품 이미지 2',
      options: '색상: 블루'
    },
    {
      id: 3,
      name: '한정판 스티커팩',
      price: 8000,
      quantity: 3,
      image: '상품 이미지 3',
      options: '타입: 홀로그램'
    }
  ]);

  // 추천 상품 더미 데이터
  const [recommendedItems] = useState([
    {
      id: 101,
      name: 'Project X 에코백',
      price: 15000,
      image: '추천 상품 1'
    },
    {
      id: 102,
      name: '한정판 키링',
      price: 12000,
      image: '추천 상품 2'
    },
    {
      id: 103,
      name: 'Project X 머그컵',
      price: 20000,
      image: '추천 상품 3'
    }
  ]);

  // 수량 변경
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 개별 상품 삭제
  const handleRemoveItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  // 전체 삭제
  const handleClearAll = () => {
    setCartItems([]);
  };

  // 총 상품 가격 계산
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? (subtotal >= 50000 ? 0 : 3000) : 0;
  const total = subtotal + shipping;

  // 결제하기 버튼 클릭
  const handleCheckout = () => {
    navigate('/MD/payment');
  };

  // 쇼핑 계속하기
  const handleContinueShopping = () => {
    navigate('/MD');
  };

  // 추천 상품 장바구니에 추가
  const handleAddRecommendedToCart = (recommendedItem) => {
    const newItem = {
      id: recommendedItem.id,
      name: recommendedItem.name,
      price: recommendedItem.price,
      quantity: 1,
      image: recommendedItem.image,
      options: '기본 옵션'
    };
    
    // 이미 장바구니에 있는지 확인
    const existingItem = cartItems.find(item => item.id === recommendedItem.id);
    if (existingItem) {
      handleQuantityChange(recommendedItem.id, existingItem.quantity + 1);
    } else {
      setCartItems(items => [...items, newItem]);
    }
  };

  // 추천 상품 클릭시 상세페이지로 이동
  const handleRecommendedItemClick = (itemId) => {
    navigate(`/MD/product/${itemId}`);
  };

  // 장바구니가 비어있을 때
  if (cartItems.length === 0) {
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
                상품 ({cartItems.length}개)
              </S.CartHeaderTitle>
              <S.ClearAllBtn onClick={handleClearAll}>
                전체삭제
              </S.ClearAllBtn>
            </S.CartHeader>

            {cartItems.map(item => (
              <S.CartItem key={item.id}>
                <S.ItemImage>
                  {item.image}
                </S.ItemImage>
                
                <S.ItemInfo>
                  <S.ItemName>{item.name}</S.ItemName>
                  <S.ItemOptions>{item.options}</S.ItemOptions>
                  <S.ItemPrice>
                    ₩{item.price.toLocaleString()}
                  </S.ItemPrice>
                </S.ItemInfo>
                
                <S.ItemControls>
                  <S.RemoveBtn onClick={() => handleRemoveItem(item.id)}>
                    삭제
                  </S.RemoveBtn>
                  
                  <S.QuantityControls>
                    <S.QuantityBtn 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </S.QuantityBtn>
                    <S.QuantityInput 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    <S.QuantityBtn 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </S.QuantityBtn>
                  </S.QuantityControls>
                  
                  <S.ItemTotal>
                    ₩{(item.price * item.quantity).toLocaleString()}
                  </S.ItemTotal>
                </S.ItemControls>
              </S.CartItem>
            ))}
          </S.CartItems>

          {/* 주문 요약 */}
          <S.CartSummary>
            <S.SummaryTitle>주문 요약</S.SummaryTitle>
            
            <S.SummaryRow>
              <S.SummaryLabel>상품금액</S.SummaryLabel>
              <S.SummaryValue>₩{subtotal.toLocaleString()}</S.SummaryValue>
            </S.SummaryRow>
            
            <S.SummaryRow>
              <S.SummaryLabel>배송비</S.SummaryLabel>
              <S.SummaryValue>
                {shipping === 0 ? '무료' : `₩${shipping.toLocaleString()}`}
              </S.SummaryValue>
            </S.SummaryRow>
            
            {shipping > 0 && (
              <S.SummaryRow style={{fontSize: '12px', color: '#999'}}>
                <span>5만원 이상 주문시 무료배송</span>
              </S.SummaryRow>
            )}
            
            <S.TotalRow>
              <S.TotalLabel>총 결제금액</S.TotalLabel>
              <S.TotalValue>₩{total.toLocaleString()}</S.TotalValue>
            </S.TotalRow>
            
            <S.CheckoutBtn onClick={handleCheckout}>
              결제하기
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
        <S.RecommendedSection>
          <S.RecommendedTitle>함께 보면 좋은 상품</S.RecommendedTitle>
          <S.RecommendedGrid>
            {recommendedItems.map(item => (
              <S.RecommendedCard key={item.id}>
                <S.RecommendedImage 
                  onClick={() => handleRecommendedItemClick(item.id)}
                >
                  {item.image}
                </S.RecommendedImage>
                <S.RecommendedName 
                  onClick={() => handleRecommendedItemClick(item.id)}
                >
                  {item.name}
                </S.RecommendedName>
                <S.RecommendedPrice>
                  ₩{item.price.toLocaleString()}
                </S.RecommendedPrice>
                <S.AddToCartBtn 
                  onClick={() => handleAddRecommendedToCart(item)}
                >
                  장바구니 담기
                </S.AddToCartBtn>
              </S.RecommendedCard>
            ))}
          </S.RecommendedGrid>
        </S.RecommendedSection>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Cart;