import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import * as itemS from './styled/CommunityPage.CheerArtist.style';
import image1 from '@/assets/images/CommunityPage/image1.png';
import axios from 'axios';
import { m } from 'framer-motion';
import { useSelectMember } from './hooks/CommunityPage.UseSelectMember';
import { useComment } from './hooks/CommunityPage.useComment';


function MemberCard() {

  const members=useSelectMember();

  return (
    <>
    {members.map((m) => (
        <Link 
        key={m.memberId}
        to={`/Community/CheerArtist?memberId=${m.memberId}&memberName=${encodeURIComponent(m.memberName)}`}>
          <itemS.MemberCard>
              <itemS.MemberImg>
                  <img key={m.memberId} src={m.profileImageUrl} alt={m.memberName}  />
              </itemS.MemberImg>
              <itemS.MemberContent>
                <p>{m.memberName}</p>
              </itemS.MemberContent>
            </itemS.MemberCard>
          </Link>
      ))}
      </>
    );
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
          </itemS.MemberContainer>
        </itemS.ModalDiv>
    </itemS.ModalContainer>
  );
};
export default SelectMember;