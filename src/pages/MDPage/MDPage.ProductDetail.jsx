// MDPage.ProductDetail.jsx - StockDisplay 완전 적용 버전
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productAPI, cartAPI } from '../../services/productApi';
import * as S from './styled/MDPage.ProductDetail.styled';
import StockDisplay from '../../components/StockDisplay';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [cartLoading, setCartLoading] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/status', {
        withCredentials: true
      });
      return response.data.isLoggedIn;
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      // 네트워크 오류시 localStorage 확인
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  };

  // 상품 데이터 로드
  const loadProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productAPI.getProductById(parseInt(id));

      if (response.success) {
        setProduct(response.data);
        console.log('상품 데이터 로드 완료:', response.data);
        
        // 옵션이 있는 경우 첫 번째 옵션을 기본 선택
        if (response.data.options && response.data.options.length > 0) {
          setSelectedOption(response.data.options[0].value);
        }
      } else {
        setError(response.message || '상품을 찾을 수 없습니다.');
      }

    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      setError('상품 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 상품 데이터 로드
  useEffect(() => {
    if (id) {
      loadProductDetail();
    }
  }, [id]);

  // 수량 변경
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  // 재고 확인 함수 (API 호출 없이 기본 로직만 사용)
  const checkStockAvailability = async (requestQuantity) => {
    console.log('재고 확인 - 기본 로직 사용:', { 
      현재재고: product.stockQuantity, 
      요청수량: requestQuantity 
    });
    
    // 기본적인 재고 체크만 수행 (API 호출 없음)
    const available = product.stockQuantity && product.stockQuantity >= requestQuantity;
    
    return {
      available: available,
      message: available ? '주문 가능합니다.' : `재고가 부족합니다. (현재 재고: ${product.stockQuantity || 0}개)`,
      currentStock: product.stockQuantity || 0
    };
  };

  // 장바구니 추가
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setCartLoading(true);

      // 재고 확인
      const stockCheck = await checkStockAvailability(quantity);
      if (!stockCheck.available) {
        alert(stockCheck.message || '재고가 부족합니다.');
        return;
      }

      // 장바구니에 추가할 상품 정보 구성
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || product.images?.[0],
        quantity: quantity,
        selectedOption: selectedOption,
        description: product.description
      };

      // localStorage 직접 업데이트 방식 사용
      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // 같은 상품이 이미 있는지 확인
      const existingItemIndex = existingCart.findIndex(item => 
        item.id === cartItem.id && item.selectedOption === cartItem.selectedOption
      );

      if (existingItemIndex >= 0) {
        // 기존 아이템 수량 증가
        existingCart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        // 새 아이템 추가
        existingCart.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      
      // 장바구니 업데이트 이벤트 발생
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      // 성공 알림
      if (window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?')) {
        navigate('/MD/cart');
      }

    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    } finally {
      setCartLoading(false);
    }
  };

  // 바로구매 기능
  const handleBuyNow = async () => {
    if (!product) return;

    try {
      setBuyNowLoading(true);

      // 1. 로그인 상태 확인
      const isLoggedIn = await checkLoginStatus();
      if (!isLoggedIn) {
        const confirmLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
        if (confirmLogin) {
          navigate('/login');
        }
        return;
      }

      // 2. 재고 확인
      const stockCheck = await checkStockAvailability(quantity);
      if (!stockCheck.available) {
        alert(stockCheck.message || '재고가 부족합니다.');
        return;
      }

      // 3. 바로구매 상품 정보 구성
      const directPurchaseItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        imageUrl: product.imageUrl || product.images?.[0] || '',
        images: product.images || [],
        quantity: quantity,
        selectedOption: selectedOption,
        description: product.description,
        category: product.category || '일반',
        totalPrice: product.price * quantity,
        purchaseType: 'direct',
        timestamp: new Date().toISOString()
      };

      // 4. 저장소에 데이터 저장
      const directPurchaseData = {
        items: [directPurchaseItem],
        type: 'direct',
        totalAmount: directPurchaseItem.totalPrice,
        timestamp: new Date().toISOString()
      };

      sessionStorage.setItem('directPurchase', JSON.stringify(directPurchaseData));
      localStorage.setItem('tempDirectPurchase', JSON.stringify(directPurchaseData));

      console.log('바로구매 데이터 저장 완료:', directPurchaseData);

      // 5. 결제 페이지로 이동
      navigate('/MD/payment?type=direct&source=productDetail', {
        state: {
          purchaseType: 'direct',
          items: [directPurchaseItem],
          fromProductDetail: true
        }
      });

    } catch (error) {
      console.error('바로구매 처리 실패:', error);
      alert('구매 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setBuyNowLoading(false);
    }
  };

  // 이미지 변경
  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  // 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 로딩 중
  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingContainer>
            <S.LoadingSpinner />
            <S.LoadingText>상품 정보를 불러오는 중...</S.LoadingText>
          </S.LoadingContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 에러 발생
  if (error || !product) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.ErrorContainer>
            <S.ErrorText>{error || '상품을 찾을 수 없습니다.'}</S.ErrorText>
            <S.ButtonGroup>
              <S.RetryButton onClick={loadProductDetail}>다시 시도</S.RetryButton>
              <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
            </S.ButtonGroup>
          </S.ErrorContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        {/* 브레드크럼 네비게이션 */}
        <S.Breadcrumb>
          <S.BreadcrumbItem onClick={() => navigate('/MD')}>MD</S.BreadcrumbItem>
          <S.BreadcrumbSeparator>{'>'}</S.BreadcrumbSeparator>
          <S.BreadcrumbItem onClick={() => navigate('/MD/products')}>전체상품</S.BreadcrumbItem>
          <S.BreadcrumbSeparator>{'>'}</S.BreadcrumbSeparator>
          <S.BreadcrumbItem $active>{product.name}</S.BreadcrumbItem>
        </S.Breadcrumb>

        {/* 상품 상세 콘텐츠 */}
        <S.ProductDetailContainer>
          {/* 이미지 섹션 */}
          <S.ImageSection>
            <S.MainImageContainer>
              <S.MainImage 
                src={product.images?.[selectedImageIndex] || product.imageUrl || '/placeholder-product.jpg'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
            </S.MainImageContainer>
            
            {/* 썸네일 이미지들 */}
            {product.images && product.images.length > 1 && (
              <S.ThumbnailContainer>
                {product.images.map((image, index) => (
                  <S.ThumbnailImage
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    $active={selectedImageIndex === index}
                    onClick={() => handleImageChange(index)}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                ))}
              </S.ThumbnailContainer>
            )}
          </S.ImageSection>

          {/* 상품 정보 섹션 */}
          <S.InfoSection>
            <S.ProductTitle>{product.name}</S.ProductTitle>
            
            <S.PriceContainer>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <S.OriginalPrice>₩{product.originalPrice?.toLocaleString()}</S.OriginalPrice>
                  <S.DiscountRate>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </S.DiscountRate>
                </>
              )}
              <S.CurrentPrice>₩{product.price?.toLocaleString()}</S.CurrentPrice>
            </S.PriceContainer>

            <S.ProductDescription>{product.description}</S.ProductDescription>

            {/* 상품 옵션 */}
            {product.options && product.options.length > 0 && (
              <S.OptionSection>
                <S.OptionLabel>옵션 선택</S.OptionLabel>
                <S.OptionSelect 
                  value={selectedOption} 
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {product.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </S.OptionSelect>
              </S.OptionSection>
            )}

            {/* 수량 선택 */}
            <S.QuantitySection>
              <S.QuantityLabel>수량</S.QuantityLabel>
              <S.QuantityControls>
                <S.QuantityButton 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </S.QuantityButton>
                <S.QuantityInput 
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max="99"
                />
                <S.QuantityButton 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  +
                </S.QuantityButton>
              </S.QuantityControls>
            </S.QuantitySection>

            {/* 총 가격 */}
            <S.TotalPriceSection>
              <S.TotalPriceLabel>총 상품금액</S.TotalPriceLabel>
              <S.TotalPrice>₩{(product.price * quantity).toLocaleString()}</S.TotalPrice>
            </S.TotalPriceSection>

            {/* ⭐ 실시간 재고 표시 컴포넌트 - API 호출 비활성화 */}
            <StockDisplay 
              productId={product.id} 
              initialStock={product.stockQuantity}
              refreshInterval={15000}  // 15초마다 재고 체크
              enableApiCall={false}    // API 호출 비활성화 (백엔드 API 준비전까지)
            />

            {/* 액션 버튼들 */}
            <S.ActionButtons>
              <S.AddToCartButton 
                onClick={handleAddToCart}
                disabled={cartLoading || product.stockQuantity === 0}
              >
                {cartLoading ? '추가 중...' : '🛒 장바구니 담기'}
              </S.AddToCartButton>
              
              <S.BuyNowButton 
                onClick={handleBuyNow}
                disabled={buyNowLoading || product.stockQuantity === 0}
                style={{
                  background: buyNowLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transform: buyNowLoading ? 'none' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {buyNowLoading ? '처리 중...' : '💳 바로구매'}
              </S.BuyNowButton>
            </S.ActionButtons>

            {/* 바로구매 안내 메시지 */}
            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#666',
              textAlign: 'center'
            }}>
              💡 바로구매 시 해당 상품만 결제됩니다
            </div>
          </S.InfoSection>
        </S.ProductDetailContainer>

        {/* 상세 정보 섹션 */}
        <S.DetailInfoSection>
          <S.DetailInfoTitle>상품 상세정보</S.DetailInfoTitle>
          <S.DetailInfoContent>
            {product.detailDescription || product.description || '상세 정보가 없습니다.'}
          </S.DetailInfoContent>
        </S.DetailInfoSection>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default ProductDetail;