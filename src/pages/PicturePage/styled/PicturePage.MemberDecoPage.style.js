import styled from "styled-components";

export const container=styled.div`
    width:100vw;
    margin:0 auto;
`;
export const background=styled.div`
    width:635px; height:670px; background-color: #F7F5FF; 
    border-radius: 12px; margin:40px auto; text-align: center;
`;
export const member_img=styled.div`
    border:none; padding:50px 0 30px 0;
    img {
      width:310px; height:360px; object-fit: cover;
    }
`;
export const deco_title=styled.div`
    font-size:30px; font-weight: 800;
`;
export const deco_imgs=styled.div`
    display:flex; justify-content: space-between; padding:30px 20px;
`;
export const deco_img=styled.div`
    width:100px; height:100px; border:solid 1px #172031; border-radius: 20px;
    img {
      width:100px; height:100px; object-fit:cover;
    }
`;
export const buttons=styled.div`
    display:flex; position:absolute; right: 200px; bottom:80px;
`;
export const reset=styled.button`
    background:none; border:none;
    img{
      width:38px; height:38px; object-fit: cover;
    }
`;
export const next=styled.button`
    background:none; border:none;
    img{
      width:50px; height:50px; object-fit: cover;
    }
`;