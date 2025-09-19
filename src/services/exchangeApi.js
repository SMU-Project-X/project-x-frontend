// services/exchangeApi.js - 백엔드 프록시 연동 버전

// 백엔드 API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// 지원되는 통화 목록 (백엔드와 동일하게 유지)
export const SUPPORTED_CURRENCIES = {
  'KRW': '대한민국 원 (₩)',
  'USD': '미국 달러 ($)',
  'EUR': '유로 (€)',
  'JPY': '일본 엔 (¥)',
  'GBP': '영국 파운드 (£)',
  'CNY': '중국 위안 (¥)',
  'AUD': '호주 달러 (A$)',
  'CAD': '캐나다 달러 (C$)',
  'CHF': '스위스 프랑 (CHF)',
  'SEK': '스웨덴 크로나 (kr)',
  'NOK': '노르웨이 크로네 (kr)',
  'DKK': '덴마크 크로네 (kr)',
  'PLN': '폴란드 즐로티 (zł)',
  'CZK': '체코 코루나 (Kč)',
  'HUF': '헝가리 포린트 (Ft)',
  'RUB': '러시아 루블 (₽)'
};

// 통화 기호 매핑
const CURRENCY_SYMBOLS = {
  'KRW': '₩',
  'USD': '$',
  'EUR': '€',
  'JPY': '¥',
  'GBP': '£',
  'CNY': '¥',
  'AUD': 'A$',
  'CAD': 'C$',
  'CHF': 'CHF',
  'SEK': 'kr',
  'NOK': 'kr',
  'DKK': 'kr',
  'PLN': 'zł',
  'CZK': 'Kč',
  'HUF': 'Ft',
  'RUB': '₽'
};

class ExchangeRateService {
  constructor() {
    this.ratesCache = {};
    this.cacheTimestamp = null;
    this.cacheValidityMinutes = 30;
  }

