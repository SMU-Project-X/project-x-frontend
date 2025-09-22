import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// style
import * as itemS from './styled/CommunityPage.VoteBanner.style';
import styled from 'styled-components';
// Swiper 라이브러리
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// 이미지 임포트
import previous from '@/assets/images/CommunityPage/previous.png';
import next from '@/assets/images/CommunityPage/next.png';
import image2 from '@/assets/images/CommunityPage/image2.png';
import voteicon from '@/assets/images/CommunityPage/voteicon.png';

import BannerSlide from './components/CommunityPage.BannerSlide';
import  VotePage  from '@/pages/CommunityPage/CommunityPage.VotePage';
import { UseBanner } from './hooks/CommunityPage.useBanner';


    const PrevBtn = styled.div`
        left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 40px;
            height: 40px;
        }
    `;
    const NextBtn = styled.div`
        left:10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 40px;
            height: 40px;
        }
    `;

export const Banner = () => {
    const {banners, selectedBannerId, options} = UseBanner();
    console.log("가져온 배너 데이터: ",banners);


    // 모달 상태관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanenr ] = useState(null);
    
    const onOpenModal = (banner) => {
        setSelectedBanenr(banner);
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBanenr(null);
    }

    // 배너가 없는 경우 실행 안함
    if(!banners || banners.length === 0){
        return null;
    }
  
    return (
    <section className='voting_section'>
        <itemS.banner_container>
            {/* 이전버튼 */}
            <PrevBtn className="prevBtn"><img src={previous} /></PrevBtn>

            {/* 카드 배너 */}
            <itemS.slider>
                <itemS.sectionTop>
                    <itemS.voteImg><img src={voteicon}></img></itemS.voteImg>
                    <h1 className='section_title'>
                        투표하기
                    </h1>
                </itemS.sectionTop>

                {/* Swiper 슬라이드 */}
                <Swiper 
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{ prevEl: '.prevBtn', nextEl: '.nextBtn' }}
                    loop={true}
                    autoplay={{delay:5000}}
                    spaceBetween={6}
                    slidesPerView={3}
                >
                    {/* <itemS.slide> */}
                    {banners.map((b)=> {
                        const startDate = new Date(b.startDate).toISOString().split("T")[0];
                        const endDate = new Date(b.endDate).toISOString().split("T")[0];
                    
                        return(
                        <SwiperSlide key={b.bannerId}>
                            {/* 컴포넌트 부분 */}
                            <BannerSlide 
                                bannerId={b.bannerId}
                                title = {b.bannerTitle}
                                startDate= {startDate} 
                                endDate = {endDate}
                                img = {image2}
                                onClick={()=>onOpenModal(b)}
                            />
                        </SwiperSlide>
                        )})}
                    {/* </itemS.slide> */}
                </Swiper>
            </itemS.slider>

            {/* 다음버튼 */}
            <NextBtn className="nextBtn"><img src={next} /></NextBtn>

            {/* 모달 */}
            <VotePage isModalOpen = {isModalOpen} onClose={onCloseModal} banner={selectedBanner} />
        </itemS.banner_container>
    </section> 
    )
}

export default Banner;