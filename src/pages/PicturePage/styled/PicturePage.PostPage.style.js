import styled from "styled-components";


export const container=styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
`;
export const main_content=styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;
export const sidebar=styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  height: fit-content;
`;
export const filter_title=styled.h3`
  font-size: 19px;
  font-weight: bold;
  margin: 15px 0;
  color: #333;
`;
export const search_input=styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;

  &:focus{
    outline: none;
    border-color: #B3D1F0;
  }
  &::placeholder{
    font-size: 16px;
  }
`;
export const search_results=styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  display: none;

  &.visible{
    display: block;
  }
`;
export const search_item=styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover{
    background: #f8f9fa;
  }
  &:last-child{
    border-bottom: none;
  }
`;
export const searchBtn=styled.button`
  padding: 10px;
  border: none;
  border-radius: 100px;
  background: #B3D1F0;
  color: white;
  text-align: center;
  font-size: 18px;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-top: 15px;
  width: 260px;
  height: 55px;
  line-height: 35px;

  img{
    width: 100%;
    height: 100%;
  }
  &:hover{
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  &:active{
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.6);
  }
`;
export const content=styled.div`
  flex: 1;
`;
export const navbar=styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
`;
export const navbar_header=styled.div`
    h1{
      font-weight: bold;
      font-size: 27px;
    }
    p{
      font-size: 20px;
      margin-top: 10px;
    }
`;
export const photo_grid=styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  min-height: 400px;

  &.no-results{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 350px;
  }
`;
export const no_results=styled.div`
  text-align: center;
  color: #666;
  font-size: 18px;
  padding: 40px;
`;
export const photo_card=styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 15px;

  &:hover{
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
`;
export const photo_image=styled.div`
  width: 100%;
  height: 273px;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
  position: relative;
  overflow: hidden;
  border-radius:8px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const photo_info=styled.div`
  padding: 15px;
`;
export const photo_title=styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;
export const photo_meta=styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
`;
export const tag=styled.div`
  width: 45px;
  padding: 4px 8px;
  background: #B3D1F0;
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
`;
export const photo_stats=styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
`;
export const stat_item=styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const arrow=styled.div`
  transition: transform 0.3s ease;

  &.rotated{
    transform: rotate(180deg);
  }
`;
export const page_num=styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  list-style: none;
  padding: 0;

  li{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 35px;
    height: 35px;
    border-radius: 8px;
    cursor: pointer;
    color: #333;
    font-weight: 500;
    transition: all 0.3s ease;
    background: #f0f0f0;

    &:hover{
      background: #B3D1F0;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    &.active{
      background: #B3D1F0;
      color: white;
      font-weight: 600;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    &.arrow{
      font-size: 16px;
      font-weight: bold;
      min-width: 35px;
      background: #f0f0f0;

      &:hover{
        background: #B3D1F0;
        color: white;
      }
    }
  }
`;
export const uploadBtn=styled.button`
  background: #B3D1F0;
  padding: 15px 15px;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  position: fixed;
  bottom: 7%;
  right: 32px;
  cursor: pointer;
  z-index: 999;
`;