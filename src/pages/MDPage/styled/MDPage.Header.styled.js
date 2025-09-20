// MDPage.Header.styled.js
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1600px;
  height: 73px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 60px;
  position: relative;
  z-index: 100;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  flex-shrink: 0;
`;

export const Logo = styled.h1`
  color: #172031;
  font-family: 'Pretendard', sans-serif;
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 25px;
  flex: 1;
  justify-content: center;
  max-width: 700px;
`;

export const NavItem = styled.button`
  background: none;
  border: none;
  color: #172031;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background-color: rgba(23, 32, 49, 0.1);
  }
  
  &.active {
    border-bottom: 3px solid #172031;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 320px;
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 20px;
  width: 44px;
  height: 44px;
  
  &:hover {
    background-color: rgba(23, 32, 49, 0.1);
  }
`;

export const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  min-width: 140px;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.$isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #172031;
  
  &:hover {
    background-color: #B3D1F0;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  font-size: 12px;
  width: 150px;

  &::placeholder {  
    font-size: 12px;  
  }
  &:focus {
    outline: none;
    border-color: #74B9FF;
    box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.2);
  }
`;