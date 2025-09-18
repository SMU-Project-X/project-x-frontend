import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from './styled/CommunityPage.VoteModal.style';
import Unit from './components/CommunityPage.VotePage.Unit';

// 이미지 임포트
// import 가온 from '/Character/가온.png';
// import 다온 from '/Character/다온.png';
// import 류하 from '/Character/류하.png';
// import 모아 from '/Character/모아.png';
// import 세라 from '/Character/세라.png';
// import 세인 from '/Character/세인.png';
// import 수린 from '/Character/수린.png';
// import 아린 from '/Character/아린.png';
// import CloseBtn from '@/assets/images/CommunityPage/closeBtn.png';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import previous from '@/assets/images/CommunityPage/previous.png';
import next from '@/assets/images/CommunityPage/next.png';
import * as itemS from './styled/CommunityPage.VoteBanner.style';
import styled from 'styled-components';




export const VotePage = ({isModalOpen, onClose, banner}) => {
    if(!isModalOpen || !banner) return null;
    
    // const [isOpen, setIsOpen] = useState(false);
    // const [hasVoted, setHasVoted] = useState(false);    // 투표 여부 상태 확인

    // // 투표 완료
    // const handleVote = () => {
    //     setHasVoted(true);
    //     alert("투표가 완료되었습니다.");
    //     // 실제 구현에서는 서버 API 호출 후 상태 업데이트
    // }

        const PrevBtn = styled.div`
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        img {
            width: 40px;
            height: 40px;
        }
    `;
    const NextBtn = styled.div`
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;

        img {
            width: 40px;
            height: 40px;
        }
    `;


    // VoteCard 와 props 이름 일치시키기 필요
    const dummyUnits = [
        {
        title: "유닛 A",
        options: [
            { CharacterName: "가온", Personality: "#귀염 #ENFP", img:'/Character/가온.png'},
            { CharacterName: "다온", Personality: "#시크 #INTJ", img:'/Character/다온.png'},
            { CharacterName: "류하", Personality: "#시크 #INTJ", img:'/Character/류하.png' },
            { CharacterName: "모아", Personality: "#시크 #INTJ", img:'/Character/모아.png' }
            
        ],
        },
        {
        title: "유닛 B",
        options: [
            { CharacterName: "세라", Personality: "#상큼 #ENTP", img:'/Character/세라.png' },
            { CharacterName: "세인", Personality: "#차분 #ISFJ", img:'/Character/세인.png' },
            { CharacterName: "수린", Personality: "#시크 #INTJ", img:'/Character/수린.png' },
            { CharacterName: "아린", Personality: "#시크 #INTJ", img:'/Character/아린.png' }
        ],
        },
        {
        title: "유닛 C",
        options: [
            { CharacterName: "세라", Personality: "#상큼 #ENTP", img:'/Character/세라.png' },
            { CharacterName: "세인", Personality: "#차분 #ISFJ", img:'/Character/세인.png' },
            { CharacterName: "수린", Personality: "#시크 #INTJ", img:'/Character/수린.png' },
            { CharacterName: "아린", Personality: "#시크 #INTJ", img:'/Character/아린.png' }
        ],
        },        
        {
        title: "유닛 D",
        options: [
            { CharacterName: "세라", Personality: "#상큼 #ENTP", img:'/Character/세라.png' },
            { CharacterName: "세인", Personality: "#차분 #ISFJ", img:'/Character/세인.png' },
            { CharacterName: "수린", Personality: "#시크 #INTJ", img:'/Character/수린.png' },
            { CharacterName: "아린", Personality: "#시크 #INTJ", img:'/Character/아린.png' }
        ],
        },
        
    ];

        return (
            <VoteModal.Overlay>
                <VoteModal.ModuleContainer>
                    <VoteModal.VoteContainer>
                        <VoteModal.top>
                            <h1>유닛조합에 투표 해주세요</h1>
                            <VoteModal.CloseBtn onClick={onClose}>닫기</VoteModal.CloseBtn>
                        </VoteModal.top>
                        <VoteModal.SwiperWrapper >
                            <PrevBtn className="prevBtn">
                                <img src={previous} />
                            </PrevBtn>
                                <Swiper 
                                    modules={[Navigation, Pagination]}
                                    navigation={{ prevEl: '.prevBtn', nextEl: '.nextBtn' }}
                                    loop={true}
                                    spaceBetween={30}
                                    slidesPerView={1} 
                                >   
                                    {/* 이전으로 넘어가기 */}
                                    {dummyUnits.map((unit, idx) => (
                                        <SwiperSlide key={idx}>
                                        <VoteModal.UnitContainer>
                                            <Unit title={unit.title} options={unit.options} />
                                        </VoteModal.UnitContainer>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            {/* 다음으로 넘어가기 */}
                            <NextBtn className="nextBtn">
                                <img src={next} />
                            </NextBtn>
                        </VoteModal.SwiperWrapper >
                            {/* 투표가 이미 완료된 경우 안내 */}
                            {/* <VoteModal.VoteBlock>
                                <VoteModal.NoMoreVote>
                                    <p>이미 투표에 참여하셨습니다.</p>
                                    <p>결과를 기다려주세요</p>
                                </VoteModal.NoMoreVote>
                            </VoteModal.VoteBlock> */}
                    </VoteModal.VoteContainer> 
                </VoteModal.ModuleContainer>
            </VoteModal.Overlay>
    );
    
}

export default VotePage;