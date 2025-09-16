import styled from "styled-components";
// CheerArtistexport const jsx, SelectMemberexport const jsx 공통 사용
import leftIcon from '@/assets/images/RandingPage/ChevronLeft.png';
import highlighterImg from '@/assets/images/RandingPage/highlighter.png';

export const Maincontainer =styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif; min-height: 100vh;
    margin: 0 auto; width:100vw;
  `;
  
/* 헤더 */
export const Header = styled.header`
  background: #B3D1F0;
  padding: 15px 0;
`;

export const Nav = styled.div`
  display: flex; justify-content: space-between; 
  align-items: center; max-width: 1200px;
`;

export const Logo = styled.div`
  font-weight: 400;
  color: #333;
  font-size: 16px;
  font-style: italic;
`;

export const MenuNav = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;

  a{
    text-decoration: none;
    color: #333;
    font-weight: 600; 
    transition: color 0export const 3s;
  }
  :hover{
    margin-bottom: 5px;
  }
  /* 반응형: 모바일 이하 */
  @media (max-width: 768px) {
    MenuNav {
      gap: 12px;
    }
  }
`;
export const UserBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  text-align: center;
`;

export const UserCircle = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
`;
export const UserMenu = styled.a`
  font-weight:600;
  text-decoration: none;
  color: #333;
`;


/* 멤버선택창 */
export const ModalContainer = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    /* max-width: 1410px; */
    /* max-height: 767px; */
    h1{
        width: 100%;
        text-align: center;
        padding: 25px;
        font-size: 30px;
        font-weight: bold;
    }
`;
export const ModalDiv = styled.div`
    border: 2px solid #B3D1F0;
    border-radius: 40px;
    width: 80%;
`;
export const PsychoContentContainer = styled.div`
    margin-left: 330px; 
    width: 393px;
    height: 78px;
    flex-shrink: 0;
    aspect-ratio: 393/104;
    background-image: url(${highlighterImg});
    background-position: -839.863px -405px;
    background-size: 313.706% 625%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const MemberContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    max-height: 550px;
    overflow-y: auto;
    padding: 40px;
`;

export const MemberCard = styled.div`
    border: 1px solid #cdcdce;;
    width: 218px;
    height: 260px;
    overflow: hidden;
    text-align: center;
    padding-top: 20px;
    transition: transform 0export const 2s ease;
    box-shadow: 0 4px 4px #cdcdce;
`;

export const MemberImg = styled.div`
    img{
        width: 177px;
        height: 193export const 51px;
    }
`;

export const MemberContent = styled.div`
    padding: 5px;
`;

/* 응원메세지/ 퍼즐맞추기 페이지 */
export const prevBtn= styled.div`
    left:10px;
    cursor: pointer;
    display: block;
    align-items: center;
    img{
        width: 40px;
        height: 40px;
    }
`;
// export const ContentTop = styled.div `
//     padding: 20px;
//     display: flex;          
//     align-items: center;    
//     justify-content: center;
// `;

export const ContentTitle = styled.div`
    text-align: center;
    padding: 20px;
    width: 100%;
    h1{
        padding: 15px;
        font-size: 2.3em;
        font-weight: bold;
        word-spacing: 0.5em;
    }
    h3{
        color: #415E96;
        font-size: 1.5em;
        font-weight: 400;
    }
`;
export const CheerArtistContainer = styled.div`
    display: flex;
    gap: 5%;
    padding: 5px 40px;
    margin: 0 auto;
    justify-content: center;
`;
// 댓글리스트
export const CommentContainer = styled.div`
    width: 42%;
`;

export const moreIcon = styled.div`
    img{
        width: 30px;
        height: 30px;
     }
`;
export const CommentList = styled.div`
    border: 1px solid #B3D1F0;
    border-radius: 40px;
    max-height: 600px;
    padding: 27px;
    overflow: auto;
`;


export const CommentContents= styled.div`
     width: 100%;
`;

export const Userwrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
`;

export const UserImg = styled.div`
    width: 60px;
    height: 60px;
    img{
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`; 
export const User_Nickname = styled.div`
    width: 100px;
    font-size: 15px;
    font-weight: bold;
`;

export const Comment_date = styled.div`
    width: 100px;
    font-size: 10px;
    color: #606060;
`;

export const UserInfo = styled.div`
    flex: 1;
    height: 42px;
    text-align: start;
    h2{
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    p{
        font-size: 13px;
    }
`; 

export const context= styled.div`
    border: 1px solid #B3D1F0;
    width: 96%;
    height: auto;
    border-radius: 40px ;
    padding: 20px;
    p{
        text-align:start;
    }
`;

// InputComment Component
export const CommentReply = styled.div`
    padding: 20px 0;
    display: flex;
    align-items: center;
    width: 95%;
    justify-content: space-around;

    input{
        width: 80%;
        height: 50px;
        border: 1px solid #B3D1F0;
        border-radius: 10px;
        text-align: center;
    }
    input::placeholder {
        color: #878A8C;
        font-size: 20px;
        font-weight: 500;
    }
`;

export const SendBtn = styled.button`
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: #B3D1F0;
    border: none;
    border-radius: 50%;
`;  

export const SendImg = styled.div`
    border-radius: 10px;
    img{
        width: 100%;
        height: 100%;
        text-align: center;
    }
`;
export const PuzzleContainer = styled.div`
    box-shadow: 0 4px 10px #878A8C;
    border-radius: 40px;
    font-weight: 600;
    height: 600px;
    padding-top: 50px;
    width: 40%;
`;

export const PuzzleImg = styled.div`
    text-align: center;
    width: 100%;
    height: 80%;
    img{
    width: 80%;
    height: 471.59px;
    overflow: hidden;
    }
`;
export const PuzzleCongress = styled.div`
    width: 100%;
    height: 98px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span{
        width: 257px;
        color: #00629F;
        text-align: center;
        font-weight: 700;
        font-size: 18px;
    }
`;
export const Share = styled.div`
    width: 30px;
    height: 60px;
    padding-top: 11px;
    img{
        width: 35px;
        height: 35px;
    }
`;
