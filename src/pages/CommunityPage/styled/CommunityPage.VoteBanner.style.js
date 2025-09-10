import styled  from "styled-components";


/* 배너부분 */
export const banner_container = styled.div`
    display: flex;
`;

export const sectionTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 179px;
    margin-bottom: 10px;
`;

export const section_title = styled.div`
    align-items: center;
    gap: 10px;
    font-size: 28px;
    font-weight:bold;
    color: #606060;
    margin-bottom: 8px;
      
    @media (max-width: 1024px) {
        font-size: 24px;
    }
`;

export const voteImg = styled.div`
    img{
        width: 40px;             /* 이미지 크기 조절 */
        height: auto;
    }
`; 

/* 슬라이드 배너 */
export const slider_container = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 15px;
`; 

export const slider = styled.div`
    width: 100%;
    overflow: hidden;
    height: 230px;
`; 

export const slide = styled.div`
    min-width: 33.333%;
    padding: 0 10px;
    display:flex;
    gap: 20px;
    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

/* export const vote-card::before
  content:'';
  position: relative;
  top: 0;
  right:0;
  width: 100px;
  height: 100px;
  background-size: contain;
  opacity: 0export const 8;
 */
export const vote_card = styled.div`
    border-radius: 40px;
    width: 320px;
    height: 150px;
    padding: 15px;
    background-color: #F82878;
    color: #ffffff;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space_between;
    gap:5px;
    align-items: center;

    @media (max-width: 1024px) {
        width: 280px;
        height: 140px;
    }
    @media (max-width: 768px) {
        width: 100%;
        height: 130px;
    }
`; 

export const vote_content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 146px;
    margin-top: 50px;
    h3{
        font-size: 17px;
        font-style: bold;
    }
    p{
        font-size: 12px;
    }
`; 


export const vote_title = styled.h3`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    word-wrap: break-word;   /* 단어 단위로 줄바꿈 */
    overflow-wrap: break-word; /* 최신 표준 */
    white-space: normal;     /* 줄바꿈 허용 */

    @media (max-width: 768px) {
        font-size: 16px;
    }
}

`;

export const vote_date = styled.div`
    font-size: 11px; 
    opacity: 0export const 9;
    z-index: 1;
`; 


export const vote_img = styled.div`
    width: 100%;
    object-fit: fill;
    img{
        width: 200px;
        height: 180px;
    }
`;

export const prevBtn = styled.div`
    left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 40px;
        height: 40px;
    }
`;
export const nextBtn = styled.div`
    left:10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 40px;
        height: 40px;
    }
`;


