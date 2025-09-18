import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';
import VoteCard from './CommunityPage.VotePage.VoteCard';
import image1 from '@/assets/images/CommunityPage/image1.png'

// 투표하기 후보 전체
function Unit({title, options}){
    return (
        <VoteModal.VoteSelect>
            <VoteModal.Unit>
                {options.map((opt,idx)=>(
                    <VoteCard
                        key={idx}
                        title={title}
                        img={opt.img || "이미지 없음"}
                        CharacterName={opt.CharacterName}
                        Personality={opt.Personality}
                    />
                ))}
            </VoteModal.Unit>
            {/* <button onClick={onVote}>투표하기</button> */}
        </VoteModal.VoteSelect>
    )
}

export default Unit;