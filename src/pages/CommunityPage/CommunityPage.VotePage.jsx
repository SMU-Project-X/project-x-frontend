import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';
import Unit from './components/CommunityPage.VotePage.Unit.Component';

// 이미지 임포트
import 가온 from '/Character/가온.png';
import 다온 from '/Character/다온.png';
import 류하 from '/Character/류하.png';
import 모아 from '/Character/모아.png';
import 세라 from '/Character/세라.png';
import 세인 from '/Character/세인.png';
import 수린 from '/Character/수린.png';
import 아린 from '/Character/아린.png';
import CloseBtn from '@/assets/images/CommunityPage/closeBtn.png';
import { DoVote } from './hooks/CommunityPage.VotePage.DoVote';



export const VotePage = ({isModalOpen, onClose, userId}) => {
    if(!isModalOpen) return null;
    
    // const [isOpen, setIsOpen] = useState(false);
    // const [hasVoted, setHasVoted] = useState(false);    // 투표 여부 상태 확인

    // // 투표 완료
    // const handleVote = () => {
    //     setHasVoted(true);
    //     alert("투표가 완료되었습니다.");
    //     // 실제 구현에서는 서버 API 호출 후 상태 업데이트
    // }


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
                    <h1>유닛조합에 투표 해주세요</h1>
                    <VoteModal.CloseBtn onClick={onClose}>닫기</VoteModal.CloseBtn>
                        {dummyUnits.map((unit, idx) => (
                            <Unit 
                                key={idx} 
                                title={unit.title} 
                                options={unit.options} 
                            />
                        ))}
                        {/* 투표가 이미 완료된 경우 안내 */}
                            <VoteModal.VoteBlock>
                                <VoteModal.NoMoreVote>
                                    <p>이미 투표에 참여하셨습니다.</p>
                                    <p>결과를 기다려주세요</p>
                                </VoteModal.NoMoreVote>
                            </VoteModal.VoteBlock>
                    </VoteModal.VoteContainer> 
                    <button>투표하기</button> 
                </VoteModal.ModuleContainer>
            </VoteModal.Overlay>
    );
    
}

export default VotePage;