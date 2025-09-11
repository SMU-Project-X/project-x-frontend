import Header from "@/pages/PicturePage/components/PicturePage.Header"
import * as itemS from "@/pages/HomePage/styled/Home.main.style"

import Video from "@/assets/images/HomaPage/LogoVideo2.mp4"
import Chevron_white from "@/assets/images/HomaPage/ChevronLeft_white.png"
import Chevron_grey from "@/assets/images/RandingPage/ChevronLeft.png"
import MemberInfoPage from "./Home.MemberInfoPage"


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
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_white} $rotate={0} />
                        <itemS.ChevronImage src={Chevron_white} $rotate={0} />
                    </itemS.ArrowContainer>
                </itemS.MemberInfoNavContainer>
            </itemS.LogoVideoWrapper>
            <itemS.MemberInfoContainer>
                <MemberInfoPage/>
                <MemberInfoPage/>
                <MemberInfoPage/>
                <MemberInfoPage/>
            </itemS.MemberInfoContainer>
            <itemS.ContentContainer>
                <itemS.CountdownWrapper>카운트다운 영역</itemS.CountdownWrapper>
                <itemS.ContentMapContainer>
                    <itemS.ContentViewBtnWrapper>
                        <itemS.ContenDateWrapper></itemS.ContenDateWrapper>
                        <itemS.ContentViewBtn></itemS.ContentViewBtn>
                    </itemS.ContentViewBtnWrapper>
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_grey} $rotate={0}/>
                    </itemS.ArrowContainer>
                    <itemS.ContentViewBtnWrapper>
                        <itemS.ContenDateWrapper></itemS.ContenDateWrapper>
                        <itemS.ContentViewBtn></itemS.ContentViewBtn>
                    </itemS.ContentViewBtnWrapper>
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_grey} $rotate={0}/>
                    </itemS.ArrowContainer>
                    <itemS.ContentViewBtnWrapper>
                        <itemS.ContenDateWrapper></itemS.ContenDateWrapper>
                        <itemS.ContentViewBtn></itemS.ContentViewBtn>
                    </itemS.ContentViewBtnWrapper>
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_grey} $rotate={90}/>
                    </itemS.ArrowContainer>
                    <itemS.ContentViewBtnWrapper>
                        <itemS.ContenDateWrapper></itemS.ContenDateWrapper>
                        <itemS.ContentViewBtn></itemS.ContentViewBtn>
                    </itemS.ContentViewBtnWrapper>
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_grey} $rotate={180}/>
                    </itemS.ArrowContainer>
                    <itemS.ContentViewBtnWrapper>
                        <itemS.ContenDateWrapper></itemS.ContenDateWrapper>
                        <itemS.ContentViewBtn></itemS.ContentViewBtn>
                    </itemS.ContentViewBtnWrapper>
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_grey} $rotate={180}/>
                    </itemS.ArrowContainer>
                    <itemS.ContentViewBtnWrapper>
                        <itemS.ContenDateWrapper></itemS.ContenDateWrapper>
                        <itemS.ContentViewBtn></itemS.ContentViewBtn>
                    </itemS.ContentViewBtnWrapper>
                </itemS.ContentMapContainer>
                <itemS.JoinContainer>
                    <itemS.JoinTitleText>“지금, 우리와 더 가까워지자!"</itemS.JoinTitleText>
                    <itemS.ArrowContainer>
                        <itemS.ChevronImage src={Chevron_grey} $rotate={90} />
                        <itemS.ChevronImage src={Chevron_grey} $rotate={90} />
                    </itemS.ArrowContainer>
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