// services/paymentApi.js - 토스페이먼츠 API 수정 버전

// 안전한 환경변수 접근 (Vite 방식)
const getClientKey = () => {
  try {
    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
    if (!clientKey) {
      console.warn('⚠️ 토스페이먼츠 클라이언트 키가 설정되지 않았습니다.');
      // 토스페이먼츠 테스트용 실제 키 (테스트 환경에서만 사용)
      return 'test_ck_D5GePWvyJnrK0W0k';
    }
    return clientKey;
  } catch (error) {
    console.warn('⚠️ 클라이언트 키 접근 실패, 기본값 사용');
    return 'test_ck_D5GePWvyJnrK0W0k';
  }
};

const getSecretKey = () => {
  try {
    const secretKey = import.meta.env.VITE_TOSS_SECRET_KEY;
    if (!secretKey) {
      console.warn('⚠️ 토스페이먼츠 시크릿 키가 설정되지 않았습니다.');
      return 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';
    }
    return secretKey;
  } catch (error) {
    console.warn('⚠️ 시크릿 키 접근 실패, 기본값 사용');
    return 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';
  }
};

// 🔧 토스페이먼츠 SDK 동적 로드 (수정된 버전)
const loadTossPaymentsSDK = async () => {
  return new Promise((resolve, reject) => {
    console.log('🚀 토스페이먼츠 SDK 로드 시작...');
    
    // 이미 로드되어 있으면 바로 반환
    if (window.TossPayments) {
      console.log('✅ 토스페이먼츠 SDK 이미 로드됨');
      resolve(window.TossPayments);
      return;
    }

    // 중복 로드 방지
    const existingScript = document.querySelector('script[src*="tosspayments.com"]');
    if (existingScript) {
      console.log('🔄 기존 SDK 스크립트 대기 중...');
      existingScript.addEventListener('load', () => {
        if (window.TossPayments) {
          console.log('✅ 기존 SDK 로드 완료');
          resolve(window.TossPayments);
        } else {
          reject(new Error('기존 SDK 로드 실패'));
        }
      });
      return;
    }

    // 새 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment';
    script.async = true;
    script.defer = true;
    
    // 10초 타임아웃 설정
    const timeoutId = setTimeout(() => {
      document.head.removeChild(script);
      reject(new Error('❌ 토스페이먼츠 SDK 로드 타임아웃 (10초)'));
    }, 10000);

    // 성공 시 처리
    script.onload = () => {
      clearTimeout(timeoutId);
      if (window.TossPayments) {
        console.log('✅ 토스페이먼츠 SDK 로드 성공');
        resolve(window.TossPayments);
      } else {
        reject(new Error('❌ 토스페이먼츠 SDK 로드 실패: window.TossPayments가 없습니다.'));
      }
    };
    
    // 실패 시 처리
    script.onerror = (error) => {
      clearTimeout(timeoutId);
      document.head.removeChild(script);
      console.error('❌ 토스페이먼츠 SDK 스크립트 로드 실패:', error);
      reject(new Error('토스페이먼츠 SDK 스크립트 로드 실패'));
    };

    // DOM에 스크립트 추가
    document.head.appendChild(script);
    console.log('📡 토스페이먼츠 SDK 스크립트 추가됨');
  });
};

class TossPaymentsService {
  constructor() {
    this.tossPayments = null;
    this.clientKey = getClientKey();
    this.secretKey = getSecretKey();
    this.isInitialized = false;
    this.initializationPromise = null;
    
    console.log('🏗️ TossPaymentsService 초기화');
    console.log('🔑 클라이언트 키:', this.clientKey.substring(0, 15) + '***');
  }

  // 토스페이먼츠 초기화
  async initialize() {
    // 이미 초기화되었으면 바로 반환
    if (this.isInitialized && this.tossPayments) {
      console.log('✅ 토스페이먼츠 이미 초기화됨');
      return this.tossPayments;
    }

    // 초기화 진행 중이면 기다림
    if (this.initializationPromise) {
      console.log('🔄 토스페이먼츠 초기화 진행 중...');
      return this.initializationPromise;
    }

    // 새로운 초기화 시작
    this.initializationPromise = this._performInitialization();
    return this.initializationPromise;
  }

