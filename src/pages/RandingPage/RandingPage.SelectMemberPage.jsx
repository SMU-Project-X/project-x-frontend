import { useState, useEffect } from 'react';
import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.style';
import MemberCard from '@/pages/RandingPage/RandingPage.SelectMemberPage.MemberCard';
import TraitsModal from '@/pages/RandingPage/RandingPage.SelectMemberPage.MemberCard.TraitsModal';
import PsyInlineControl from '@/pages/psychotest/PsyInlineControl';
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';
import { Link } from 'react-router-dom';

function SelectMemberPage() {
    const [openPsy, setOpenPsy] = useState(false);
    const [openTraitModal, setOpenTraitModal] = useState(false);
    const [currentSlotIndex, setCurrentSlotIndex] = useState(null);
    const [currentTraitIndex, setCurrentTraitIndex] = useState(null);

    const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);

    // 전역에서 이미 선택된 trait
    const selectedTraitsGlobally = selectedCharacters
        .flatMap(c => c.traits)
        .filter(Boolean);

    const handleOpenTraitsModal = (slotIndex, traitIndex) => {
        setCurrentSlotIndex(slotIndex);
        setCurrentTraitIndex(traitIndex);
        setOpenTraitModal(true);
    };

    useEffect(() => {
        console.log('현재 선택된 캐릭터:', selectedCharacters);
    }, [selectedCharacters]);

    return (
        <itemS.SelectMemberPageContainer>
            <itemS.TitleWappper>We are Fixie:</itemS.TitleWappper>

            <itemS.MiddleTitleWapper>{`미래 세계 'X' , 
            미래의 감정을 함께하는 네 소녀`}</itemS.MiddleTitleWapper>

            <itemS.contentWapper>
                {`그들은 인간의 미묘한 감정과 우연한 선택, 예측 불가한 반응에 매혹되어 있고, 
                각자의 방식으로 현실에 스며들어 새로운 색을 만들고자 한다. 
                Fixie는 그 파편이자 전령
—낯설지만 진심을 배우며 사람들 곁에 스며드는 존재다—`}
            </itemS.contentWapper>

            <itemS.SelectMemberContainer>
                <itemS.SelectMemberTopContainer>
                    <itemS.SelectMemeberTopText>원하는 캐릭터와 성격을 선택하세요</itemS.SelectMemeberTopText>

                    <itemS.PsychoContentContainer
                        role="button"
                        tabIndex={0}
                        onClick={() => setOpenPsy(true)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenPsy(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <itemS.PsychoContentText># 나랑 어울리는 최애는? #추천받기 </itemS.PsychoContentText>
                        <itemS.ArrowIcon />
                    </itemS.PsychoContentContainer>
                </itemS.SelectMemberTopContainer>

                <itemS.MembersContainer>
                    {selectedCharacters.map((char, i) => (
                        <MemberCard
                            key={i}
                            img={char.img}
                            name={char.name}
                            traits={char.traits}
                            slotIndex={i}
                            onTraitClick={(traitIndex) => handleOpenTraitsModal(i, traitIndex)}
                            disabledTraits={selectedTraitsGlobally}
                        />
                    ))}
                </itemS.MembersContainer>

                <itemS.SubmitBtnWrapper>
                    <Link to="/home">
                        <itemS.SubmitBtn>완료</itemS.SubmitBtn>
                    </Link>
                </itemS.SubmitBtnWrapper>
            </itemS.SelectMemberContainer>

            {/* Traits Modal */}
            <TraitsModal
                open={openTraitModal}
                slotIndex={currentSlotIndex}
                traitSlot={currentTraitIndex}
                onClose={() => setOpenTraitModal(false)}
            />

            {/* 인라인 심리테스트 모달 */}
            <PsyInlineControl open={openPsy} onClose={() => setOpenPsy(false)} />
        </itemS.SelectMemberPageContainer>
    );
}

export default SelectMemberPage;
