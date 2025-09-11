import React from 'react';
import { Link } from 'react-router-dom';

function CTASection({ S, selectedMemberId }) {
    return (
        <S.CTASection>
            <S.CTAText>함께 대화하고 싶은 멤버를 골라 주세요!</S.CTAText>
            <Link to={selectedMemberId ? `/ChatApp/${selectedMemberId}` : '#'}>
                <S.NextBtn disabled={!selectedMemberId}>
                    다음 ➤
                </S.NextBtn>
            </Link>
        </S.CTASection>
    );
}

export default CTASection;