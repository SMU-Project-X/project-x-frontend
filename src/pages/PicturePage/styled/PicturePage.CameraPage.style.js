import styled from "styled-components";

export const container=styled.div`
    width: 100vw;
    margin: 0 auto;
    text-align: center;
`;
export const title=styled.div`
    display: flex;
    width: 636px;
    justify-content: space-between;
    align-items: center;
    margin: 40px auto;
    padding: 0 15px;
`;
export const back=styled.div`
    background: none;
    border: none;
    cursor: pointer;

    img{
      width: 27px;
      height: 27px;
      object-fit: cover;
    }
`;
export const photobooth=styled.div`
    font-size: 30px;
    font-weight: 700;
`;
export const share=styled.div`
    background: none;
    border: none;
    cursor: pointer;

    img{
      width: 35px;
      height: 35px;
      object-fit: cover;
    }
`;
export const camera_frame=styled.div`
    position: relative;
    width: 640px;
    height: 480px; 
    border: solid 2px black;
    border-radius: 40px;
    margin: 0 auto;
`;
export const Video=styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px;
`;
export const photo_container=styled.div`
    position: absolute;
    bottom: 0;
    width: 310px;
    height: 360px;
    overflow: hidden;

    img{
        border-radius: 40px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
export const person_photo=styled.div`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
export const capture=styled.div`
    background: none;
    border: none;
    margin: 20px 0;
    cursor: pointer;
    
    img{
      width: 45px;
      height: 45px;
      object-fit: cover;
    }
`;