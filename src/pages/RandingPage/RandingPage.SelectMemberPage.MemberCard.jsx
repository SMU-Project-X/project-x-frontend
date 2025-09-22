import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.style';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';
import TraitsModal from '@/pages/RandingPage/RandingPage.SelectMemberPage.MemberCard.TraitsModal';

import QuestionMark from '@/assets/images/RandingPage/QuestionMark.png';

function MemberCard({ img, name, slotIndex }) {
    const [selectedCharacters] = useRecoilState(selectedCharactersState);
    const traits = selectedCharacters[slotIndex].traits; // Recoil 상태에서 직접 읽음
    const [type, setType] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [traitSlot, setTraitSlot] = useState(null);

    const handleOpenModal = (index, type = "trait") => {
        setTraitSlot(index); // trait 인덱스 or null(MBTI)
        setType(type);       // "trait" 또는 "mbti"
        setModalOpen(true);
    };

    return (
        <itemS.MemberCardContainer>
            <Link to={`/selectmember/view/${slotIndex}`}>
                <itemS.MemberImage src={img || QuestionMark} />
            </Link>

            <itemS.MemberPersonalContainer>
                {traits.map((trait, idx) => (
                    <itemS.MemeberPersonalWrapper
                        key={idx}
                        style={{
                            filter: trait ? 'none' : 'grayscale(50%)',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleOpenModal(idx, "trait")}
                    >
                        {trait || '???'}
                    </itemS.MemeberPersonalWrapper>
                ))}
                <itemS.MemeberPersonalWrapper onClick={() => handleOpenModal(null, "mbti")}>
                    {selectedCharacters[slotIndex].mbti || '???'}
                </itemS.MemeberPersonalWrapper>
            </itemS.MemberPersonalContainer>

            {/* 모달 */}
            <TraitsModal
                open={modalOpen}
                slotIndex={slotIndex}
                traitSlot={traitSlot}
                onClose={() => setModalOpen(false)}
                type={type}
            />
        </itemS.MemberCardContainer>
    );
}

export default MemberCard;
