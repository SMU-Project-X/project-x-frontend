import React from "react";
import * as S from "@/pages/SignUpPage/styled/SignUpPage.CompletePage.style";

const CompletePage = () => {
    const goToHome = () => {
        alert("홈으로 이동합니다.");
        window.location.href = "/";
    };

    return (
        <S.Body>
            {/* 별 장식 */}
            <S.Star className="star-1" />
            <S.Star className="star-2" />
            <S.Star className="star-3" />
            <S.Star className="star-4" />
            <S.Star className="star-5" />
            <S.Star className="star-6" />
            <S.Star className="star-7" />
            <S.Star className="star-8" />
            <S.Star className="star-9" />
            <S.Star className="star-10" />

            <S.SignupWrapper>
                <S.SignupContainer>
                    <S.PageTitle>가입 완료!</S.PageTitle>
                    <S.Subtitle>PROJECT-X에 오신 걸 환영합니다.</S.Subtitle>
                    <S.ButtonPrimary onClick={goToHome}>홈으로 가기</S.ButtonPrimary>
                </S.SignupContainer>
            </S.SignupWrapper>
        </S.Body>
    );
};

export default CompletePage;
