// MDPage.ProductDetail.jsx - 안전한 렌더링 버전
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productAPI, cartAPI } from '../../services/productApi';
import StockDisplay from '../../components/StockDisplay';

// 🔧 styled-components 안전하게 import
let S;
try {
  S = require('./styled/MDPage.ProductDetail.styled');
} catch (error) {
  console.warn('Styled components 로딩 실패, 기본 스타일 사용:', error);
  // 기본 스타일 객체 생성
  S = {
    Container: 'div',
    ContentWrapper: 'div',
    LoadingContainer: 'div',
    LoadingSpinner: 'div',
    LoadingText: 'p',
    ErrorContainer: 'div',
    ErrorText: 'p',
    ButtonGroup: 'div',
    RetryButton: 'button',
    BackButton: 'button',
    Breadcrumb: 'nav',
    BreadcrumbItem: 'span',
    BreadcrumbSeparator: 'span',
    ProductDetailContainer: 'div',
    ImageSection: 'div',
    MainImageContainer: 'div',
    MainImage: 'img',
    ThumbnailContainer: 'div',
    ThumbnailImage: 'img',
    InfoSection: 'div',
    ProductTitle: 'h1',
    PriceContainer: 'div',
    OriginalPrice: 'span',
    DiscountRate: 'span',
    CurrentPrice: 'span',
    ProductDescription: 'p',
    OptionSection: 'div',
    OptionLabel: 'label',
    OptionSelect: 'select',
    QuantitySection: 'div',
    QuantityLabel: 'label',
    QuantityControls: 'div',
    QuantityButton: 'button',
    QuantityInput: 'input',
    TotalPriceSection: 'div',
    TotalPriceLabel: 'span',
    TotalPrice: 'span',
    ActionButtons: 'div',
    AddToCartButton: 'button',
    BuyNowButton: 'button',
    DetailInfoSection: 'div',
    DetailInfoTitle: 'h2',
    DetailInfoContent: 'div'
  };
}

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

  // 🔧 문자열을 배열로 안전하게 변환하는 헬퍼 함수
  const safeStringToArray = (data, delimiter = ',') => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      return data.split(delimiter)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }
    return [];
  };

  // 🔧 상품 데이터 후처리 함수
  const processProductData = (rawProduct) => {
    if (!rawProduct) return null;
    
    console.log('원본 상품 데이터:', rawProduct);
    
    const processedProduct = {
      ...rawProduct,
      images: safeStringToArray(rawProduct.images || rawProduct.imageUrls),
      options: rawProduct.options ? (() => {
        if (Array.isArray(rawProduct.options)) {
          return rawProduct.options;
        } else if (typeof rawProduct.options === 'string') {
          return safeStringToArray(rawProduct.options).map((option, index) => ({
            value: option,
            label: option
          }));
        }
        return [];
      })() : [],
      stockQuantity: rawProduct.stockQuantity || rawProduct.stock || 0,
      price: rawProduct.price || 0,
      originalPrice: rawProduct.originalPrice || rawProduct.price || 0,
      name: rawProduct.name || '상품명 없음',
      description: rawProduct.description || '상품 설명이 없습니다.',
    };
    
    if (!processedProduct.imageUrl && processedProduct.images.length > 0) {
      processedProduct.imageUrl = processedProduct.images[0];
    }
    
    console.log('처리된 상품 데이터:', processedProduct);
    return processedProduct;
  };

  // 🔧 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/status', {
        withCredentials: true,
        timeout: 5000
      });
      return response.data.isLoggedIn;
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  };

  // 🔧 상품 데이터 로드 - 403 에러 처리 개선
  const loadProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔧 403 에러 대비 재시도 로직
      let response;
      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount <= maxRetries) {
        try {
          response = await productAPI.getProductById(parseInt(id));
          break; // 성공시 루프 탈출
        } catch (apiError) {
          retryCount++;
          console.error(`API 호출 실패 (시도 ${retryCount}/${maxRetries + 1}):`, apiError);
          
          if (apiError.response?.status === 403) {
            console.log('403 에러 발생 - CORS 또는 권한 문제');
            if (retryCount <= maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
              continue;
            }
          }
          
          if (retryCount > maxRetries) {
            throw apiError;
          }
        }
      }

      if (response && response.success) {
        const processedProduct = processProductData(response.data);
        setProduct(processedProduct);
        
        if (processedProduct.options && processedProduct.options.length > 0) {
          setSelectedOption(processedProduct.options[0].value);
        }
      } else {
        setError(response?.message || '상품을 찾을 수 없습니다.');
      }

    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      
      // 🔧 403 에러 또는 네트워크 오류시 임시 목업 데이터 사용
      if (error.response?.status === 403 || 
          error.message.includes('Network Error') || 
          error.code === 'ERR_NETWORK') {
        console.log('API 연결 실패 - 임시 목업 데이터 사용');
        
        const mockProduct = {
          id: parseInt(id),
          name: "Project X 타일 세트",
          price: 30000,
          originalPrice: 35000,
          description: "부드러운 마이크로파이버 소재의 Project X 타일 세트입니다.",
          stockQuantity: 120,
          images: "/placeholder-product.jpg,/placeholder-product2.jpg",
          options: "색상:빨강,크기:대형",
          detailDescription: "고품질 마이크로파이버 소재로 제작된 프리미엄 타일 세트입니다."
        };
        
        const processedProduct = processProductData(mockProduct);
        setProduct(processedProduct);
        
        if (processedProduct.options && processedProduct.options.length > 0) {
          setSelectedOption(processedProduct.options[0].value);
        }
        
        // 사용자에게 알림
        setError('서버 연결 문제로 임시 데이터를 표시하고 있습니다.');
      } else {
        setError('상품 정보를 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProductDetail();
    }
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const checkStockAvailability = async (requestQuantity) => {
    const available = product.stockQuantity && product.stockQuantity >= requestQuantity;
    return {
      available: available,
      message: available ? '주문 가능합니다.' : `재고가 부족합니다. (현재 재고: ${product.stockQuantity || 0}개)`,
      currentStock: product.stockQuantity || 0
    };
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setCartLoading(true);

      const stockCheck = await checkStockAvailability(quantity);
      if (!stockCheck.available) {
        alert(stockCheck.message || '재고가 부족합니다.');
        return;
      }

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || product.images?.[0],
        quantity: quantity,
        selectedOption: selectedOption,
        description: product.description
      };

      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItemIndex = existingCart.findIndex(item => 
        item.id === cartItem.id && item.selectedOption === cartItem.selectedOption
      );

      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
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

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      setBuyNowLoading(true);

      const isLoggedIn = await checkLoginStatus();
      if (!isLoggedIn) {
        const confirmLogin = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
        if (confirmLogin) {
          localStorage.setItem('returnUrl', window.location.pathname);
          navigate('/login');
        }
        return;
      }

      const stockCheck = await checkStockAvailability(quantity);
      if (!stockCheck.available) {
        alert(stockCheck.message || '재고가 부족합니다.');
        return;
      }

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

      const directPurchaseData = {
        items: [directPurchaseItem],
        type: 'direct',
        totalAmount: directPurchaseItem.totalPrice,
        timestamp: new Date().toISOString()
      };

      sessionStorage.setItem('directPurchase', JSON.stringify(directPurchaseData));
      localStorage.setItem('tempDirectPurchase', JSON.stringify(directPurchaseData));

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

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // 🔧 안전한 렌더링 - S 객체가 undefined여도 동작
  if (loading) {
    return (
      <div className="container" style={{ padding: '20px', textAlign: 'center' }}>
        <div className="loading-container">
          <div className="loading-spinner" style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '20px', textAlign: 'center' }}>
        <div className="error-container">
          <p style={{ color: '#e74c3c', margin: '20px 0' }}>
            {error || '상품을 찾을 수 없습니다.'}
          </p>
          <div style={{ gap: '10px', display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={loadProductDetail}
              style={{ 
                padding: '10px 20px', 
                background: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              다시 시도
            </button>
            <button 
              onClick={handleGoBack}
              style={{ 
                padding: '10px 20px', 
                background: '#95a5a6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* 브레드크럼 */}
      <nav style={{ marginBottom: '30px', fontSize: '14px' }}>
        <span 
          onClick={() => navigate('/MD')}
          style={{ cursor: 'pointer', color: '#3498db' }}
        >
          MD
        </span>
        <span style={{ margin: '0 8px' }}>{'>'}</span>
        <span 
          onClick={() => navigate('/MD/products')}
          style={{ cursor: 'pointer', color: '#3498db' }}
        >
          전체상품
        </span>
        <span style={{ margin: '0 8px' }}>{'>'}</span>
        <span style={{ color: '#333', fontWeight: 'bold' }}>{product.name}</span>
      </nav>

      {/* 상품 상세 콘텐츠 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
        {/* 이미지 섹션 */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={
                (product.images && product.images.length > 0) 
                  ? product.images[selectedImageIndex] 
                  : product.imageUrl || '/placeholder-product.jpg'
              }
              alt={product.name}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
              onError={(e) => {
                e.target.src = '/placeholder-product.jpg';
              }}
            />
          </div>
          
          {/* 썸네일 이미지들 */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.images.map((image, index) => (
                <img
                  key={`thumb-${index}`}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: selectedImageIndex === index ? '2px solid #3498db' : '1px solid #ddd',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageChange(index)}
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 상품 정보 섹션 */}
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
            {product.name}
          </h1>
          
          <div style={{ marginBottom: '20px' }}>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span style={{ 
                  textDecoration: 'line-through', 
                  color: '#999', 
                  marginRight: '10px' 
                }}>
                  ₩{product.originalPrice?.toLocaleString()}
                </span>
                <span style={{ 
                  background: '#e74c3c', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginRight: '10px'
                }}>
                  {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </>
            )}
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
              ₩{product.price?.toLocaleString()}
            </span>
          </div>

          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
            {product.description}
          </p>

          {/* 상품 옵션 */}
          {product.options && product.options.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                옵션 선택
              </label>
              <select 
                value={selectedOption} 
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px' 
                }}
              >
                <option value="">옵션을 선택하세요</option>
                {product.options.map((option, index) => (
                  <option key={`option-${index}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 수량 선택 */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              수량
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                style={{ 
                  padding: '8px 12px', 
                  border: '1px solid #ddd', 
                  background: quantity <= 1 ? '#f5f5f5' : 'white',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer'
                }}
              >
                -
              </button>
              <input 
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                max="99"
                style={{ 
                  width: '60px', 
                  padding: '8px', 
                  textAlign: 'center', 
                  border: '1px solid #ddd' 
                }}
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 99}
                style={{ 
                  padding: '8px 12px', 
                  border: '1px solid #ddd', 
                  background: quantity >= 99 ? '#f5f5f5' : 'white',
                  cursor: quantity >= 99 ? 'not-allowed' : 'pointer'
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* 총 가격 */}
          <div style={{ 
            marginBottom: '30px', 
            padding: '15px', 
            background: '#f8f9fa', 
            borderRadius: '8px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>총 상품금액</span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#e74c3c' }}>
                ₩{(product.price * quantity).toLocaleString()}
              </span>
            </div>
          </div>

          {/* 재고 표시 */}
          {StockDisplay && (
            <StockDisplay 
              productId={product.id} 
              initialStock={product.stockQuantity}
              refreshInterval={15000}
              enableApiCall={false}
            />
          )}

          {/* 액션 버튼들 */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button 
              onClick={handleAddToCart}
              disabled={cartLoading || product.stockQuantity === 0}
              style={{ 
                flex: 1,
                padding: '15px', 
                background: cartLoading || product.stockQuantity === 0 ? '#ccc' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: cartLoading || product.stockQuantity === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {cartLoading ? '추가 중...' : '🛒 장바구니 담기'}
            </button>
            
            <button 
              onClick={handleBuyNow}
              disabled={buyNowLoading || product.stockQuantity === 0}
              style={{ 
                flex: 1,
                padding: '15px', 
                background: buyNowLoading || product.stockQuantity === 0 
                  ? '#ccc' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: buyNowLoading || product.stockQuantity === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {buyNowLoading ? '처리 중...' : '💳 바로구매'}
            </button>
          </div>

          {/* 바로구매 안내 */}
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
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div style={{ 
        marginTop: '60px', 
        padding: '30px', 
        background: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          상품 상세정보
        </h2>
        <div style={{ lineHeight: '1.8', color: '#555' }}>
          {product.detailDescription || product.description || '상세 정보가 없습니다.'}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;