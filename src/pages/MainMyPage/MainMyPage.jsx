import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as itemS from '@/pages/MainMyPage/styled/MainMyPage.style';
import { selectedCharactersState } from '@/recoil/characterAtom';
import { characters } from '@/assets/data/characters';
import { traits } from '@/assets/data/traits';
import { mbtiOptions } from '@/assets/data/mbtiOptions';

const TRAIT_SLOTS = 2;

// traits 배열을 항상 길이 3으로 보정
const ensureTraits = (list = []) => {
  const next = [...list];
  while (next.length < 3) next.push(null);
  return next.slice(0, 3);
};

const ensureSlotShape = (slot = {}) => ({
  img: slot?.img ?? null,
  name: slot?.name ?? null,
  traits: ensureTraits(slot?.traits ?? []),
  mbti: slot?.mbti ?? null,
});

function MainMyPage() {
  const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);
  const [dialog, setDialog] = useState({ slotIndex: null, mode: null, traitIndex: null });
  const navigate = useNavigate();

  const normalizedSlots = useMemo(
    () => selectedCharacters.map(ensureSlotShape),
    [selectedCharacters]
  );

  const characterUsage = useMemo(
    () =>
      normalizedSlots
        .map((slot, idx) => (slot?.name ? { name: slot.name, index: idx } : null))
        .filter(Boolean),
    [normalizedSlots]
  );

  const traitUsage = useMemo(() => {
    const usage = [];
    normalizedSlots.forEach((slot, slotIdx) => {
      ensureTraits(slot?.traits).forEach((traitName, traitIdx) => {
        if (traitName) usage.push({ traitName, slotIdx, traitIdx });
      });
    });
    return usage;
  }, [normalizedSlots]);

  const openCharacterModal = (slotIndex) => setDialog({ slotIndex, mode: 'character', traitIndex: null });
  const openTraitModal = (slotIndex, traitIndex) => setDialog({ slotIndex, mode: 'trait', traitIndex });
  const closeDialog = () => setDialog({ slotIndex: null, mode: null, traitIndex: null });

  const handleSave = () => {
    setSelectedCharacters(normalizedSlots.map(ensureSlotShape));
    closeDialog();
    navigate('/home');
  };

  const handleCharacterSelect = (character) => {
    if (dialog.slotIndex === null) return;
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== dialog.slotIndex) return slot;
        const base = ensureSlotShape(slot);
        const preservedTail = base.traits.slice(TRAIT_SLOTS);
        const resetTraits = [...Array(TRAIT_SLOTS).fill(null), ...preservedTail];
        return {
          ...base,
          ...character,
          img: character.img ?? null,
          name: character.name ?? null,
          traits: resetTraits,
          mbti: null,
        };
      })
    );
    closeDialog();
  };

  const handleClearSlot = (slotIndex) => {
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => (idx === slotIndex ? ensureSlotShape({}) : slot))
    );
  };

  const handleTraitSelect = (traitName) => {
    if (dialog.slotIndex === null || dialog.traitIndex === null) return;
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== dialog.slotIndex) return slot;
        const base = ensureSlotShape(slot);
        const nextTraits = [...base.traits];
        nextTraits[dialog.traitIndex] = traitName;
        return { ...base, traits: nextTraits };
      })
    );
    closeDialog();
  };

  const handleTraitClear = (slotIndex, traitIndex) => {
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== slotIndex) return slot;
        const base = ensureSlotShape(slot);
        const nextTraits = [...base.traits];
        nextTraits[traitIndex] = null;
        return { ...base, traits: nextTraits };
      })
    );
  };

  const openMbtiModal = (slotIndex) => setDialog({ slotIndex, mode: 'mbti', traitIndex: null });

  const handleMbtiSelect = (mbti) => {
    if (dialog.slotIndex === null) return;
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== dialog.slotIndex) return slot;
        const base = ensureSlotShape(slot);
        return { ...base, mbti };
      })
    );
    closeDialog();
  };

  const handleMbtiClear = (slotIndex) => {
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== slotIndex) return slot;
        const base = ensureSlotShape(slot);
        return { ...base, mbti: null };
      })
    );
  };


  return (
    <itemS.MainMyPageContainer>
      <itemS.PageHeader>
        <itemS.PageTitle>멤버 선택</itemS.PageTitle>
        <itemS.PageSubtitle>
          멤버와 성격 2개를 수정
        </itemS.PageSubtitle>
      </itemS.PageHeader>

      <itemS.SlotsGrid>
        {normalizedSlots.map((slot, idx) => {
          const traitsForSlot = ensureTraits(slot?.traits).slice(0, TRAIT_SLOTS);
          const slotLabel = `슬롯 ${idx + 1}`;
          return (
            <itemS.SlotCard key={idx}>
              <itemS.SlotHeader>
                <div>
                  <itemS.SlotTitle>{slotLabel}</itemS.SlotTitle>
                  <itemS.SlotSubtitle>{slot?.name || '선택된 멤버 없음'}</itemS.SlotSubtitle>
                </div>
                {slot?.img ? (
                  <itemS.Avatar src={slot.img} alt={slot?.name || '선택된 멤버'} />
                ) : (
                  <itemS.EmptyAvatar>?</itemS.EmptyAvatar>
                )}
              </itemS.SlotHeader>

              <itemS.CardSection>
                <itemS.SectionTitle>멤버</itemS.SectionTitle>
                <itemS.ButtonRow>
                  <itemS.PrimaryButton type="button" onClick={() => openCharacterModal(idx)}>
                    멤버 선택
                  </itemS.PrimaryButton>
                  <itemS.SecondaryButton type="button" onClick={() => handleClearSlot(idx)}>
                    초기화
                  </itemS.SecondaryButton>
                </itemS.ButtonRow>
              </itemS.CardSection>

              <itemS.CardSection>
                <itemS.SectionTitle>성격</itemS.SectionTitle>
                <itemS.TagGrid>
                  {traitsForSlot.map((traitName, traitIdx) => (
                    <itemS.TagSlot key={traitIdx}>
                      <itemS.TagLabel>성격 {traitIdx + 1}</itemS.TagLabel>
                      <itemS.TraitButton type="button" onClick={() => openTraitModal(idx, traitIdx)}>
                        {traitName || '태그 선택'}
                      </itemS.TraitButton>
                      {traitName && (
                        <itemS.ClearTagButton type="button" onClick={() => handleTraitClear(idx, traitIdx)}>
                          제거
                        </itemS.ClearTagButton>
                      )}
                    </itemS.TagSlot>
                  ))}
                </itemS.TagGrid>
              </itemS.CardSection>

              <itemS.CardSection>
                <itemS.SectionTitle>MBTI</itemS.SectionTitle>
                <itemS.TagGrid>
                  <itemS.TagSlot>
                    <itemS.TagLabel>MBTI</itemS.TagLabel>
                    <itemS.TraitButton type="button" onClick={() => openMbtiModal(idx)}>
                      {slot?.mbti || 'MBTI 선택'}
                    </itemS.TraitButton>
                    {slot?.mbti && (
                      <itemS.ClearTagButton type="button" onClick={() => handleMbtiClear(idx)}>
                        제거
                      </itemS.ClearTagButton>
                    )}
                  </itemS.TagSlot>
                </itemS.TagGrid>
              </itemS.CardSection>
            </itemS.SlotCard>
          );
        })}
      </itemS.SlotsGrid>

      <itemS.PageFooter>
        <itemS.SaveButton type="button" onClick={handleSave}>
          저장
        </itemS.SaveButton>
      </itemS.PageFooter>

      <CharacterModal
        open={dialog.mode === 'character'}
        onClose={closeDialog}
        onSelect={handleCharacterSelect}
        slotIndex={dialog.slotIndex}
        characterUsage={characterUsage}
        currentName={dialog.slotIndex !== null ? normalizedSlots[dialog.slotIndex]?.name || null : null}
      />

      <MbtiModal
        open={dialog.mode === 'mbti'}
        onClose={closeDialog}
        onSelect={handleMbtiSelect}
        currentMbti={
          dialog.slotIndex !== null ? normalizedSlots[dialog.slotIndex]?.mbti ?? null : null
        }
      />

      <TraitModal
        open={dialog.mode === 'trait'}
        onClose={closeDialog}
        onSelect={handleTraitSelect}
        slotIndex={dialog.slotIndex}
        traitIndex={dialog.traitIndex}
        traitUsage={traitUsage}
        currentTrait={
          dialog.slotIndex !== null && dialog.traitIndex !== null
            ? ensureTraits(normalizedSlots[dialog.slotIndex]?.traits)[dialog.traitIndex]
            : null
        }
      />
    </itemS.MainMyPageContainer>
  );
}

