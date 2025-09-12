import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './hooks/Chatbot.Sidebar';
import ChatHeader from './hooks/Chatbot.ChatHeader';
import MessageArea from './hooks/Chatbot.MessageArea';
import InputArea from './hooks/Chatbot.InputArea';
import { findContactByNameOrEnglish } from './utils/helpers';
import {
    Container, Header, NavContainer, Logo, NavMenu, NavItem, LoginBtn,
    ChatMainContainer, ChatArea
} from './styled/ChatApp.js';

const ChatApp = () => {
    const { chatName } = useParams();

    const [contacts, setContacts] = useState([
        {
            name: '아린',
            englishName: 'Arin',
            lastMessage: '안녕하세요! 아린입니다. 오늘 하루 어떠셨나요?',
            time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}),
            avatarUrl: '../src/assets/images/ChatbotPage/Arin.png',
            messages: [{ id: 1, text: '안녕하세요! 아린입니다. 오늘 하루 어떠셨나요?', sender: 'Arin', 
                time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}) },],
            likes: 0,
            dislikes: 0, // dislikes 속성 추가
            isLiked: false,
            isDisliked: false, // isDisliked 속성 추가
            
        },
        {
            name: '다온',
            englishName: 'Daon',
            lastMessage: '안녕하세요! 다온입니다. 오늘 하루 어떠셨나요?',
            time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}),
            avatarUrl: '../src/assets/images/ChatbotPage/Daon.png' ,
            messages: [{ id: 1, text: '안녕하세요! 다온입니다. 오늘 하루 어떠셨나요?', sender: 'Daon', 
                time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}) }],
            likes: 0,
            dislikes: 0, // dislikes 속성 추가
            isLiked: false,
            isDisliked: false, // isDisliked 속성 추가
        },
        {
            name: '채윤',
            englishName: 'Chaeun',
            lastMessage: '안녕하세요! 채윤입니다. 오늘 하루 어떠셨나요?',
            time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}),
            avatarUrl: '../src/assets/images/ChatbotPage/Chaeun.png',
            messages: [{ id: 1, text: '안녕하세요! 채윤입니다. 오늘 하루 어떠셨나요?', sender: 'Chaeun', 
                time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}) }],
            likes: 0,
            dislikes: 0, // dislikes 속성 추가
            isLiked: false,
            isDisliked: false, // isDisliked 속성 추가
        },
        {
            name: '세인',
            englishName: 'Sein',
            lastMessage: '안녕하세요! 세인입니다. 오늘 하루 어떠셨나요?',
            time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}),
            avatarUrl: '../src/assets/images/ChatbotPage/Sein.png',
            messages: [{ id: 1, text: '안녕하세요! 세인입니다. 오늘 하루 어떠셨나요?', sender: 'Sein', 
                time: new Date().toLocaleTimeString('ko-KR', {hour: '2-digit',minute: '2-digit',hour12: true}) }],
            likes: 0,
            dislikes: 0, // dislikes 속성 추가
            isLiked: false,
            isDisliked: false, // isDisliked 속성 추가
        }
    ]);
    
    const [selectedChat, setSelectedChat] = useState(() => {
        const defaultChat = findContactByNameOrEnglish(contacts, chatName);
        return defaultChat || contacts[0];
    });
    
    const [newMessage, setNewMessage] = useState('');
    const [isActionsVisible, setIsActionsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const messagesEndRef = useRef(null);

    // sendMessage 함수
    const sendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: Date.now(),
                text: newMessage,
                sender: 'user',
                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }),
                likes: 0,
                dislikes: 0,
                isLiked: false,
                isDisliked: false,
            };
            setContacts(prev => {
                const updatedContacts = prev.map(contact => {
                    if (contact.englishName === selectedChat.englishName) {
                        const updatedChat = {
                            ...contact,
                            lastMessage: newMsg.text,
                            time: newMsg.time,
                            messages: [...contact.messages, newMsg]
                        };
                        setSelectedChat(updatedChat);
                        return updatedChat;
                    }
                    return contact;
                });
                return updatedContacts;
            });
            setNewMessage('');
            setIsLoading(true); // 메시지 전송 후 로딩 상태 활성화
            
            setTimeout(() => {
                const responses = [
                    '네! 좋은 질문이에요! 😊',
                    '그런 생각도 있네요! 재미있어요!',
                    '오늘도 즐거운 하루 보내세요! ✨',
                    '언제든 편하게 말씀해주세요!',
                    '같이 이야기할 수 있어서 좋아요! 💕'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                const botMsg = {
                    id: Date.now() + 1,
                    text: randomResponse,
                    sender: selectedChat.englishName,
                    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }),
                    likes: 0,
                    dislikes: 0,
                    isLiked: false,
                    isDisliked: false,
                };
                setContacts(prev => {
                    const updatedContacts = prev.map(contact => {
                        if (contact.englishName === selectedChat.englishName) {
                            const updatedChat = {
                                ...contact,
                                lastMessage: botMsg.text,
                                time: botMsg.time,
                                messages: [...contact.messages, botMsg],
                            };
                            setSelectedChat(updatedChat);
                            return updatedChat;
                        }
                        return contact;
                    });
                    return updatedContacts;
                });
                setIsLoading(false); // 봇 메시지 도착 후 로딩 상태 비활성화
            }, 1000 + Math.random() * 500);
        }
    };

    // sendAutoMessage 함수
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    
    const handleFeedback = (type) => {
        console.log(`${selectedChat.name}의 메시지에 ${type}를 눌렀습니다.`);
    };
    
    const toggleActions = () => {
        setIsActionsVisible(!isActionsVisible);
    };
    
    const autoResponses = {
        '안녕?': '안녕하세요! 만나서 반가워요! 😄',
        '잘지냈어?': '저는 아주 잘 지내고 있어요! 당신은 어떠신가요? ✨',
        '이야기해줘': '무슨 이야기가 하고 싶으세요? 무엇이든 말해주세요! 💬',
        '나 심심해..': '저도 심심했는데 잘됐네요! 우리 재미있는 이야기 해봐요! 😉'
    };

    const sendAutoMessage = (messageText) => {
        const newMsg = {
            id: Date.now(),
            text: messageText,
            sender: 'user',
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }),
            likes: 0,
            dislikes: 0,
            isLiked: false,
            isDisliked: false,
        };
        
        setContacts(prev => {
            const updatedContacts = prev.map(contact => 
                contact.englishName === selectedChat.englishName
                    ? { ...contact, lastMessage: newMsg.text, time: newMsg.time, messages: [...contact.messages, newMsg] }
                    : contact
            );
            setSelectedChat(updatedContacts.find(c => c.englishName === selectedChat.englishName));
            return updatedContacts;
        });
        setIsLoading(true); // 자동 메시지 전송 후 로딩 상태 활성화

        setTimeout(() => {
            const botResponseText = autoResponses[messageText] || '음.. 무슨 말인지 잘 모르겠어요.🤔';
            
            const botMsg = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: selectedChat.englishName,
                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true }),
                likes: 0,
                dislikes: 0,
                isLiked: false,
                isDisliked: false,
            };

            setContacts(prev => {
                const updatedContacts = prev.map(contact => {
                    if (contact.englishName === selectedChat.englishName) {
                        const updatedChat = {
                            ...contact,
                            lastMessage: botMsg.text,
                            time: botMsg.time,
                            messages: [...contact.messages, botMsg],
                        };
                        setSelectedChat(updatedChat);
                        return updatedChat;
                    }
                    return contact;
                });
                return updatedContacts;
            });
            setIsLoading(false); // 봇 메시지 도착 후 로딩 상태 비활성화
        }, 1000 + Math.random() * 500);
    };

    const handleToggleLike = (messageId) => {
        setContacts(prev => {
            return prev.map(contact => {
                if (contact.englishName === selectedChat.englishName) {
                    const updatedMessages = contact.messages.map(msg => {
                        if (msg.id === messageId) {
                            const dislikes = msg.isDisliked ? msg.dislikes - 1 : msg.dislikes;
                            return {
                                ...msg,
                                isLiked: !msg.isLiked,
                                likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1,
                                isDisliked: false,
                                dislikes: dislikes,
                            };
                        }
                        return msg;
                    });
                    const updatedChat = { ...contact, messages: updatedMessages };
                    setSelectedChat(updatedChat);
                    return updatedChat;
                }
                return contact;
            });
        });
    };

    const handleToggleDislike = (messageId) => {
        setContacts(prev => {
            return prev.map(contact => {
                if (contact.englishName === selectedChat.englishName) {
                    const updatedMessages = contact.messages.map(msg => {
                        if (msg.id === messageId) {
                            const likes = msg.isLiked ? msg.likes - 1 : msg.likes;
                            return {
                                ...msg,
                                isDisliked: !msg.isDisliked,
                                dislikes: msg.isDisliked ? msg.dislikes - 1 : msg.dislikes + 1,
                                isLiked: false,
                                likes: likes,
                            };
                        }
                        return msg;
                    });
                    const updatedChat = { ...contact, messages: updatedMessages };
                    setSelectedChat(updatedChat);
                    return updatedChat;
                }
                return contact;
            });
        });
    };

    useEffect(() => {
        const chatByUrl = findContactByNameOrEnglish(contacts, chatName);
        if (chatByUrl) {
            setSelectedChat(chatByUrl);
        }
    }, [chatName, contacts]);

    return (
        <Container>
            <Header>
                <NavContainer>
                    <Logo>Project - X</Logo>
                    <NavMenu>
                        <NavItem href="#">Home</NavItem>
                        <NavItem href="#">MD</NavItem>
                        <NavItem href="#">Community</NavItem>
                        <NavItem href="#">Content</NavItem>
                        <NavItem href="#" className="active">Chat</NavItem>
                    </NavMenu>
                    <LoginBtn href="#">
                        <span>👤</span>
                        로그인
                    </LoginBtn>
                </NavContainer>
            </Header>
            <ChatMainContainer>
                <Sidebar contacts={contacts} selectedChat={selectedChat} />
                <ChatArea>
                    <ChatHeader
                        selectedChat={selectedChat}
                        toggleActions={toggleActions}
                        isActionsVisible={isActionsVisible}
                        sendAutoMessage={sendAutoMessage}
                    />
                    <MessageArea
                        selectedChat={selectedChat}
                        contacts={contacts}
                        messagesEndRef={messagesEndRef}
                        onToggleLike={handleToggleLike}
                        onToggleDislike={handleToggleDislike}
                        isLoading={isLoading} // isLoading props 추가
                    />
                    <InputArea
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        sendMessage={sendMessage}
                        handleKeyPress={handleKeyPress}
                    />
                </ChatArea>
            </ChatMainContainer>
        </Container>
    );
};

export default ChatApp;