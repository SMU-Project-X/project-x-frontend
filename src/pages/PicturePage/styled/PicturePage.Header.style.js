import styled from "styled-components";

export const header = styled.div`
        width:100vw; height:75px; background-color: #B3D1F0;
        display:flex; justify-content: center; align-items: center; text-align: center;
`;
export const logo = styled.div`
        width:20%; font-size:25px; font-weight: 800;
`;
export const logo_x = styled.span`
        font-size:35px; font-family: cursive;
`;
export const menu= styled.div`
        width:50%; display:flex; justify-content: center; font-size:25px; font-weight: 700;
        span {
          margin:0 10px;
        }
`;
export const login = styled.div`
        width:20%; display:flex; justify-content: center;
        img {
          width:40px; height:40px;
        }
`;
export const login_text = styled.span`
        font-size:15px; font-weight: 600; margin-left: 5px;
`;