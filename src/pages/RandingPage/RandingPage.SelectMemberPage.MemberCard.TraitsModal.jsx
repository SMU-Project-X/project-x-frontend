import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.MemberCard.TraitsModal.style';
import { traits } from '@/assets/data/traits';
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';

function TraitsModal({ open, slotIndex, traitSlot, onClose }) {
    const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);

    // 전역에서 이미 선택된 trait
    const selectedTraitsGlobally = selectedCharacters
        .flatMap(c => c.traits)
        .filter(Boolean);

    const handleSelect = (trait) => {
    // 이미 다른 슬롯에서 선택된 trait는 return
    if (selectedTraitsGlobally.includes(trait)) return;

    // 불변성 지키기: 배열과 객체를 새로 복사
    const updated = selectedCharacters.map((char, idx) => {
        if (idx !== slotIndex) return char;
        return {
            ...char,
            traits: char.traits.map((t, tIdx) =>
                tIdx === traitSlot ? trait : t
            )
        };
    });

    setSelectedCharacters(updated);
    onClose();
};
    if (!open) return null;

    return (
        <itemS.ModalOverlay>
            <itemS.ModalContent>
                {traits.map((traitName) => {
                    const disabled = selectedTraitsGlobally.includes(traitName);
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
                })}
                <button onClick={onClose}>취소</button>
            </itemS.ModalContent>
        </itemS.ModalOverlay>
    )
}

export default TraitsModal;
