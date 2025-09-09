import { useState } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import SplashPage from './pages/RandingPage/RandingPage.SplashPage';

import MDPage from './pages/MDPage/MDPage.main';
import ProductDetail from './pages/MDPage/MDPage.ProductDetail';
import Header from './pages/MDPage/Header';
import SelectMemberPage from './pages/RandingPage/RandingPage.SelectMemberPage';



function App() {
  const location = useLocation();
  
  // 헤더를 표시할 페이지들
  const pagesWithHeader = ['/MD', '/home', '/community', '/content', '/chat'];
  
  // 상품 상세페이지도 헤더 표시되도록 조건 추가
  const shouldShowHeader = pagesWithHeader.includes(location.pathname) || 
                          location.pathname.startsWith('/MD/product/');

  return (

    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {shouldShowHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/MD" element={<MDPage />} />
          <Route path="/MD/product/:id" element={<ProductDetail />} />
          <Route path="/home" element={<div>Home 페이지</div>} />
          <Route path="/community" element={<div>Community 페이지</div>} />
          <Route path="/content" element={<div>Content 페이지</div>} />
          <Route path="/chat" element={<div>Chat 페이지</div>} />
          <Route path="/" element={<SplashPage />} />
          <Route path="/selectMember" element={<SelectMemberPage />} />
        </Routes>
      </main>
    </div>

  )
}

export default App