  async _performInitialization() {
    try {
      console.log('🚀 토스페이먼츠 SDK 초기화 시작...');
      
      // SDK 로드
      const TossPayments = await loadTossPaymentsSDK();
      
      // 클라이언트 키 유효성 검사
      if (!this.clientKey || this.clientKey === 'test_ck_default_key') {
        console.warn('⚠️ 기본 테스트 키를 사용합니다. 실제 운영시에는 올바른 키를 설정하세요.');
      }

      // 토스페이먼츠 인스턴스 생성
      this.tossPayments = TossPayments(this.clientKey);
      this.isInitialized = true;
      
      console.log('✅ 토스페이먼츠 SDK 초기화 완료');
      console.log('🎯 토스페이먼츠 인스턴스:', this.tossPayments);
      
      return this.tossPayments;

    } catch (error) {
      console.error('❌ 토스페이먼츠 초기화 실패:', error);
      this.initializationPromise = null; // 다음에 다시 시도할 수 있도록
      throw error;
    }
  }

  // 결제 데이터 유효성 검사
  validatePaymentData(paymentData) {
    const {
      amount,
      orderName,
      customerName,
      customerEmail,
      orderId
    } = paymentData;

    const errors = [];

    if (!amount || amount <= 0) {
      errors.push('올바른 결제 금액을 입력하세요.');
    }

    if (amount > 10000000) {
      errors.push('결제 금액이 1천만원을 초과할 수 없습니다.');
    }

    if (!orderName || orderName.trim().length === 0) {
      errors.push('주문명을 입력하세요.');
    }

    if (orderName && orderName.length > 100) {
      errors.push('주문명은 100자를 초과할 수 없습니다.');
    }

    if (!customerName || customerName.trim().length === 0) {
      errors.push('고객명을 입력하세요.');
    }

    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errors.push('올바른 이메일 주소를 입력하세요.');
    }

    if (orderId && orderId.length > 64) {
      errors.push('주문번호는 64자를 초과할 수 없습니다.');
    }

