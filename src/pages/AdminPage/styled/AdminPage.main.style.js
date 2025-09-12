import styled from "styled-components";

export const PageWrapper = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 30px 45px;
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
  margin: -10px 0 20px 0;

  h2 {
    font-size: 30px;
    color: #7e6eb0;
    margin-left: 15px;
  }
`;

export const Menu = styled.div`
  ul {
    display: flex;
    list-style: none;
    gap: 10px;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
  }

  li {
    border: 2px solid #764ba2;
    border-radius: 15px;
    color: #764ba2;
    width: 115px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;

    a {
      text-decoration: none;
      color: #764ba2;
    }

    &:hover {
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

      a {
        color: white;
      }
    }
  }

  li.board {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;

    a {
      color: white;
    }
  }
`;

export const BannerRight = styled.div`
  display: flex;
  align-items: center;

  .home {
    all: unset;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #7e6eb0;
    padding: 10px 15px;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 1000px;
`;

export const WhiteBox = styled.div`
  background: white;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  width: 100%;

  h2 {
    color: #333;
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    color: #666;
    font-size: 16px;
  }
`;

export const Line = styled.div`
  width: 95.8%;
  border: 0.05px solid rgba(158, 158, 158, 0.29);
  margin-left: 20px;
  height: 0.1px;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 180px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    p {
      color: #667eea;
      font-size: 35px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    a {
      color: #666;
      font-size: 15px;
      font-weight: 500;
      text-decoration: none;
    }
  }
`;

export const ChartContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  width: 100%;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 25px;
  }

  select {
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
`;
