import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ���� ��Ÿ��
export const PageWrapper = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: rgba(255, 255, 255, 0.95);
    min-height: 100vh;

    & *,
    & *::before,
    & *::after {
        box-sizing: border-box;
    }
`;

// ��Ÿ���� ����� ������Ʈ��
export const Header = styled.header`
    background: linear-gradient(90deg, #64b5f6 0%, #42a5f5 50%, #2196f3 100%);
    padding: 15px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    height: 60px;
`;

export const NavContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

export const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

export const NavMenu = styled.nav`
    display: flex;
    gap: 40px;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.a`
    color: white;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.3s ease;
    &:hover {
        color: #e1f5fe;
    }
`;

export const LoginBtn = styled.a`
    background: rgba(255,255,255,0.2);
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    text-decoration: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s ease;
    &:hover {
        background: rgba(255,255,255,0.3);
    }
`;

export const MainContainer = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
    text-align: center;
`;

export const TitleSection = styled.div`
    margin-bottom: 80px;
    h1 {
        text-align: center;
        color: #333;
        margin: 0 0 30px;
        font-size: 2.5em;
        background: linear-gradient(45deg, #87ceeb, #4fc3f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;

export const CharactersSection = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-bottom: 80px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
`;

export const CharacterCard = styled.div`
    background: #E8F5FE;
    border-radius: 20px;
    padding: 30px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 35px rgba(0,0,0,0.15);
    }
    &.selected {
        background-color: #FCE4EC;
        border: 3px solid #007bff;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
        transform: translateY(-5px);
        transition: all 0.3s ease;
    }
`;

export const CharacterAvatar = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
    border: 2px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
`;

export const CharacterImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

export const CharacterName = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    .selected & {
        color: #0056b3;
        font-weight: bold;
    }
`;

export const CharacterRole = styled.div`
    font-size: 14px;
    color: #666;
`;

export const CTASection = styled.div`
    margin-bottom: 60px;
    max-width: 1200px;
    margin: 50px auto;
    padding: 0 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }
`;

export const CTAText = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        font-size: 24px;
        text-align: center;
        margin-bottom: 0;
    }
`;

export const NextBtn = styled.button`
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
    color: white;
    padding: 15px 40px;
    border: none;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255,154,158,0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    float: right;
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        box-shadow: none;
    }
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255,154,158,0.5);
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;
