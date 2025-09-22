import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.MemberCard.TraitsModal.style';
import { traits } from '@/assets/data/traits';
import { mbtiOptions } from '@/assets/data/mbtiOptions';
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';

function TraitsModal({ open, slotIndex, traitSlot, onClose, type }) {
    const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);

    // 현재 캐릭터의 traits만 확인
    const selectedTraitsLocally = selectedCharacters[slotIndex]?.traits?.filter(Boolean) ?? [];

    const handleSelect = (selected) => {
        // 같은 캐릭터 안에서 이미 선택된 trait라면 return
        if (type === "trait" && selectedTraitsLocally.includes(selected)) return;

        const updated = selectedCharacters.map((char, idx) => {
            if (idx !== slotIndex) return char;

            if (type === "trait") {
                return {
                    ...char,
                    traits: char.traits.map((t, tIdx) =>
                        tIdx === traitSlot ? selected : t
                    ),
                };
            } else {
                return { ...char, mbti: selected }; // MBTI 선택 반영
            }
        });

        setSelectedCharacters(updated);
        onClose();
    };
    if (!open) return null;

    return (
        <itemS.ModalOverlay>
            <itemS.ModalContent>
                {type === "trait" ? (
                    traits.map((traitName) => {
                        const disabled = selectedCharacters[slotIndex]?.traits?.includes(traitName) ?? false;
                        return (
                            <button
                                key={traitName}
                                disabled={disabled}
                                style={{ filter: disabled ? 'grayscale(100%)' : 'none', margin: '5px' }}
                                onClick={() => handleSelect(traitName)}
                            >
                                {traitName}
                            </button>
                        )
                    })
                ) : (
                    mbtiOptions.map((traitName) => {
                        return (
                            <button
                                key={traitName}
                                style={{ margin: '5px' }}
                                onClick={() => handleSelect(traitName)}
                            >
                                {traitName}
                            </button>
                        )
                    })
                )}
                <button onClick={onClose}>취소</button>
            </itemS.ModalContent>
        </itemS.ModalOverlay>
    )
}

export default TraitsModal;
