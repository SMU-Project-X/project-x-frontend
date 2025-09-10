import styled from "styled-components";

export const ViewPageContainer = styled.div`
    width: 100vw;
    background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
    display: flex;
    padding-top: 50px;
    
`;

export const CharacterImgTitle = styled.p`
    color: #172031;
    text-align: center;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const CharacterImgContainer = styled.div`
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 300px;
    gap: 10px; */
    width: 900px;
    height: 100vh;  // 전체 화면 높이

    max-height: calc(100vh - 50px);
    overflow-y: auto; /* 세로 스크롤 */
    padding-right: 10px; /* 스크롤바 여백 */
    margin-left: 50px;
`;

export const CharacterModelViewWrapper = styled.div`
    width: 410px;
    height: 700px; /* 원하는 높이 */
    /* background-color: gray; */

    position: fixed;
    top: 100px;
    right: 80px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.25);
`

export const NextBtn = styled.div`
    display: flex;
    width: 80px;
    height: 67px;
    justify-content: center;
    align-items: center;

    border-radius: 15px;
    background: #A259FF;

    color: #FFF;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`