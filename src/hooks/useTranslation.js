// hooks/useTranslation.js
import { useState, useCallback } from 'react';
import translateService from '../services/translateApi';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지 번역
  const translatePage = useCallback(async (targetLang, sourceLang = 'ko') => {
    if (targetLang === currentLanguage) return;

    setLoading(true);
    setError(null);

    try {
      const success = await translateService.translatePage(sourceLang, targetLang);
      
      if (success) {
        setCurrentLanguage(targetLang);
        console.log(`페이지 번역 완료: ${sourceLang} → ${targetLang}`);
      } else {
        throw new Error('페이지 번역 실패');
      }

    } catch (err) {
      console.error('번역 실패:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentLanguage]);

  // 텍스트 번역
  const translateText = useCallback(async (text, targetLang, sourceLang = 'ko') => {
    try {
      const result = await translateService.translateText(text, sourceLang, targetLang);
      return result;
    } catch (err) {
      console.error('텍스트 번역 실패:', err);
      return text; // 실패시 원본 반환
    }
  }, []);

  // 원본 복원
  const restoreOriginal = useCallback(() => {
    const count = translateService.restoreOriginalTexts();
    setCurrentLanguage('ko');
    console.log(`${count}개 요소를 원본으로 복원했습니다.`);
  }, []);

  return {
    currentLanguage,
    loading,
    error,
    translatePage,
    translateText,
    restoreOriginal,
    translateService
  };
};