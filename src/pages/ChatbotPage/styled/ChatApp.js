import styled from "styled-components";

// 전체 레이아웃
export const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

// 스타일이 적용된 컴포넌트들
export const Header = styled.header`
    background: linear-gradient(90deg, #64b5f6 0%, #42a5f5 50%, #2196f3 100%);
    padding: 15px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    height: 60px;
`;

export const NavContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

export const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

export const NavMenu = styled.nav`
    display: flex;
    gap: 40px;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.a`
    color: white;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.3s ease;
    &:hover {
        color: #e1f5fe;
    }
`;

export const LoginBtn = styled.a`
    background: rgba(255,255,255,0.2);
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    text-decoration: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s ease;
    &:hover {
        background: rgba(255,255,255,0.3);
    }
`;

export const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

// 메인 컨테이너
export const ChatMainContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
`;

// 사이드바
export const Sidebar = styled.div`
  width: 320px;
  background-color: #f8fafb;
  border-right: 1px solid #e5e7eb;
  margin-left: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
`;

export const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
`;

export const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SidebarTitleText = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0;
`;

export const ContactsList = styled.div`
  overflow-y: auto;
  height: calc(100% - 80px);
`;

export const ContactItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s;
  ${(props) => props.$isActive && `
    background-color: #ebf8ff;
  `}
`;

export const ContactContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ContactAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e5e7eb;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

export const ContactInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ContactName = styled.div`
  font-weight: 500;
  color: #111827;
  font-size: 14px;
  margin-bottom: 2px;
`;

export const ContactMessage = styled.div`
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContactTime = styled.div`
  font-size: 12px;
  color: #9ca3af;
  flex-shrink: 0;
`;

// 채팅 영역
export const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f0f8ff;
  margin-right: 0;
`;

export const ChatHeader = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f0f8ff;
`;

export const ChatHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ChatUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

export const ChatUsername = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin: 0;
`;

export const ChatActions = styled.div`
  display: flex;
  gap: 24px;
`;

export const ActionBtn = styled.button`
  padding: 6px 16px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  background: white;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 15px 0;
`;

// 메시지 영역
export const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  background-color: #fafafa;
`;

export const DateDivider = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const DateBtn = styled.button`
  padding: 6px 16px;
  border-radius: 20px;
  background-color: #6b7280;
  color: white;
  font-size: 12px;
  border: none;
  cursor: pointer;
`;

export const DateText = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-top: 10px;
`;

export const Message = styled.div`
  display: flex;
  margin-bottom: 16px;
  ${(props) => props.$isUser && ` // $isUser로 변경
    justify-content: flex-end;
  `}
`;

export const MessageContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 400px;
  ${(props) => props.$isUser && `
    flex-direction: row-reverse;
  `}
`;

export const MessageAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e5e7eb;
  flex-shrink: 0;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

export const MessageSenderName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
  margin-left: 5px;
`;

export const MessageBubble = styled.div`
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 1.4;
  white-space: pre-wrap;
  ${(props) => props.$isUser ? `
    background: #FDE047;
    border: 1px solid #FDE047;
    color: #000;
    border-bottom-right-radius: 4px;
  ` : `
    background: white;
    border: 1px solid #E5E7EB;
    color: #111827;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  `}
`;

export const MessageTime = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
  ${(props) => props.$isUser && `
    text-align: right;
  `}
`;

// 인풋 영역
export const InputArea = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

export const AddBtn = styled.button`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;
  border: none;
  background: none;
`;

export const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const MessageInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
`;

export const SendBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  ${(props) => props.$isActive ? `
    background-color: #FDE047;
  ` : `
    background-color: #E5E7EB;
  `}
`;

// 추가 스타일
export const MessageFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

export const LikeDislikeButtons = styled.div`
  display: flex;
  gap: 2px;
`;

export const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 2px;
`;
export const DislikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 2px;
`;

export const LinkNoStyle = styled.div`
  text-decoration: none;
  color: inherit;
`;

// 아바타 이미지 컴포넌트 하나로 통합
export const AvatarImg = styled.img`
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

export const Icon = styled.svg`
  width: 16px;
  height: 16px;
`;

export const IconLg = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 0;
`;