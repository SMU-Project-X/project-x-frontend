import styled from "styled-components";


export const container=styled.div`
    width: 100vw;
    margin: 0 auto;
`;
export const upload_container=styled.div`
    width: 800px;
    background: rgba(255, 255, 255, 0.95);
    margin: 40px auto;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    overflow: hidden;
`;
export const upload_header=styled.div`
    background: #b3d1f08e;
    padding: 30px;
    text-align: center;
    color: #333;
    margin-bottom: 29px;

    h1{
      font-size: 1.8rem;
      margin-bottom: 10px;
      font-weight: 700;
    }
    p{
      opacity: 0.9;
      font-size: 1rem;
    }
`;
export const form_section=styled.div`
    padding: 0 15px;
`;
export const form_content=styled.div`
    margin-bottom: 25px;
`;
export const label=styled.label`
    display: block;
    font-weight: 600;
    color: #333;
    margin-left: 7px;
    margin-bottom: 8px;
    font-size: 1.2em;
`;
export const input=styled.input`
    width: 735px;
    padding: 15px;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: white;

    &:focus{
      outline: none;
      border-color: #B3D1F0;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }
    &::placeholder{
      font-size: 16px;
    }
`;
export const required=styled.span`
    color: #ff4757;
`;
export const member_container=styled.div`
    display: flex;
    flex-wrap: wrap;
    line-height: 30px;
`;
export const member_toggle=styled.span`
    width: 54px;
    color: white;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 5px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;     /* 사용자 선택 방지 */
    background: #B3D1F0; /* 기본 색상 */

    /* 선택된 상태 */
    &[data-selected="true"] {
      background: #629dd9ff;
    }
    /* hover 상태 */
    &:hover {
      background: #9bbfe6; 
    }
    /* 선택된 상태 + hover */
    &[data-selected="true"]:hover {
      background: #629dd9ff;
    }
`;
export const file_upload_area=styled.div`
    border: 3px dashed #e1e5e9;
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background: #f8f9fa;

    &:hover, &.dragover{
      border-color: #B3D1F0;
      background: #f0f4ff;
      transform: scale(1.02);
    }
`;
export const file_upload_icon=styled.div`
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    background: #B3D1F0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
`;
export const hidden_file_input=styled.input.attrs({ type: "file" })`
    display: none;
`;
export const preview_container=styled.div`
    margin-top: 20px;
    text-align: center;
`;
export const preview_image=styled.img`
    width: auto;
    height: auto;
    max-width: 640px;
    max-height: 480px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    object-fit: cover;
`;
export const textarea=styled.textarea`
    width: 740px;
    padding: 15px;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.3s ease;
    background: white;
    min-height: 120px;
    resize: vertical;

    &:focus{
      outline: none;
      border-color: #B3D1F0;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }
`;
export const button_container=styled.div`
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin: 40px auto;
`;
export const btn=styled.button`
    padding: 18px 40px;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
`;
export const btn_primary=styled(btn)`
    background: #B3D1F0;
    color: white;

    &:hover{
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(108, 117, 125, 0.4);
    }
`;
export const btn_secondary=styled(btn)`
    background: #6c757d;
    color: white;

    &:hover{
      background: #5a6268;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(108, 117, 125, 0.4);
    }
`;