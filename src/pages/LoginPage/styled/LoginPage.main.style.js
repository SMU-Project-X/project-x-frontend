import styled from "styled-components";

export const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const LoginForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 420px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  margin-bottom: 10px;

  h2 {
    font-size: 36px;
    font-weight: bold;
    color: #7E6EB0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
`;

export const Subtitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #BFB2D6;
  padding-bottom: 15px;
`;

export const Hr = styled.hr`
  margin-bottom: 20px;
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #bbb6b6, transparent);
`;

export const FormTitle = styled.h3`
  text-align: center;
  color: #7E6EB0;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

export const Label = styled.label`
  line-height: 2;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  display: block;
  margin-bottom: 15px;
  padding: 12px;
  width: 100%;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  font-size: 14px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: #7E6EB0;
    box-shadow: 0 0 0 3px rgba(126, 110, 176, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

export const LoginOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

export const IdSave = styled.label`
  display: flex;
  align-items: center;
  font-size: 13px;
  gap: 8px;
  color: #555;

  input {
    margin: 0;
    width: auto;
    transform: scale(1.2);
  }
`;

export const RightOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    font-size: 12px;
    color: #9b9595dc;
    transition: color 0.3s ease;
    text-decoration: none;

    &:hover {
      color: #7E6EB0;
    }
  }
`;

export const LoginBtn = styled.input`
  border: none;
  background: linear-gradient(135deg, #8A79AF 0%, #7E6EB0 100%);
  color: #fff;
  padding: 12px;
  width: 100%;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;

  &:hover {
    background: linear-gradient(135deg, #7E6EB0 0%, #6B5B95 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(126, 110, 176, 0.3);
  }
`;

export const KakaoBtn = styled.img`
  width: 100%;
  height: 45px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Signup = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 5px;

  .join {
    color: #760fd6ef;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessages = styled.ul`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;

  li {
    color: #d32f2f;
    font-size: 13px;
    list-style: none;
    margin-bottom: 5px;
  }
`;
