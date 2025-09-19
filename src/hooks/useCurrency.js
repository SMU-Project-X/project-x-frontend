// hooks/useCurrency.js
import { useState, useEffect, useCallback } from 'react';
import exchangeRateService from '../services/exchangeApi';

export const useCurrency = () => {
  const [currentCurrency, setCurrentCurrency] = useState('KRW');
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 지원 통화 목록 로드
  const loadSupportedCurrencies = useCallback(async () => {
    try {
      const currencies = await exchangeRateService.getSupportedCurrencies();
      setSupportedCurrencies(Object.keys(currencies));
    } catch (err) {
      console.error('지원 통화 로드 실패:', err);
      setSupportedCurrencies(['KRW', 'USD', 'EUR', 'JPY']); // 폴백
    }
  }, []);

  // 통화 변경
  const changeCurrency = useCallback(async (newCurrency) => {
    if (newCurrency === currentCurrency) return;

    setLoading(true);
    setError(null);

    try {
      // 환율 정보 미리 로드 (캐시)
      await exchangeRateService.getExchangeRates(newCurrency);
      
      // 페이지 가격 변환
      const result = await exchangeRateService.convertPagePrices(
        newCurrency, 
        currentCurrency
      );

      if (result.success) {
        setCurrentCurrency(newCurrency);
        setLastUpdated(new Date().toLocaleTimeString());
        console.log(`통화 변경 완료: ${currentCurrency} → ${newCurrency}`);
      } else {
        throw new Error(result.error || '통화 변경 실패');
      }

    } catch (err) {
      console.error('통화 변경 실패:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentCurrency]);

  // 가격 변환
  const convertPrice = useCallback(async (amount, fromCurrency, toCurrency) => {
    try {
      const result = await exchangeRateService.convertCurrency(
        amount, 
        fromCurrency, 
        toCurrency
      );
      return result;
    } catch (err) {
      console.error('가격 변환 실패:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // 재시도
  const retry = useCallback(() => {
    setError(null);
    changeCurrency(currentCurrency);
  }, [currentCurrency, changeCurrency]);

  // 초기화
  useEffect(() => {
    loadSupportedCurrencies();
  }, [loadSupportedCurrencies]);

  return {
    currentCurrency,
    supportedCurrencies,
    loading,
    error,
    lastUpdated,
    changeCurrency,
    convertPrice,
    retry,
    exchangeService: exchangeRateService
  };
};