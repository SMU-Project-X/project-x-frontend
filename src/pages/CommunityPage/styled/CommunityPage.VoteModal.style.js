import styled from "styled-components";

export const ModuleContainer = styled.div `
    background-color: #B3D1F0;
    border: 2px solid #B3D1F0;
    border-radius: 40px;
    margin-top: 40px;
    width: 70vw;
    height: 40vw;
    max-width: 90%;
    overflow-y: auto;
    position: relative;
`;
export const VoteContainer = styled.div `
    width: 80%;
    margin: 0 auto;
    position: relative;
    h1 {
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 30px; font-family:Arial, Helvetica, sans-serif;
        padding: 20px;
        font-weight: bold;
    }
`;

export const VoteSelect = styled.div `
    display: flex;
    align-items: center;
    h3 {
        width: 120px;
        height: 40px;
    }
`;

export const RadioInfo = styled.div `
    width: 120px;
    height: 80px;
    max-width: 70%;
    text-align: center;
    input[name="choice"] {
        width: 30px;
        height: 30px;
    }
`;

export const Unit = styled.div `
    width: 80%;
    display: flex;
    gap: 16px;
`;
export const VoteCard = styled.div `
    width: 173px;
    height: 193px;
    overflow: hidden;
    text-align: center;
    padding-top: 20px;
    transition: transform 0export const 2s ease;
    box-shadow: 0 4px 4px #cdcdce;
`;

export const VoteImg = styled.div `
    img {
        width: 120px;
        height: 140px;
    }
`;

export const VoteContent = styled.div `
    padding: 5px;
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
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 1;
`;
export const BaseContainer = styled.div`
    

`;
export const CloseBtn = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: end;
    cursor: pointer;
    & hover {
        color: #ff4d4f;
    }
`;

