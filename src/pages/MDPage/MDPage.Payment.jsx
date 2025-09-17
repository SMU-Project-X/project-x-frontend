// MDPage.Payment.jsx - 토스페이먼츠 연동 수정 버전
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import tossPaymentsService from '../../services/paymentApi';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // 로딩 상태 관리
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🚀 로그인 상태 관리
  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: false,
    userId: null,
    username: null,
    isAdmin: false
  });
  
  // 🚀 사용자 정보
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: ''
  });

  // 🚀 주문 상품 데이터
  const [orderItems, setOrderItems] = useState([]);
  const [purchaseType, setPurchaseType] = useState('cart');

  // 폼 상태
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    address: '',
    detailAddress: '',
    deliveryRequest: '문 앞에 놓아주세요',
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

  // 🚀 로그인 상태 및 사용자 정보 확인
  const checkLoginAndLoadUserInfo = async () => {
    try {
      const statusResponse = await axios.get('http://localhost:8080/api/users/status', {
        withCredentials: true
      });

      if (!statusResponse.data.isLoggedIn) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return false;
      }

      setLoginStatus(statusResponse.data);

      const userResponse = await axios.get(
        `http://localhost:8080/api/users/${statusResponse.data.userId}`, 
        { withCredentials: true }
      );

      const userData = userResponse.data;
      setUserInfo({
        name: userData.name || userData.username || '',
        phone: '010-0000-0000',
        email: userData.email || '',
        address: userData.address || '',
        detailAddress: ''
      });

      setFormData(prev => ({
        ...prev,
        recipientName: userData.name || userData.username || '',
        recipientPhone: '010-0000-0000',
        recipientEmail: userData.email || '',
        address: userData.address || '',
        detailAddress: ''
      }));

      return true;

    } catch (error) {
      console.error('로그인 확인 실패:', error);
      
      const localLogin = localStorage.getItem('isLoggedIn') === 'true';
      if (localLogin) {
        setLoginStatus({
          isLoggedIn: true,
          userId: localStorage.getItem('userId'),
          username: localStorage.getItem('username'),
          isAdmin: localStorage.getItem('isAdmin') === 'true'
        });
        
        setUserInfo({
          name: localStorage.getItem('username') || '',
          phone: '010-0000-0000',
          email: '',
          address: '',
          detailAddress: ''
        });

        setFormData(prev => ({
          ...prev,
          recipientName: localStorage.getItem('username') || '',
          recipientPhone: '010-0000-0000'
        }));

        return true;
      } else {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return false;
      }
    }
  };

  // 🚀 주문 상품 데이터 로드
  const loadOrderItems = () => {
    try {
      const purchaseTypeParam = searchParams.get('type');
      const directPurchaseSession = sessionStorage.getItem('directPurchase');
      const directPurchaseLocal = localStorage.getItem('tempDirectPurchase');
      
      if (purchaseTypeParam === 'direct' || directPurchaseSession || directPurchaseLocal) {
        let directData = null;
        
        if (directPurchaseSession) {
          directData = JSON.parse(directPurchaseSession);
        } else if (directPurchaseLocal) {
          directData = JSON.parse(directPurchaseLocal);
        }
        
        if (directData && directData.items) {
          setPurchaseType('direct');
          setOrderItems(directData.items);
          console.log('바로구매 상품 로드 완료:', directData.items);
          return;
        }
      }

      const cartData = localStorage.getItem('cartItems');
      if (cartData) {
        const parsedItems = JSON.parse(cartData);
        if (parsedItems && parsedItems.length > 0) {
          setPurchaseType('cart');
          setOrderItems(parsedItems);
          console.log('장바구니 상품 로드 완료:', parsedItems);
          return;
        }
      }

      console.log('주문할 상품이 없습니다.');
      setOrderItems([]);
      
    } catch (error) {
      console.error('주문 상품 데이터 로드 실패:', error);
      setOrderItems([]);
    }
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    const initializePayment = async () => {
      setIsLoading(true);
      
      try {
        const loginSuccess = await checkLoginAndLoadUserInfo();
        if (!loginSuccess) {
          return;
        }

        loadOrderItems();
        
      } catch (error) {
        console.error('결제 페이지 초기화 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [searchParams, location]);

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

  // 계좌번호 생성
  const generateAccountNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    setAccountNumber(`1002-${randomNum.substring(0,4)}-${randomNum.substring(4,8)}-${randomNum.substring(8,12)}`);
  };

  // 입력값 변경
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 결제 수단 변경
  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
    
    if (method === 'transfer' || method === 'deposit') {
      generateAccountNumber();
    }
  };

  // 쿠폰 선택
  const handleCouponSelect = (couponId) => {
    setFormData(prev => ({
      ...prev,
      selectedCoupon: couponId
    }));
    setShowCoupons(false);
  };

  // 장바구니 비우기 및 카운트 업데이트
  const clearCartAndUpdateCount = () => {
    if (purchaseType === 'cart') {
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { count: 0, items: [] } 
      }));
      
      console.log('장바구니가 비워졌고 헤더에 알림 전송됨');
    }
    
    if (purchaseType === 'direct') {
      sessionStorage.removeItem('directPurchase');
      localStorage.removeItem('tempDirectPurchase');
      console.log('바로구매 임시 데이터 정리 완료');
    }
  };

  // 🚀 토스페이먼츠 결제 처리 (수정된 부분)
  const handleTossPayment = async () => {
    // 필수 입력값 검증
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

    try {
      setIsProcessing(true);

      const orderInfo = {
        orderNumber: 'ORD' + Date.now(),
        items: orderItems,
        purchaseType: purchaseType,
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
        ...calculateTotals()
      };

      // 주문 정보 저장
      sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      localStorage.setItem('tempOrderInfo', JSON.stringify(orderInfo));

      if (formData.paymentMethod === 'card') {
        // 🔥 실제 토스페이먼츠 SDK 호출 (수정된 부분)
        console.log('토스페이먼츠 결제 시작:', orderInfo);

        // 토스페이먼츠 결제 데이터 구성
        const paymentData = {
          amount: totalAmount,
          orderName: `${orderItems[0]?.name || '상품'} ${orderItems.length > 1 ? `외 ${orderItems.length - 1}개` : ''}`,
          customerName: formData.recipientName,
          customerEmail: formData.recipientEmail,
          customerPhone: formData.recipientPhone,
          orderId: orderInfo.orderNumber,
          successUrl: `${window.location.origin}/MD/payment/success`,
          failUrl: `${window.location.origin}/MD/payment/fail`
        };

        // 🚀 실제 토스페이먼츠 결제창 호출
        const result = await tossPaymentsService.requestPayment(paymentData);
        
        // 결제창이 취소된 경우 또는 오류가 발생한 경우
        if (!result.success) {
          console.log('토스페이먼츠 결제 결과:', result);
          if (result.code === 'USER_CANCEL') {
            alert('결제가 취소되었습니다.');
          } else {
            alert(`결제 오류: ${result.error}`);
          }
          return;
        }

        // 성공 시 처리는 successUrl로 자동 리디렉션됨
        
      } else {
        // 기타 결제 수단
        setTimeout(() => {
          clearCartAndUpdateCount();
          navigate(`/MD/payment/complete?orderId=${orderInfo.orderNumber}&amount=${totalAmount}&method=${formData.paymentMethod}`);
        }, 1500);
      }

    } catch (error) {
      console.error('결제 처리 실패:', error);
      alert(`결제 처리 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 스타일
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '0'
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#172031',
      marginBottom: '40px',
      textAlign: 'center'
    },
    section: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#172031',
      marginBottom: '20px'
    },
    formRow: {
      display: 'flex',
      gap: '15px',
      marginBottom: '15px'
    },
    formGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#172031',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      backgroundColor: '#2196F3',
      color: 'white'
    },
    payBtn: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#74B9FF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '15px'
    },
    emptyCart: {
      textAlign: 'center',
      padding: '100px 20px',
      color: '#666'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '20px'
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.loadingContainer}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #74B9FF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <h2>로그인 확인 및 주문 정보 로드 중...</h2>
            <p style={{ color: '#666' }}>잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  // 주문할 상품이 없는 경우
  if (!orderItems || orderItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.emptyCart}>
            <h2>주문할 상품이 없습니다</h2>
            <p>장바구니에 상품을 담거나 상품 상세페이지에서 바로구매를 이용해주세요.</p>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate('/MD')}
            >
              쇼핑하러 가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { subtotal, shippingFee, discountAmount, totalAmount } = calculateTotals();

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.title}>
          {purchaseType === 'direct' ? '🛒 바로구매 결제' : '🛒 장바구니 결제'}
        </h1>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* 왼쪽: 주문 정보 */}
          <div style={{ flex: 2 }}>
            {/* 주문 상품 정보 */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                📦 주문 상품 정보 ({orderItems.length}개)
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
              </h3>
              {orderItems.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  backgroundColor: purchaseType === 'direct' ? '#f8f9ff' : '#f8f9fa'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#ddd',
                    borderRadius: '8px',
                    marginRight: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    ) : '이미지'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {item.name || item.productName}
                    </div>
                    {item.selectedOption && (
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                        옵션: {item.selectedOption}
                      </div>
                    )}
                    <div style={{ fontSize: '14px', color: '#74B9FF' }}>
                      ₩{(item.price || 0).toLocaleString()} × {item.quantity || 1}개
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#172031' }}>
                    ₩{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* 배송 정보 */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🚚 배송 정보</h3>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>받는 분</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    placeholder="받는 분 이름"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>연락처</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleInputChange}
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>이메일</label>
                  <input
                    style={styles.input}
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    placeholder="이메일 주소"
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>주소</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="기본 주소"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>상세주소</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    placeholder="상세 주소"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>배송 요청사항</label>
                <input
                  style={styles.input}
                  type="text"
                  name="deliveryRequest"
                  value={formData.deliveryRequest}
                  onChange={handleInputChange}
                  placeholder="배송 요청사항을 입력하세요"
                />
              </div>
            </div>

            {/* 결제 수단 */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>💳 결제 수단</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { id: 'card', name: '신용카드', icon: '💳' },
                  { id: 'transfer', name: '계좌이체', icon: '🏦' },
                  { id: 'deposit', name: '무통장입금', icon: '💰' }
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodChange(method.id)}
                    style={{
                      ...styles.button,
                      backgroundColor: formData.paymentMethod === method.id ? '#74B9FF' : '#f8f9fa',
                      color: formData.paymentMethod === method.id ? 'white' : '#333',
                      border: formData.paymentMethod === method.id ? 'none' : '1px solid #ddd'
                    }}
                  >
                    {method.icon} {method.name}
                  </button>
                ))}
              </div>
              
              {(formData.paymentMethod === 'transfer' || formData.paymentMethod === 'deposit') && accountNumber && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}>
                  <strong>입금 계좌: {accountNumber}</strong>
                  <br />
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    예금주: (주)Project-X | 입금액: ₩{totalAmount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div style={{ flex: 1 }}>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>💰 결제 정보</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>상품금액</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>배송비</span>
                <span>₩{shippingFee.toLocaleString()}</span>
              </div>
              
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#e74c3c' }}>
                  <span>할인금액</span>
                  <span>-₩{discountAmount.toLocaleString()}</span>
                </div>
              )}
              
              <hr style={{ margin: '15px 0', border: 'none', borderTop: '2px solid #e9ecef' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                <span>총 결제금액</span>
                <span style={{ color: '#74B9FF' }}>₩{totalAmount.toLocaleString()}</span>
              </div>

              <button
                style={{
                  ...styles.payBtn,
                  backgroundColor: isProcessing ? '#ccc' : '#74B9FF',
                  cursor: isProcessing ? 'not-allowed' : 'pointer'
                }}
                onClick={handleTossPayment}
                disabled={isProcessing}
              >
                {isProcessing ? '결제 처리 중...' : `₩${totalAmount.toLocaleString()} 결제하기`}
              </button>

              <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
                결제 시 개인정보 수집 및 이용에 동의한 것으로 간주됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;