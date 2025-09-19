// utils/priceElementSetup.js - 가격 요소에 data-price 속성 자동 추가

// 가격 패턴 정규식 (한국어 상황에 맞게)
const PRICE_PATTERNS = [
  /₩?\s*([0-9,]+)\s*원?/g,        // ₩30,000 또는 30,000원
  /\$\s*([0-9,]+\.?\d*)/g,        // $30.00
  /([0-9,]+)\s*KRW/gi,            // 30000 KRW
  /([0-9,]+)\s*USD/gi,            // 30 USD
  /원\s*([0-9,]+)/g,              // 원 30,000
  /^([0-9,]+)$/                   // 순수 숫자만 (30,000)
];

// 가격 요소로 판단할 선택자들
const PRICE_ELEMENT_SELECTORS = [
  '[class*="price"]',             // class에 price가 포함된 요소
  '[class*="cost"]',              // class에 cost가 포함된 요소
  '[class*="amount"]',            // class에 amount가 포함된 요소
  '[id*="price"]',                // id에 price가 포함된 요소
  '.총결제금액',                   // 한국어 클래스명
  '.상품금액',
  '.할인금액',
  '.배송비',
  'span:contains("원")',          // 원이 포함된 span
  'div:contains("₩")',            // ₩ 기호가 포함된 div
  'p:contains("원")',             // 원이 포함된 p 태그
];

class PriceElementManager {
  constructor() {
    this.processedElements = new Set();
    this.originalPrices = new Map(); // 원본 가격 저장
  }

  // 텍스트에서 가격 추출
  extractPriceFromText(text) {
    if (!text || typeof text !== 'string') return null;
    
    // 쉼표 제거 후 숫자만 추출
    const cleanText = text.replace(/[^\d.,₩$원]/g, '');
    
    for (const pattern of PRICE_PATTERNS) {
      const matches = cleanText.match(pattern);
      if (matches) {
        for (const match of matches) {
          // 숫자만 추출하고 쉼표 제거
          const numStr = match.replace(/[^\d]/g, '');
          const price = parseInt(numStr, 10);
          
          // 유효한 가격 범위 확인 (100원 ~ 1억원)
          if (price >= 100 && price <= 100000000) {
            return price;
          }
        }
      }
    }
    
    return null;
  }

  // 요소가 가격 요소인지 판단
  isPriceElement(element) {
    if (!element || !element.textContent) return false;
    
    const text = element.textContent.trim();
    const className = element.className || '';
    const id = element.id || '';
    
    // 1. 클래스나 ID에 가격 관련 키워드가 있는지 확인
    const priceKeywords = ['price', 'cost', 'amount', '가격', '금액', '원', '총결제'];
    const hasKeyword = priceKeywords.some(keyword => 
      className.toLowerCase().includes(keyword) || 
      id.toLowerCase().includes(keyword)
    );
    
    // 2. 텍스트에서 가격을 추출할 수 있는지 확인
    const extractedPrice = this.extractPriceFromText(text);
    
    return hasKeyword || extractedPrice !== null;
  }

  // 단일 요소에 data-price 속성 추가
  addDataPriceAttribute(element) {
    if (!element || this.processedElements.has(element)) return false;
    
    const price = this.extractPriceFromText(element.textContent);
    
    if (price !== null) {
      // 원본 가격 저장
      this.originalPrices.set(element, {
        price: price,
        originalText: element.textContent,
        currency: 'KRW'
      });
      
      // data-price 속성 추가
      element.setAttribute('data-price', price.toString());
      element.setAttribute('data-original-currency', 'KRW');
      
      this.processedElements.add(element);
      
      console.log(`가격 요소 처리 완료: ${element.textContent} → ${price}원`);
      return true;
    }
    
    return false;
  }

