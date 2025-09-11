// MDPage.Payment.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './styled/MDPage.Payment.styled';

function Payment() {
  const navigate = useNavigate();
  
  // 로그인 체크 (임시 - 실제로는 인증 상태 확인)
  const [isLoggedIn] = useState(true); // 실제로는 useAuth() 등으로 확인
  
  // DB에서 가져온 사용자 정보 (로그인시)
  const [userInfo] = useState({
    name: '홍길동',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
    detailAddress: '456호'
  });

  // 주문 상품 데이터
  const [orderItems] = useState([
    {
      id: 1,
      name: '한정판 포토북',
      price: 25000,
      quantity: 2,
      image: '상품 이미지 1'
    },
    {
      id: 2, 
      name: 'Project X 굿즈 세트',
      price: 18000,
      quantity: 1,
      image: '상품 이미지 2'
    }
  ]);

  // 최근 주문내역 (더미)
  const [recentOrders] = useState([
    { id: 'ORD20241201', date: '2024.12.01', total: 42000, status: '배송완료' },
    { id: 'ORD20241115', date: '2024.11.15', total: 28000, status: '배송중' }
  ]);

  // 폼 상태
  const [formData, setFormData] = useState({
    deliveryRequest: '',
    selectedCoupon: '',
    paymentMethod: 'card',
    cardCompany: '',
    installment: '0',
    paymentSubMethod: 'toss' // toss, naver, kakao
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

  // 가격 계산
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedCoupon = availableCoupons.find(c => c.id === parseInt(formData.selectedCoupon));
  
  let discount = 0;
  if (selectedCoupon && subtotal >= selectedCoupon.minOrder) {
    if (selectedCoupon.type === 'shipping') {
      discount = selectedCoupon.discount;
    } else if (selectedCoupon.discount < 1) {
      discount = Math.floor(subtotal * selectedCoupon.discount);
    } else {
      discount = selectedCoupon.discount;
    }
  }
  
  const shipping = subtotal >= 50000 || (selectedCoupon?.type === 'shipping' && subtotal >= selectedCoupon.minOrder) ? 0 : 3000;
  const finalShipping = selectedCoupon?.type === 'shipping' ? 0 : shipping;
  const total = subtotal - discount + finalShipping;

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <div style={{textAlign: 'center', padding: '100px 20px'}}>
            <h2 style={{marginBottom: '20px'}}>로그인이 필요합니다</h2>
            <p style={{marginBottom: '30px', color: '#666'}}>결제를 진행하려면 로그인을 해주세요.</p>
            <S.PayBtn onClick={() => navigate('/login')}>
              로그인하러 가기
            </S.PayBtn>
          </div>
        </S.ContentWrapper>
      </S.Container>
    );
  }

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
      paymentMethod: method,
      cardCompany: '',
      installment: '0',
      paymentSubMethod: method === 'card' ? 'toss' : ''
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

  // 결제하기
  const handlePayment = () => {
    if (!formData.deliveryRequest) {
      alert('배송 요청사항을 입력해주세요.');
      return;
    }
    
    navigate('/MD/payment-complete', { 
      state: { 
        orderItems, 
        total,
        orderNumber: 'ORD' + Date.now(),
        userInfo
      }
    });
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>주문/결제</S.Title>
        
        <S.PaymentContent>
          {/* 왼쪽: 주문 정보 */}
          <S.PaymentForm>
            {/* 1. 상품 정보 */}
            <S.Section>
              <S.SectionTitle>📦 상품 정보</S.SectionTitle>
              {orderItems.map(item => (
                <S.OrderItem key={item.id}>
                  <S.ItemImage>{item.image}</S.ItemImage>
                  <S.ItemInfo>
                    <S.ItemName>{item.name}</S.ItemName>
                    <S.ItemQuantity>수량: {item.quantity}개</S.ItemQuantity>
                  </S.ItemInfo>
                  <S.ItemPrice>₩{(item.price * item.quantity).toLocaleString()}</S.ItemPrice>
                </S.OrderItem>
              ))}
            </S.Section>

            {/* 2. 배송지 정보 (DB에서 가져온 정보) */}
            <S.Section>
              <S.SectionTitle>🚚 배송지 정보</S.SectionTitle>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{marginBottom: '10px'}}>
                  <strong>받는 분:</strong> {userInfo.name}
                </div>
                <div style={{marginBottom: '10px'}}>
                  <strong>연락처:</strong> {userInfo.phone}
                </div>
                <div style={{marginBottom: '10px'}}>
                  <strong>주소:</strong> {userInfo.address} {userInfo.detailAddress}
                </div>
              </div>
              
              <S.FormRow>
                <S.FormGroup>
                  <S.Label>배송 요청사항</S.Label>
                  <S.Select
                    name="deliveryRequest"
                    value={formData.deliveryRequest}
                    onChange={handleInputChange}
                  >
                    <option value="">배송 요청사항을 선택해주세요</option>
                    <option value="문앞에 놓아주세요">문앞에 놓아주세요</option>
                    <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                    <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                    <option value="직접 받겠습니다">직접 받겠습니다</option>
                  </S.Select>
                </S.FormGroup>
              </S.FormRow>
            </S.Section>

            {/* 3. 쿠폰 (펼치기 방식) */}
            <S.Section>
              <S.SectionTitle 
                onClick={() => setShowCoupons(!showCoupons)}
                style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
              >
                🎫 쿠폰 <span>{showCoupons ? '▲' : '▼'}</span>
              </S.SectionTitle>
              
              {showCoupons && (
                <div style={{marginTop: '20px'}}>
                  {availableCoupons.map(coupon => (
                    <div
                      key={coupon.id}
                      onClick={() => handleCouponSelect(coupon.id.toString())}
                      style={{
                        padding: '15px',
                        border: formData.selectedCoupon === coupon.id.toString() ? '2px solid #74B9FF' : '1px solid #e9ecef',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        cursor: subtotal >= coupon.minOrder ? 'pointer' : 'not-allowed',
                        backgroundColor: subtotal >= coupon.minOrder ? '#fff' : '#f5f5f5',
                        opacity: subtotal >= coupon.minOrder ? 1 : 0.6
                      }}
                    >
                      <div style={{fontWeight: '600', marginBottom: '5px'}}>{coupon.name}</div>
                      <div style={{fontSize: '12px', color: '#666'}}>
                        최소 주문금액: ₩{coupon.minOrder.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {formData.selectedCoupon && (
                <div style={{
                  marginTop: '15px',
                  padding: '12px',
                  backgroundColor: '#e8f4fd',
                  borderRadius: '6px'
                }}>
                  선택된 쿠폰: {availableCoupons.find(c => c.id.toString() === formData.selectedCoupon)?.name}
                  <span style={{color: '#dc3545', fontWeight: 'bold', marginLeft: '10px'}}>
                    -₩{discount.toLocaleString()}
                  </span>
                </div>
              )}
            </S.Section>

            {/* 4. 결제 방법 */}
            <S.Section>
              <S.SectionTitle>💳 결제 방법</S.SectionTitle>
              
              {/* 결제 수단 선택 (가로 배치) */}
              <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                {[
                  {key: 'card', name: '카드', icon: '💳'},
                  {key: 'transfer', name: '계좌이체', icon: '🏦'},
                  {key: 'deposit', name: '무통장입금', icon: '💰'},
                  {key: 'phone', name: '휴대폰', icon: '📱', disabled: true}
                ].map(method => (
                  <button
                    key={method.key}
                    onClick={() => !method.disabled && handlePaymentMethodChange(method.key)}
                    style={{
                      flex: 1,
                      padding: '15px',
                      border: formData.paymentMethod === method.key ? '2px solid #74B9FF' : '1px solid #e9ecef',
                      borderRadius: '8px',
                      backgroundColor: method.disabled ? '#f5f5f5' : (formData.paymentMethod === method.key ? '#e8f4fd' : 'white'),
                      cursor: method.disabled ? 'not-allowed' : 'pointer',
                      opacity: method.disabled ? 0.5 : 1,
                      textAlign: 'center'
                    }}
                  >
                    <div style={{fontSize: '20px', marginBottom: '5px'}}>{method.icon}</div>
                    <div style={{fontSize: '14px', fontWeight: '600'}}>{method.name}</div>
                    {method.disabled && <div style={{fontSize: '10px', color: '#999'}}>준비중</div>}
                  </button>
                ))}
              </div>

              {/* 카드 결제 세부 옵션 */}
              {formData.paymentMethod === 'card' && (
                <div style={{marginTop: '20px'}}>
                  {/* 간편결제 선택 */}
                  <div style={{marginBottom: '20px'}}>
                    <S.Label>간편결제</S.Label>
                    <div style={{display: 'flex', gap: '10px'}}>
                      {[
                        {key: 'toss', name: '토스페이', color: '#3182f6'},
                        {key: 'naver', name: '네이버페이', color: '#03c75a'},
                        {key: 'kakao', name: '카카오페이', color: '#fee500'}
                      ].map(pay => (
                        <button
                          key={pay.key}
                          onClick={() => setFormData(prev => ({...prev, paymentSubMethod: pay.key}))}
                          style={{
                            flex: 1,
                            padding: '12px',
                            border: formData.paymentSubMethod === pay.key ? `2px solid ${pay.color}` : '1px solid #e9ecef',
                            borderRadius: '6px',
                            backgroundColor: formData.paymentSubMethod === pay.key ? `${pay.color}20` : 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {pay.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 카드사 선택 */}
                  <S.FormRow>
                    <S.FormGroup>
                      <S.Label>카드사 선택</S.Label>
                      <S.Select
                        name="cardCompany"
                        value={formData.cardCompany}
                        onChange={handleInputChange}
                      >
                        <option value="">카드사를 선택해주세요</option>
                        <option value="삼성">삼성카드</option>
                        <option value="현대">현대카드</option>
                        <option value="신한">신한카드</option>
                        <option value="KB국민">KB국민카드</option>
                        <option value="하나">하나카드</option>
                        <option value="롯데">롯데카드</option>
                        <option value="BC">BC카드</option>
                      </S.Select>
                    </S.FormGroup>
                    <S.FormGroup>
                      <S.Label>할부 선택</S.Label>
                      <S.Select
                        name="installment"
                        value={formData.installment}
                        onChange={handleInputChange}
                      >
                        <option value="0">일시불</option>
                        <option value="2">2개월</option>
                        <option value="3">3개월</option>
                        <option value="6">6개월</option>
                        <option value="12">12개월</option>
                      </S.Select>
                    </S.FormGroup>
                  </S.FormRow>
                </div>
              )}

              {/* 계좌이체/무통장입금 계좌번호 */}
              {(formData.paymentMethod === 'transfer' || formData.paymentMethod === 'deposit') && accountNumber && (
                <div style={{
                  marginTop: '20px',
                  padding: '15px',
                  backgroundColor: '#fff3cd',
                  borderRadius: '8px',
                  border: '1px solid #ffeaa7'
                }}>
                  <div style={{fontWeight: '600', marginBottom: '10px'}}>
                    {formData.paymentMethod === 'transfer' ? '계좌이체' : '무통장입금'} 정보
                  </div>
                  <div>계좌번호: <strong>{accountNumber}</strong></div>
                  <div>예금주: Project-X</div>
                  <div style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
                    ※ 입금 확인 후 상품이 발송됩니다.
                  </div>
                </div>
              )}
            </S.Section>
          </S.PaymentForm>

          {/* 오른쪽: 결제 정보 */}
          <S.OrderSummary>
            {/* 결제 금액 */}
            <S.SummaryTitle>결제 정보</S.SummaryTitle>
            <S.PriceSummary>
              <S.PriceRow>
                <S.PriceLabel>상품금액</S.PriceLabel>
                <S.PriceValue>₩{subtotal.toLocaleString()}</S.PriceValue>
              </S.PriceRow>
              {discount > 0 && (
                <S.PriceRow>
                  <S.PriceLabel>쿠폰할인</S.PriceLabel>
                  <S.PriceValue style={{color: '#dc3545'}}>-₩{discount.toLocaleString()}</S.PriceValue>
                </S.PriceRow>
              )}
              <S.PriceRow>
                <S.PriceLabel>배송비</S.PriceLabel>
                <S.PriceValue>{finalShipping === 0 ? '무료' : `₩${finalShipping.toLocaleString()}`}</S.PriceValue>
              </S.PriceRow>
              <S.TotalRow>
                <S.TotalLabel>총 결제금액</S.TotalLabel>
                <S.TotalValue>₩{total.toLocaleString()}</S.TotalValue>
              </S.TotalRow>
            </S.PriceSummary>

            <S.PayBtn onClick={handlePayment} style={{width: '100%', marginTop: '20px'}}>
              ₩{total.toLocaleString()} 결제하기
            </S.PayBtn>

            {/* 최근 주문내역 */}
            <div style={{marginTop: '40px'}}>
              <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '15px'}}>최근 주문내역</h3>
              {recentOrders.map(order => (
                <div key={order.id} style={{
                  padding: '12px',
                  border: '1px solid #e9ecef',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <span style={{fontWeight: '600'}}>{order.id}</span>
                    <span style={{color: '#74B9FF'}}>{order.status}</span>
                  </div>
                  <div style={{color: '#666', fontSize: '12px'}}>
                    {order.date} | ₩{order.total.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* 광고 배너 */}
            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '16px', fontWeight: '600', marginBottom: '10px'}}>
                🎉 첫 주문 10% 할인!
              </div>
              <div style={{fontSize: '14px', color: '#666', marginBottom: '15px'}}>
                신규회원 전용 혜택을 놓치지 마세요
              </div>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#74B9FF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                쿠폰 받기
              </button>
            </div>
          </S.OrderSummary>
        </S.PaymentContent>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default Payment;