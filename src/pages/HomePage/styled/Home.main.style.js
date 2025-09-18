import styled from "styled-components"

export const HomePageContainer = styled.div`
    width: 100vw;
    min-height: 100vh; /* 화면 최소 높이만 보장 */
    display: flex;
    flex-direction: column;
`

export const LogoVideoWrapper = styled.div`
    position: relative; /* 자식 absolute 기준 */
    width: 100vw;
    height: 100vh;
`;

export const LogoVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const MemberInfoNavContainer = styled.div`
    position: absolute;
    bottom: 20px;    /* 하단에서 20px */
    left: 50%;       /* 가로 중앙 기준 */
    transform: translateX(-50%);  /* 정확히 중앙 정렬 */
    width: 316px;
    padding: 10px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const HideWrapper = styled.div`
    position: absolute;
    top: 20px;    /* 하단에서 20px */
    right: 40px;       /* 가로 중앙 기준 */
    width: 316px;

    height: 70px;
    border-radius: 30px;
    background: #FFB3D2;   
`

export const MemberInfoNav = styled.div`
    width: 100%;
    height: 70px;
    border-radius: 30px;
    background: #FFB3D2;   

    display: flex;
    justify-content: center; 
    align-items: center;    
    color: #000;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const ArrowContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    
`
    

export const ChevronImage = styled.img`
    transform: rotate(${(props) => props.$rotate || 0}deg);
    transition: transform 0.3s ease;
`;

export const MemberInfoContainer = styled.div`
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 1fr 1fr;

    align-items: center;
    justify-items: center;
`

export const MemberCardWapper = styled.div`
    width: 347px;
    height: 390px;
    background: #FDFCFB;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`

export const MemberImg = styled.img`
    width: 283px;
    height: 303px;
    
`

export const MemeberTagWrapper = styled.div`
    width: 100%;
    height: 24px;

    color: #172031;
    //font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    text-align: center;
`

export const ContentContainer = styled.div`
    width: 100vw;
    height: 100vh;
`

export const CountdownWrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
`

export const ContentMapContainer = styled.div`
    width: 100%;
    height: 535px;

    display: grid;
    grid-template-columns: 1fr 50px 1fr 50px 1fr;

    align-items: center;
    justify-items: center;

    /* 6번째 요소를 가운데 칸(3번째 열)에만 배치 */
  & > *:nth-child(6) {
    grid-column: 5;
}
`

export const ContentViewBtnWrapper = styled.div`
    width: 222px;
    height: 212px;

    position: relative;
`

export const ContentViewBtn = styled.div`
    width: 201px;
    height: 201px;
    border-radius: 100%;
    border:3px solid #A380C9;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

    position: absolute;
    right: 0px;
    bottom: 0px;

    z-index: 1;
`

export const ContenDateWrapper = styled.div`
    width: 61px;
    height: 61px;
    transform: rotate(-45deg);

    border-radius: 10px;
    border: 2px solid #843ED6;
    background: #FFF;

    position: absolute;
    left: 10px;
    top: 10px;

    z-index: 2; 
`

export const JoinContainer = styled.div`
    width: 100%;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const JoinTitleText = styled.div`
    color: #172031;
    //font-family: Pretendard;
    font-size: 50px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 30px;
`

export const JoinBtnContainer = styled.div`
    width: 684px;
    
    display: flex;
    justify-content: space-between;
    margin: 30px 0 35px;
`

export const JoinBtn = styled.div`
    width: 316px;
    height: 69px;

    border-radius: 30px;
    background: #FFB3D2;

    color: #FDFCFB;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: #474747;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
`