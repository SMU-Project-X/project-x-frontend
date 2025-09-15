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
        to={`/Community/CheerArtist?memberId=${m.memberId}&name=${encodeURIComponent(m.name)}`}>
          <itemS.MemberCard>
              <itemS.MemberImg>
                  <img src={m.profile_image_url} alt={m.name}  />
              </itemS.MemberImg>
              <itemS.MemberContent>
                <p>{m.name}</p>
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