// src/ChatbotPage/MessageArea.jsx
import React, { useEffect } from 'react';
import {
  MessagesArea,
  DateDivider,
  DateBtn,
  Message,
  MessageContent,
  MessageAvatar,
  MessageSenderName,
  MessageBubble,
  MessageTime,
  AvatarImg,
  MessageFooter,
  LikeDislikeButtons,
  LikeButton,
  DislikeButton
} from '../styled/ChatApp.js';

const MessageArea = ({ selectedChat, contacts, messagesEndRef, handleFeedback }) => {
  // 메시지가 추가될 때마다 자동으로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat.messages]);

  const getSenderAvatar = (senderEnglishName) => {
    const sender = contacts.find(contact => contact.englishName === senderEnglishName);
    return sender ? sender.avatarUrl : null;
  };

  return (
    <MessagesArea>
      <DateDivider>
        <DateBtn>오늘</DateBtn>
      </DateDivider>

      {selectedChat.messages.map((message) => {
        const isUser = message.sender === 'user';
        const avatarUrl = getSenderAvatar(message.sender);

        return (
          <Message key={message.id} $isUser={isUser}>
            <MessageContent $isUser={isUser}>
              {!isUser && (
                <MessageAvatar>
                  {avatarUrl ? (
                    <AvatarImg size="50px" src={avatarUrl} alt={`${selectedChat.name} Avatar`} />
                  ) : (
                    '👤' // 아바타 이미지가 없을 경우 기본 아이콘
                  )}
                </MessageAvatar>
              )}
              <div>
                {!isUser && <MessageSenderName>{selectedChat.name}</MessageSenderName>}
                <MessageBubble $isUser={isUser}>{message.text}</MessageBubble>
                <MessageFooter>
                  <MessageTime>{message.time}</MessageTime>
                  {!isUser && (
                    <LikeDislikeButtons>
                      <LikeButton onClick={() => handleFeedback('like')}>👍</LikeButton>
                      <DislikeButton onClick={() => handleFeedback('dislike')}>👎</DislikeButton>
                    </LikeDislikeButtons>
                  )}
                </MessageFooter>
              </div>
            </MessageContent>
          </Message>
        );
      })}
      <div ref={messagesEndRef} />
    </MessagesArea>
  );
};

export default MessageArea;