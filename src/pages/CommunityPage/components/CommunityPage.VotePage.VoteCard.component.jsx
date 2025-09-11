import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';

function VoteCard({title,img,CharacterName,Personality}) {
    return (
        <VoteModal.VoteCard>
            <VoteModal.VoteImg>
                <img src={img} alt={title} />
            </VoteModal.VoteImg>
            <VoteModal.VoteContent>
            <span>{CharacterName}</span>
            <p>#{Personality}</p>
            </VoteModal.VoteContent>
        </VoteModal.VoteCard>
    )
}
export default VoteCard;