  // 페이지의 모든 가격 요소 자동 감지 및 속성 추가
  setupAllPriceElements() {
    console.log('가격 요소 자동 설정 시작...');
    
    let processedCount = 0;
    
    // 1. 선택자 기반 검색
    for (const selector of PRICE_ELEMENT_SELECTORS) {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (this.addDataPriceAttribute(element)) {
            processedCount++;
          }
        });
      } catch (error) {
        // 일부 선택자는 지원되지 않을 수 있음 (contains 등)
        console.debug(`선택자 ${selector} 사용 불가:`, error.message);
      }
    }
    
    // 2. 전체 텍스트 노드 검색 (더 정확한 방법)
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // 텍스트 노드의 부모 요소가 이미 처리되었거나 스크립트/스타일이면 제외
          const parent = node.parentElement;
          if (!parent || 
              this.processedElements.has(parent) ||
              ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // 가격 패턴이 있는지 확인
          const hasPrice = this.extractPriceFromText(node.textContent) !== null;
          return hasPrice ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    // 텍스트 노드의 부모 요소들 처리
    textNodes.forEach(textNode => {
      const parent = textNode.parentElement;
      if (parent && this.addDataPriceAttribute(parent)) {
        processedCount++;
      }
    });
    
    console.log(`가격 요소 자동 설정 완료: ${processedCount}개 요소 처리됨`);
    
    return {
      processedCount,
      totalElements: this.processedElements.size,
      elements: Array.from(this.processedElements)
    };
  }

  // 특정 요소들에 수동으로 가격 설정
  manuallySetPriceElements(elementPriceMap) {
    let setCount = 0;
    
    for (const [selector, price] of Object.entries(elementPriceMap)) {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(element => {
        this.originalPrices.set(element, {
          price: price,
          originalText: element.textContent,
          currency: 'KRW'
        });
        
        element.setAttribute('data-price', price.toString());
        element.setAttribute('data-original-currency', 'KRW');
        
        this.processedElements.add(element);
        setCount++;
        
        console.log(`수동 가격 설정: ${selector} → ${price}원`);
      });
    }
    
    return setCount;
  }

  // 원본 가격으로 복원
  restoreOriginalPrices() {
    let restoredCount = 0;
    
    this.processedElements.forEach(element => {
      const originalData = this.originalPrices.get(element);
      if (originalData) {
        element.textContent = originalData.originalText;
        restoredCount++;
      }
    });
    
    console.log(`${restoredCount}개 요소를 원본 가격으로 복원했습니다.`);
    return restoredCount;
  }

  // 처리된 요소 정보 가져오기
  getProcessedElementsInfo() {
    const info = [];
    
    this.processedElements.forEach(element => {
      const originalData = this.originalPrices.get(element);
      info.push({
        element: element,
        selector: this.generateSelector(element),
        price: originalData?.price,
        originalText: originalData?.originalText,
        currentText: element.textContent,
        dataPrice: element.getAttribute('data-price')
      });
    });
    
    return info;
  }

  // 요소의 CSS 선택자 생성
  generateSelector(element) {
    if (element.id) {
      return `#${element.id}`;
    }
    
    if (element.className) {
      const classes = element.className.split(' ').filter(c => c).slice(0, 2);
      if (classes.length > 0) {
        return `${element.tagName.toLowerCase()}.${classes.join('.')}`;
      }
    }
    
    return element.tagName.toLowerCase();
  }

  // DOM 변경 감지 및 자동 업데이트
  startAutoDetection() {
    // MutationObserver로 DOM 변경 감지
    const observer = new MutationObserver((mutations) => {
      let hasNewPriceElements = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // 새로 추가된 요소들 검사
              const newElement = node;
              if (this.isPriceElement(newElement)) {
                this.addDataPriceAttribute(newElement);
                hasNewPriceElements = true;
              }
              
              // 하위 요소들도 검사
              const priceElements = newElement.querySelectorAll('*');
              priceElements.forEach(child => {
                if (this.isPriceElement(child)) {
                  this.addDataPriceAttribute(child);
                  hasNewPriceElements = true;
                }
              });
            }
          });
        }
      });
      
      if (hasNewPriceElements) {
        console.log('새로운 가격 요소가 감지되어 자동으로 처리되었습니다.');
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('가격 요소 자동 감지가 시작되었습니다.');
    return observer;
  }
}

// 싱글톤 인스턴스 생성
const priceElementManager = new PriceElementManager();

// 페이지 로드 완료 후 자동 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      priceElementManager.setupAllPriceElements();
      priceElementManager.startAutoDetection();
    }, 1000); // 1초 지연 후 실행 (다른 스크립트들이 로드된 후)
  });
} else {
  setTimeout(() => {
    priceElementManager.setupAllPriceElements();
    priceElementManager.startAutoDetection();
  }, 1000);
}

export default priceElementManager;