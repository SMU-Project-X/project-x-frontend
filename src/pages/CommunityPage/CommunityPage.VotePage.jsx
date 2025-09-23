import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// modal style
import * as VoteModal from './styled/CommunityPage.VoteModal.style';
import Unit from './components/CommunityPage.VotePage.UnitAll';

// 이미지 임포트
import CloseBtn from '@/assets/images/CommunityPage/closeBtn.png';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import previous from '@/assets/images/CommunityPage/previous.png';
import next from '@/assets/images/CommunityPage/next.png';
import * as itemS from './styled/CommunityPage.VoteBanner.style';
import styled from 'styled-components';
import { useVote } from './hooks/CommunityPage.useVote';
import Login from '../LoginPage/LoginPage.main';

    
    // 이전, 다음 버튼
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


export const VotePage = ({isModalOpen, onClose, banner}) => {
    const { postVote, votes, loading } = useVote();
    const [selectedUnit, setSelectedUnit]=useState(null);
    const [voted, setVoted] = useState(true); // 투표 여부 체크


    // 버튼 함수 호출
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    if(!isModalOpen || !banner) return null;

    const handleVote=()=>{
        const userId = Login();
        const navigate = useNavigate();
        console.log("유저아이디: ",userId);
        
    // ✅ 로그인 안 된 경우
    if (!userId) {
      alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
      navigate("/login"); // 실제로 로그인 페이지로 이동
      return;
    }
        
        postVote(banner.bannerId, selectedUnit);
        setVoted(true)
    };

    // VoteCard 와 props 이름 일치시키기 필요
    const units = [
        {
            unit_id: 1,
            title: "유닛 A",
            unit: [
                { CharacterName: "가온", Personality: "#귀염 #ENFP", Position:"리더", img:'/Character/가운.png'},
                { CharacterName: "다온", Personality: "#시크 #INTJ", Position:"메인보컬", img:'/Character/다은.png'},
                { CharacterName: "류하", Personality: "#시크 #INTJ", Position:"메인댄서", img:'/Character/류하.png' },
                { CharacterName: "모아", Personality: "#시크 #INTJ", Position:"메인래퍼", img:'/Character/모아.png' }
                
        ],
        },
        {
            unit_id: 2,
            title: "유닛 B",
            unit: [
                { CharacterName: "세라", Personality: "#상큼 #ENTP", Position:"리더", img:'/Character/세라.png' },
                { CharacterName: "세인", Personality: "#차분 #ISFJ", Position:"메인보컬", img:'/Character/세인.png' },
                { CharacterName: "수린", Personality: "#시크 #INTJ", Position:"메인댄서", img:'/Character/수린.png' },
                { CharacterName: "아린", Personality: "#시크 #INTJ", Position:"메인래퍼", img:'/Character/아린.png' }
        ],
        },
        {
            unit_id: 3,
            title: "유닛 C",
            unit: [
                { CharacterName: "세라", Personality: "#상큼 #ENTP", Position:"리더", img:'/Character/아린.png' },
                { CharacterName: "세인", Personality: "#차분 #ISFJ", Position:"메인보컬", img:'/Character/유나.png' },
                { CharacterName: "수린", Personality: "#시크 #INTJ", Position:"메인댄서", img:'/Character/지원.png' },
                { CharacterName: "아린", Personality: "#시크 #INTJ", Position:"메인래퍼", img:'/Character/채윤.png' }
        ],
        },        
        {
            unit_id: 4,
            title: "유닛 D",
            unit: [
                { unit_id: 4,CharacterName: "세라", Personality: "#상큼 #ENTP", Position:"리더", img:'/Character/현.png' },
                { unit_id: 4,CharacterName: "세인", Personality: "#차분 #ISFJ", Position:"메인보컬", img:'/Character/수린.png' },
                { unit_id: 4,CharacterName: "수린", Personality: "#시크 #INTJ", Position:"메인댄서", img:'/Character/류하.png' },
                { unit_id: 4,CharacterName: "아린", Personality: "#시크 #INTJ", Position:"메인래퍼", img:'/Character/아린.png' }
        ],
        },
        
    ];
    
    return (
            <VoteModal.Overlay>
                <VoteModal.ModuleContainer>
                    <VoteModal.VoteContainer>
                        <VoteModal.top>
                            <h1>{banner.bannerTitle}</h1>
                            <VoteModal.CloseBtn onClick={onClose}>닫기</VoteModal.CloseBtn>
                        </VoteModal.top>

                        {/* 본문 */}
                        <VoteModal.SwiperWrapper >
                            <PrevBtn ref={prevRef} className="prevBtn">
                                <img src={previous} alt="prev" />
                            </PrevBtn>
                                <Swiper 
                                    modules={[Navigation, Pagination]}
                                    loop={true}
                                    spaceBetween={30}
                                    slidesPerView={1} 
                                    onBeforeInit={(swiper) => {
                                        if (typeof swiper.params.navigation !== "boolean"){
                                            swiper.params.navigation.prevEl = prevRef.current;
                                            swiper.params.navigation.nextEl = nextRef.current;
                                        }
                                        
                                    }}
                                >   
                                    {/* 이전으로 넘어가기 */}
                                    {units.map((unit) => (
                                    <SwiperSlide key={unit.unit_id}>
                                        <VoteModal.UnitContainer>
                                        <Unit
                                            title={unit.title}
                                            options={unit.unit}
                                            isSelected={selectedUnit === unit.unit_id}
                                            // 한번 더 클릭시 해제
                                            onSelect={() =>
                                                setSelectedUnit(
                                                    selectedUnit === unit.unit_id ? null : unit.unit_id
                                                )
                                            }
                                        />
                                        </VoteModal.UnitContainer>
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                            {/* 다음으로 넘어가기 */}
                            <NextBtn ref={nextRef} className="nextBtn">
                                <img src={next} alt="next" />
                            </NextBtn>
                        </VoteModal.SwiperWrapper >

                        {/* ✅ 투표하기 버튼 */}
                        <VoteModal.VoteButton onClick={handleVote} aria-disabled={loading}>
                            {loading ? "투표 중..." : "투표하기"}
                        </VoteModal.VoteButton>

                        {/* ✅ 투표결과 확인 */}
                        <pre style={{ marginTop: "10px", color: "#888" }}>
                            {JSON.stringify(votes, null, 2)}
                        </pre>
                    </VoteModal.VoteContainer> 
                </VoteModal.ModuleContainer>
            </VoteModal.Overlay>
    );
    
}

export default VotePage;