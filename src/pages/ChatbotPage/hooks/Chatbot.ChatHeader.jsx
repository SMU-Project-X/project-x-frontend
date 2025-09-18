import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChatHeader as StyledChatHeader,
  ChatHeaderTop,
  ChatUserInfo,
  ChatAvatar,
  ChatUsername,
  ChatActions,
  ActionBtn,
  AvatarImg,
  IconLg
} from '../styled/ChatApp.js';

const ChatHeader = ({ selectedChat, toggleActions, isActionsVisible, sendAutoMessage }) => {
  return (
    <StyledChatHeader>
      <ChatHeaderTop>
        <ChatUserInfo>
          <Link to="/ChatChoice">
            <IconLg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </IconLg>
          </Link>
          <ChatAvatar>
            <AvatarImg size="40px" src={selectedChat.avatarUrl} alt={`${selectedChat.name} Avatar`} />
          </ChatAvatar>
          <ChatUsername>{selectedChat.name}</ChatUsername>
        </ChatUserInfo>
        <IconLg onClick={toggleActions} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </IconLg>
      </ChatHeaderTop>
      {isActionsVisible && (
        <ChatActions>
          <ActionBtn onClick={() => sendAutoMessage('안녕?')}>인사하기</ActionBtn>
          <ActionBtn onClick={() => sendAutoMessage('잘지냈어?')}>안부묻기</ActionBtn>
          <ActionBtn onClick={() => sendAutoMessage('이야기해줘')}>이야기</ActionBtn>
          <ActionBtn onClick={() => sendAutoMessage('나 심심해..')}>심심함</ActionBtn>
        </ChatActions>
      )}
    </StyledChatHeader>
  );
};

export default ChatHeader;