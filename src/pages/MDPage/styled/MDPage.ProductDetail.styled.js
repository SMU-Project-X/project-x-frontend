// MDPage.ProductDetail.styled.js
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 80px;
  display: flex;
  gap: 60px;
`;

// 왼쪽 이미지 영역
export const ImageSection = styled.div`
  flex: 1;
  max-width: 500px;
`;

export const MainImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #F8F8F8;
  border: 1px solid #E5E5E5;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const MainImagePlaceholder = styled.span`
  color: #999;
  font-size: 18px;
  font-family: 'Pretendard', sans-serif;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background-color: #F0F0F0;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: ${props => props.$active ? '2px solid #A259FF' : '1px solid #E5E5E5'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

// 오른쪽 정보 영역
export const InfoSection = styled.div`
  flex: 1;
  max-width: 500px;
  padding: 20px 0;
`;

export const ProductTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  color: #172031;
  margin-bottom: 20px;
  line-height: 1.4;
  margin: 0 0 20px 0;
`;

export const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  color: #A259FF;
  margin-bottom: 30px;
`;

export const OptionSection = styled.div`
  margin-bottom: 40px;
`;

export const OptionLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard', sans-serif;
  color: #172031;
  margin-bottom: 12px;
  display: block;
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 30px;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  width: fit-content;
`;

export const QuantityInput = styled.input`
  width: 50px;
  height: 35px;
  border: none;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  background-color: transparent;
  
  &:focus {
    outline: none;
  }
`;

export const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #172031;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F8F8F8;
  }
`;

export const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 30px;
  font-family: 'Pretendard', sans-serif;
`;

// 버튼 섹션
export const ButtonSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
`;

export const CartButton = styled.button`
  flex: 1;
  height: 50px;
  background-color: #B3D1F0;
  color: #172031;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #9CC5E8;
    transform: translateY(-2px);
  }
`;

export const BuyButton = styled.button`
  flex: 1;
  height: 50px;
  background-color: #74B9FF;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #5A9FEE;
    transform: translateY(-2px);
  }
`;

export const ProductDescription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  font-family: 'Pretendard', sans-serif;
`;

// 하단 상세 정보 영역
export const DetailSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 80px;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #E5E5E5;
  margin-bottom: 30px;
`;

export const TabButton = styled.button`
  padding: 15px 30px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Pretendard', sans-serif;
  color: ${props => props.$active ? '#172031' : '#666'};
  cursor: pointer;
  border-bottom: ${props => props.$active ? '3px solid #B3D1F0' : '3px solid transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: #172031;
  }
`;

export const DetailContent = styled.div`
  background-color: #F8F8F8;
  border-radius: 15px;
  padding: 40px;
  min-height: 300px;
  border: 1px solid #E5E5E5;
`;

export const DetailText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  font-family: 'Pretendard', sans-serif;
  color: #172031;
  margin-bottom: 20px;
  
  strong {
    font-weight: 700;
  }
`;

export const SpecList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SpecItem = styled.li`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #E5E5E5;
  font-size: 15px;
  font-family: 'Pretendard', sans-serif;
`;

export const SpecLabel = styled.span`
  width: 120px;
  font-weight: 600;
  color: #172031;
`;

export const SpecValue = styled.span`
  color: #666;
  flex: 1;
`;