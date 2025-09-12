import styled from "styled-components";

export const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const LoginForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  width: 400px;

  h3 {
    text-align: center;
    color: #7E6EB0;
  }

  hr {
    margin-bottom: 15px;
    color: #bbb6b6;
  }

  label {
    line-height: 2;
    font-size: 13px;
    font-weight: 500;
  }

  @media (max-width: 375px) {
    padding: 25px 30px;

    .top h2 {
      font-size: 28px;
    }

    h3 {
      font-size: 17px;
    }

    .subtitle {
      font-size: 11px;
    }

    input {
      font-size: 13px;
    }
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
    color: #7E6EB0;
  }
`;

export const Subtitle = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  padding-bottom: 15px;
  margin-top: 2px;
  font-weight: 400;
  color: #BFB2D6;
`;

export const Input = styled.input`
  display: block;
  margin-bottom: 5px;
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const FindPWBtn = styled.input`
  background: #8A79AF;
  color: #fffdfd;
  margin-top: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const BackBtn = styled.input`
  background: transparent;
  color: #8A79AF;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
`;