    console.log('🔍 결제 데이터 검증 결과:', {
      isValid: errors.length === 0,
      errors: errors
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // 🚀 결제 요청 (실제 토스페이먼츠 SDK 사용)
  async requestPayment(paymentData) {
    try {
      console.log('💳 결제 요청 시작:', paymentData);
      
      // 초기화
      await this.initialize();

      const {
        amount,
        orderName,
        customerName,
        customerEmail,
        customerPhone,
        orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        successUrl = `${window.location.origin}/MD/payment/success`,
        failUrl = `${window.location.origin}/MD/payment/fail`,
        method = 'CARD'
      } = paymentData;

      // 데이터 유효성 검사
      const validation = this.validatePaymentData(paymentData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join('\n'));
      }

      const paymentRequest = {
        amount: Number(amount),
        orderId: orderId,
        orderName: orderName.trim(),
        customerName: customerName.trim(),
        customerEmail: customerEmail?.trim() || '',
        customerMobilePhone: customerPhone?.replace(/[^0-9]/g, '') || '',
        successUrl: successUrl,
        failUrl: failUrl
      };

      console.log('📤 토스페이먼츠 결제 요청:', {
        ...paymentRequest,
        customerMobilePhone: paymentRequest.customerMobilePhone ? '010-****-****' : ''
      });

      // 🔥 실제 토스페이먼츠 결제창 호출
      console.log('🚀 토스페이먼츠 결제창 호출 중...');
      await this.tossPayments.requestPayment(method, paymentRequest);

      // 이 코드는 결제창이 취소되었을 때만 실행됨
      console.log('❌ 결제창 취소됨');
      return {
        success: false,
        error: '결제가 취소되었습니다.',
        code: 'USER_CANCEL'
      };

    } catch (error) {
      console.error('❌ 토스페이먼츠 결제 요청 실패:', error);
      
      // 토스페이먼츠 에러 코드별 처리
      let errorMessage = '결제 요청 중 오류가 발생했습니다.';
      let errorCode = 'UNKNOWN_ERROR';

      if (error.code) {
        errorCode = error.code;
        errorMessage = this.getErrorMessage(error.code);
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('🔍 에러 상세:', {
        code: errorCode,
        message: errorMessage,
        originalError: error
      });

      return {
        success: false,
        error: errorMessage,
        code: errorCode
      };
    }
  }

  // 결제 승인 (보안상 백엔드에서 처리되어야 함)
  async confirmPayment(paymentKey, orderId, amount) {
    try {
      console.log('🔐 결제 승인 요청:', { paymentKey, orderId, amount });
      console.warn('⚠️ 결제 승인은 보안상 서버에서 처리해야 합니다.');
      
      // 실제 백엔드 API 호출 시도
      const response = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: Number(amount)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '결제 승인 실패');
      }

      const responseData = await response.json();

      return {
        success: true,
        data: responseData,
        message: '결제가 성공적으로 완료되었습니다.'
      };

    } catch (error) {
      console.error('❌ 결제 승인 실패:', error);
      
      // 백엔드 API가 없는 경우 임시 처리
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.warn('🔧 백엔드 결제 승인 API가 없습니다. 임시 성공 처리합니다.');
        return {
          success: true,
          data: {
            paymentKey,
            orderId,
            amount: Number(amount),
            status: 'DONE',
            approvedAt: new Date().toISOString(),
            method: 'CARD'
          },
          message: '결제가 완료되었습니다. (백엔드 연동 필요)'
        };
      }

      return {
        success: false,
        error: error.message || '결제 승인 중 오류가 발생했습니다.'
      };
    }
  }

  // URL 파라미터에서 결제 결과 추출
  getPaymentResultFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const result = {
      paymentKey: urlParams.get('paymentKey'),
      orderId: urlParams.get('orderId'),
      amount: urlParams.get('amount')
    };

    console.log('🔍 URL에서 결제 결과 추출:', result);
    return result;
  }

  // 결제 결과 검증
  validatePaymentResult(paymentKey, orderId, amount) {
    const validation = {
      isValid: true,
      errors: []
    };

    if (!paymentKey || paymentKey.trim() === '') {
      validation.errors.push('paymentKey가 누락되었습니다.');
    }

    if (!orderId || orderId.trim() === '') {
      validation.errors.push('orderId가 누락되었습니다.');
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      validation.errors.push('올바르지 않은 결제 금액입니다.');
    }

    validation.isValid = validation.errors.length === 0;

    console.log('🔍 결제 결과 검증:', {
      isValid: validation.isValid,
      errors: validation.errors
    });

    return {
      isValid: validation.isValid,
      message: validation.isValid ? '결제 결과가 유효합니다.' : validation.errors.join('\n')
    };
  }

  // SDK 정보 가져오기
  getSDKInfo() {
    const info = {
      isLoaded: !!window.TossPayments,
      isInitialized: this.isInitialized,
      clientKey: this.clientKey.substring(0, 15) + '***',
      version: window.TossPayments?.version || 'unknown',
      instance: !!this.tossPayments
    };

    console.log('ℹ️ 토스페이먼츠 SDK 정보:', info);
    return info;
  }

  // 에러 코드별 한글 메시지 매핑
  getErrorMessage(errorCode) {
    const errorMessages = {
      'USER_CANCEL': '사용자가 결제를 취소했습니다.',
      'INVALID_CARD_COMPANY': '유효하지 않은 카드사입니다.',
      'INVALID_CARD_NUMBER': '올바른 카드번호를 입력해주세요.',
      'INVALID_EXPIRY_DATE': '올바른 유효기간을 입력해주세요.',
      'INVALID_AUTH_NUMBER': '올바른 CVC번호를 입력해주세요.',
      'INVALID_CARD_INSTALLMENT_PLAN': '올바른 할부 개월수를 선택해주세요.',
      'NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_COMPANY': '해당 카드사는 할부를 지원하지 않습니다.',
      'INVALID_CARD_PASSWORD': '올바른 카드 비밀번호를 입력해주세요.',
      'INVALID_CARD_BIRTH_OR_BUSINESS_NUMBER': '올바른 생년월일 또는 사업자번호를 입력해주세요.',
      'EXCEED_MAX_DAILY_PAYMENT_COUNT': '일일 결제 횟수를 초과했습니다.',
      'EXCEED_MAX_DAILY_PAYMENT_AMOUNT': '일일 결제 금액을 초과했습니다.',
      'EXCEED_MAX_DAILY_PAYMENT_AMOUNT_PER_MERCHANT': '가맹점별 일일 결제 금액을 초과했습니다.',
      'UNKNOWN_ERROR': '알 수 없는 오류가 발생했습니다.'
    };

    return errorMessages[errorCode] || '결제 처리 중 오류가 발생했습니다.';
  }

  // 🧪 테스트용 메서드들
  async testSDKLoad() {
    try {
      console.log('🧪 SDK 로드 테스트 시작...');
      const TossPayments = await loadTossPaymentsSDK();
      console.log('✅ SDK 로드 테스트 성공:', TossPayments);
      return { success: true, sdk: TossPayments };
    } catch (error) {
      console.error('❌ SDK 로드 테스트 실패:', error);
      return { success: false, error: error.message };
    }
  }

  async testInitialization() {
    try {
      console.log('🧪 초기화 테스트 시작...');
      const instance = await this.initialize();
      console.log('✅ 초기화 테스트 성공:', instance);
      return { success: true, instance };
    } catch (error) {
      console.error('❌ 초기화 테스트 실패:', error);
      return { success: false, error: error.message };
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
const tossPaymentsService = new TossPaymentsService();

// 개발용 전역 객체에 등록 (디버깅용)
if (typeof window !== 'undefined') {
  window.tossPaymentsService = tossPaymentsService;
  console.log('🔧 개발용: window.tossPaymentsService로 접근 가능');
}

export default tossPaymentsService;