// components/CurrencySelector/CurrencySelector.styled.js
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${props => props.$compact ? '8px 12px' : '12px 16px'};
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Pretendard', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  ${props => props.$compact && css`
    padding: 6px 10px;
    gap: 8px;
  `}
`;

export const Label = styled.span`
  font-size: ${props => props.$compact ? '12px' : '14px'};
  font-weight: 500;
  color: #172031;
  white-space: nowrap;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  background-color: white;
  min-width: 80px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #f5f5f5;
  }

  ${props => props.$loading && css`
    &::after {
      content: '';
      animation: ${spin} 1s linear infinite;
    }
  `}
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusIndicator = styled.div`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  ${props => {
    if (props.$loading) {
      return css`
        color: #74B9FF;
        background-color: rgba(116, 185, 255, 0.1);
        animation: ${spin} 2s linear infinite;
      `;
    } else if (props.$error) {
      return css`
        color: #dc3545;
        background-color: rgba(220, 53, 69, 0.1);
        &:hover {
          background-color: rgba(220, 53, 69, 0.2);
        }
      `;
    } else if (props.$success) {
      return css`
        color: #28a745;
        background-color: rgba(40, 167, 69, 0.1);
      `;
    }
    return '';
  }}
`;

export const LastUpdated = styled.span`
  font-size: 10px;
  color: #999;
  white-space: nowrap;
  opacity: 0.8;
`;

export const RetryButton = styled.button`
  padding: 6px 12px;
  background: #74B9FF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5599e5;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(116, 185, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;