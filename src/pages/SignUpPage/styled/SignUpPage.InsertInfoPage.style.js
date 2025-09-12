import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
    /* min-height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    font-family: inherit;
  }
`;

export const InfoPageContainer = styled.div`
    background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
    display: flex;
    justify-content: center;
    align-items: center;

`

export const Wrapper = styled.div`
  /* background: rgba(255, 255, 255, 0.1); */
  border-radius: 25px;
  padding: 1rem 1rem 0.5rem;
  transform: scale(0.86);
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  position: relative;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const NavBtn = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.25);
  color: #172031;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }

  &.active {
    background: #667eea;
    color: white;
    border-color: white;
    font-weight: 700;
  }
`;

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #7E6EB0;
  margin-bottom: 1.3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.05em;
`;

export const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #BFB2D6;
  text-align: center;
  padding-bottom: 30px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }

  input, select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e1e8ed;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const EmailVerification = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    align-items: stretch;
  }
`;

export const VerifyBtn = styled.button`
  padding: 1rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export const PrimaryBtn = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  margin-top: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