  // 백엔드 API 호출 헬퍼
  async callBackendAPI(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}/api/exchange${endpoint}`;
      console.log('백엔드 API 호출:', url);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('백엔드 API 응답:', result);
      
      return result;

    } catch (error) {
      console.error('백엔드 API 호출 실패:', error);
      throw error;
    }
  }

  // 지원 통화 목록 가져오기
  async getSupportedCurrencies() {
    try {
      const result = await this.callBackendAPI('/currencies');
      
      if (result.success) {
        return result.data;
      } else {
        console.warn('백엔드에서 통화 목록 조회 실패, 로컬 데이터 사용');
        return SUPPORTED_CURRENCIES;
      }
    } catch (error) {
      console.warn('통화 목록 조회 실패, 로컬 데이터 사용:', error);
      return SUPPORTED_CURRENCIES;
    }
  }

  // 환율 정보 가져오기
  async getExchangeRates(baseCurrency = 'KRW') {
    try {
      const result = await this.callBackendAPI(`/rates/${baseCurrency}`);
      
      if (result.success || result.data) {
        // 캐시 업데이트
        this.ratesCache[baseCurrency] = result.data;
        this.cacheTimestamp = new Date().getTime();
        
        return {
          success: true,
          data: result.data
        };
      } else {
        throw new Error(result.message || '환율 정보 조회 실패');
      }

    } catch (error) {
      console.error('환율 정보 조회 실패:', error);
      
      // 캐시된 데이터가 있으면 사용
      if (this.ratesCache[baseCurrency]) {
        console.warn('API 실패로 캐시된 환율 데이터 사용');
        return {
          success: true,
          data: {
            ...this.ratesCache[baseCurrency],
            warning: '최신 환율 정보를 가져올 수 없어 이전 데이터를 사용합니다.'
          }
        };
      }

      return {
        success: false,
        error: error.message,
        data: {
          base: baseCurrency,
          rates: {},
          warning: '환율 정보를 가져올 수 없습니다.'
        }
      };
    }
  }

  // 통화 변환 (백엔드 프록시 사용)
  async convertCurrency(amount, fromCurrency, toCurrency) {
    try {
      const result = await this.callBackendAPI('/convert', {
        method: 'POST',
        body: JSON.stringify({
          amount,
          fromCurrency,
          toCurrency
        })
      });

      if (result.success || result.data) {
        return {
          success: true,
          data: result.data || result
        };
      } else {
        throw new Error(result.message || '통화 변환 실패');
      }

    } catch (error) {
      console.error('통화 변환 실패:', error);
      return {
        success: false,
        error: error.message,
        data: {
          originalAmount: amount,
          convertedAmount: amount,
          fromCurrency,
          toCurrency,
          rate: 1
        }
      };
    }
  }

  // 호환성을 위한 별칭 함수 (기존 코드와의 호환성)
  async convertToCurrency(amount, fromCurrency, toCurrency) {
    return this.convertCurrency(amount, fromCurrency, toCurrency);
  }

  // 가격 변환 (별칭)
  async convertPrice(amount, fromCurrency, toCurrency) {
    return this.convertCurrency(amount, fromCurrency, toCurrency);
  }

  // 일괄 가격 변환
  async convertMultiplePrices(priceArray, fromCurrency, toCurrency) {
    try {
      const result = await this.callBackendAPI('/convert-batch', {
        method: 'POST',
        body: JSON.stringify({
          amounts: priceArray,
          fromCurrency,
          toCurrency
        })
      });

      if (result.success && result.data.conversions) {
        return result.data.conversions.map(conversion => ({
          success: true,
          data: {
            originalAmount: conversion.originalAmount,
            convertedAmount: conversion.convertedAmount,
            fromCurrency,
            toCurrency,
            rate: conversion.rate
          }
        }));
      } else {
        throw new Error(result.message || '일괄 변환 실패');
      }

    } catch (error) {
      console.error('일괄 가격 변환 실패:', error);
      
      // 개별 변환으로 폴백
      const results = [];
      for (const price of priceArray) {
        const result = await this.convertCurrency(price, fromCurrency, toCurrency);
        results.push(result);
      }
      return results;
    }
  }

  // 가격 포맷팅
  formatPrice(amount, currency) {
    if (!amount || isNaN(amount)) {
      return `${CURRENCY_SYMBOLS[currency] || currency} 0`;
    }

    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    
    // 통화별 소수점 처리
    let formattedAmount;
    if (currency === 'KRW' || currency === 'JPY') {
      // 원화, 엔화는 소수점 없이 표시
      formattedAmount = Math.round(amount).toLocaleString();
    } else {
      // 기타 통화는 소수점 2자리
      formattedAmount = parseFloat(amount).toFixed(2);
      // 천단위 구분자 추가
      const parts = formattedAmount.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formattedAmount = parts.join('.');
    }

    // 통화 기호 위치 결정
    if (['USD', 'CAD', 'AUD', 'GBP'].includes(currency)) {
      return `${symbol}${formattedAmount}`;
    } else {
      return `${formattedAmount} ${symbol}`;
    }
  }

  // 페이지의 모든 가격 요소 변환
  async convertPagePrices(toCurrency, fromCurrency = 'KRW') {
    try {
      const priceElements = document.querySelectorAll('[data-price]');
      
      if (priceElements.length === 0) {
        return {
          success: true,
          data: {
            convertedCount: 0,
            message: '변환할 가격 요소가 없습니다.'
          }
        };
      }

      const prices = Array.from(priceElements).map(el => 
        parseFloat(el.getAttribute('data-price'))
      ).filter(price => !isNaN(price));

      if (prices.length === 0) {
        return {
          success: true,
          data: {
            convertedCount: 0,
            message: '유효한 가격 데이터가 없습니다.'
          }
        };
      }

      // 일괄 변환
      const convertResults = await this.convertMultiplePrices(prices, fromCurrency, toCurrency);
      
      let convertedCount = 0;
      priceElements.forEach((element, index) => {
        const result = convertResults[index];
        if (result && result.success) {
          const formattedPrice = this.formatPrice(result.data.convertedAmount, toCurrency);
          element.textContent = formattedPrice;
          convertedCount++;
        }
      });

      console.log(`${convertedCount}개 가격이 ${toCurrency}로 변환되었습니다.`);

      return {
        success: true,
        data: {
          convertedCount,
          totalElements: priceElements.length,
          message: `${convertedCount}개 가격이 변환되었습니다.`
        }
      };

    } catch (error) {
      console.error('페이지 가격 변환 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 인기 통화 순위
  getPopularCurrencies() {
    return ['KRW', 'USD', 'EUR', 'JPY', 'GBP', 'CNY', 'AUD', 'CAD'];
  }

  // 통화 검색
  searchCurrency(query) {
    const searchTerm = query.toLowerCase();
    const results = [];

    for (const [code, name] of Object.entries(SUPPORTED_CURRENCIES)) {
      if (code.toLowerCase().includes(searchTerm) || 
          name.toLowerCase().includes(searchTerm)) {
        results.push({ code, name });
      }
    }

    return results;
  }

  // 캐시 상태 확인
  isCacheValid(baseCurrency) {
    if (!this.cacheTimestamp || !this.ratesCache[baseCurrency]) return false;
    
    const now = new Date().getTime();
    const cacheAge = (now - this.cacheTimestamp) / (1000 * 60);
    
    return cacheAge < this.cacheValidityMinutes;
  }

  // 캐시 초기화
  clearCache() {
    this.ratesCache = {};
    this.cacheTimestamp = null;
  }

  // 헬스 체크
  async healthCheck() {
    try {
      const result = await this.callBackendAPI('/health');
      return result;
    } catch (error) {
      return {
        status: 'ERROR',
        message: '백엔드 서버에 연결할 수 없습니다.',
        error: error.message
      };
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
const exchangeRateService = new ExchangeRateService();

export default exchangeRateService;