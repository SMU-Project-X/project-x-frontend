import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from "react-router-dom";
import SplashPage from './pages/RandingPage/RandingPage.SplashPage';
import SelectMemberPage from './pages/RandingPage/RandingPage.SelectMemberPage';
import LightStickCustomPage from "./pages/light_stick/light_stick.CustomPage.jsx";

// import CommunityHome from './pages/CommunityPage/CommunityHome';
// import CheerArtist from './pages/CommunityPage/Community.CheerArtist';
// import FandomTalk from './pages/CommunityPage/Community.FandomTalk';
// import Vote from './pages/CommunityPage/Community.Vote';
// import SelectMember from './pages/CommunityPage/Community.SelectMember';
import ViewPage from './pages/RandingPage/RandingPage.SelectMemberPage.ViewPage';




export default function App() {
  return (
    <>
      <Routes>
        {/* 랜딩페이지 path */}
        {/* <Route path="/" element={<SplashPage />} /> */}  {/* 기존 홈페이지 */}
        <Route path="/" element={<LightStickCustomPage />} />  {/* 작업용 임시*/}
        <Route path="/selectMember" element={<SelectMemberPage />} />
        <Route path="/light_stick" element={<LightStickCustomPage />} />
        <Route path="/selectMember/view" element={<ViewPage />} />

        {/* 커뮤니티 path */}
        {/* <Route path="/CommunityHome" element={<CommunityHome />} />
        <Route path='/Community/Vote' element={<Vote />} />
        <Route path="/Community/CheerArtist" element={<CheerArtist />} />
        <Route path="/Community/SelectMember" element={<SelectMember />} />
        <Route path="/Community/FandomTalk" element={<FandomTalk />} /> */}
      </Routes>
    </>
  )
}

