import Header from "@/pages/PicturePage/components/PicturePage.Header"
import * as itemS from "@/pages/HomePage/styled/Home.main.style"

import Video from "@/assets/images/HomaPage/LogoVideo2.mp4"
import Chevron_white from "@/assets/images/HomaPage/ChevronLeft_white.png"
import Chevron_grey from "@/assets/images/RandingPage/ChevronLeft.png"
import MemberInfoCard from "./Home.main.MemberInfoCard"
import ContentViewBtn from "./Home.main.ContentViewBtn"

import ArrowContainer from "@/pages/HomePage/Home.main.ArrowContainer"
import Countdown from "./Home.main.Countdown"


function Home() {
    return(
        <itemS.HomePageContainer>
            <Header />
            <itemS.LogoVideoWrapper>
                <itemS.LogoVideo autoPlay muted loop playsInline preload="none">
                    <source src={Video} />
                </itemS.LogoVideo>
                <itemS.HideWrapper></itemS.HideWrapper>
                <itemS.MemberInfoNavContainer>
                    <itemS.MemberInfoNav>Member Info</itemS.MemberInfoNav>
                    <ArrowContainer color={Chevron_white} rotate={0} count={2}/>
                </itemS.MemberInfoNavContainer>
            </itemS.LogoVideoWrapper>
            <itemS.MemberInfoContainer>
                <MemberInfoCard/>
                <MemberInfoCard/>
                <MemberInfoCard/>
                <MemberInfoCard/>
            </itemS.MemberInfoContainer>
            <itemS.ContentContainer>
                <itemS.CountdownWrapper>
                    <itemS.JoinTitleText>베일이 걷히는 순간까지</itemS.JoinTitleText>
                    <Countdown/>
                </itemS.CountdownWrapper>
                <itemS.ContentMapContainer>
                    <ContentViewBtn />
                    <ArrowContainer color={Chevron_grey} rotate={0} count={1}/>
                    <ContentViewBtn />
                    <ArrowContainer color={Chevron_grey} rotate={0} count={1}/>
                    <ContentViewBtn />
                    <ArrowContainer color={Chevron_grey} rotate={90} count={1}/>
                    <ContentViewBtn />
                    <ArrowContainer color={Chevron_grey} rotate={180} count={1}/>
                    <ContentViewBtn />
                    <ArrowContainer color={Chevron_grey} rotate={180} count={1}/>
                    <ContentViewBtn />
                </itemS.ContentMapContainer>
                <itemS.JoinContainer>
                    <itemS.JoinTitleText>“지금, 우리와 더 가까워지자!"</itemS.JoinTitleText>
                    <ArrowContainer color={Chevron_grey} rotate={90} count={2}/>
                    <itemS.JoinBtnContainer>
                        <itemS.JoinBtn>그룹 공유하기</itemS.JoinBtn>
                        <itemS.JoinBtn>회원가입</itemS.JoinBtn>
                    </itemS.JoinBtnContainer>
                </itemS.JoinContainer>
            </itemS.ContentContainer>
        </itemS.HomePageContainer>
    )
}

export default Home