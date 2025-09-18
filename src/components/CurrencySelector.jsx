// components/CurrencySelector/CurrencySelector.jsx
import React from 'react';
import { useCurrency } from '../../hooks/useCurrency';
import * as S from './CurrencySelector.styled';

const CurrencySelector = ({ 
  onCurrencyChange, 
  showStatus = true, 
  showLastUpdated = true,
  compact = false 
}) => {
  const {
    currentCurrency,
    supportedCurrencies,
    loading,
    error,
    lastUpdated,
    changeCurrency,
    retry
  } = useCurrency();

  const handleCurrencyChange = async (e) => {
    const newCurrency = e.target.value;
    await changeCurrency(newCurrency);
    onCurrencyChange?.(newCurrency);
  };

  return (
    <S.Container $compact={compact}>
      <S.Label>통화:</S.Label>
      
      <S.Select 
        value={currentCurrency} 
        onChange={handleCurrencyChange}
        disabled={loading}
        $loading={loading}
      >
        {supportedCurrencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </S.Select>
      
      {showStatus && (
        <S.StatusContainer>
          {loading && <S.StatusIndicator $loading>🔄 업데이트 중...</S.StatusIndicator>}
          {error && <S.StatusIndicator $error>❌ 오류</S.StatusIndicator>}
          {!loading && !error && <S.StatusIndicator $success>✅ 최신</S.StatusIndicator>}
        </S.StatusContainer>
      )}
      
      {showLastUpdated && lastUpdated && (
        <S.LastUpdated>
          업데이트: {lastUpdated}
        </S.LastUpdated>
      )}
      
      {error && (
        <S.RetryButton onClick={retry} disabled={loading}>
          재시도
        </S.RetryButton>
      )}
    </S.Container>
  );
};

export default CurrencySelector;