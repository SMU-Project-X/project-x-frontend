import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';
import image1 from '@/assets/images/CommunityPage/image1.png';

// 투표하기 유닛멤버 후보
function VoteCard({title,img,CharacterName,Personality,Position}) {
    return (
         <VoteModal.VoteCard>
            <VoteModal.VoteImg>
                <img src={img} alt={title} />
            </VoteModal.VoteImg>
            <VoteModal.UnitInfo>
            <span>{CharacterName}</span>
            <p> {Personality}</p>
            <p> {Position} </p>
            </VoteModal.UnitInfo>
        </VoteModal.VoteCard>
    )
}
export default VoteCard;
