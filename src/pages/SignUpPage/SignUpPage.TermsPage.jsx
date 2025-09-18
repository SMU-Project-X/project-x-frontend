// src/pages/Signup/TermsPage.jsx
import React, { useState, useEffect } from "react";
import * as S from "@/pages/SignUpPage/styled/SignUpPage.TermsPage.style";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
    const navigate = useNavigate();
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);
    const [error, setError] = useState(false);

    const allChecked = agreeTerms && agreePrivacy && agreeMarketing;
    const requiredChecked = agreeTerms && agreePrivacy;

    const toggleAll = () => {
        const newValue = !(agreeTerms && agreePrivacy && agreeMarketing);
        setAgreeTerms(newValue);
        setAgreePrivacy(newValue);
        setAgreeMarketing(newValue);
    };

    useEffect(() => {
        setError(!requiredChecked);
    }, [agreeTerms, agreePrivacy]);

    return (
        <>
            <S.GlobalStyle />
            <S.Wrapper>
                <S.NavButtons>
                    <S.NavBtn className="active">약관 동의</S.NavBtn>
                    <S.NavBtn>회원 정보</S.NavBtn>
                    <S.NavBtn>가입 완료</S.NavBtn>
                </S.NavButtons>

                <S.Container>
                    <S.Header>
                        <S.PageTitle>PROJECT-X</S.PageTitle>
                        <S.Subtitle>회원가입</S.Subtitle>
                        <br />
                        <hr />
                    </S.Header>

                    <S.TermsAgreement>
                        <S.CheckboxGroup>
                            <input
                                id="agreeAll"
                                type="checkbox"
                                checked={allChecked}
                                onChange={toggleAll}
                            />
                            <label htmlFor="agreeAll">전체 동의</label>
                        </S.CheckboxGroup>
                        <S.CheckboxGroup>
                            <input
                                id="agreeTerms"
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                            />
                            <label htmlFor="agreeTerms" className="required">
                                이용약관 동의 (필수)
                            </label>
                        </S.CheckboxGroup>
                        <S.CheckboxGroup>
                            <input
                                id="agreePrivacy"
                                type="checkbox"
                                checked={agreePrivacy}
                                onChange={() => setAgreePrivacy(!agreePrivacy)}
                            />
                            <label htmlFor="agreePrivacy" className="required">
                                개인정보 처리방침 동의 (필수)
                            </label>
                        </S.CheckboxGroup>
                        <S.CheckboxGroup>
                            <input
                                id="agreeMarketing"
                                type="checkbox"
                                checked={agreeMarketing}
                                onChange={() => setAgreeMarketing(!agreeMarketing)}
                            />
                            <label htmlFor="agreeMarketing" className="optional">
                                마케팅 정보 수신 동의 (선택)
                            </label>
                        </S.CheckboxGroup>
                    </S.TermsAgreement>

                    <S.ErrorMessage show={error}>
                        필수 약관에 모두 동의해주세요.
                    </S.ErrorMessage>

                    <S.Button type="button" disabled={!requiredChecked} onClick={()=>navigate("/signup/info")}>
                        다음
                    </S.Button>
                </S.Container>
            </S.Wrapper>
        </>
    );
}
