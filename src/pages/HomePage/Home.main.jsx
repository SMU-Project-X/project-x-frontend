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

import { useState } from "react";
import Modal from "@/pages/HomePage/Home.main.DetailContent.Modal"; // 새로 추가할 모달 컴포넌트

function Home() {
    const navigate = useNavigate();
    const [selectedCharacters, setSelectedCharacters] = useRecoilState(
        selectedCharactersState
    );

    // 모달 관리 state
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleOpenModal = (index) => {
        setActiveIndex(index);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setActiveIndex(null);
    };

    return (
        <itemS.HomePageContainer>
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

            <itemS.MemberInfoContainer>
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
                        <itemS.JoinBtn>그룹 공유하기</itemS.JoinBtn>
                        <itemS.JoinBtn onClick={() => navigate("/signup/terms")}>
                            회원가입
                        </itemS.JoinBtn>
                    </itemS.JoinBtnContainer>
                </itemS.JoinContainer>
            </itemS.ContentContainer>

            {/* 모달 */}
            {open && <Modal onClose={handleCloseModal} index={activeIndex} />}
        </itemS.HomePageContainer>
    );
}

export default Home;
