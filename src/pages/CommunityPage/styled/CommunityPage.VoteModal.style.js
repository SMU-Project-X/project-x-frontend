import styled from "styled-components";

export const ModuleContainer = styled.div `
    border-radius: 40px;
    width: 100%;
    max-width: 1200px;
    height: auto;
    position: relative;

    @media (max-width:768px) {
        height:auto;
        padding: 20px;
    }
`;

// 투표컨테이너 
export const VoteContainer = styled.div `
    width: 100%;
    max-width: 100%;
    height: auto;
    margin:0 auto;
    position: relative;
    cursor: pointer;
    h1 {
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 30px; font-family:Arial, Helvetica, sans-serif;
        padding: 20px;
        font-weight: bold;
    }
    @media (max-width: 1024px) {
        width: 100%;
        margin-left: 0;
        padding: 30px;
    }

    @media (max-width: 768px) {
        padding: 20px;
        h1 {
            font-size: 24px;
        }
    }
`;

export const VoteSelect = styled.div `
    display: contents;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff;

    h3 {
        width: 120px;
        height: 40px;
    }
`;

export const RadioInfo = styled.div `
    width: 120px;
    max-width: 70%;
    text-align: center;
    input[name="choice"] {
        width: 30px;
        height: 30px;
    }
`;

// 유닛 전체
export const UnitContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
    width: 100%;

    @media (max-width: 768px)  {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap:20px;
    }
`;

// 각 유닛(이미지 4개 그리드)
export const Unit = styled.div `
    width: 40%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
    @media (max-width: 1024px) {
        width: 48%;
    }
    @media (max-width: 768px) {
        width: 100%;
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr; // 세로로 1열
    }
`;
export const VoteCard = styled.div `
    width: 136px;
    height: 216px;
    overflow: hidden;
    text-align: center;
    padding-top: 20px;
    transition: transform  0.2s ease;
    box-shadow: 0 4px 4px #cdcdce;
`;

export const VoteImg = styled.div `
    img {
        width: 150px;
        height: 170px;
        object-fit: cover;

    @media (max-width: 768px) {
        width: 100px;
        height: 120px;
    }

    @media (max-width: 480px) {
        width: 100%;
        height: auto;
    }
    }
`;

export const VoteContent = styled.div `
    padding: 5px;
    font-size: 14px;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;


/* 투표완료시 안내창 */
export const VoteBlock= styled.div `
    text-align: center;
`;

export const NoMoreVote = styled.div `
    p{
        font-size: 40px;
        font-weight: bold;
    }
`;


/* 모달창 */
export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(68, 68, 68, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    overflow: auot;
`;

export const CloseBtn = styled.div`
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: end;
    float: right;
    padding: 10px;
    cursor: pointer;
    & hover {
        color: #ff4d4f;
    }
`;

