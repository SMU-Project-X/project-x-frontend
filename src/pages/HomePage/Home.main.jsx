// Home.jsx
import html2canvas from "html2canvas";

import * as itemS from "@/pages/HomePage/styled/Home.main.style";

import Video from "@/assets/images/HomaPage/LogoVideo2.mp4";
import Chevron_white from "@/assets/images/HomaPage/ChevronLeft_white.png";
import Chevron_grey from "@/assets/images/RandingPage/ChevronLeft.png";
import MemberInfoCard from "./Home.main.MemberInfoCard";
import ContentViewBtn from "./Home.main.ContentViewBtn";

import ArrowContainer from "@/pages/HomePage/Home.main.ArrowContainer";
import Countdown from "./Home.main.Countdown";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { selectedCharactersState } from "@/recoil/characterAtom";
import DetailContent from "./Home.main.DetailContent";

import { useRef, useState } from "react";
import Modal from "@/pages/HomePage/Home.main.DetailContent.Modal"; 
import Modal0920 from "@/pages/HomePage/Home.main.DetailContent.Modal0920";
import Modal0922 from "@/pages/HomePage/Home.main.DetailContent.Modal0922";
import Modal0923 from "@/pages/HomePage/Home.main.DetailContent.Modal0923";

function Home() {
    const navigate = useNavigate();
    const [selectedCharacters, setSelectedCharacters] = useRecoilState(
        selectedCharactersState
    );

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    // 캡처용 ref
    const captureRef = useRef(null);

    const handleOpenModal = (index) => {
        setActiveIndex(index);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setActiveIndex(null);
    };

    // 화면 캡처 후 이미지로 저장
    const handleSaveCapture = async () => {
        if (!captureRef.current) return;

        // DOM을 캔버스로 변환
        const canvas = await html2canvas(captureRef.current, {
            useCORS: true,
            allowTaint: true,
            logging: true,
        });

        // 캔버스를 이미지 데이터 URL로 변환
        const imgData = canvas.toDataURL("image/png");

        // 임시 <a> 태그를 만들어 다운로드 트리거
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `capture_${Date.now()}.png`;
        link.dispatchEvent(new MouseEvent("click"));

        alert("이미지를 SNS에 공유해 보세요!");
    };

    return (
        <itemS.HomePageContainer >
            <itemS.LogoVideoWrapper>
                <itemS.LogoVideo autoPlay muted loop playsInline preload="none">
                    <source src={Video} />
                </itemS.LogoVideo>
                <itemS.HideWrapper></itemS.HideWrapper>
                <itemS.MemberInfoNavContainer>
                    <itemS.MemberInfoNav>Member Info</itemS.MemberInfoNav>
                    <ArrowContainer color={Chevron_white} rotate={0} count={2} />
                </itemS.MemberInfoNavContainer>
            </itemS.LogoVideoWrapper>

            <itemS.MemberInfoContainer ref={captureRef}>
                {selectedCharacters.map((char, i) => (
                    <MemberInfoCard
                        key={i}
                        img={char.img}
                        name={char.name}
                        traits={char.traits}
                    />
                ))}
            </itemS.MemberInfoContainer>

            <itemS.ContentContainer>
                <itemS.CountdownWrapper>
                    <itemS.JoinTitleText>베일이 걷히는 순간까지</itemS.JoinTitleText>
                    <Countdown />
                </itemS.CountdownWrapper>

                {/* DetailContent에 클릭 핸들러 전달 */}
                <DetailContent onItemClick={handleOpenModal} />

                <itemS.JoinContainer>
                    <itemS.JoinTitleText>“지금, 우리와 더 가까워지자!"</itemS.JoinTitleText>
                    <ArrowContainer color={Chevron_grey} rotate={90} count={2} />
                    <itemS.JoinBtnContainer>
                        <itemS.JoinBtn onClick={handleSaveCapture}>
                            그룹 이미지 다운로드
                        </itemS.JoinBtn>
                        <itemS.JoinBtn onClick={() => navigate("/signup/terms")}>
                            회원가입
                        </itemS.JoinBtn>
                    </itemS.JoinBtnContainer>
                </itemS.JoinContainer>
            </itemS.ContentContainer>

            {/* 모달 */}
            {open && (
                activeIndex === 0 ? (
                    <Modal0920 onClose={handleCloseModal} />
                ) : activeIndex === 1 ? (
                    <Modal onClose={handleCloseModal} />  
                ) : activeIndex === 2 ? (
                    <Modal0922 onClose={handleCloseModal} />
                ) : activeIndex === 3 ? (
                    <Modal0923 onClose={handleCloseModal} />
                ) : null
            )}
        </itemS.HomePageContainer>
    );
}

export default Home;
