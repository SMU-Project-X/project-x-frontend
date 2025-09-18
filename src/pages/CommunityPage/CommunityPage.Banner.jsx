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
import zentreya from '@/assets/images/RandingPage/zentreya_img.jpg';
import image1 from '@/assets/images/CommunityPage/image1.png';

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
    // const { banners } = UseBanner();

    // 더미 배너 데이터
    const banners = [
        { bannerId:1, bannerTitle:"유닛조합에 투표해주세요!", startDate:"2025.09.03", endDate:"2025.09.24", Banner_imgUrl:zentreya },
        { bannerId:2, bannerTitle:"최고의 응.꾸 투표하기!", startDate:"2025.09.05", endDate:"2025.09.25", Banner_imgUrl:image2 },
        { bannerId:3, bannerTitle:"투표결과를 확인하세요!", startDate:"2025.09.07", endDate:"2025.09.27", Banner_imgUrl:image1 },
        { bannerId:4, bannerTitle:"투표1", startDate:"2025.09.05", endDate:"2025.09.25", Banner_imgUrl:image2 },
        { bannerId:5, bannerTitle:"투표2", startDate:"2025.09.07", endDate:"2025.09.27", Banner_imgUrl:image2 },       
        { bannerId:6, bannerTitle:"투표3", startDate:"2025.09.03", endDate:"2025.09.24", Banner_imgUrl:zentreya }
    ];

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
                    {banners.map((banner)=> (
                    <SwiperSlide key={banner.bannerId}>
                        <BannerSlide 
                            title = {banner.bannerTitle}
                            date= {`${banner.startDate} ~ ${banner.endDate}`}
                            img = {banner.Banner_imgUrl}
                            onClick={()=>onOpenModal(banner.bannerId)}
                        />
                    </SwiperSlide>
                    ))}
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