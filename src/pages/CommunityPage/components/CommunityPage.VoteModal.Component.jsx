import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// modal style
import * as VoteModal from '@/pages/CommunityPage/styled/CommunityPage.VoteModal.style';

// 이미지 임포트
import previous from '@/assets/images/CommunityPage/previous.png';
import next from '@/assets/images/CommunityPage/next.png';
import image1 from '@/assets/images/CommunityPage/image1.png';
import image2 from '@/assets/images/CommunityPage/image2.png';
import voteicon from '@/assets/images/CommunityPage/voteicon.png';

function Unit(){
    return (
        <VoteModal.VoteSelect>
    <VoteModal.RadioInfo>
        <input type="radio" name="choice" id="choice"></input>
        <h3>유닛 조합 1</h3>
    </VoteModal.RadioInfo>
    <VoteModal.Unit>
        <VoteModal.VoteCard>
            <VoteModal.VoteImg>
                <img src={image1} />
            </VoteModal.VoteImg>
            <VoteModal.VoteContent>
            <p>캐릭터 이름</p>
            </VoteModal.VoteContent>
        </VoteModal.VoteCard>
        <VoteModal.VoteCard>
            <VoteModal.VoteImg>
                <img src={image1} />
            </VoteModal.VoteImg>
            <VoteModal.VoteContent>
            <p>캐릭터 이름</p>
            </VoteModal.VoteContent>
        </VoteModal.VoteCard>
        <VoteModal.VoteCard>
            <VoteModal.VoteImg>
                <img src={image1} />
            </VoteModal.VoteImg>
            <VoteModal.VoteContent>
            <p>캐릭터 이름</p>
            </VoteModal.VoteContent>
        </VoteModal.VoteCard>
        <VoteModal.VoteCard>
            <VoteModal.VoteImg>
                <img src={image1} />
            </VoteModal.VoteImg>
            <VoteModal.VoteContent>
            <p>캐릭터 이름</p>
            </VoteModal.VoteContent>
        </VoteModal.VoteCard>
    </VoteModal.Unit>
</VoteModal.VoteSelect>
    )
}

export const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

        return (
        <VoteModal.ModuleContainer>
            <VoteModal.VoteContainer>
            <h1>유닛조합에 투표 해주세요</h1>
                <Unit />
                <Unit />
                <Unit />
                <Unit />                
            </VoteModal.VoteContainer>  
            {/* // VoteContainer */}
            {/* 
                투표 완료시 투표가 완료되었습니다 alert
                투표를 한 경우 -> 투표에 참여하셨습니다 안내와 블락처리 필요
            */}
            <VoteModal.VoteBlock>
                <VoteModal.NoMoreVote>
                    <p>이미 투표에 참여하셨습니다.</p>
                    <p>결과를 기다려주세요</p>
                </VoteModal.NoMoreVote>
            </VoteModal.VoteBlock>
        </VoteModal.ModuleContainer>
    );
    
}

// export const Vote = () => {
//         return (
//         <div className='Module-Container'>
//             <h1>유닛조합에 투표 해주세요</h1>
//             <div className='VoteContainer'>
//                 <div className='VoteSelect'>
//                     <div className='radio-info'>
//                         <input type="radio" name="choice" id="choice"></input>
//                         <h3>유닛 조합 1</h3>
//                     </div>
//                     <VoteModal.Unit>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='VoteSelect'>
//                     <div className='radio-info'>
//                         <input type="radio" name="choice" id="choice"></input>
//                         <h3>멋지고 귀엽고 시크하고 웃기고 매력있고 모든걸 다하는 조합</h3>
//                     </div>
//                     <VoteModal.Unit>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='VoteSelect'>
//                     <div className='radio-info'>
//                         <input type="radio" name="choice" id="choice"></input>
//                         <h3>유닛 조합 3</h3>
//                     </div>
//                     <VoteModal.Unit>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                         <VoteModal.VoteCard>
//                             <VoteModal.VoteImg>
//                                 <img src={image1} />
//                             </div>
//                             <VoteModal.VoteContent>
//                             <p>캐릭터 이름</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>  
//             {/* // VoteContainer */}
//             {/* 
//                 투표 완료시 투표가 완료되었습니다 alert
//                 투표를 한 경우 -> 투표에 참여하셨습니다 안내와 블락처리 필요
//             */}
//             <div className='VoteBlock'>
//                 <div className='NoMoreVote'>
//                     <p>이미 투표에 참여하셨습니다.</p>
//                     <p>결과를 기다려주세요</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default Modal;