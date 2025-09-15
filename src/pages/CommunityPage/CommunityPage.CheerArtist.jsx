import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation  } from 'react-router-dom';

import * as itemS from './styled/CommunityPage.CheerArtist.style';
import previous from '@/assets/images/CommunityPage/previous.png';
import sendImg from '@/assets/images/CommunityPage/sendImg.png';
import image1 from '@/assets/images/CommunityPage/image1.png';
import shareicon from '@/assets/images/CommunityPage/shareicon.png';
import { CommentContent } from './components/CommunityPage.Comment.Component';
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
      <itemS.ContentTop>
        {/* <itemS.prevBtn ><img src={previous}/> 이전 </itemS.prevBtn> */}
          <itemS.ContentTitle>
            <h1>응원메세지를 적고 퍼즐을 맞춰보세요!</h1>
            <h3>멤버를 선택하고 응원댓글을 입력하면 퍼즐 조각이 모여요!</h3>
          </itemS.ContentTitle>
      </itemS.ContentTop>
        <itemS.CheerArtistContainer>
          <itemS.CommentContainer>

            {/* 댓글 입력창 */}
            <InputComment memberId={memberId} name={name} />

            {/* 댓글 리스트 */}
            <itemS.CommentList>
              <CommentContent memberId={memberId} name={name}/>
            </itemS.CommentList>

          </itemS.CommentContainer>
        <itemS.PuzzleContainer>
          <itemS.PuzzleImg>
            <img src={image1} />
          </itemS.PuzzleImg>
          <itemS.PuzzleCongress>
            <span>[ 퍼즐 완성률: 1000/1000 ]</span>
            <itemS.Share><img src={shareicon} /></itemS.Share>
          </itemS.PuzzleCongress>
        </itemS.PuzzleContainer>
      </itemS.CheerArtistContainer>
    </itemS.Maincontainer>
  );
};
export default CheerArtist;