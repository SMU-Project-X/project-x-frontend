import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 75%;
`;

const ImgItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  max-width: 124px;
  cursor: pointer; /* 클릭 가능 표시 */
`;

const ImgItemText = styled.p`
  margin-top: 0.5rem;
  color: #0e100f;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;

const ImgItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${(props) => props.$bg});
`;

const DetailContent = ({ onItemClick }) => {
    const groupRef = useRef(null);

    useEffect(() => {
        const items = groupRef.current.querySelectorAll("[data-speed]");

        items.forEach((item) => {
            const speed = parseFloat(item.getAttribute("data-speed")) || 1;

            gsap.to(item, {
                y: () => -(window.innerHeight * (speed - 1)),
                ease: "none",
                scrollTrigger: {
                    trigger: groupRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const images = [
        "https://assets.codepen.io/16327/scroll-flair-1.png",
        "https://assets.codepen.io/16327/scroll-flair-2.png",
        "https://assets.codepen.io/16327/scroll-flair-3.png",
        "https://assets.codepen.io/16327/scroll-flair-4.png",
        "https://assets.codepen.io/16327/flair.png",
    ];

    const texts = ["09.20", "09.21", "09.22", "09.23", "09.24"];

    return (
        <Wrapper>
            <ImgGroup ref={groupRef}>
                {images.map((img, idx) => (
                    <ImgItemContainer
                        key={idx}
                        onClick={() => onItemClick && onItemClick(idx)} // 클릭 시 모달 열기
                    >
                        <ImgItem data-speed={(1 + idx * 0.1).toFixed(2)} $bg={img} />
                        <ImgItemText>{texts[idx]}</ImgItemText>
                    </ImgItemContainer>
                ))}
            </ImgGroup>
        </Wrapper>
    );
};

export default DetailContent;
