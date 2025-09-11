import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from "react-router-dom";

// 랜딩페이지
import SplashPage from './pages/RandingPage/RandingPage.SplashPage';
import SelectMemberPage from './pages/RandingPage/RandingPage.SelectMemberPage';
import ViewPage from './pages/RandingPage/RandingPage.SelectMemberPage.ViewPage';

// 사진촬영 페이지
import PictureSelectMemberPage from './pages/PicturePage/PicturePage.SelectMemberPage';
import MemberDecoPage from './pages/PicturePage/PicturePage.MemberDecoPage';
import CameraPage from './pages/PicturePage/PicturePage.CameraPage';


// 커뮤니티페이지
import CommunityHome from './pages/CommunityPage/CommunityHome';
import CheerArtist from './pages/CommunityPage/Community.CheerArtist';
import FandomTalk from './pages/CommunityPage/Community.FandomTalk';
import Vote from './pages/CommunityPage/Community.Vote';
import SelectMember from './pages/CommunityPage/Community.SelectMember';

// 홈페이지
import Home from './pages/HomePage/Home.main';




export default function App() {
  return (
    <>
      <Routes>
        {/* 랜딩페이지 path */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/selectMember" element={<SelectMemberPage />} />
        <Route path="/selectMember/view" element={<ViewPage />} />

        {/* 홈 path */}
        <Route path='/home' element={<Home/>} />
        
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
      </Routes>
    </>
  )
}

