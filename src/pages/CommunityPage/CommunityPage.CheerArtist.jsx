import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation  } from 'react-router-dom';

import * as itemS from './styled/CommunityPage.CheerArtist.style';
import previous from '@/assets/images/CommunityPage/previous.png';
import sendImg from '@/assets/images/CommunityPage/sendImg.png';
import shareicon from '@/assets/images/CommunityPage/shareicon.png';
import { InputComment } from './components/CommunityPage.InputComment';
import { CommentSection } from './components/CommunityPage.CommentContent';
import { PuzzleSection } from './components/CommunityPage.InputComment';

export const CheerArtist = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const memberId = searchParams.get("memberId");
  const memberName = searchParams.get("memberName");
  


    return (
    <itemS.Maincontainer>
      {/* 이전으로 넘어가기 */}
      {/* <itemS.ContentTop> */}
        {/* <itemS.prevBtn ><img src={previous}/> 이전 </itemS.prevBtn> */}
          <itemS.ContentTitle>
            <h1>{memberName}에게 응원 메세지를 적어주세요!</h1>
            <h3>{memberName}에게 응원메세지를 보내고 팬덤끼리 소통해요!</h3>
          </itemS.ContentTitle>
      {/* </itemS.ContentTop> */}

      {/* 본문 */}
      <itemS.CheerArtistContainer>
        <PuzzleSection memberId={memberId} memberName={memberName} />
        <CommentSection memberId={memberId} memberName = {memberName} />


      </itemS.CheerArtistContainer>
    </itemS.Maincontainer>
  );
};
export default CheerArtist;