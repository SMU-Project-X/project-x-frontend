import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from "react-router-dom";
import SplashPage from './pages/RandingPage/RandingPage.SplashPage';
import SelectMemberPage from './pages/RandingPage/RandingPage.SelectMemberPage';

import PictureSelectMemberPage from './pages/PicturePage/PicturePage.SelectMemberPage';
import MemberDecoPage from './pages/PicturePage/PicturePage.MemberDecoPage';
import CameraPage from './pages/PicturePage/PicturePage.CameraPage';
import PostPage from './pages/PicturePage/PicturePage.PostPage';
import PostView from './pages/PicturePage/PicturePage.PostPage.View';
import PostWrite from './pages/PicturePage/PicturePage.PostPage.Write';

import CommunityHome from './pages/CommunityPage/CommunityHome';
import CheerArtist from './pages/CommunityPage/Community.CheerArtist';
import FandomTalk from './pages/CommunityPage/Community.FandomTalk';
import Vote from './pages/CommunityPage/Community.Vote';
import SelectMember from './pages/CommunityPage/Community.SelectMember';
import ViewPage from './pages/RandingPage/RandingPage.SelectMemberPage.ViewPage';




export default function App() {
  return (
    <>
      <Routes>
        {/* 랜딩페이지 path */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/selectMember" element={<SelectMemberPage />} />
        <Route path="/selectMember/view" element={<ViewPage />} />

        {/* 커뮤니티 path */}
        <Route path="/CommunityHome" element={<CommunityHome />} />
        <Route path='/Community/Vote' element={<Vote />} />
        <Route path="/Community/CheerArtist" element={<CheerArtist />} />
        <Route path="/Community/SelectMember" element={<SelectMember />} />
        <Route path="/Community/FandomTalk" element={<FandomTalk />} />

        {/* 사진촬영 path */}
        <Route path="/picture/select" element={<PictureSelectMemberPage />} /> 
        <Route path="/picture/deco" element={<MemberDecoPage />} />
        <Route path="/picture/camera" element={<CameraPage />} />
        <Route path="/picture/post" element={<PostPage />} />
        <Route path="/picture/post/view/:id" element={<PostView />} />
        <Route path="/picture/post/write" element={<PostWrite />} />
      </Routes>
    </>
  )
}

