import styled from "styled-components";

export const container = styled.div`
    width:100vw;
    margin:0 auto;
`;
export const title = styled.div`
    color:#71C0E3; font-size:50px; font-weight:700; 
    width: 750px; margin:40px auto; text-align: center;
    img {
      width:62px; height:62px;
    }
`;
export const group_title = styled.span`
    width:624px; margin:20%;
`;
export const members = styled.div`
    display:flex; justify-content: center;
`;
export const member = styled.div`
    width:260px; height:350px; margin:20px; align-content: center; text-align: center;
    border-radius:20px; background-color:#E6F4FD; border:solid 1px #E9F6FE; cursor:pointer;
    img{
      width:145px; height:145px; border-radius: 50%;
    }
    &:hover{
      border:2px solid #B3D1F0;
    }
`;
export const member_name = styled.div`
    color:#474B4E; font-size:25px; padding:15px;
`;
export const member_position = styled.div`
    color:#98A3A9; font-size:15px;
`;
export const choice = styled.div`
    text-align: center; margin-top:20px;
`;
export const nextBtn = styled.button`
    width:150px; height:65px;
    position:fixed; right:30px; bottom:30px;
    background-color: #FFB3D2; color:white; 
    border:none; border-radius: 15px; font-size:20px;
`;