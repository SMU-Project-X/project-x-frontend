import styled from "styled-components";


/* 모달창 */
export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(68, 68, 68, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100;
    z-index: 1000;
`;

export const CloseBtn = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    float: right;
    align-items: center;
    background-color: #B3D1F0;
    border-radius: 50%;
    cursor: pointer;
    & hover {
        color: #ff4d4f;
    }
`;

export const top = styled.div`
    width:100%;
    display: flex;
    text-align: center;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
`;

export const SwiperWrapper  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px; /* 버튼과 슬라이드 사이 간격 */
    position: relative;
    padding: 10px;
`;

// 모달 본체
export const ModuleContainer = styled.div `
    background: #eae7f7ff;
    border-radius: 50px;
    width: 46vw;
    height: 80vh;
    position: relative;
    padding: 20px;
    
    @media (max-width: 1024px) {
        width: 90%;
        height: auto;
    }
    @media (max-width:768px) {
        height:auto;
        padding: 20px;
    }
    @media (max-width: 480px) {
        width: 100%;
        height: 100%;
        border-radius: 0; 
    }
`;

// 투표컨테이너 
export const VoteContainer = styled.div `
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    
    h1 {
        width: 70%;
        text-align: center;
        font-size: 23px;
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
    /* background-color: rgba(255, 255, 255, 0.8); */
    width: 100vw;
    border: 1px soid black;
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
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    
    @media (max-width: 768px)  {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap:20px;
    }
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
    
`;

// 각 유닛(이미지 4개 그리드)
export const Unit = styled.div `
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
    padding: 10px;
    justify-items: center;
    align-items: center;
    width: 100%;
    &:hover{
        transform: scale(1.05);
    }
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
    width: 100%;
    height: 26vh;
    overflow: hidden;
    text-align: center;
    padding-top: 20px;
    transition: transform  0.2s ease;
    box-shadow: 0 4px 4px #767676ff;
    background-color: #ffffff;
    border: 1px solid #B3D1F0;
    
`;

export const VoteImg = styled.div `
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        width: 182px;
        height: 200px;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        width: 100px;
        height: 120px;
    }

    @media (max-width: 480px) {
        width: 100%;
        height: auto;
    }
`;

export const UnitInfo = styled.div `
    padding: 2px;
    font-size: 11px;
    height: auto;
    min-height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    span{
        font-size: 12px;
        font-weight: 500;
        word-break: keep-all;
        overflow-wrap: break-word;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

export const VoteButton = styled.div`
    width: 100%;
    max-width: 300px;
    height: 50px;
    margin: 15px auto 0;
    border: 2px solid #333;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

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
