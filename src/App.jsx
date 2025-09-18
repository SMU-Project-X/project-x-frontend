import { useState, useEffect } from 'react'
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
import CommunityHome from './pages/CommunityPage/CommunityPage.CommunityHome';
import CheerArtist from './pages/CommunityPage/CommunityPage.CheerArtist';
import SelectMember from './pages/CommunityPage/CommunityPage.SelectMember';

// 홈페이지
// import Home from './pages/HomePage/Home.main';

// 로그인
import Login from './pages/LoginPage/LoginPage.main';
import FindID from './pages/LoginPage/LoginPage.FindIdPage';
import FindPW from './pages/LoginPage/LoginPage.FindPwPage';
import ChangePW from './pages/LoginPage/LoginPage.ChangePwPage';

// 회원가입
import TermsPage from './pages/SignUpPage/SignUpPage.TermsPage';
import InsertInfoPage from './pages/SignUpPage/SignUpPage.InsertInfoPage';
import CompletePage from './pages/SignUpPage/SignUpPage.CompletePage';
import AdminPage from './pages/AdminPage/AdminPage.main';
import AdminPostPage from './pages/AdminPage/AdminPage.PostPage';
import AdminUserPage from './pages/AdminPage/AdminPage.UserPage';

// 챗봇 
import ChatApp from './pages/ChatbotPage/Chatbot.Chatapp';
import ChatChoice from './pages/ChatbotPage/Chatbot.ChatChoice';

export default function App() {
  const [units, setUnits] = useState();

  return (
    <>
      <Routes>
        {/* 랜딩페이지 path */}
        <Route path="/"  element={<SplashPage />} />
        <Route path="/selectMember" element={<SelectMemberPage />} />
        <Route path="/selectMember/view" element={<ViewPage />} />

        {/* 홈 path */}
        {/* <Route path='/home' element={<Home/>} /> */}
        
        {/* 커뮤니티 path */}
        <Route path="/Community/" element={<CommunityHome />} />
        <Route path="/Community/CheerArtist" element={<CheerArtist />} />
        <Route path="/Community/SelectMember" element={<SelectMember />} />
        {/* <Route path="/Community/FandomTalk" element={<FandomTalk />} /> */}

        {/* 챗봇 path */}
        <Route path="/ChatChoice" element={<ChatChoice/>} />
        <Route path="/ChatApp/:chatName" element={<ChatApp />} />

        {/* 사진촬영 path */}
        <Route path="/picture/select" element={<PictureSelectMemberPage />} /> 
        <Route path="/picture/deco" element={<MemberDecoPage />} />
        <Route path="/picture/camera" element={<CameraPage />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/login/findid" element={<FindID/>} />
        <Route path="/login/findpw" element={<FindPW/>} />
        <Route path='/login/changepw' element={<ChangePW/>} />

        {/* 회원가입 */}
        <Route path='/signup/terms' element={<TermsPage/>} />
        <Route path='/signup/info' element={<InsertInfoPage/>} />
        <Route path='/signup/complete' element={<CompletePage/>} />

        {/* 관리자페이지 */}
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/admin/post' element={<AdminPostPage/>} />
        <Route path='/admin/user' element={<AdminUserPage/>} />
      </Routes>
    </>
  )
}
