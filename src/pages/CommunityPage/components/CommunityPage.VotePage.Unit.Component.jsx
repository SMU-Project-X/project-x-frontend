import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';
import VoteCard from './CommunityPage.VotePage.VoteCard.component';
import image1 from '@/assets/images/CommunityPage/image1.png'

// 투표하기 후보 전체
function Unit({title, options}){
    return (
        <VoteModal.VoteSelect>
            {/* <VoteModal.RadioInfo>
                <h3>{title}</h3>
                <input type="hidden" name="choice" id={title}></input>
            </VoteModal.RadioInfo> */}
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