import styled from "styled-components"

export const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 200px;
`

export const Track = styled.div`
  display: flex;
  gap: 20px;
  will-change: transform;
  margin: 20px 0 20px;

`

export const Card = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 180px;
  background: #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`


export const ViewPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
`;
export const CharacterModelViewWrapper = styled.div`
    width: 100%;
    height: 700px; /* 원하는 높이 */
    /* background-color: gray; */

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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