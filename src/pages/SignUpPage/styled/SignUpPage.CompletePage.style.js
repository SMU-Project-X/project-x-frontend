import styled, { keyframes } from "styled-components";

export const Body = styled.div`
  background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard", sans-serif;
  position: relative;
  overflow: hidden;
`;

const twinkle1 = keyframes`
  from { opacity: 0.1; transform: scale(0.8); }
  to { opacity: 0.35; transform: scale(1.1); }
`;
const twinkle2 = keyframes`
  from { opacity: 0.12; transform: scale(0.9); }
  to { opacity: 0.32; transform: scale(1.05); }
`;
const twinkle3 = keyframes`
  from { opacity: 0.08; transform: scale(0.7); }
  to { opacity: 0.28; transform: scale(1.2); }
`;

export const Star = styled.div`
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;

  &.star-1 { top: 25%; left: 8%; width: 70px; height: 70px; opacity: 0.22; animation: ${twinkle2} 3s ease-in-out infinite alternate; }
  &.star-2 { bottom: 20%; right: 15%; width: 85px; height: 85px; opacity: 0.18; animation: ${twinkle3} 5s ease-in-out infinite alternate; }
  &.star-3 { top: 10%; left: 30%; width: 55px; height: 55px; opacity: 0.25; animation: ${twinkle1} 2.5s ease-in-out infinite alternate; }
  &.star-4 { bottom: 15%; left: 12%; width: 65px; height: 65px; opacity: 0.15; animation: ${twinkle2} 4.5s ease-in-out infinite alternate; }
  &.star-5 { top: 60%; right: 5%; width: 45px; height: 45px; opacity: 0.20; animation: ${twinkle3} 3.5s ease-in-out infinite alternate; }
  &.star-6 { top: 35%; left: 25%; width: 50px; height: 50px; opacity: 0.17; animation: ${twinkle1} 3.8s ease-in-out infinite alternate; }
  &.star-7 { bottom: 35%; right: 8%; width: 60px; height: 60px; opacity: 0.19; animation: ${twinkle2} 4.2s ease-in-out infinite alternate; }
  &.star-8 { top: 8%; right: 25%; width: 40px; height: 40px; opacity: 0.23; animation: ${twinkle3} 2.8s ease-in-out infinite alternate; }
  &.star-9 { bottom: 45%; left: 5%; width: 75px; height: 75px; opacity: 0.16; animation: ${twinkle1} 5.5s ease-in-out infinite alternate; }
  &.star-10 { top: 45%; right: 30%; width: 35px; height: 35px; opacity: 0.21; animation: ${twinkle2} 3.2s ease-in-out infinite alternate; }
`;

export const SignupWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 1.5rem 1rem 1rem;
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const SignupContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  /* width: 100%; */
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

export const Logo = styled.img`
  width: 100px;
  margin: 0.5rem 0 1.5rem 0;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #7e6eb0;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-bottom: 1.5rem;
`;

export const ButtonPrimary = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;
