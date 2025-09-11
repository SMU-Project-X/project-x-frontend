import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from "react-router-dom";
import SplashPage from './pages/RandingPage/RandingPage.SplashPage';
import SelectMemberPage from '@/pages/RandingPage/RandingPage.SelectMemberPage';

import CommunityHome from '@/pages/CommunityPage/CommunityPage.CommunityHome';
import CheerArtist from '@/pages/CommunityPage/CommunityPage.CheerArtist';
import VotePage from '@/pages/CommunityPage/CommunityPage.VotePage';
import SelectMember from '@/pages/CommunityPage/CommunityPage.SelectMember';
import ViewPage from './pages/RandingPage/RandingPage.SelectMemberPage.ViewPage';
import axios from 'axios';
// import FandomTalk from './pages/CommunityPage/CommunityPage.FandomTalk';




export default function App() {
  const [units, setUnits] = useState();

  useEffect(()=> {
      axios.get(`http://localhost:8080/api`).then(res => setUnits(res.data));
      console.log("list : ",units);
  });


  return (
    <>
      <Routes>
        {/* 랜딩페이지 path */}
        <Route path="/"  element={<SplashPage />} />
        <Route path="/selectMember" element={<SelectMemberPage />} />
        <Route path="/selectMember/view" element={<ViewPage />} />

        {/* 커뮤니티 path */}
        <Route path="/Community/" element={<CommunityHome />} />
        <Route path='/Community/VotePage' element={<VotePage />} />
        <Route path="/Community/CheerArtist" element={<CheerArtist />} />
        <Route path="/Community/SelectMember" element={<SelectMember />} />
        {/* <Route path="/Community/FandomTalk" element={<FandomTalk />} /> */}
      </Routes>
    </>
  )
}

