import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #1a1721;
  color: white;
  width: 90%;
  height: 90%;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
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
    font-size: 3rem;
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

const Wrapper = styled.div`
  position: relative;
`;

const Content = styled.section`
  width: 100%;
  position: relative;
`;


const GridImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;    /* 모서리 살짝 둥글게 */
`;

const Images = styled.section`
  padding-top: 100px;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 250vh; 
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-rows: 400px;   이미지 높이를 auto로 */
  row-gap: 300px;          /* 세로 간격 */
  column-gap: 20px;       /* 가로 간격 */
`;

function Modal({ onClose }) {
    const wrapperRef = useRef(null);

    const images = [
        "/public/Character/가온.png",
        "/public/Character/다온.png",
        "/public/Character/류하.png",
        "/public/Character/모아.png",
        "/public/Character/세라.png",
        "/public/Character/세인.png",
        "/public/Character/수린.png",
        "/public/Character/아린.png",
        "/public/Character/유나.png",
        "/public/Character/지원.png",
        "/public/Character/채윤.png",
        "/public/Character/현.png",
    ];

    useEffect(() => {
    const imgs = wrapperRef.current.querySelectorAll("img");

    imgs.forEach((img, i) => {
        // 0.8 ~ 1.5 범위에서 랜덤하게 속도 지정 (스크롤 시 더 눈에 띄게)
        const speed = 0.8 + Math.random() * 0.7;
        gsap.to(img, {
            y: () => -(img.offsetHeight * (speed - 1)),
            ease: "none",
            scrollTrigger: {
                trigger: img,
                scroller: wrapperRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    });

    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);

    return (
        <Backdrop onClick={onClose}>
            <ModalBox ref={wrapperRef} onClick={e => e.stopPropagation()}>
                <CloseBtn onClick={onClose}>X</CloseBtn>

                <Title>
                    <h1 className="text">Scrolly Images</h1>
                    <h1 aria-hidden="true" className="text outline-text">Scrolly Images</h1>
                    <h1 aria-hidden="true" className="text filter-text">Scrolly Images</h1>
                </Title>

                <Wrapper>
                    <Content>
                        <Images>
                            {images.map((src, idx) => (
                                <GridImg key={idx} data-speed={0.8 + idx * 0.1} src={src} />
                            ))}
                        </Images>
                    </Content>
                </Wrapper>
            </ModalBox>
        </Backdrop>
    );
}

export default Modal;
