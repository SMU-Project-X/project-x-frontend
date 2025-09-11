import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link,useLocation } from "react-router-dom";
import SplashPage from './pages/RandingPage/RandingPage.SplashPage';
import SelectMemberPage from './pages/RandingPage/RandingPage.SelectMemberPage';

import CommunityHome from './pages/CommunityPage/CommunityHome';
import CheerArtist from './pages/CommunityPage/Community.CheerArtist';
import FandomTalk from './pages/CommunityPage/Community.FandomTalk';
import Vote from './pages/CommunityPage/Community.Vote';
import SelectMember from './pages/CommunityPage/Community.SelectMember';
import ViewPage from './pages/RandingPage/RandingPage.SelectMemberPage.ViewPage';

import Cart from './pages/MDPage/MDPage.Cart';
import Payment from './pages/MDPage/MDPage.Payment';
import PaymentComplete from './pages/MDPage/MDPage.PaymentComplete';
import ProductList from './pages/MDPage/MDPage.ProductList';
import ProductDetail from './pages/MDPage/MDPage.ProductDetail';
import About from './pages/MDPage/MDPage.About';
import MDMain from './pages/MDPage/MDPage.main';
import Header from './pages/MDPage/MDPage.header';


export default function App() {
  const location = useLocation();
  
  // 헤더 표시 조건
  const shouldShowHeader = 
                        location.pathname.startsWith('/MD/product') ||
                        location.pathname.startsWith('/MD/cart') ||
                        location.pathname.startsWith('/MD/payment') ||
                        location.pathname.startsWith('/MD/products') ||
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

        {/* 커뮤니티 path */}
        <Route path="/CommunityHome" element={<CommunityHome />} />
        <Route path='/Community/Vote' element={<Vote />} />
        <Route path="/Community/CheerArtist" element={<CheerArtist />} />
        <Route path="/Community/SelectMember" element={<SelectMember />} />
        <Route path="/Community/FandomTalk" element={<FandomTalk />} />

          {/* MD path */}
        <Route path="/MD" element={<MDMain />} />
        <Route path="/MD/products" element={<ProductList />} />
        <Route path="/MD/product/:id" element={<ProductDetail />} />
        <Route path="/MD/payment" element={<Payment />} />
        <Route path="/MD/payment-complete" element={<PaymentComplete />} />
        <Route path="/MD/cart" element={<Cart />} />
        <Route path="/MD/about" element={<About />} />
      </Routes>
    </>
  )
}

