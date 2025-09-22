import styled from "styled-components"

export const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 200px;
`

export const Track = styled.div`
  display: flex;
  gap: 20px;
  will-change: transform;
`

export const Card = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 180px;
  background: #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`
