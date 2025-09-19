// components/MDTranslationCurrencyController/MDTranslationCurrencyController.jsx
import { useState, useEffect } from 'react';
import exchangeRateService from '../../services/exchangeApi';
import translateService from '../../services/translateApi';
import * as S from './MDTranslationCurrencyController.styled';

const MDTranslationCurrencyController = ({ className = '' }) => {
  const [currentCurrency, setCurrentCurrency] = useState('KRW');
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: 'success', message: '준비됨' });

  // 지원 통화
  const supportedCurrencies = ['KRW', 'USD', 'EUR', 'JPY', 'GBP', 'CNY'];
  
  // 지원 언어
  const supportedLanguages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' }
  ];

  // 페이지 로드 시 자동 설정
  useEffect(() => {
    setupPageElements();
  }, []);

  // 페이지 요소 자동 설정
  const setupPageElements = () => {
    setTimeout(() => {
      setupTranslatableElements();
      setupPriceElements();
    }, 1000);
  };

  // 번역 가능한 요소 설정
  const setupTranslatableElements = () => {
    const commonTexts = [
      '신상품', '베스트', '이벤트', '더보기', '공지사항', '장바구니', '주문하기', '결제하기',
      '상품명', '가격', '수량', '총 금액', '배송비', '할인', '적립금',
      '등록된 신상품이 없습니다.', '등록된 베스트 상품이 없습니다.', '등록된 이벤트 상품이 없습니다.',
      '장바구니가 비어있습니다.', '상품을 불러오는 중...', '결제를 진행하는 중...',
      '다시 시도', '취소', '확인', '닫기', '저장', '삭제', '수정'
    ];

    let setupCount = 0;

    // 정확한 텍스트 매칭
    document.querySelectorAll('*').forEach(element => {
      if (element.children.length === 0 && element.textContent) {
        const text = element.textContent.trim();
        if (commonTexts.includes(text) && !element.hasAttribute('data-translate')) {
          element.setAttribute('data-translate', text);
          setupCount++;
        }
      }
    });

    // 동적 콘텐츠 (상품명, 설명 등)
    document.querySelectorAll('[data-product-name], [data-product-description], [data-translatable]').forEach(element => {
      const text = element.textContent?.trim();
      if (text && !element.hasAttribute('data-translate')) {
        element.setAttribute('data-translate', text);
        setupCount++;
      }
    });

    console.log(`번역 요소 ${setupCount}개 설정 완료`);
    return setupCount;
  };

  // 가격 요소 설정
  const setupPriceElements = () => {
    let setupCount = 0;

    // data-product-price 속성이 있는 요소들
    document.querySelectorAll('[data-product-price]').forEach(element => {
      const priceText = element.textContent;
      if (priceText && !element.hasAttribute('data-price')) {
        const priceMatch = priceText.match(/[\d,]+/);
        if (priceMatch) {
          const price = parseInt(priceMatch[0].replace(/,/g, ''));
          if (price > 0) {
            element.setAttribute('data-price', price.toString());
            element.setAttribute('data-original-currency', 'KRW');
            setupCount++;
          }
        }
      }
    });

    // 일반적인 가격 패턴 감지
    document.querySelectorAll('*').forEach(element => {
      if (element.children.length === 0) {
        const text = element.textContent;
        if (text && /₩[\d,]+|[\d,]+원/.test(text) && !element.hasAttribute('data-price')) {
          const priceMatch = text.match(/[\d,]+/);
          if (priceMatch) {
            const price = parseInt(priceMatch[0].replace(/,/g, ''));
            if (price > 100) { // 100원 이상만
              element.setAttribute('data-price', price.toString());
              element.setAttribute('data-original-currency', 'KRW');
              setupCount++;
            }
          }
        }
      }
    });

    console.log(`가격 요소 ${setupCount}개 설정 완료`);
    return setupCount;
  };

  // 통화 변경
  const handleCurrencyChange = async (newCurrency) => {
    if (newCurrency === currentCurrency) return;

    setLoading(true);
    setStatus({ type: 'loading', message: '환율 변환 중...' });

    try {
      // 가격 요소 재설정
      setupPriceElements();

      // 페이지의 모든 가격 변환
      const result = await exchangeRateService.convertPagePrices(newCurrency, currentCurrency);

      if (result.success) {
        setCurrentCurrency(newCurrency);
        setStatus({ 
          type: 'success', 
          message: `${result.data.convertedCount}개 가격이 ${newCurrency}로 변환됨` 
        });
      } else {
        throw new Error(result.error || '환율 변환 실패');
      }

    } catch (error) {
      console.error('통화 변경 실패:', error);
      setStatus({ type: 'error', message: '환율 변환 실패' });
    } finally {
      setLoading(false);
    }
  };

  // 언어 변경
  const handleLanguageChange = async (newLanguage) => {
    if (newLanguage === currentLanguage) return;

    setLoading(true);
    setStatus({ type: 'loading', message: '페이지 번역 중...' });

    try {
      // 번역 요소 재설정
      setupTranslatableElements();

      // 페이지 번역
      const success = await translateService.translatePage(currentLanguage, newLanguage);

      if (success) {
        setCurrentLanguage(newLanguage);
        setStatus({ type: 'success', message: `페이지가 ${newLanguage}로 번역됨` });
      } else {
        throw new Error('페이지 번역 실패');
      }

    } catch (error) {
      console.error('언어 변경 실패:', error);
      setStatus({ type: 'error', message: '번역 실패' });
    } finally {
      setLoading(false);
    }
  };

  // 원본 복원
  const handleRestore = () => {
    const translatedCount = translateService.restoreOriginalTexts();
    setCurrentLanguage('ko');
    setStatus({ type: 'success', message: `${translatedCount}개 요소 원본 복원` });
  };

  // 페이지 요소 재스캔
  const handleRescan = () => {
    const translatableCount = setupTranslatableElements();
    const priceCount = setupPriceElements();
    setStatus({ 
      type: 'success', 
      message: `요소 재스캔 완료 (번역: ${translatableCount}, 가격: ${priceCount})` 
    });
  };

  return (
    <S.Container className={className}>
      <S.ControlsWrapper>
        <S.ControlGroup>
          <S.Label>통화:</S.Label>
          <S.Select 
            value={currentCurrency} 
            onChange={(e) => handleCurrencyChange(e.target.value)}
            disabled={loading}
          >
            {supportedCurrencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </S.Select>
        </S.ControlGroup>

        <S.ControlGroup>
          <S.Label>언어:</S.Label>
          <S.Select 
            value={currentLanguage} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            disabled={loading}
          >
            {supportedLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </S.Select>
        </S.ControlGroup>

        <S.ButtonGroup>
          <S.ActionButton onClick={handleRestore} disabled={loading} $small>
            원본
          </S.ActionButton>
          <S.ActionButton onClick={handleRescan} disabled={loading} $small>
            재스캔
          </S.ActionButton>
        </S.ButtonGroup>
      </S.ControlsWrapper>

      <S.StatusBar $type={status.type}>
        {loading && <S.LoadingSpinner />}
        <S.StatusText>{status.message}</S.StatusText>
      </S.StatusBar>
    </S.Container>
  );
};

export default MDTranslationCurrencyController;