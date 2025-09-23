import React, { useRef } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import * as itemS from './styled/CommunityPage.CommunityHome.style';

// 이미지
import puzzle from '@/assets/images/CommunityPage/puzzle.png';

import Banner from '@/pages/CommunityPage/CommunityPage.Banner';
import Unit from '@/pages/CommunityPage/components/CommunityPage.VotePage.UnitAll';
import VotePage from '@/pages/CommunityPage/CommunityPage.VotePage'
import Header from '../MDPage/MDPage.header';

export const CommunityHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    return(
      <>        
      {/* 상단 헤더 */}

      <itemS.Maincontainer>
        <itemS.ContentContainer>
          {/* 배너부분 */}
          <itemS.Container>
            <Banner onOpenModal={()=>setIsModalOpen(true)} />
          </itemS.Container>
          
          {/* 모달창 오픈 */}
          <VotePage
            isModalOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
          />

          {/* 게시판 콘텐츠 */}
          <itemS.ContentsContainer>
            <itemS.BoardSection>
              <h1>자유게시판</h1>
              <itemS.BoardItems>
                <itemS.BoardItem>
                  <Link to="/light_stick">
                  <h2>나만의 응원봉 공유하기</h2>
                  <p>팬심 가득! 나만의 응원봉을 꾸미고 공유해요!</p>
                  </Link>
                </itemS.BoardItem>
                <itemS.BoardItem>
                  <Link to="/selectMember">
                  <h2>나만의 유닛조합을 만들어요</h2>
                  <p>유닛을 조합하고 공유해서 데뷔시켜보세요!</p>
                  </Link>
                </itemS.BoardItem>
                <Link to="/picture/post">
                <itemS.BoardItem>
                  <h2>사진찍고 공유해요!</h2>
                  <p>멤버와 같이 사진을 찍고 꾸미고 공유까지!</p>
                </itemS.BoardItem>
              </Link>
              </itemS.BoardItems>
              </itemS.BoardSection>
              <itemS.PuzzleSection>
                <Link to="/Community/SelectMember">
                <itemS.PuzzleItem>
                  <h2>응원하는 댓글을</h2>
                  <h2>남기고<itemS.Puzzle>퍼즐</itemS.Puzzle>을</h2>
                  <h2>완성시켜주세요</h2>
                </itemS.PuzzleItem>
                <itemS.PuzzleImg><img src={puzzle} /></itemS.PuzzleImg>
                </Link>
                {/* SelectMember 모듈창 구현 */}
              </itemS.PuzzleSection>
          </itemS.ContentsContainer>
        </itemS.ContentContainer>
      </itemS.Maincontainer>
      </>
    )
}
export default CommunityHome;