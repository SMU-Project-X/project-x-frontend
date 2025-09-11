import styled from "styled-components";

// 전체 레이아웃
export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

// 헤더
export const Header = styled.header`
  background: linear-gradient(90deg, #4a9eff 0%, #6bb1ff 100%);
  color: white;
  padding: 12px 0;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Logo = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 32px;
`;

export const NavItem = styled.a`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  cursor: pointer;
  &.active {
    color: white;
    font-weight: 500;
  }
`;

export const LoginBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  & span {
    font-size: 18px;
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

export const LoginText = styled.span`
  font-size: 14px;
  color: #fff;
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

export const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #ff4d4f;
  border-radius: 50%;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
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