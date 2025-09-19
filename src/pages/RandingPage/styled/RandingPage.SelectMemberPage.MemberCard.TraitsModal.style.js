// src/pages/RandingPage/styled/TraitsModal.style.js
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 400px;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
`;

export const TraitButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    filter: grayscale(100%);
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
