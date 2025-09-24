// Modal0920.jsx
import React from "react";
import styled from "styled-components";

import Video from "@/assets/images/HomaPage/LogoVideo2.mp4";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  color: white;
  width: 90%;
  height: 90%;
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;

  .text {
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
  }
  .outline-text {
    color: transparent;
    -webkit-text-stroke: 1.5px white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .filter-text {
    mix-blend-mode: screen;
    color: #804691;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;
  aspect-ratio: 16/9;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255,255,255,0.2);

  video {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

function Modal0920({ onClose }) {
    return (
        <Backdrop onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <CloseBtn onClick={onClose}>X</CloseBtn>

                <Title>
                    <h1 className="text">스페셜 영상</h1>
                    <h1 aria-hidden="true" className="text outline-text">스페셜 영상</h1>
                    <h1 aria-hidden="true" className="text filter-text">스페셜 영상</h1>
                </Title>

                <VideoWrapper>
                    <video controls autoPlay>
                        <source src={Video} />
                        지원되지 않는 브라우저입니다.
                    </video>
                </VideoWrapper>
            </ModalBox>
        </Backdrop>
    );
}

export default Modal0920;
