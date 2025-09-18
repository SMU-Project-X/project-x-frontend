import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const LoginForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;

  h3 {
    text-align: center;
    color: #7e6eb0;
  }

  hr {
    margin-bottom: 15px;
    color: #bbb6b6;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;

  h2 {
    font-size: 36px;
    font-weight: bold;
    color: #7e6eb0;
  }
`;

export const Subtitle = styled.div`
  text-align: center;
  font-size: 13px;
  line-height: 1.3;
  padding-bottom: 15px;
  color: #bfb2d6;
  margin-top: 10px;
`;

export const Label = styled.label`
  line-height: 2;
  font-size: 13px;
  font-weight: 500;
`;

export const Input = styled.input`
  display: block;
  margin-bottom: 5px;
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 12px;
`;

export const Email = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 18px;
    line-height: 40px;
  }
`;

export const EmailAuto = styled.select`
  display: block;
  margin-bottom: 5px;
  padding: 10px;
  width: 100%;
  height: 41px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 13px;
  background-color: white;
`;

export const Code = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  width: 100%;
`;

export const Button = styled.button`
  /* flex: 1; */
  border-radius: 6px;
  border: none;
  background: #8a79af;
  color: #fff;
  cursor: pointer;
`;

export const FindBtn = styled.input`
  border: none;
  background: #8a79af;
  color: #fff;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
`;

export const BackBtn = styled.button`
  margin-top: 10px;
  color: #8a79af;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
`;
