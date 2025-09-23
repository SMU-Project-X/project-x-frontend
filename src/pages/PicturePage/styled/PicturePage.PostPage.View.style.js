import styled from "styled-components";


export const content=styled.div`
    background: rgba(255, 255, 255, 0.95);
    width: 100%;
    max-width: 1200px;
    display: block;
    margin: 20px auto;
    border-radius: 20px;
    padding: 20px;
`;
export const content_background=styled.div`
    width: 700px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    overflow: hidden;
`;
export const pocanavi=styled.div`
    font-size: 1.3rem;
    background: #fff;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-top: 5px;
`;
export const back=styled.div`
    margin-left: 3px;
    cursor: pointer;

    img{
      width: 25px;
      height: 25px;
      object-fit: cover;
    }
`;
export const icons=styled.div`
    img{
      width: 28px;
      height: 28px;;
      margin:0 5px;
      cursor: pointer;
    }
`;
export const red=styled.div`
    color:red;
`;
export const deco_item=styled.div`
    width: 100%; 
    text-align: center;
    background: #fff;
    overflow: hidden;
    transition: all 0.3s ease;
    padding: 10px;
`;
export const result_img=styled.div`
    width: 640px;
    height: 480px;
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    display: inline-block;
    align-items: center;
    font-size: 18px;
    color: #666;
    position: relative;
    overflow: hidden;
    border-radius: 8px;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
`;
export const photo_info=styled.div`
    padding: 20px 5px;
    width: 650px;
    display: inline-block;
    align-items: center;
`;
export const photo_title=styled.div`
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
`;
export const photo_meta=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 3px;
    font-size: 13px;
    color: #666;
`;
export const created_at=styled.span`
    font-size: 12px;
`;
export const tag=styled.div`
    width: 50px;
    padding: 4px 8px;
    background: #B3D1F0;
    color: white;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
`;
export const photo_stats=styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #888;
`;
export const stat_item=styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
export const postContent=styled.div`
    font-size: 15px;
    color: #333;
`;
export const share_bottom_sheet=styled.div`
    position: fixed;
    width: 100%;
    max-width: 700px;
    left: 50%;
    transform: translateX(-50%);
    bottom: -100%;
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
    box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 200px;
    display: flex;
    flex-direction: column;  /* 세로 정렬 */
    z-index: 106;

    &.show{
      gap: 15px;
      bottom: 0; /* 바텀시트가 화면에 나타날 때 */
    }
    .sheet-header {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
    .closeBtn {
      font-size: 20px;
      cursor: pointer;
    }
    .icon-item {
      display: flex;
      flex-direction: column; /* 아이콘 위에 텍스트 */
      align-items: center;
      font-size: 12px;
      color: #333;
      cursor: pointer;
    }
    .icon-item img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 5px; /* 아이콘과 텍스트 간격 */
    }
    .sheet-icons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: auto;
    }
    .sheet-icons img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
`;
export const share_button=styled.div`
    font-size: 16px;
    cursor: pointer;
    padding: 10px 20px;
    margin: 10px 0;
    background: transparent;
    color: white;
    border: none;
    width: 300px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    i{
      width: 50px;
      height: 50px;
      background: #eee;
      border-radius: 50%; 
      color: black;
      font-size: 1rem;
      text-align: center;
      line-height: 48px;
    }
`;
export const share_overlay=styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: none; /* 기본적으로 숨기기 */
    z-index: 105;

    &.show{
      display: block; /* 바텀시트가 열리면 오버레이가 보이도록 */
    }
`;