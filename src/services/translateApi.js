// services/translateApi.js - 백엔드 프록시 연동 버전

// 백엔드 API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// 지원 언어 목록 (백엔드와 동일)
const SUPPORTED_LANGUAGES = {
  'ko': '한국어',
  'en': 'English',
  'ja': '日本語',
  'zh': '中文',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'it': 'Italiano'
};

class DeepLTranslatorService {
  constructor() {
    this.requestCount = 0;
    this.maxRequestsPerHour = 100;
    this.isApiAvailable = true; // 백엔드 프록시 사용
  }

  // 백엔드 API 호출 헬퍼
  async callBackendAPI(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}/api/translate${endpoint}`;
      console.log('번역 백엔드 API 호출:', url);

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
      console.log('번역 백엔드 API 응답:', result);
      
      return result;

    } catch (error) {
      console.error('번역 백엔드 API 호출 실패:', error);
      throw error;
    }
  }

  // 지원 언어 목록 반환
  async getSupportedLanguages() {
    try {
      const result = await this.callBackendAPI('/languages');
      
      if (result.success && result.data) {
        return result.data;
      } else {
        console.warn('백엔드에서 언어 목록 조회 실패, 로컬 데이터 사용');
        return SUPPORTED_LANGUAGES;
      }
    } catch (error) {
      console.warn('언어 목록 조회 실패, 로컬 데이터 사용:', error);
      return SUPPORTED_LANGUAGES;
    }
  }

  // API 연결 확인
  async checkApiConnection() {
    try {
      const result = await this.callBackendAPI('/health');
      return result.status === 'OK';
    } catch (error) {
      console.warn('번역 API 연결 확인 실패:', error);
      return false;
    }
  }

  // 텍스트 번역
  async translateText(text, sourceLang, targetLang) {
    try {
      if (!text || !text.trim()) {
        return text; // 빈 텍스트는 그대로 반환
      }

      if (sourceLang === targetLang) {
        return text; // 같은 언어면 그대로 반환
      }

      this.requestCount++;

      const result = await this.callBackendAPI('/text', {
        method: 'POST',
        body: JSON.stringify({
          text: text,
          sourceLang: sourceLang,
          targetLang: targetLang
        })
      });

      if (result.success && result.data && result.data.translatedText) {
        return result.data.translatedText;
      } else {
        throw new Error(result.message || '번역 실패');
      }

    } catch (error) {
      console.error('텍스트 번역 실패:', error);
      
      // 번역 실패시 원본 텍스트 반환
      console.warn(`번역 실패로 원본 텍스트 반환: "${text}"`);
      return text;
    }
  }

  // 배치 번역 (여러 텍스트를 한 번에)
  async translateBatch(texts, sourceLang, targetLang) {
    try {
      if (!texts || texts.length === 0) {
        return [];
      }

      if (sourceLang === targetLang) {
        return texts; // 같은 언어면 그대로 반환
      }

      const result = await this.callBackendAPI('/batch', {
        method: 'POST',
        body: JSON.stringify({
          texts: texts,
          sourceLang: sourceLang,
          targetLang: targetLang
        })
      });

      if (result.success && result.data && result.data.translations) {
        return result.data.translations.map(translation => {
          if (translation.success && translation.data) {
            return translation.data.translatedText;
          } else {
            console.warn('개별 번역 실패:', translation.error);
            return translation.data?.translatedText || '';
          }
        });
      } else {
        throw new Error(result.message || '일괄 번역 실패');
      }

    } catch (error) {
      console.error('배치 번역 실패:', error);
      
      // 개별 번역으로 폴백
      const results = [];
      for (const text of texts) {
        try {
          const translated = await this.translateText(text, sourceLang, targetLang);
          results.push(translated);
        } catch (e) {
          console.warn(`개별 번역 실패: "${text}"`, e);
          results.push(text); // 실패시 원본 반환
        }
      }
      return results;
    }
  }

  // 페이지 번역 (DOM 요소들)
  async translatePage(sourceLang, targetLang) {
    if (sourceLang === targetLang) {
      console.log('같은 언어로 번역 요청, 생략');
      return true;
    }

    try {
      // data-translate 속성을 가진 요소들 찾기
      const translatableElements = document.querySelectorAll('[data-translate]');
      
      if (translatableElements.length === 0) {
        console.log('번역할 요소가 없습니다');
        return true;
      }

      console.log(`${translatableElements.length}개 요소 번역 시작: ${sourceLang} → ${targetLang}`);

      // 모든 번역할 텍스트 수집
      const textsToTranslate = [];
      const elementsMap = [];

      translatableElements.forEach(element => {
        const originalText = element.getAttribute('data-translate') || element.textContent;
        
        if (originalText && originalText.trim()) {
          textsToTranslate.push(originalText.trim());
          elementsMap.push(element);
        }
      });

      if (textsToTranslate.length === 0) {
        console.log('번역할 텍스트가 없습니다');
        return true;
      }

      // 배치 번역 수행
      const translatedTexts = await this.translateBatch(textsToTranslate, sourceLang, targetLang);

      // DOM 업데이트
      let successCount = 0;
      elementsMap.forEach((element, index) => {
        const translatedText = translatedTexts[index];
        if (translatedText) {
          element.textContent = translatedText;
          successCount++;
        }
      });

      console.log(`페이지 번역 완료: ${successCount}/${elementsMap.length}개 성공`);
      return true;

    } catch (error) {
      console.error('페이지 번역 실패:', error);
      return false;
    }
  }

  // 특정 요소 번역
  async translateElement(element, sourceLang, targetLang) {
    try {
      const originalText = element.getAttribute('data-translate') || element.textContent;
      
      if (!originalText || !originalText.trim()) {
        return false;
      }

      const translatedText = await this.translateText(originalText.trim(), sourceLang, targetLang);
      
      if (translatedText) {
        element.textContent = translatedText;
        return true;
      }

      return false;

    } catch (error) {
      console.error('요소 번역 실패:', error);
      return false;
    }
  }

  // 자동 번역 요소 설정
  setupTranslatableElements(selector = '[data-translate]') {
    const elements = document.querySelectorAll(selector);
    let setupCount = 0;

    elements.forEach(element => {
      if (!element.getAttribute('data-translate')) {
        const originalText = element.textContent;
        if (originalText && originalText.trim()) {
          element.setAttribute('data-translate', originalText.trim());
          setupCount++;
        }
      }
    });

    console.log(`${setupCount}개 요소에 번역 속성 설정 완료`);
    return setupCount;
  }

  // 번역 상태 복원 (원본 텍스트로)
  restoreOriginalTexts() {
    const translatableElements = document.querySelectorAll('[data-translate]');
    let restoredCount = 0;

    translatableElements.forEach(element => {
      const originalText = element.getAttribute('data-translate');
      if (originalText) {
        element.textContent = originalText;
        restoredCount++;
      }
    });

    console.log(`${restoredCount}개 요소를 원본 텍스트로 복원했습니다.`);
    return restoredCount;
  }

  // 사용량 확인
  async getUsage() {
    try {
      // 백엔드에서 실제 DeepL 사용량을 조회할 수 있다면 구현
      return {
        count: this.requestCount,
        limit: this.maxRequestsPerHour,
        message: '로컬 카운트 (실제 API 사용량과 다를 수 있음)'
      };
    } catch (error) {
      console.warn('사용량 조회 실패:', error);
      return {
        count: this.requestCount,
        limit: this.maxRequestsPerHour
      };
    }
  }

  // 언어 코드 정규화
  normalizeLanguageCode(langCode) {
    if (!langCode) return 'EN';
    
    const languageMap = {
      'ko': 'KO',
      'en': 'EN',
      'ja': 'JA', 
      'zh': 'ZH',
      'es': 'ES',
      'fr': 'FR',
      'de': 'DE',
      'it': 'IT'
    };

    return languageMap[langCode.toLowerCase()] || 'EN';
  }

  // 언어 감지 (백엔드에서 지원한다면)
  async detectLanguage(text) {
    try {
      // 향후 백엔드에서 언어 감지 기능을 추가할 때 사용
      // const result = await this.callBackendAPI('/detect', { ... });
      
      // 현재는 간단한 로컬 감지
      if (/[가-힣]/.test(text)) return 'ko';
      if (/[ひらがなカタカナ]/.test(text)) return 'ja';
      if (/[一-龯]/.test(text)) return 'zh';
      return 'en'; // 기본값
      
    } catch (error) {
      console.warn('언어 감지 실패:', error);
      return 'en';
    }
  }

  // 헬스 체크
  async healthCheck() {
    try {
      const result = await this.callBackendAPI('/health');
      return result;
    } catch (error) {
      return {
        status: 'ERROR',
        message: '번역 서버에 연결할 수 없습니다.',
        error: error.message
      };
    }
  }

  // 번역 기록 (선택사항)
  getTranslationHistory() {
    // 로컬 스토리지에서 번역 기록을 관리할 수 있음
    try {
      const history = JSON.parse(localStorage.getItem('translationHistory') || '[]');
      return history.slice(-10); // 최근 10개만
    } catch (error) {
      return [];
    }
  }

  // 번역 기록 저장
  saveTranslationHistory(originalText, translatedText, sourceLang, targetLang) {
    try {
      const history = this.getTranslationHistory();
      const newEntry = {
        original: originalText,
        translated: translatedText,
        from: sourceLang,
        to: targetLang,
        timestamp: new Date().toISOString()
      };
      
      history.push(newEntry);
      localStorage.setItem('translationHistory', JSON.stringify(history.slice(-10)));
    } catch (error) {
      console.warn('번역 기록 저장 실패:', error);
    }
  }
}

// 싱글톤 인스턴스 생성
const deepLTranslatorService = new DeepLTranslatorService();

export default deepLTranslatorService;