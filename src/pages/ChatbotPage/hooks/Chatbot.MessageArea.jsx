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

const MessageArea = ({ selectedChat, contacts, messagesEndRef, onToggleLike, onToggleDislike, isLoading }) => { // isLoading props 추가
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat.messages, isLoading]); // isLoading 상태가 변경될 때도 스크롤

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
                    '👤'
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
                      <LikeButton
                        onClick={() => onToggleLike(message.id)}
                        $isLiked={message.isLiked}
                      >
                        <span role="img" aria-label="like">{message.isLiked ? '❤️' : '♡'}</span>
                        <span>{message.likes > 0 ? message.likes : ''}</span>
                      </LikeButton>
                      <DislikeButton
                        onClick={() => onToggleDislike(message.id)}
                        $isDisliked={message.isDisliked}
                      >
                        <span role="img" aria-label="dislike">{message.isDisliked ? '👎' : '👎'}</span>
                        <span>{message.dislikes > 0 ? message.dislikes : ''}</span>
                      </DislikeButton>
                    </LikeDislikeButtons>
                  )}
                </MessageFooter>
              </div>
            </MessageContent>
          </Message>
        );
      })}
      
      {/* 로딩 상태일 때 '입력 중...' 메시지 표시 */}
      {isLoading && (
        <Message $isUser={false}>
          <MessageContent $isUser={false}>
            <MessageAvatar>
              <AvatarImg size="50px" src={getSenderAvatar(selectedChat.englishName)} alt={`${selectedChat.name} Avatar`} />
            </MessageAvatar>
            <MessageBubble $isUser={false}>
              <span role="img" aria-label="typing">...</span>
            </MessageBubble>
          </MessageContent>
        </Message>
      )}

      <div ref={messagesEndRef} />
    </MessagesArea>
  );
};

export default MessageArea;