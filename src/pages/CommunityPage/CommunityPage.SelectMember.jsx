import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import * as itemS from './styled/CommunityPage.CheerArtist.style';
import image1 from '@/assets/images/CommunityPage/image1.png';

function MemberCard() {
  return (
    <Link to="/Community/CheerArtist">
    <itemS.MemberCard>
        <itemS.MemberImg>
            <img src={image1} />
        </itemS.MemberImg>
        <itemS.MemberContent>
          <p>캐릭터 이름</p>
        </itemS.MemberContent>
    </itemS.MemberCard>
    </Link>
  )
}

const SelectMember = () => {
  return (
    <itemS.ModalContainer>
      <itemS.ModalDiv>
        <itemS.PsychoContentContainer>
          <h1>멤버를 선택해주세요</h1>
        </itemS.PsychoContentContainer>
      <itemS.MemberContainer>
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </itemS.MemberContainer>
      </itemS.ModalDiv>
    </itemS.ModalContainer>
  );
};
export default SelectMember;