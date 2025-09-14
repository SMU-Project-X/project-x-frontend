import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation  } from 'react-router-dom';

import * as itemS from './styled/CommunityPage.CheerArtist.style';
import previous from '@/assets/images/CommunityPage/previous.png';
import sendImg from '@/assets/images/CommunityPage/sendImg.png';
import image1 from '@/assets/images/CommunityPage/image1.png';
import shareicon from '@/assets/images/CommunityPage/shareicon.png';
import { CommentContent } from './components/CommunityPage.Comment.Component';


export const CheerArtist = () => {


    const location = useLocation();
    const query = new URLSearchParams(location.search);
  
    const memberId = query.get('memberId');
    const name = query.get('name');

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
            <itemS.CommentReply>
              <input type="text" id="reply" name="reply" placeholder='멤버이름을 넣어 응원메세지를 적어주세요!'></input>
              <itemS.SendImg>
                <img src={sendImg} />
              </itemS.SendImg>
            </itemS.CommentReply>
            <itemS.CommentList>
              {/* 댓글 컴포넌트 부분 */}
              <CommentContent />
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