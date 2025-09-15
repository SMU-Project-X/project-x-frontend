import React, { useRef, useState } from 'react';

import image1 from '@/assets/images/CommunityPage/image1.png';
import moreicon from '@/assets/images/CommunityPage/moreicon.png';
import { useComment } from '@/pages/CommunityPage/hooks/CommunityPage.useComment';
import { useLocation } from 'react-router-dom';
import * as itemS from '@/pages/CommunityPage/styled/CommunityPage.CheerArtist.style';

export const CommentContent = ({memberId,name}) => {

  const {reply, error} = useComment(memberId,name);

  if (error) return <p>에러발생: {error.message}</p>
  
  return (
    <>
    {reply.length === 0 ? (
      <p>댓글이 없습니다.</p>
    ) : (
      <>
      {reply.map((m)=>(
        <div key={m.commentId}>
        <itemS.CommentContents>
          <itemS.Userwrap>
            <itemS.UserImg><img src={m.display_avatar_url} /></itemS.UserImg>
            <itemS.UserInfo>
              <h2>{m.displayNickname}</h2>
              <p>{m.createdAt}</p>
            </itemS.UserInfo>
            <itemS.moreIcon><img src={moreicon} /></itemS.moreIcon>
          </itemS.Userwrap>
          <itemS.context><p>{m.content}</p></itemS.context>
        </itemS.CommentContents>
        </div>
      ))}
      </>
    )};
    </>
  );
};
