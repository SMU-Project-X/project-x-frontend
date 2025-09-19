// src/pages/MDPage/styled/MDPage.PaymentComplete.styled.js
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-top: 80px;
`;

export const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StatusIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 16px;
`;

export const Message = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 32px;
`;

export const OrderInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #495057;
  min-width: 100px;
`;

export const InfoValue = styled.span`
  color: #2c3e50;
  font-weight: 500;
  text-align: right;
  flex: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 14px 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${props => props.$primary ? '#2196F3' : 'white'};
  color: ${props => props.$primary ? 'white' : '#666'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? '#1976D2' : '#f8f9fa'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;