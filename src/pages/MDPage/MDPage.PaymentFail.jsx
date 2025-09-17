// MDPage.PaymentFail.jsx - 토스페이먼츠 결제 실패 페이지
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from './styled/MDPage.PaymentComplete.styled';

function PaymentFail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 토스페이먼츠에서 전달하는 에러 정보
  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');
  const orderId = searchParams.get('orderId');
  
  // 추가 에러 정보 (커스텀)
  const customMessage = searchParams.get('customMessage');

  // 에러 코드별 한국어 메시지 매핑
  const getKoreanErrorMessage = (code, message) => {
    const errorMessages = {
      'USER_CANCEL': '사용자가 결제를 취소했습니다.',
      'INVALID_CARD_COMPANY': '유효하지 않은 카드사입니다.',
      'INVALID_CARD_NUMBER': '올바른 카드번호를 입력해주세요.',
      'INVALID_EXPIRY_DATE': '올바른 카드 유효기간을 입력해주세요.',
      'INVALID_AUTH_NUMBER': '올바른 CVC 번호를 입력해주세요.',
      'INVALID_CARD_INSTALLMENT_PLAN': '올바른 할부 개월수를 선택해주세요.',
      'NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_COMPANY': '해당 카드사는 할부를 지원하지 않습니다.',
      'INVALID_CARD_PASSWORD': '올바른 카드 비밀번호를 입력해주세요.',
      'INVALID_CARD_BIRTH_OR_BUSINESS_NUMBER': '올바른 생년월일 또는 사업자번호를 입력해주세요.',
      'EXCEED_MAX_DAILY_PAYMENT_COUNT': '일일 결제 횟수를 초과했습니다.',
      'EXCEED_MAX_DAILY_PAYMENT_AMOUNT': '일일 결제 금액을 초과했습니다.',
      'EXCEED_MAX_DAILY_PAYMENT_AMOUNT_PER_MERCHANT': '가맹점별 일일 결제 금액을 초과했습니다.',
      'INVALID_CASHBAG_NUMBER': '올바른 캐시백 번호를 입력해주세요.',
      'INVALID_SETTLEMENT_REFERENCE_KEY': '잘못된 정산 참조 키입니다.',
      'UNAUTHORIZED_KEY': '인증되지 않은 키입니다.',
      'REJECT_ACCOUNT_PAYMENT': '계좌 결제가 거절되었습니다.',
      'REJECT_CARD_PAYMENT': '카드 결제가 거절되었습니다.',
      'REJECT_CARD_COMPANY': '카드사에서 결제를 거절했습니다.',
      'FORBIDDEN_REQUEST': '허용되지 않은 요청입니다.',
      'REJECT_TOSSPAY_INVALID_ACCOUNT': '토스페이 계좌가 유효하지 않습니다.',
      'EXCEED_MAX_PAYMENT_AMOUNT': '최대 결제 금액을 초과했습니다.',
      'INVALID_API_KEY': 'API 키가 유효하지 않습니다.',
      'INVALID_PAYMENT_METHOD': '지원하지 않는 결제 수단입니다.',
      'TIMEOUT': '결제 시간이 초과되었습니다.',
      'NETWORK_ERROR': '네트워크 오류가 발생했습니다.',
      'UNKNOWN_ERROR': '알 수 없는 오류가 발생했습니다.'
    };

    return errorMessages[code] || message || '결제 처리 중 오류가 발생했습니다.';
  };

  // 에러 유형별 아이콘 결정
  const getErrorIcon = (code) => {
    if (code === 'USER_CANCEL') return '❌';
    if (code?.includes('INVALID')) return '⚠️';
    if (code?.includes('EXCEED')) return '🚫';
    if (code?.includes('REJECT')) return '🔒';
    return '❗';
  };

  // 에러 유형별 안내 메시지
  const getErrorGuidance = (code) => {
    if (code === 'USER_CANCEL') {
      return '결제를 다시 시도하거나 다른 결제 수단을 이용해주세요.';
    }
    if (code?.includes('INVALID_CARD')) {
      return '카드 정보를 다시 확인하고 재시도해주세요.';
    }
    if (code?.includes('EXCEED')) {
      return '결제 한도 문제입니다. 다른 카드를 이용하거나 은행에 문의해주세요.';
    }
    if (code?.includes('REJECT')) {
      return '카드사 또는 은행에서 결제를 거절했습니다. 다른 결제 수단을 이용해주세요.';
    }
    return '고객센터에 문의하시거나 다른 결제 수단을 이용해주세요.';
  };

  const displayMessage = customMessage || getKoreanErrorMessage(errorCode, errorMessage);
  const errorIcon = getErrorIcon(errorCode);
  const guidance = getErrorGuidance(errorCode);

  // 재시도 버튼 클릭
  const handleRetry = () => {
    navigate('/MD/payment', { replace: true });
  };

  // 장바구니로 이동
  const handleGoToCart = () => {
    navigate('/MD/cart', { replace: true });
  };

  // 쇼핑 계속하기
  const handleContinueShopping = () => {
    navigate('/MD', { replace: true });
  };

  // 고객센터 문의
  const handleContactSupport = () => {
    alert('고객센터 연락처: 1588-0000\n운영시간: 평일 09:00~18:00');
  };

  useEffect(() => {
    // 실패 정보 로깅 (개발용)
    console.error('토스페이먼츠 결제 실패:', {
      code: errorCode,
      message: errorMessage,
      orderId: orderId,
      customMessage: customMessage,
      url: window.location.href
    });

    // 장바구니 복원 (필요시)
    // 결제 실패 시 장바구니 데이터를 복원할 수 있습니다.
  }, [errorCode, errorMessage, orderId, customMessage]);

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.StatusIcon style={{ fontSize: '64px' }}>{errorIcon}</S.StatusIcon>
        <S.Title style={{ color: '#f44336' }}>결제에 실패했습니다</S.Title>
        
        <S.Message>
          {displayMessage}<br />
          {guidance}
        </S.Message>

        {/* 에러 상세 정보 */}
        {(errorCode || orderId) && (
          <S.OrderInfo>
            {orderId && (
              <S.InfoRow>
                <S.InfoLabel>주문번호</S.InfoLabel>
                <S.InfoValue>{orderId}</S.InfoValue>
              </S.InfoRow>
            )}
            {errorCode && (
              <S.InfoRow>
                <S.InfoLabel>오류코드</S.InfoLabel>
                <S.InfoValue style={{ color: '#f44336' }}>{errorCode}</S.InfoValue>
              </S.InfoRow>
            )}
            <S.InfoRow>
              <S.InfoLabel>발생시간</S.InfoLabel>
              <S.InfoValue>{new Date().toLocaleString('ko-KR')}</S.InfoValue>
            </S.InfoRow>
          </S.OrderInfo>
        )}

        {/* 액션 버튼들 */}
        <S.ButtonGroup style={{ flexDirection: 'column', gap: '12px' }}>
          {/* 사용자 취소가 아닌 경우에만 재시도 버튼 표시 */}
          {errorCode !== 'USER_CANCEL' && (
            <S.Button $primary onClick={handleRetry}>
              🔄 다시 결제하기
            </S.Button>
          )}
          
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <S.Button onClick={handleGoToCart} style={{ flex: 1 }}>
              🛒 장바구니로
            </S.Button>
            <S.Button onClick={handleContinueShopping} style={{ flex: 1 }}>
              🏠 쇼핑 계속하기
            </S.Button>
          </div>
          
          <S.Button 
            onClick={handleContactSupport}
            style={{ 
              backgroundColor: 'transparent', 
              color: '#666', 
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          >
            📞 고객센터 문의
          </S.Button>
        </S.ButtonGroup>

        {/* 결제 수단 안내 */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#172031'
        }}>
          <strong>💳 이용 가능한 결제 수단</strong><br/>
          • 신용카드/체크카드 (국내 모든 카드사)<br/>
          • 토스페이, 카카오페이, 네이버페이<br/>
          • 실시간 계좌이체<br/>
          • 가상계좌 (무통장입금)<br/>
          • 휴대폰 결제 (통신사 결제)
        </div>

        {/* 개발용 디버그 정보 */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#ffebee',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            <strong>개발자 정보:</strong><br/>
            에러코드: {errorCode || 'N/A'}<br/>
            원본메시지: {errorMessage || 'N/A'}<br/>
            주문ID: {orderId || 'N/A'}<br/>
            커스텀메시지: {customMessage || 'N/A'}<br/>
            URL: {window.location.href}
          </div>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default PaymentFail;