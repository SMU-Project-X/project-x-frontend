// App.jsx - 새로운 라우트 추가 버전
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes, Link, useLocation } from "react-router-dom";

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

// MD 페이지들 (기존)
import Cart from './pages/MDPage/MDPage.Cart';
import Payment from './pages/MDPage/MDPage.Payment';
import PaymentComplete from './pages/MDPage/MDPage.PaymentComplete';
import PaymentSuccess from './pages/MDPage/MDPage.PaymentSuccess';
import PaymentFail from './pages/MDPage/MDPage.PaymentFail';
import ProductList from './pages/MDPage/MDPage.ProductList';
import ProductDetail from './pages/MDPage/MDPage.ProductDetail';
import SearchResults from './pages/MDPage/MDPage.SearchResults';
import About from './pages/MDPage/MDPage.About';
import MDMain from './pages/MDPage/MDPage.main';
import Header from './pages/MDPage/MDPage.header';

// 🚀 새로 추가된 페이지들
import Login from './pages/LoginPage/Login';
import MyPage from './pages/MyPage/MyPage';
import AdminPage from './pages/AdminPage/AdminPage';

export default function App() {
  const location = useLocation();
  
  // 🚀 헤더 표시 조건 (새 페이지 제외)
  const shouldShowHeader = 
    location.pathname.startsWith('/MD/product') ||
    location.pathname.startsWith('/MD/cart') ||
    location.pathname.startsWith('/MD/payment') ||
    location.pathname.startsWith('/MD/products') ||
    location.pathname.startsWith('/MD/search') ||
    location.pathname.startsWith('/MD/about') ||
    location.pathname === '/MD';

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        {/* 랜딩페이지 path */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/selectMember" element={<SelectMemberPage />} />
        <Route path="/selectMember/view" element={<ViewPage />} />

        {/* 사진촬영 페이지 path */}
        <Route path="/picture/selectMember" element={<PictureSelectMemberPage />} />
        <Route path="/picture/memberDeco" element={<MemberDecoPage />} />
        <Route path="/picture/camera" element={<CameraPage />} />

        {/* 커뮤니티 페이지 path */}
        <Route path="/CommunityHome" element={<CommunityHome />} />
        <Route path="/Community/CheerArtist" element={<CheerArtist />} />
        <Route path="/Community/FandomTalk" element={<FandomTalk />} />
        <Route path="/Community/Vote" element={<Vote />} />
        <Route path="/Community/SelectMember" element={<SelectMember />} />

        {/* 홈페이지 path */}
        <Route path="/home" element={<Home />} />

        {/* 🚀 인증 관련 페이지 (새로 추가) */}
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* MD 페이지 path (기존 유지) */}
        <Route path="/MD" element={<MDMain />} />
        <Route path="/MD/products" element={<ProductList />} />
        <Route path="/MD/product/:id" element={<ProductDetail />} />
        <Route path="/MD/cart" element={<Cart />} />
        <Route path="/MD/payment" element={<Payment />} />
        <Route path="/MD/payment/complete" element={<PaymentComplete />} />
        <Route path="/MD/payment/success" element={<PaymentSuccess />} />
        <Route path="/MD/payment/fail" element={<PaymentFail />} />
        <Route path="/MD/search" element={<SearchResults />} />
        <Route path="/MD/about" element={<About />} />

        {/* 🚀 추가 라우트 (호환성을 위해) */}
        <Route path="/profile" element={<MyPage />} />
        <Route path="/profile/orders" element={<MyPage />} />
        <Route path="/dashboard" element={<AdminPage />} />

        {/* 404 페이지 (선택사항) */}
        <Route path="*" element={
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
            <h2 style={{ marginBottom: '20px' }}>페이지를 찾을 수 없습니다</h2>
            <button 
              onClick={() => window.location.href = '/'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#74B9FF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              홈으로 돌아가기
            </button>
          </div>
        } />
      </Routes>
    </>
  );
}