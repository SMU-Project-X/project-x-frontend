import React, { useRef, useState } from 'react';

import image1 from '@/assets/images/CommunityPage/image1.png';
import moreicon from '@/assets/images/CommunityPage/moreicon.png';
import { useComment } from '@/pages/CommunityPage/hooks/CommunityPage.useComment';
import { useLocation } from 'react-router-dom';
import * as itemS from '@/pages/CommunityPage/styled/CommunityPage.CheerArtist.style';

export const CommentSection = ({memberId, memberName}) => {
  const {reply, error} = useComment(memberId, memberName);

  return(
    <itemS.CommentContainer>
      {/* 댓글 리스트 */}
      <itemS.CommentList>
        {reply.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
         reply.map((m) => <CommentContent key={m.commentId} comment={m} />)
        )}
      </itemS.CommentList>
    </itemS.CommentContainer>
  );
};


export const CommentContent = ({ comment }) => {
  const formattedDate = new Date(comment.createdAt).toISOString().split('T')[0];

  return (
        <itemS.CommentContents>
          <itemS.Userwrap>
            <itemS.UserImg><img src={comment.displayAvatarUrl} /></itemS.UserImg>
            <itemS.UserInfo>
              <h2>{comment.nickname}</h2>
              <p>{formattedDate}</p>
            </itemS.UserInfo>
            <itemS.moreIcon><img src={moreicon} alt="더보기"/></itemS.moreIcon>
          </itemS.Userwrap>
          <itemS.context><p>{comment.content}</p></itemS.context>
        </itemS.CommentContents>
  );
};
