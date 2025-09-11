// MDPage.ProductDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  ContentWrapper,
  ImageSection,
  MainImage,
  MainImagePlaceholder,
  ThumbnailContainer,
  Thumbnail,
  InfoSection,
  ProductTitle,
  ProductPrice,
  OptionSection,
  OptionLabel,
  QuantityContainer,
  QuantityInput,
  QuantityButton,
  TotalPrice,
  ButtonSection,
  CartButton,
  BuyButton,
  ProductDescription,
  DetailSection,
  TabContainer,
  TabButton,
  DetailContent,
  DetailText,
  SpecList,
  SpecItem,
  SpecLabel,
  SpecValue
} from './styled/MDPage.ProductDetail.styled';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 상태 관리
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('detail');
  
  // 임시 상품 데이터
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
    alert('구매 페이지로 이동합니다!');
     navigate('/MD/payment');

  };
  
  // 썸네일 클릭
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  // 탭 변경 함수
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Container>
      {/* 메인 상품 정보 영역 */}
      <ContentWrapper>
        {/* 왼쪽 이미지 영역 */}
        <ImageSection>
          {/* 메인 이미지 */}
          <MainImage>
            <MainImagePlaceholder>
              {product.images[selectedImage]}
            </MainImagePlaceholder>
          </MainImage>
          
          {/* 썸네일 이미지들 */}
          <ThumbnailContainer>
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                active={selectedImage === index}
                onClick={() => handleThumbnailClick(index)}
              >
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {index + 1}
                </span>
              </Thumbnail>
            ))}
          </ThumbnailContainer>
        </ImageSection>
        
        {/* 오른쪽 상품 정보 영역 */}
        <InfoSection>
          {/* 상품명 */}
          <ProductTitle>
            {product.name}
          </ProductTitle>
          
          {/* 가격 */}
          <ProductPrice>
            ₩{product.price.toLocaleString()}
          </ProductPrice>
          
          {/* 옵션 선택 */}
          <OptionSection>
            <OptionLabel>수량</OptionLabel>
            <QuantityContainer>
              <QuantityButton
                onClick={() => handleQuantityChange('decrease')}
              >
                -
              </QuantityButton>
              <QuantityInput
                type="number"
                value={quantity}
                onChange={handleQuantityInput}
                min="1"
              />
              <QuantityButton
                onClick={() => handleQuantityChange('increase')}
              >
                +
              </QuantityButton>
            </QuantityContainer>
          </OptionSection>
          
          {/* 총 가격 */}
          <TotalPrice>
            총 금액: ₩{(product.price * quantity).toLocaleString()}
          </TotalPrice>
          
          {/* 버튼 영역 */}
          <ButtonSection>
            <CartButton onClick={handleAddToCart}>
              장바구니
            </CartButton>
            <BuyButton onClick={handleBuyNow}>
              바로구매
            </BuyButton>
          </ButtonSection>
          
          {/* 상품 설명 */}
          <ProductDescription>
            {product.description}
          </ProductDescription>
        </InfoSection>
      </ContentWrapper>
      
      {/* 상품 상세 정보 및 유의사항 탭 영역 */}
      <DetailSection>
        {/* 탭 네비게이션 */}
        <TabContainer>
          <TabButton
            active={activeTab === 'detail'}
            onClick={() => handleTabChange('detail')}
          >
            상품 상세 정보
          </TabButton>
          <TabButton
            active={activeTab === 'notice'}
            onClick={() => handleTabChange('notice')}
          >
            유의사항
          </TabButton>
        </TabContainer>
        
        {/* 탭 컨텐츠 */}
        <DetailContent>
          {activeTab === 'detail' && (
            <div>
              <DetailText>
                Project X 한정판 포토북으로 특별한 추억을 간직하세요.
              </DetailText>
              <DetailText>
                고급 아트지를 사용하여 선명하고 생생한 이미지를 제공합니다.
                총 100페이지로 구성되어 있으며, A4 사이즈로 제작됩니다.
              </DetailText>
              
              {/* 상품 스펙 */}
              <SpecList>
                {product.specs.map((spec, index) => (
                  <SpecItem key={`spec-${index}`}>
                    <SpecLabel>{spec.label}</SpecLabel>
                    <SpecValue>{spec.value}</SpecValue>
                  </SpecItem>
                ))}
              </SpecList>
            </div>
          )}
          
          {activeTab === 'notice' && (
            <div>
              <DetailText>
                <strong>주문 및 배송 안내</strong>
              </DetailText>
              <DetailText>
                • 주문 완료 후 제작에 3-5일 소요됩니다.<br/>
                • 배송은 제작 완료 후 1-2일 내 발송됩니다.<br/>
                • 전국 무료배송으로 진행됩니다.
              </DetailText>
              
              <DetailText style={{ marginTop: '30px' }}>
                <strong>교환 및 환불 안내</strong>
              </DetailText>
              <DetailText>
                • 맞춤 제작 상품으로 단순 변심에 의한 교환/환불은 불가합니다.<br/>
                • 제품 불량이나 배송 중 파손 시에만 교환이 가능합니다.<br/>
                • 교환 요청은 상품 수령 후 7일 이내에 고객센터로 연락 주세요.
              </DetailText>
              
              <DetailText style={{ marginTop: '30px' }}>
                <strong>품질 보증</strong>
              </DetailText>
              <DetailText>
                • 모든 제품은 품질 검수를 거쳐 발송됩니다.<br/>
                • 인쇄 품질에 문제가 있을 경우 무료로 재제작해드립니다.<br/>
                • 고객센터: 1588-0000 (평일 09:00-18:00)
              </DetailText>
            </div>
          )}
        </DetailContent>
      </DetailSection>
    </Container>
  );
}

export default ProductDetail;