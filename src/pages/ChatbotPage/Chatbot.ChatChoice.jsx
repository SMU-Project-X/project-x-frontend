import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    PageWrapper,
    MainContainer,
    TitleSection,
    CharactersSection,
    CharacterCard,
    CharacterAvatar,
    CharacterImg,
    CharacterName,
    CharacterRole,
    CTASection,
    CTAText,
    NextBtn
} from './styled/ChatChoice'; // 스타일을 별도의 파일에서 가져옴

// 멤버 데이터 배열
const members = [
    { id: 'Arin', name: '아린', personality: '시크함,귀여움', image: '../src/assets/images/ChatbotPage/Arin.png' },
    { id: 'Daon', name: '다온', personality: '상냥함,사랑스러움', image: '../src/assets/images/ChatbotPage/Daon.png' },
    { id: 'Chaeun', name: '채윤', personality: '카리스마,열정', image: '../src/assets/images/ChatbotPage/Chaeun.png' },
    { id: 'Sein', name: '세인', personality: '지성미, 장난기', image: '../src/assets/images/ChatbotPage/Sein.png' },
];

function ChatChoice() {
    const [selectedMemberId, setSelectedMemberId] = useState(null);

    const handleSelect = (memberId) => {
        setSelectedMemberId(memberId);
    };

    return (
        <PageWrapper>
            <MainContainer>
                <TitleSection>
                    <h1>✨ We Are Fixie ✨</h1>
                </TitleSection>
                <CharactersSection>
                    {members.map(member => (
                        <CharacterCard 
                            key={member.id}
                            className={selectedMemberId === member.id ? 'selected' : ''}
                            onClick={() => handleSelect(member.id)}
                        >
                            <CharacterAvatar>
                                <CharacterImg src={member.image} alt={member.name} />
                            </CharacterAvatar>
                            <CharacterName>{member.name}</CharacterName>
                            <CharacterRole>{member.personality}</CharacterRole>
                        </CharacterCard>
                    ))}
                </CharactersSection>
                <CTASection>
                    <CTAText>함께 대화하고 싶은 멤버를 골라 주세요!</CTAText>
                    <Link to={selectedMemberId ? `/ChatApp/${selectedMemberId}` : '#'}>
                        <NextBtn disabled={!selectedMemberId}>
                            다음 ➤
                        </NextBtn>
                    </Link>
                </CTASection>
            </MainContainer>
        </PageWrapper>
    );
}

export default ChatChoice;

