import React, { useRef, useState } from 'react';

import image1 from '@/assets/images/CommunityPage/image1.png';
import moreicon from '@/assets/images/CommunityPage/moreicon.png';
import { useComment } from '@/pages/CommunityPage/hooks/CommunityPage.useComment';
import { useLocation } from 'react-router-dom';
import * as itemS from '@/pages/CommunityPage/styled/CommunityPage.CheerArtist.style';

export const CommentContent = ({memberId,name}) => {
  const {reply, error} = useComment(memberId,name);
  // const {nicknames, setnicknames} = useState()

  if (error) return <p>에러발생: {error.message}</p>;

  // // 1~4자리 숫자 랜덤 함수
  // const RanNum = () => {
  //   const digits = Math.floor(Math.random()*4)+1;
  //   let number = '';
  //   for(let i=0;i<digits;i++){
  //     number+= Math.floor(Math.random()*10);
  //   }
  //   return number;
  // }
  
  return (
    <>
    {reply.length === 0 ? (
      <p>댓글이 없습니다.</p>
    ) : (
      <>
      {reply.map((m)=>{
        console.log(m);
        const formattedDate = new Date(m.createdAt).toISOString().split('T')[0];
        // 익명+랜덤번호
        // const displayNickname = m.isAnonymous === "0"
        // ? `${m.displayNickname}${RanNum()}`:m.displayNickname;
        return (
        <div key={m.commentId}>
        <itemS.CommentContents>
          <itemS.Userwrap>
            <itemS.UserImg><img src={m.displayAvatarUrl} /></itemS.UserImg>
            <itemS.UserInfo>
              <h2>{m.displayNickname}</h2>
              <p>{formattedDate}</p>
            </itemS.UserInfo>
            <itemS.moreIcon><img src={moreicon} /></itemS.moreIcon>
          </itemS.Userwrap>
          <itemS.context><p>{m.content}</p></itemS.context>
        </itemS.CommentContents>
        </div>
      )})}
      </>
    )}
    </>
  );
};
