import React from 'react';
import {
  InputArea as StyledInputArea,
  InputContainer,
  AddBtn,
  InputWrapper,
  MessageInput,
  SendBtn,
  Icon,
  IconLg,
} from '../styled/ChatApp.js';

const InputArea = ({ newMessage, setNewMessage, sendMessage, handleKeyPress }) => {
  return (
    <StyledInputArea>
      <InputContainer>
        <AddBtn>
          <IconLg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </IconLg>
        </AddBtn>
        <InputWrapper>
          <MessageInput
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
          />
        </InputWrapper>
        <SendBtn
          onClick={sendMessage}
          $isActive={newMessage.trim() !== ''}
        >
          <Icon fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
          </Icon>
        </SendBtn>
      </InputContainer>
    </StyledInputArea>
  );
};

export default InputArea;