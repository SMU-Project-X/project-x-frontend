import styled from "styled-components";

export const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Banner = styled.div`
  width: 1000px;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  margin-bottom: 20px;
`;

export const BannerTitle = styled.h2`
  font-size: 30px;
  color: #7E6EB0;
`;

export const Menu = styled.div`
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
`;

export const MenuItem = styled.li`
  width: 115px;
  height: 40px;
  border-radius: 15px;
  border: 2px solid #764ba2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #764ba2;
  cursor: pointer;
  transition: all 0.3s ease;

  &.board {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: rgba(255, 255, 255, 0.95);
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const BannerRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HomeLink = styled.a`
  all: unset;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #7E6EB0;
  padding: 10px 15px;
  border-radius: 10px;
  transition: all 0.3s ease;

  i {
    font-size: 16px;
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

export const NoticeContainer = styled.div`
  width: 1000px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 20px;
`;

export const DashTop = styled.div`
  text-align: center;
  h2 {
    font-size: 25px;
    margin-bottom: 10px;
  }
  hr {
    border-color: rgba(219, 213, 213, 0.63);
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
`;

export const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 120px;
  margin-right: 30px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  p {
    color: #667EEA;
    font-size: 35px;
    font-weight: 700;
  }

  a {
    color: #666;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
  }
`;

export const Filter = styled.div`
  width: 850px;
  height: 80px;
  margin: 25px auto;
  border-radius: 25px;
  background: rgba(255,255,255,0.95);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterInner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

export const Select = styled.select`
  width: 100px;
  height: 35px;
  border-radius: 10px;
`;

export const SearchInput = styled.input`
  width: 500px;
  height: 35px;
  border-radius: 10px;
  border: 2px solid #ccc;
  padding-left: 12px;
  &:focus {
    border: 2px solid black;
    outline: none;
  }
`;

export const SearchButton = styled.button`
  width: 45px;
  height: 35px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
`;

export const TableControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  h3 {
    font-size: 16px;
    font-weight: 500;
    color: #666;

    span {
      color: #667EEA;
      font-weight: 600;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
`;

export const ActionBtn = styled.button`
  position: relative;
  margin-right: 35px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &.btn-delete {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }

    &:active {
      transform: translateY(0);
    }

    &::after {
      content: '🗑️';
      font-size: 16px;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;

      &:hover {
        box-shadow: none;
      }
    }
  }
`;


// 테이블 전체
export const PostsTable = styled.table`
  width: 85%;
  margin: 0 auto;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  text-align: center;

  thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: rgba(245, 246, 250, 0.95);
  }

  th, td {
    padding: 13px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
  }

  tr:last-child td {
    border-bottom: none;
  }

  a {
    text-decoration: none;
    color: #333;
  }
`;

// 하단 바
export const BottomBar = styled.div`
  margin: 10px auto 0 auto;
  padding: 10px;
  width: 85%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
`;

// 페이지네이션
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  a, strong {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    text-decoration: none;
    color: #666;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  strong {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
  }

  a:hover {
    background: #f0f0f0;
  }
`;
