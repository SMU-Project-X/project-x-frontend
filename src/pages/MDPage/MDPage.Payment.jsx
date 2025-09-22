// MDPage.Payment.jsx - 바로구매/장바구니 구분 로직 완전 수정
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import tossPaymentsService from '../../services/paymentApi';
import * as S from './styled/MDPage.Payment.styled';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // 핵심: 결제 페이지 진입 경로를 명확히 구분
  const paymentSource = searchParams.get('source') || location.state?.source || 'unknown';
  
  // 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [purchaseType, setPurchaseType] = useState(null); // 'direct' | 'cart'
  
  // 로그인 상태
  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: false,
    userId: null,
    username: null,
    isAdmin: false
  });

  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: ''
  });

  // 폼 데이터
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    address: '',
    detailAddress: '',
    deliveryRequest: '',
    selectedCoupon: '',
    paymentMethod: 'card'
  });

  // UI 상태
  const [showCoupons, setShowCoupons] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');

  // 쿠폰 목록
  const [availableCoupons] = useState([
    { id: 1, name: '신규회원 10% 할인', discount: 0.1, minOrder: 20000 },
    { id: 2, name: '5만원 이상 5천원 할인', discount: 5000, minOrder: 50000 },
    { id: 3, name: '무료배송 쿠폰', discount: 3000, minOrder: 30000, type: 'shipping' }
  ]);

  // 핵심 개선: 결제 페이지 진입 경로별 데이터 로드
  const loadOrderItems = () => {
    try {
      console.log('결제 데이터 로드 시작 - 진입 경로:', paymentSource);

      let items = [];
      let type = null;

      // 1. 진입 경로별 명확한 데이터 소스 구분
      if (paymentSource === 'direct' || paymentSource === 'product') {
        // 바로구매 진입: location.state 우선, 그 다음 세션
        console.log('바로구매 진입 - 데이터 소스 확인');
        
        if (location.state?.product) {
          // 상품 상세에서 직접 넘어온 경우
          const product = location.state.product;
          const quantity = location.state.quantity || 1;
          
          items = [{
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            imageUrl: product.imageUrls?.[0] || product.imageUrl,
            stockQuantity: product.stockQuantity,
            selectedOption: location.state.selectedOption
          }];
          
          type = 'direct';
          console.log('location.state에서 바로구매 상품 로드:', items);
          
        } else {
          // 세션에서 바로구매 데이터 확인 (폴백)
          const directPurchaseData = sessionStorage.getItem('directPurchase');
          if (directPurchaseData) {
            const parsed = JSON.parse(directPurchaseData);
            if (parsed.items && parsed.items.length > 0) {
              items = parsed.items;
              type = 'direct';
              console.log('세션에서 바로구매 데이터 복구:', items);
            }
          }
        }
        
      } else if (paymentSource === 'cart') {
        // 장바구니 진입: 장바구니 데이터만 사용
        console.log('장바구니 진입 - 장바구니 데이터만 로드');
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        if (cartItems && cartItems.length > 0) {
          items = cartItems.map(item => ({
            id: item.id || item.productId,
            productId: item.id || item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            imageUrl: item.imageUrl || item.imageUrls?.[0],
            stockQuantity: item.stockQuantity,
            selectedOption: item.selectedOption
          }));
          
          type = 'cart';
          console.log('장바구니에서 상품 로드:', items);
        }
        
      } else {
        // 진입 경로가 불명확한 경우: 기존 로직으로 폴백
        console.log('진입 경로 불명확 - 기존 로직 사용');
        
        const purchaseTypeParam = searchParams.get('type');
        const directPurchaseSession = sessionStorage.getItem('directPurchase');
        
        if (purchaseTypeParam === 'direct' || directPurchaseSession) {
          // 바로구매 데이터 로드
          let directData = null;
          if (directPurchaseSession) {
            directData = JSON.parse(directPurchaseSession);
          }
          
          if (directData && directData.items) {
            items = directData.items;
            type = 'direct';
            console.log('폴백: 세션에서 바로구매 데이터 로드');
          }
        } else {
          // 장바구니 데이터 로드
          const cartData = localStorage.getItem('cartItems');
          if (cartData) {
            const parsedItems = JSON.parse(cartData);
            if (parsedItems && parsedItems.length > 0) {
              items = parsedItems;
              type = 'cart';
              console.log('폴백: 장바구니 데이터 로드');
            }
          }
        }
      }

      // 2. 데이터 검증 및 상태 설정
      if (items.length === 0) {
        console.warn('주문 상품이 없습니다. 진입 경로:', paymentSource);
        setError('주문할 상품 정보를 찾을 수 없습니다.');
        return;
      }

      // 3. 중요: 타입별 세션 데이터 정리
      if (type === 'cart') {
        // 장바구니 결제 시: 바로구매 세션 데이터 즉시 정리
        sessionStorage.removeItem('directPurchase');
        localStorage.removeItem('tempDirectPurchase');
        console.log('장바구니 결제 - 바로구매 세션 데이터 정리 완료');
      }

      // 상태 설정
      setOrderItems(items);
      setPurchaseType(type);
      
      console.log('주문 데이터 로드 완료:', {
        타입: type,
        상품수: items.length,
        진입경로: paymentSource,
        상품목록: items.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }))
      });

    } catch (error) {
      console.error('주문 상품 데이터 로드 실패:', error);
      setError('주문 정보를 불러오는데 실패했습니다.');
      setOrderItems([]);
    }
  };

  // 로그인 상태 확인 및 사용자 정보 로드
  const checkLoginAndLoadUserInfo = async () => {
    try {
      console.log('로그인 상태 확인 시작');

      // 로컬 스토리지에서 기본 정보 확인
      const localUserId = localStorage.getItem('userId');
      const localUserName = localStorage.getItem('username');
      const localIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!localUserId || !localIsLoggedIn) {
        throw new Error('로그인이 필요합니다.');
      }

      // 서버 상태 확인 (선택적)
      try {
        const response = await axios.get('http://localhost:8080/api/users/status', {
          withCredentials: true,
          timeout: 3000
        });

        if (response.data.isLoggedIn) {
          setLoginStatus({
            isLoggedIn: true,
            userId: response.data.userId || localUserId,
            username: response.data.username || localUserName,
            isAdmin: response.data.isAdmin || false
          });

          // 사용자 상세 정보 로드
          try {
            const userResponse = await axios.get(
              `http://localhost:8080/api/users/${response.data.userId}`, 
              { withCredentials: true, timeout: 3000 }
            );

            const userData = userResponse.data;
            setUserInfo({
              name: userData.name || userData.username || localUserName || '',
              phone: userData.phone || '010-0000-0000',
              email: userData.email || '',
              address: userData.address || '',
              detailAddress: ''
            });

            setFormData(prev => ({
              ...prev,
              recipientName: userData.name || userData.username || localUserName || '',
              recipientPhone: userData.phone || '010-0000-0000',
              recipientEmail: userData.email || '',
              address: userData.address || ''
            }));

          } catch (userError) {
            console.warn('사용자 상세 정보 로드 실패, 기본값 사용:', userError.message);
            setFormData(prev => ({
              ...prev,
              recipientName: localUserName || '',
              recipientPhone: '010-0000-0000'
            }));
          }

          console.log('서버 로그인 상태 확인 완료');
          return true;
        }
      } catch (serverError) {
        console.warn('서버 상태 확인 실패, 로컬 데이터 사용:', serverError.message);
      }

      // 서버 확인 실패 시 로컬 데이터 사용
      setLoginStatus({
        isLoggedIn: true,
        userId: localUserId,
        username: localUserName,
        isAdmin: localStorage.getItem('isAdmin') === 'true'
      });

      setUserInfo({
        name: localUserName || '',
        phone: '010-0000-0000',
        email: '',
        address: '',
        detailAddress: ''
      });

      setFormData(prev => ({
        ...prev,
        recipientName: localUserName || '',
        recipientPhone: '010-0000-0000'
      }));

      console.log('로컬 로그인 상태 확인 완료');
      return true;

    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            redirectTo: location.pathname + location.search,
            message: '결제를 위해 로그인이 필요합니다.'
          } 
        });
      }, 2000);
      
      return false;
    }
  };

  // 결제 처리 전 최종 검증
  const validatePaymentData = () => {
    console.log('결제 데이터 최종 검증:', {
      진입경로: paymentSource,
      결제타입: purchaseType,
      상품수: orderItems.length,
      상품목록: orderItems.map(item => ({ id: item.id, name: item.name }))
    });

    // 진입 경로와 결제 타입 일치 여부 확인
    if (paymentSource === 'cart' && purchaseType !== 'cart') {
      console.error('진입 경로와 결제 타입 불일치!', { paymentSource, purchaseType });
      setError('결제 정보가 올바르지 않습니다. 다시 시도해주세요.');
      return false;
    }

    if (paymentSource === 'direct' && purchaseType !== 'direct') {
      console.error('진입 경로와 결제 타입 불일치!', { paymentSource, purchaseType });
      setError('결제 정보가 올바르지 않습니다. 다시 시도해주세요.');
      return false;
    }

    return true;
  };

  // 가격 계산
  const calculateTotals = () => {
    if (!orderItems || orderItems.length === 0) {
      return { subtotal: 0, shippingFee: 0, discountAmount: 0, totalAmount: 0 };
    }

    const subtotal = orderItems.reduce((sum, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return sum + (price * quantity);
    }, 0);

    let shippingFee = subtotal >= 50000 ? 0 : 3000;
    let discountAmount = 0;

    if (formData.selectedCoupon) {
      const selectedCoupon = availableCoupons.find(c => c.id.toString() === formData.selectedCoupon);
      if (selectedCoupon && subtotal >= selectedCoupon.minOrder) {
        if (selectedCoupon.type === 'shipping') {
          shippingFee = Math.max(0, shippingFee - selectedCoupon.discount);
        } else if (selectedCoupon.discount < 1) {
          discountAmount = Math.floor(subtotal * selectedCoupon.discount);
        } else {
          discountAmount = selectedCoupon.discount;
        }
      }
    }

    const totalAmount = subtotal - discountAmount + shippingFee;
    return { subtotal, shippingFee, discountAmount, totalAmount };
  };

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 결제 수단 변경
  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
    if (method === 'transfer' || method === 'deposit') {
      generateAccountNumber();
    }
  };

  // 계좌번호 생성
  const generateAccountNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    setAccountNumber(`1002-${randomNum.substring(0,4)}-${randomNum.substring(4,8)}-${randomNum.substring(8,12)}`);
  };

  // 쿠폰 선택
  const handleCouponSelect = (couponId) => {
    setFormData(prev => ({ ...prev, selectedCoupon: couponId }));
    setShowCoupons(false);
  };

  // 결제 처리 메인 함수
  const handlePayment = async () => {
    // 최종 검증
    if (!validatePaymentData()) {
      return;
    }

    // 기본 검증
    if (!formData.recipientName || !formData.recipientPhone || !formData.address) {
      alert('배송 정보를 모두 입력해주세요.');
      return;
    }

    if (orderItems.length === 0) {
      alert('주문할 상품이 없습니다.');
      return;
    }

    const { totalAmount } = calculateTotals();
    if (totalAmount <= 0) {
      alert('결제 금액이 올바르지 않습니다.');
      return;
    }

    setIsProcessing(true);

    try {
      // 주문 정보 생성
      const orderInfo = {
        orderNumber: 'ORD' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
        items: orderItems,
        purchaseType: purchaseType,
        paymentSource: paymentSource, // 진입 경로 기록
        recipient: {
          name: formData.recipientName,
          phone: formData.recipientPhone,
          email: formData.recipientEmail,
          address: formData.address,
          detailAddress: formData.detailAddress
        },
        deliveryRequest: formData.deliveryRequest,
        paymentMethod: formData.paymentMethod,
        userId: loginStatus.userId,
        createdAt: new Date().toISOString(),
        ...calculateTotals()
      };

      console.log('결제 처리 시작:', {
        method: formData.paymentMethod,
        amount: totalAmount,
        orderNumber: orderInfo.orderNumber,
        type: purchaseType,
        source: paymentSource
      });

      if (formData.paymentMethod === 'card') {
        await handleTossPayment(orderInfo);
      } else {
        await handleGeneralPayment(orderInfo);
      }

    } catch (error) {
      console.error('결제 처리 실패:', error);
      alert(`결제 처리 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 토스페이먼츠 결제
  const handleTossPayment = async (orderInfo) => {
    try {
      // 주문 정보 세션 저장
      sessionStorage.setItem('pendingOrder', JSON.stringify(orderInfo));

      const tossPaymentData = {
        amount: orderInfo.totalAmount,
        orderName: `${orderInfo.items[0]?.name || '상품'} ${orderInfo.items.length > 1 ? `외 ${orderInfo.items.length - 1}개` : ''}`,
        customerName: orderInfo.recipient.name,
        customerEmail: orderInfo.recipient.email,
        customerPhone: orderInfo.recipient.phone,
        orderId: orderInfo.orderNumber,
        successUrl: `${window.location.origin}/MD/payment/success`,
        failUrl: `${window.location.origin}/MD/payment/fail`
      };

      const result = await tossPaymentsService.requestPayment(tossPaymentData);
      
      if (!result.success) {
        if (result.code === 'USER_CANCEL') {
          alert('결제가 취소되었습니다.');
        } else {
          alert(`결제 오류: ${result.error}`);
        }
        sessionStorage.removeItem('pendingOrder');
        return;
      }

    } catch (error) {
      console.error('토스페이먼츠 결제 오류:', error);
      sessionStorage.removeItem('pendingOrder');
      throw error;
    }
  };

  // 일반 결제
  const handleGeneralPayment = async (orderInfo) => {
    try {
      sessionStorage.setItem('completedOrder', JSON.stringify(orderInfo));
      
      // 중요: 결제 완료 후 해당 타입의 데이터만 정리
      if (purchaseType === 'cart') {
        localStorage.removeItem('cartItems');
        localStorage.setItem('cartCount', '0');
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0, items: [] } }));
        console.log('장바구니 데이터 정리 완료');
      } else if (purchaseType === 'direct') {
        sessionStorage.removeItem('directPurchase');
        localStorage.removeItem('tempDirectPurchase');
        console.log('바로구매 데이터 정리 완료');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      navigate(`/MD/payment/complete?orderId=${orderInfo.orderNumber}&amount=${orderInfo.totalAmount}&method=${formData.paymentMethod}&source=${paymentSource}`, {
        state: {
          ...orderInfo,
          paymentSuccess: true,
          accountNumber: accountNumber
        }
      });

    } catch (error) {
      console.error('일반 결제 처리 오류:', error);
      throw error;
    }
  };

  // 컴포넌트 초기화
  useEffect(() => {
    const initializePayment = async () => {
      setIsLoading(true);
      
      try {
        console.log('결제 페이지 초기화 시작:', {
          진입경로: paymentSource,
          location_state: location.state,
          search_params: Object.fromEntries(searchParams)
        });

        const loginSuccess = await checkLoginAndLoadUserInfo();
        if (!loginSuccess) {
          return;
        }

        loadOrderItems();
        
      } catch (error) {
        console.error('결제 페이지 초기화 실패:', error);
        setError('결제 페이지를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [searchParams, location]);

  // 로딩 중
  if (isLoading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingContainer>
            <S.LoadingSpinner />
            <h2>결제 정보를 불러오는 중...</h2>
            <p>잠시만 기다려주세요.</p>
          </S.LoadingContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  // 에러 또는 상품 없음
  if (error || !orderItems || orderItems.length === 0) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.EmptyContainer>
            <h2>{error || '주문할 상품이 없습니다'}</h2>
            <p>장바구니에 상품을 담거나 상품 상세페이지에서 바로구매를 이용해주세요.</p>
            <S.BackBtn onClick={() => navigate('/MD')}>
              쇼핑하러 가기
            </S.BackBtn>
          </S.EmptyContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  const { subtotal, shippingFee, discountAmount, totalAmount } = calculateTotals();

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>
          {purchaseType === 'direct' ? '바로구매 결제' : '장바구니 결제'}
        </S.Title>

        <S.PaymentContent>
          {/* 왼쪽: 주문 정보 */}
          <S.PaymentForm>
            {/* 주문 상품 정보 */}
            <S.Section>
              <S.SectionTitle>
                주문 상품 정보 ({orderItems.length}개)
                {purchaseType === 'direct' && (
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#667eea', 
                    fontWeight: 'normal',
                    marginLeft: '10px'
                  }}>
                    (바로구매)
                  </span>
                )}
                {purchaseType === 'cart' && (
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#f39c12', 
                    fontWeight: 'normal',
                    marginLeft: '10px'
                  }}>
                    (장바구니)
                  </span>
                )}
              </S.SectionTitle>
              
              {orderItems.map((item, index) => (
                <S.OrderItem key={index}>
                  <S.ItemImage>
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px'}}
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                    ) : '이미지'}
                  </S.ItemImage>
                  <S.ItemInfo>
                    <S.ItemName>{item.name}</S.ItemName>
                    {item.selectedOption && (
                      <S.ItemOptions>옵션: {item.selectedOption}</S.ItemOptions>
                    )}
                    <S.ItemQuantity>수량: {item.quantity}개</S.ItemQuantity>
                  </S.ItemInfo>
                  <S.ItemPrice>
                    {((item.price || 0) * (item.quantity || 1)).toLocaleString()}원
                  </S.ItemPrice>
                </S.OrderItem>
              ))}
            </S.Section>

            {/* 배송 정보 */}
            <S.Section>
              <S.SectionTitle>배송 정보</S.SectionTitle>
              <S.FormRow>
                <S.FormGroup>
                  <S.Label>받는 분 이름 *</S.Label>
                  <S.Input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    placeholder="받는 분 이름을 입력하세요"
                    required
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.Label>휴대폰 번호 *</S.Label>
                  <S.Input
                    type="tel"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleInputChange}
                    placeholder="010-0000-0000"
                    required
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <S.Label>이메일</S.Label>
                  <S.Input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    placeholder="이메일 주소를 입력하세요"
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <S.Label>주소 *</S.Label>
                  <S.Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="주소를 입력하세요"
                    required
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.Label>상세주소</S.Label>
                  <S.Input
                    type="text"
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    placeholder="상세 주소를 입력하세요"
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormGroup>
                <S.Label>배송 요청사항</S.Label>
                <S.Select
                  name="deliveryRequest"
                  value={formData.deliveryRequest}
                  onChange={handleInputChange}
                >
                  <option value="">배송 요청사항을 선택하세요</option>
                  <option value="door">문 앞에 놓아주세요</option>
                  <option value="security">경비실에 맡겨주세요</option>
                  <option value="call">배송 전 연락주세요</option>
                  <option value="careful">파손 주의</option>
                </S.Select>
              </S.FormGroup>
            </S.Section>

            {/* 결제 수단 */}
            <S.Section>
              <S.SectionTitle>결제 수단</S.SectionTitle>
              <S.PaymentMethods>
                {[
                  { value: 'card', label: '신용/체크카드', icon: '💳' },
                  { value: 'transfer', label: '계좌이체', icon: '🏦' },
                  { value: 'deposit', label: '무통장입금', icon: '💰' }
                ].map(method => (
                  <S.PaymentMethod key={method.value} $selected={formData.paymentMethod === method.value}>
                    <S.RadioInput
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => handlePaymentMethodChange(e.target.value)}
                    />
                    <S.PaymentLabel>
                      {method.icon} {method.label}
                    </S.PaymentLabel>
                  </S.PaymentMethod>
                ))}
              </S.PaymentMethods>
              
              {(formData.paymentMethod === 'transfer' || formData.paymentMethod === 'deposit') && accountNumber && (
                <S.AccountInfo>
                  <strong>입금 계좌: 국민은행 {accountNumber}</strong>
                  <br />
                  <span>예금주: (주)ProjectX | 입금액: {totalAmount.toLocaleString()}원</span>
                </S.AccountInfo>
              )}
            </S.Section>
          </S.PaymentForm>

          {/* 오른쪽: 결제 정보 */}
          <S.OrderSummary>
            <S.SummaryTitle>결제 정보</S.SummaryTitle>
            
            <S.PriceSummary>
              <S.PriceRow>
                <S.PriceLabel>상품금액</S.PriceLabel>
                <S.PriceValue>{subtotal.toLocaleString()}원</S.PriceValue>
              </S.PriceRow>
              
              <S.PriceRow>
                <S.PriceLabel>배송비</S.PriceLabel>
                <S.PriceValue>{shippingFee.toLocaleString()}원</S.PriceValue>
              </S.PriceRow>
              
              {discountAmount > 0 && (
                <S.PriceRow style={{ color: '#e74c3c' }}>
                  <S.PriceLabel>할인금액</S.PriceLabel>
                  <S.PriceValue>-{discountAmount.toLocaleString()}원</S.PriceValue>
                </S.PriceRow>
              )}
              
              <S.TotalRow>
                <S.TotalLabel>최종 결제금액</S.TotalLabel>
                <S.TotalValue>{totalAmount.toLocaleString()}원</S.TotalValue>
              </S.TotalRow>
            </S.PriceSummary>

            {/* 결제 버튼 */}
            <S.PayBtn
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? '결제 처리 중...' : `${totalAmount.toLocaleString()}원 결제하기`}
            </S.PayBtn>

            <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              {formData.paymentMethod === 'card' ? 
                '토스페이먼츠 결제창이 열립니다.' :
                '결제 시 개인정보 수집 및 이용에 동의한 것으로 간주됩니다.'
              }
            </div>
          </S.OrderSummary>
        </S.PaymentContent>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Payment;