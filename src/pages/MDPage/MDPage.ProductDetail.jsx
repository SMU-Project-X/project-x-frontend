// MDPage.ProductDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productDetailStyles, productDetailEffects } from './styled/MDPage.ProductDetail.styled';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 상태 관리
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('detail'); 
  // 임시 상품 데이터 (실제로는 API에서 가져올 것)
  const product = {
    id: id || 1,
    name: '한정판 포토북',
    price: 25000,
    images: [
      '상품 이미지 1',
      '상품 이미지 2', 
      '상품 이미지 3',
      '상품 이미지 4'
    ],
    description: 'Project X 한정판 포토북입니다.',
    specs: [
      { label: '크기', value: '210 x 297mm (A4)' },
      { label: '페이지', value: '총 100페이지' },
      { label: '재질', value: '고급 아트지' },
      { label: '제작기간', value: '주문 후 3-5일' },
      { label: '배송', value: '무료배송' }
    ]
  };
  
  // 수량 변경 함수
  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // 직접 수량 입력
  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // 장바구니 추가
  const handleAddToCart = () => {
    console.log(`장바구니 추가: ${product.name}, 수량: ${quantity}`);
    alert('장바구니에 추가되었습니다!');
  };
  
  // 바로 구매
  const handleBuyNow = () => {
    console.log(`바로 구매: ${product.name}, 수량: ${quantity}`);
    // 결제 페이지로 이동 (추후 구현)
    alert('구매 페이지로 이동합니다!');
  };
  
  // 썸네일 클릭
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  // 탭 변경 함수 추가
const handleTabChange = (tabName) => {
  setActiveTab(tabName);
};

  return (
    <div style={productDetailStyles.container}>
      {/* 메인 상품 정보 영역 */}
      <div style={productDetailStyles.contentWrapper}>
        {/* 왼쪽 이미지 영역 */}
        <div style={productDetailStyles.imageSection}>
          {/* 메인 이미지 */}
          <div style={productDetailStyles.mainImage}>
            <span style={productDetailStyles.mainImagePlaceholder}>
              {product.images[selectedImage]}
            </span>
          </div>
          
          {/* 썸네일 이미지들 */}
          <div style={productDetailStyles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <div
                key={index}
                style={{
                  ...productDetailStyles.thumbnail,
                  ...(selectedImage === index ? productDetailStyles.thumbnailActive : {})
                }}
                onClick={() => handleThumbnailClick(index)}
                {...productDetailEffects.thumbnail}
              >
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 오른쪽 상품 정보 영역 */}
        <div style={productDetailStyles.infoSection}>
          {/* 상품명 */}
          <h1 style={productDetailStyles.productTitle}>
            {product.name}
          </h1>
          
          {/* 가격 */}
          <div style={productDetailStyles.productPrice}>
            ₩{product.price.toLocaleString()}
          </div>
          
          {/* 옵션 선택 */}
          <div style={productDetailStyles.optionSection}>
            <label style={productDetailStyles.optionLabel}>수량</label>
            <div style={productDetailStyles.quantityContainer}>
              <button
                style={productDetailStyles.quantityButton}
                onClick={() => handleQuantityChange('decrease')}
                {...productDetailEffects.quantityButton}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityInput}
                min="1"
                style={productDetailStyles.quantityInput}
              />
              <button
                style={productDetailStyles.quantityButton}
                onClick={() => handleQuantityChange('increase')}
                {...productDetailEffects.quantityButton}
              >
                +
              </button>
            </div>
          </div>
          
          {/* 총 가격 */}
          <div style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#172031',
            marginBottom: '30px',
            fontFamily: 'Pretendard, sans-serif'
          }}>
            총 금액: ₩{(product.price * quantity).toLocaleString()}
          </div>
          
          {/* 버튼 영역 */}
          <div style={productDetailStyles.buttonSection}>
            <button
              style={productDetailStyles.cartButton}
              onClick={handleAddToCart}
              {...productDetailEffects.cartButton}
            >
              장바구니
            </button>
            <button
              style={productDetailStyles.buyButton}
              onClick={handleBuyNow}
              {...productDetailEffects.buyButton}
            >
              바로구매
            </button>
          </div>
          
          {/* 상품 설명 */}
          <div style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#666',
            fontFamily: 'Pretendard, sans-serif'
          }}>
            {product.description}
          </div>
        </div>
      </div>
      
      {/* 상품 상세 정보 및 유의사항 탭 영역 */}
      <div style={productDetailStyles.detailSection}>
        {/* 탭 네비게이션 */}
        <div style={productDetailStyles.tabContainer}>
          <button
            style={{
              ...productDetailStyles.tabButton,
              ...(activeTab === 'detail' ? productDetailStyles.tabButtonActive : {})
            }}
            onClick={() => handleTabChange('detail')}
          >
            상품 상세 정보
          </button>
          <button
            style={{
              ...productDetailStyles.tabButton,
              ...(activeTab === 'notice' ? productDetailStyles.tabButtonActive : {})
            }}
            onClick={() => handleTabChange('notice')}
          >
            유의사항
          </button>
        </div>
        
        {/* 탭 컨텐츠 */}
        <div style={productDetailStyles.detailContent}>
          {activeTab === 'detail' && (
            <div>
              <div style={productDetailStyles.detailText}>
                Project X 한정판 포토북으로 특별한 추억을 간직하세요.
              </div>
              <div style={productDetailStyles.detailText}>
                고급 아트지를 사용하여 선명하고 생생한 이미지를 제공합니다.
                총 100페이지로 구성되어 있으며, A4 사이즈로 제작됩니다.
              </div>
              
              {/* 상품 스펙 */}
              <ul style={productDetailStyles.specList}>
                {product.specs.map((spec, index) => (
                  <li key={`spec-${index}`} style={productDetailStyles.specItem}>
                    <span style={productDetailStyles.specLabel}>{spec.label}</span>
                    <span style={productDetailStyles.specValue}>{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'notice' && (
            <div>
              <div style={productDetailStyles.detailText}>
                <strong>주문 및 배송 안내</strong>
              </div>
              <div style={productDetailStyles.detailText}>
                • 주문 완료 후 제작에 3-5일 소요됩니다.<br/>
                • 배송은 제작 완료 후 1-2일 내 발송됩니다.<br/>
                • 전국 무료배송으로 진행됩니다.
              </div>
              
              <div style={{...productDetailStyles.detailText, marginTop: '30px'}}>
                <strong>교환 및 환불 안내</strong>
              </div>
              <div style={productDetailStyles.detailText}>
                • 맞춤 제작 상품으로 단순 변심에 의한 교환/환불은 불가합니다.<br/>
                • 제품 불량이나 배송 중 파손 시에만 교환이 가능합니다.<br/>
                • 교환 요청은 상품 수령 후 7일 이내에 고객센터로 연락 주세요.
              </div>
              
              <div style={{...productDetailStyles.detailText, marginTop: '30px'}}>
                <strong>품질 보증</strong>
              </div>
              <div style={productDetailStyles.detailText}>
                • 모든 제품은 품질 검수를 거쳐 발송됩니다.<br/>
                • 인쇄 품질에 문제가 있을 경우 무료로 재제작해드립니다.<br/>
                • 고객센터: 1588-0000 (평일 09:00-18:00)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;