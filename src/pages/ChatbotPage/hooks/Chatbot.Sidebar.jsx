import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar as StyledSidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarTitleText,
  ContactsList,
  ContactItem,
  ContactContent,
  ContactAvatar,
  ContactInfo,
  ContactName,
  ContactMessage,
  ContactTime,
  UnreadDot,
  AvatarImg,
  LinkNoStyle
} from '../styled/ChatApp.js';

const Sidebar = ({ contacts, selectedChat }) => {
  return (
    <StyledSidebar>
      <SidebarHeader>
        <SidebarTitle>
          <span>💬</span>
          <SidebarTitleText>대화 상대 선택</SidebarTitleText>
        </SidebarTitle>
      </SidebarHeader>
      <ContactsList>
        {contacts.map((contact) => (
          <Link to={`/ChatApp/${contact.englishName}`} key={contact.englishName}>
            <ContactItem $isActive={selectedChat.englishName === contact.englishName}>
              <ContactContent>
                <ContactAvatar>
                  <AvatarImg size="48px" src={contact.avatarUrl} alt={`${contact.name} Avatar`} />
                </ContactAvatar>
                <ContactInfo>
                  <ContactName>{contact.name}</ContactName>
                  <ContactMessage>{contact.lastMessage}</ContactMessage>
                </ContactInfo>
                <ContactTime>{contact.time}</ContactTime>
                {contact.unread && <UnreadDot />}
              </ContactContent>
            </ContactItem>
          </Link>
        ))}
      </ContactsList>
    </StyledSidebar>
  );
};

export default Sidebar;