import styled from "styled-components";



export const Maincontainer =styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif; 
  min-height: 100vh;
  margin: 0 auto;
  width: 100vw;
  display: flex;              
  justify-content: center;     /* 가로 가운데 */
`;
/* 헤더 */
export const Header = styled.header`
  background: #B3D1F0;
  padding: 15px 0;
  width: 100vw;
`;

export const Nav = styled.div`
  display: flex; justify-content: space-evenly; 
  align-items: center; max-width: 100vw;
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


/* 메인 컨테이너 */
export const ContentContainer = styled.div`
  padding: 30px;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 30px 20px;
  max-width: 1200px;
`;

export const ContentsContainer = styled.div`
  max-width: 1200px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;  
  gap: 95px;
  align-items: flex-start;
  @media (max-width: 768px) {
    ContentsContainer {
      flex-direction: column;
      padding: 20px;
    }
  }
`;

export const BoardSection = styled.section`
  width: 100%;

  h1 {
    margin-bottom: 23px; 
    font-weight: bold;
    font-size: 28px;
    color : #606060;
    text-align: start;
    margin-left: 22px;
  }
  @media (max-width: 1024px) {
    h1{
      font-size: 24px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    h1{
      font-size: 22px;
    } 
  }
`;
export const BoardItems = styled.div`
  margin: 1 auto;
`;

export const BoardItem = styled.div`
  border: 1px solid #A3B2CE;
  background-color: #F7F5FF;
  border-radius: 40px;
  padding: 35px;
  margin-bottom: 30px;
  p{
    margin-top: 10px;
    color: #F82878;
    font-size: 20px;
    font-weight: bold;
  }
`;
export const PuzzleSection = styled.div`
  border: 1px solid #A3B2CE;
  border-radius: 40px;
  background-color: #F7F5FF;
  width: 40%;
  height: 400px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 50px #cecdcd;
  margin-top: 30px;
  @media (max-width: 768px) {
    PuzzleSection {
      width: 100%;
    }
  }
`;

export const PuzzleItem = styled.div`
  margin-top: 150px;
  h2 {
    font-size: 24px;
    text-align: left;
  }
  @media (max-width: 1024px) {
    h2{
      font-size: 22px;
    } 
  }
`;
export const Puzzle = styled.span`
  color: #F82878;

`;
export const PuzzleImg = styled.div`
  width: 200px;
  margin-left: 133px;
  img {
    width: 160px;
    height: 160px;
    margin: 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  @media (max-width: 768px) {
    h2{
      font-size: 20px;
    } 
  }
  @media (max-width: 768px) {
    img {
      width: 50px;
      height: 50px;
    }
  }  
`;

  




  

  


  


  

