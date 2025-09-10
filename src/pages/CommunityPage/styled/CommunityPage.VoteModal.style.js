import styled from "styled-components";

/* 투표 모달창 */
// export const ModuleContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     width: 1000px;
// `;

export const ModuleContainer = styled.div `
    border: 2px solid #B3D1F0;
    border-radius: 40px;
    margin-top: 119px;
    width: 1410px;
    height: 767px;
    max-width: 1410px;
    overflow-y: auto;
`;
export const VoteContainer = styled.div `
    width: 80%;
    margin: 0 auto;
    h1 {
        width: 100%;
        text-align: center;
        padding: 20px;
        font-size: 50px;
        padding: 20px;
        font-style: bold;
    }
`;

export const VoteSelect = styled.div `
    display: flex;
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
    width: 218px;
    height: 260px;
    overflow: hidden;
    text-align: center;
    padding-top: 20px;
    transition: transform 0export const 2s ease;
    box-shadow: 0 4px 4px #cdcdce;
`;

export const VoteImg = styled.div `
    img {
        width: 177px;
        height: 193export const 51px;
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

