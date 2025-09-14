import React, { useRef } from 'react';

import * as itemS from '@/pages/CommunityPage/styled/CommunityPage.CheerArtist.style';
import image1 from '@/assets/images/CommunityPage/image1.png';
import moreicon from '@/assets/images/CommunityPage/moreicon.png';
import { useComment } from '@/pages/CommunityPage/hooks/CommunityPage.useComment';
import { useLocation } from 'react-router-dom';

export const CommentContent = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const memberId = query.get('memberId');
  const name = query.get('name');

  const {reply: comments, error} = useComment(memberId,name);
  const createdAt = query.get('createdAt');

  
  return (
    <>
    {comments.map((m)=>(
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
  )
}
