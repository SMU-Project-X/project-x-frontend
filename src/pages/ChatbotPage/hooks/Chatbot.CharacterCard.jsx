import React from 'react';

function CharacterCard({ S, member, isSelected, onSelect }) {
    return(
        <S.CharacterCard
            className={isSelected ? 'selected' : ''}
            onClick={() => onSelect(member.id)}
        >
            <S.CharacterAvatar>
                <S.CharacterImg src={member.image} alt={member.name} />
            </S.CharacterAvatar>
            <S.CharacterName>{member.name}</S.CharacterName>
            <S.CharacterRole>{member.role}</S.CharacterRole>
        </S.CharacterCard>
    );
}

export default CharacterCard;