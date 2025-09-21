// MyPage.styled.js - 스타일 컴포넌트
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: white;
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 30px;
  background: white;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const Tab = styled.button`
  flex: 1;
  padding: 20px 30px;
  border: none;
  background: ${props => props.active ? '#74B9FF' : 'white'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${props => props.active ? 'white' : '#666'};
  transition: all 0.3s ease;
  border-bottom: 3px solid ${props => props.active ? '#0984e3' : 'transparent'};
  
  &:hover {
    background: ${props => props.active ? '#74B9FF' : '#f8f9fa'};
    color: ${props => props.active ? 'white' : '#74B9FF'};
  }
`;

export const ContentSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin-bottom: 20px;
  border: 1px solid #f1f3f4;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 18px;
  color: #666;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px 20px;
  font-size: 16px;
  color: #dc3545;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(220, 53, 69, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
  font-family: 'Pretendard', sans-serif;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #74B9FF 0%, #0984e3 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #0984e3 0%, #74B9FF 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(116, 185, 255, 0.4);
    }
  ` : `
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
      transform: translateY(-1px);
    }
  `}
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const InfoCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 120px;
  font-size: 14px;
`;

export const InfoValue = styled.span`
  color: #666;
  flex: 1;
  text-align: right;
  font-size: 14px;
`;

export const AdminSection = styled.div`
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%);
  border-radius: 12px;
  border: 1px solid #74B9FF;
`;

export const AdminTitle = styled.h3`
  margin-bottom: 10px;
  color: #0056b3;
  font-size: 18px;
  font-weight: 600;
`;

export const AdminDescription = styled.p`
  margin-bottom: 15px;
  color: #666;
  line-height: 1.5;
`;

export const SettingsSection = styled.div`
  margin-bottom: 30px;
`;

export const SettingsTitle = styled.h3`
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

export const SettingsDescription = styled.p`
  margin-bottom: 15px;
  color: #666;
  line-height: 1.5;
`;

export const DangerSection = styled.div`
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%);
  border-radius: 12px;
  border: 1px solid #fed7d7;
`;

export const DangerTitle = styled.h3`
  margin-bottom: 15px;
  color: #c53030;
  font-size: 18px;
  font-weight: 600;
`;

export const DangerDescription = styled.p`
  margin-bottom: 15px;
  color: #666;
  line-height: 1.5;
`;

export const DangerButton = styled(Button)`
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  
  &:hover {
    background: linear-gradient(135deg, #c82333 0%, #dc3545 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  }
`;

export const OrderSection = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #ddd;
`;

export const OrderIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

export const OrderMessage = styled.div`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const ValidationMessage = styled.small`
  color: #666;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;