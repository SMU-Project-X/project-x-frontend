import styled, { keyframes, css } from "styled-components";

// 점점 커지는 애니메이션
const scaleUp = keyframes`
    from {
        transform:scale(0);  opacity: 0;
    }
    to {
        transform: scale(1); opacity: 1;
    }
`;

// 작아지는 스케일 애니메이션
const scaleDown = keyframes`
    from {
        transform:scale(1.05);
    }
    to {
        transform: scale(1);
    }
`;

// 텍스트 fade-in 애니메이션
const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

// 호버 시 커졌다 작아졌다 애니메이션
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%); /* 아래쪽에서 시작 */
    opacity: 0;
  }
  to {
    transform: translateY(0);    /* 제자리 */
    opacity: 1;
  }
`;

////////////////////////////////////

export const SplashPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #B3D1F0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* 확대 시 화면 밖 요소 잘리도록 */
`;

export const TitleWappper = styled.div.attrs(() => ({}))`
    width: 647px;
    height: 647px;
    background-color: #FAFAF7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;

    transform: scale(0); //시작할 시에 요소 크기 0
    // forwords: 애니메이션 끝난 뒤 요소 크기 유지
    // ease-out: 점점 느리게 커지도록 자연스러운 느낌을 줌
    animation: ${pulse} 1s ease-in-out infinite;

    ${({ animated }) =>
        animated ?
            css`
        /* animated === true 일 때 (진입한 뒤 첫 애니메이션 실행이 종료된 후) */
        transform: scale(1);  /* 애니메이션 없이 기본값 유지 */
      `
            : css`
        /* animated === false 일 때 (처음 진입했을 때) */
        animation: ${scaleUp} 2.5s ease-out forwards;
        
      `
    }

    ${({ hoverAllowed }) =>
        hoverAllowed &&
        css`
        &:hover {
            /* 애니메이션이 종료된 후 호버하였을 때*/
            animation: ${pulse} 1s ease-in-out infinite;
        }
        &:not(:hover) {
            /* 애니메이션이 종료된 후 호버를 벗어났을 때*/
            animation: ${scaleDown} 1s ease-in-out forwards;
        }
    `}
`;

export const TitleSubText = styled.span`
    color: #172031;
    opacity: 0;                       /* 처음엔 안 보임 */
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 2.5s;              /* 원이 커진 뒤 시작 */
    margin: 0;
`;

export const TitleMainText = styled.h1`
    color: #172031;
    opacity: 0;                       /* 처음엔 안 보임 */
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 2.5s;              /* 원이 커진 뒤 시작 */
    margin: 0;

    color: #172031;

font-size: 80px;
font-style: normal;
font-weight: 700;

`;

export const LetterWrapper = styled.div`
    width: 80%;
    height: 80%;
    position: absolute;
    bottom: 0;
    max-width: 708px;

    border-radius: 25px 25px 0 0;
    background: #FAFAF7;

    box-shadow: 5px 4px 100px 0 rgba(0, 0, 0, 0.25);

    animation: ${slideUp} 1s ease-in-out forwards;
    padding: 50px;
    
`;

export const LetterTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 10px;
`

export const LetterTitleText = styled.p`
    color: #172031;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    
`;

export const LetterContentText = styled.p`
    color: #172031;
    //font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
    white-space: pre-line;
`;
export const LetterFromTextWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    margin: 50px 0 30px;
`

export const LetterFromText = styled.p`
    color: #000;
    //font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    white-space: pre-line;
`;

export const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const NextBtn = styled.div`
    display: flex;
    width: 496px;
    height: 67px;
    padding: 17px 107px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 15px;
    background: #A259FF;

    color: #FFF;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`