function CharacterModal({ open, onClose, onSelect, slotIndex, characterUsage, currentName }) {
  if (!open) return null;

  const isUsedElsewhere = (name) => characterUsage.some((entry) => entry.name === name && entry.index !== slotIndex);

  return (
    <itemS.ModalOverlay>
      <itemS.ModalContent>
        <itemS.ModalHeader>
          <itemS.ModalTitle>멤버 선택</itemS.ModalTitle>
          <itemS.CloseButton type="button" onClick={onClose}>
            닫기
          </itemS.CloseButton>
        </itemS.ModalHeader>
        <itemS.ModalList>
          {characters.map((character) => {
            const disabled = isUsedElsewhere(character.name);
            const isActive = currentName === character.name;
            return (
              <itemS.ModalListItem key={character.name}>
                <itemS.CharacterButton
                  type="button"
                  disabled={disabled}
                  $active={isActive}
                  onClick={() => onSelect(character)}
                >
                  <itemS.CharacterInfo>
                    <itemS.CharacterName>{character.name}</itemS.CharacterName>
                    {character.original && <itemS.CharacterMeta>{character.original}</itemS.CharacterMeta>}
                  </itemS.CharacterInfo>
                  <itemS.CharacterThumb>
                    {character.img ? <img src={character.img} alt={character.name} /> : <span>이미지 없음</span>}
                  </itemS.CharacterThumb>
                </itemS.CharacterButton>
                {disabled && <itemS.HelperText>이미 사용 중인 멤버입니다.</itemS.HelperText>}
              </itemS.ModalListItem>
            );
          })}
        </itemS.ModalList>
      </itemS.ModalContent>
    </itemS.ModalOverlay>
  );
}

