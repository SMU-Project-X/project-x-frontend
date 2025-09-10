// src/pages/RandingPage/RandingPage.SelectMemberPage.jsx

import { useState } from 'react';
import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.style';
import MemberCard from '@/pages/RandingPage/RandingPage.SelectMemberPage.MemberCard';
import PsyInlineControl from '@/pages/psychotest/PsyInlineControl';

import CharacterImg1 from '@/assets/images/RandingPage/QuestionMark.png';

function SelectMemberPage() {
    const [openPsy, setOpenPsy] = useState(false);

    return (
        <itemS.SelectMemberPageContainer>
            <itemS.TitleWappper>We are Fixie:</itemS.TitleWappper>

            <itemS.MiddleTitleWapper>{`미래 세계 'X' , 
            미래의 감정을 함께하는 네 소녀`}</itemS.MiddleTitleWapper>

            <itemS.contentWapper>
                {`그들은 인간의 미묘한 감정과 우연한 선택, 예측 불가한 반응에 매혹되어 있고, 
                각자의 방식으로 현실에 스며들어 새로운 색을 만들고자 한다. 
                Pixie는 그 파편이자 전령
—낯설지만 진심을 배우며 사람들 곁에 스며드는 존재다—`}
            </itemS.contentWapper>

            <itemS.SelectMemberContainer>
                <itemS.SelectMemberTopContainer>
                    <itemS.SelectMemeberTopText>원하는 캐릭터와 성격을 선택하세요</itemS.SelectMemeberTopText>

                    {/* 기존 코드 */}
                    {/*
          <Link to="/">
          <itemS.PsychoContentContainer>
          <itemS.PsychoContentText># 나랑 어울리는 최애는? #추천받기 </itemS.PsychoContentText>
          <itemS.ArrowIcon></itemS.ArrowIcon>
          </itemS.PsychoContentContainer>
          </Link> 
          */}

                    {/* 변경 코드 */}
                    <itemS.PsychoContentContainer
                        role="button"
                        tabIndex={0}
                        onClick={() => setOpenPsy(true)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenPsy(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <itemS.PsychoContentText># 나랑 어울리는 최애는? #추천받기 </itemS.PsychoContentText>
                        <itemS.ArrowIcon />
                    </itemS.PsychoContentContainer>
                </itemS.SelectMemberTopContainer>


                <itemS.MembersContainer>
                    <MemberCard img={CharacterImg1} />
                    <MemberCard img={CharacterImg1} />
                    <MemberCard img={CharacterImg1} />
                    <MemberCard img={CharacterImg1} />
                </itemS.MembersContainer>

                <itemS.SubmitBtnWrapper>
                    <itemS.SubmitBtn>완료</itemS.SubmitBtn>
                </itemS.SubmitBtnWrapper>
            </itemS.SelectMemberContainer>

            {/* 인라인 심리테스트 모달 */}
            <PsyInlineControl open={openPsy} onClose={() => setOpenPsy(false)} />
        </itemS.SelectMemberPageContainer>
    );
}

export default SelectMemberPage;
 