// src/components/AdminUserPage.styles.js
import styled from "styled-components";

export const Container = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
  min-height: 100vh;
  color: #333;
  padding: 30px 45px 30px 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.div`
  width: 1000px;
  height: 70px;
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  margin-bottom: 15px;
`;

export const Title = styled.h2`
  font-size: 30px;
  color: #7E6EB0;
  margin-left: 15px;
`;

export const Menu = styled.div`
  ul {
    display: flex;
    list-style: none;
    gap: 10px;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 115px;
    height: 40px;
    border-radius: 15px;
    font-weight: 500;
    border: 2px solid #764ba2;
    color: #764ba2;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  li.board {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: rgba(255,255,255,0.95);
    border: none;
  }
  a { text-decoration: none; color: inherit; }
`;

export const BannerRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HomeButton = styled.a`
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
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

export const Content = styled.main`
  width: 100%;
  min-height: 800px;
  background: rgba(255,255,255,0.95);
  border-radius: 25px;
  padding: 30px 40px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  margin-top: 5px;
`;

export const PageHeader = styled.div`
  margin-bottom: 30px;
  h2 { text-align: center; font-size: 24px; color: #333; margin-bottom: 15px; }
  hr { border: none; height: 1px; background: #e0e0e0; }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 15px;
  margin: 30px 0;
`;

export const StatsBox = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-5px); }
  .number { font-size: 36px; font-weight: 700; color: #667eea; margin-bottom: 10px; }
  .label { font-size: 16px; color: #666; font-weight: 500; }
`;

export const FilterSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin: 25px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  select, input { padding: 10px; border-radius: 10px; border: 2px solid #e0e0e0; outline: none; transition: border-color 0.3s ease; }
  select:focus, input:focus { border-color: #667eea; }
  .search-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin: 20px 0;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  thead { background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); }
  th { padding: 15px; color: white; font-weight: 600; text-align: center; }
  td { padding: 15px; text-align: center; border-bottom: 1px solid #f0f0f0; }
  tbody tr:hover { background-color: #f8f9ff; }
`;

export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;
