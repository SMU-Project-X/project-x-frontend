import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// style
import * as itemS from '../styled/CommunityPage.VoteBanner.style';
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
import image1 from '@/assets/images/CommunityPage/image1.png';
import Modal from '../CommunityPage.VotePage';

import VoteSlideCard from './CommunityPage.BannerSlide';

export const Banner = ({onOpenModal}) => {

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

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
    <section className='voting_section'>
        <itemS.banner_container>
            {/* 이전으로 넘어가기 */}
            <PrevBtn className="prevBtn"><img src={previous} /></PrevBtn>
            {/* 카드 배너 */}
            <itemS.slider>
                <itemS.sectionTop>
                    <itemS.voteImg><img src={voteicon}></img></itemS.voteImg>
                    <h1 className='section_title'>
                        투표하기
                    </h1>
                </itemS.sectionTop>
                <Swiper 
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{ prevEl: '.prevBtn', nextEl: '.nextBtn' }}
                    loop={true}
                    autoplay={{delay:5000}}
                    spaceBetween={6}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)} 
                >
                    <itemS.slide>
                        <SwiperSlide>
                            <VoteSlideCard 
                                title = "투표 모달창 실험"
                                date= "2025.09.03~2025.09.24"
                                img = {image2}
                                onClick={onOpenModal}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <VoteSlideCard 
                                title = "투표 모달창 실험"
                                date= "2025.09.03~2025.09.24"
                                img = {image2}
                                onClick={onOpenModal}
                            />
                        </SwiperSlide>                        
                        <SwiperSlide>
                            <VoteSlideCard 
                                title = "투표 모달창 실험"
                                date= "2025.09.03~2025.09.24"
                                img = {image2}
                                onClick={onOpenModal}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <VoteSlideCard 
                                title = "투표 모달창 실험"
                                date= "2025.09.03~2025.09.24"
                                img = {image2}
                                onClick={onOpenModal}
                            />
                        </SwiperSlide>                        
                        <SwiperSlide>
                            <VoteSlideCard 
                                title = "투표 모달창 실험"
                                date= "2025.09.03~2025.09.24"
                                img = {image2}
                                onClick={onOpenModal}
                            />
                        </SwiperSlide>                        
                        <SwiperSlide>
                            <VoteSlideCard 
                                title = "투표 모달창 실험"
                                date= "2025.09.03~2025.09.24"
                                img = {image2}
                                onClick={onOpenModal}
                            />
                        </SwiperSlide>
                    </itemS.slide>
                </Swiper>
            </itemS.slider>
            {/* 다음으로 넘어가기 */}
            <NextBtn className="nextBtn"><img src={next} /></NextBtn>
        </itemS.banner_container>
    </section> 
    )
}

export default Banner;