function MbtiModal({ open, onClose, onSelect, currentMbti }) {
  if (!open) return null;

  return (
    <itemS.ModalOverlay>
      <itemS.ModalContent>
        <itemS.ModalHeader>
          <itemS.ModalTitle>MBTI 선택</itemS.ModalTitle>
          <itemS.CloseButton type="button" onClick={onClose}>
            닫기
          </itemS.CloseButton>
        </itemS.ModalHeader>
        <itemS.ModalList>
          {mbtiOptions.map((option) => (
            <itemS.ModalListItem key={option}>
              <itemS.ModalButton
                type="button"
                $active={currentMbti === option}
                onClick={() => onSelect(option)}
              >
                {option}
              </itemS.ModalButton>
            </itemS.ModalListItem>
          ))}
        </itemS.ModalList>
      </itemS.ModalContent>
    </itemS.ModalOverlay>
  );
}

function TraitModal({ open, onClose, onSelect, slotIndex, traitIndex, traitUsage, currentTrait }) {
  if (!open || slotIndex === null || traitIndex === null) return null;

  const isUsedElsewhere = (name) =>
    traitUsage.some((entry) => entry.traitName === name && !(entry.slotIdx === slotIndex && entry.traitIdx === traitIndex));

  return (
    <itemS.ModalOverlay>
      <itemS.ModalContent>
        <itemS.ModalHeader>
          <itemS.ModalTitle>태그 선택</itemS.ModalTitle>
          <itemS.CloseButton type="button" onClick={onClose}>
            닫기
          </itemS.CloseButton>
        </itemS.ModalHeader>
        <itemS.ModalList>
          {traits.map((traitName) => {
            const disabled = isUsedElsewhere(traitName);
            const isActive = currentTrait === traitName;
            return (
              <itemS.ModalListItem key={traitName}>
                <itemS.ModalButton
                  type="button"
                  disabled={disabled}
                  $active={isActive}
                  onClick={() => onSelect(traitName)}
                >
                  {traitName}
                </itemS.ModalButton>
                {disabled && <itemS.HelperText>이미 다른 슬롯에서 사용 중입니다.</itemS.HelperText>}
              </itemS.ModalListItem>
            );
          })}
        </itemS.ModalList>
      </itemS.ModalContent>
    </itemS.ModalOverlay>
  );
}

export default MainMyPage;
