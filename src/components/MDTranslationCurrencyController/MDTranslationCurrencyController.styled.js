// components/MDTranslationCurrencyController/MDTranslationCurrencyController.styled.js
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: 'Pretendard', sans-serif;
  animation: ${fadeIn} 0.3s ease;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #172031;
  white-space: nowrap;
  min-width: 40px;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  background-color: white;
  min-width: 100px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.2);
  }
  
  &:hover {
    border-color: #74B9FF;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    flex: 1;
    min-width: unset;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  padding: ${props => props.$small ? '6px 12px' : '8px 16px'};
  background: #74B9FF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: ${props => props.$small ? '12px' : '14px'};
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
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
    background: #ccc;
  }

  ${props => props.$secondary && css`
    background: #6c757d;
    &:hover {
      background: #5a6268;
    }
  `}
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => {
    if (props.$type === 'loading') {
      return css`
        color: #74B9FF;
        background-color: rgba(116, 185, 255, 0.1);
        border: 1px solid rgba(116, 185, 255, 0.2);
      `;
    } else if (props.$type === 'error') {
      return css`
        color: #dc3545;
        background-color: rgba(220, 53, 69, 0.1);
        border: 1px solid rgba(220, 53, 69, 0.2);
      `;
    } else if (props.$type === 'success') {
      return css`
        color: #28a745;
        background-color: rgba(40, 167, 69, 0.1);
        border: 1px solid rgba(40, 167, 69, 0.2);
      `;
    }
    return css`
      color: #6c757d;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
    `;
  }}
`;

export const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const StatusText = styled.span`
  line-height: 1;
`;

// 헤더에 작게 표시할 때 사용할 컴팩트 스타일
export const CompactContainer = styled(Container)`
  padding: 8px 12px;
  margin: 0;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const CompactControlsWrapper = styled(ControlsWrapper)`
  margin-bottom: 0;
  gap: 12px;
`;

export const CompactSelect = styled(Select)`
  padding: 4px 8px;
  font-size: 12px;
  min-width: 60px;
`;

export const CompactLabel = styled(Label)`
  font-size: 11px;
  min-width: 30px;
`;

export const CompactStatusBar = styled(StatusBar)`
  padding: 4px 8px;
  font-size: 10px;
  margin-top: 4px;
`;

// 헤더 우상단에 표시할 미니 버전
export const MiniContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  font-size: 11px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const MiniSelect = styled.select`
  padding: 2px 6px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
  background: white;
  min-width: 50px;
  
  &:focus {
    outline: none;
    border-color: #74B9FF;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MiniButton = styled.button`
  padding: 2px 6px;
  background: #74B9FF;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #5599e5;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #ccc;
  }
`;