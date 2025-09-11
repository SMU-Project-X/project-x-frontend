import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';
import VoteCard from './CommunityPage.VotePage.VoteCard.component';
import image1 from '@/assets/images/CommunityPage/image1.png'

function Unit({title,options}){
    return (
<VoteModal.VoteSelect>
    <VoteModal.RadioInfo>
        <input type="radio" name="choice" id={title}></input>
        <h3>{title}</h3>
    </VoteModal.RadioInfo>
    <VoteModal.Unit>
        {options.map((opt,idx)=>{
            return (
                <VoteCard
                title={title}
                key={idx}
                img={opt.img || image1}
                CharacterName={opt.CharacterName}
                Personality={opt.Personality}
                />
            );
        })}
    </VoteModal.Unit>
    {/* <button onClick={onVote}>투표하기</button> */}
</VoteModal.VoteSelect>
    )
}

export default Unit;