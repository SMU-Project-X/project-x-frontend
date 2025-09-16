import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation  } from 'react-router-dom';

import * as itemS from './styled/CommunityPage.CheerArtist.style';
import previous from '@/assets/images/CommunityPage/previous.png';
import sendImg from '@/assets/images/CommunityPage/sendImg.png';
import image1 from '@/assets/images/CommunityPage/image1.png';
import shareicon from '@/assets/images/CommunityPage/shareicon.png';
import { CommentContent } from './components/CommunityPage.CommentContent.Component';
import { InputComment } from './components/CommunityPage.InputComment.component';



export const CheerArtist = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const memberId = searchParams.get("memberId");
  const name = searchParams.get("name");



    return (
    <itemS.Maincontainer>
    {/* 상단 헤더 */}
      <itemS.Header>
        <itemS.Nav>
          <itemS.Logo>Project - x</itemS.Logo>
          <itemS.MenuNav>
            <li><a href="#">HOME</a></li>
            <li><a href="#">MD</a></li>
            <li><a href="#">COMMUNITY</a></li>
            <li><a href="#">CONTENT</a></li>
            <li><a href="#">CHAT</a></li>
          </itemS.MenuNav>
          <itemS.UserBox>
            <itemS.UserCircle></itemS.UserCircle>
            <itemS.UserMenu>로그인</itemS.UserMenu>
          </itemS.UserBox>
        </itemS.Nav>
      </itemS.Header>
      {/* 이전으로 넘어가기 */}
      {/* <itemS.ContentTop> */}
        {/* <itemS.prevBtn ><img src={previous}/> 이전 </itemS.prevBtn> */}
          <itemS.ContentTitle>
            <h1>멤버들에게 응원 메세지를 적어주세요!</h1>
            <h3>멤버에게 응원메세지를 보내고 팬들과 소통해요!</h3>
          </itemS.ContentTitle>
      {/* </itemS.ContentTop> */}

      {/* 본문 */}
      <itemS.CheerArtistContainer>
        <itemS.PuzzleContainer>
          <itemS.PuzzleImg>
            <img src={image1} />
          </itemS.PuzzleImg>
          <itemS.PuzzleCongress>
            {/* <span>[ 퍼즐 완성률: 1000/1000 ]</span>
            <itemS.Share><img src={shareicon} /></itemS.Share> */}
            {/* 댓글 입력창 */}
            <InputComment memberId={memberId} name={name} />
          </itemS.PuzzleCongress>
        </itemS.PuzzleContainer>

          <itemS.CommentContainer>
          {/* 댓글 리스트 */}
          <itemS.CommentList>
            <CommentContent memberId={memberId} name={name}/>
          </itemS.CommentList>
        </itemS.CommentContainer>
      </itemS.CheerArtistContainer>
    </itemS.Maincontainer>
  );
};
export default CheerArtist;