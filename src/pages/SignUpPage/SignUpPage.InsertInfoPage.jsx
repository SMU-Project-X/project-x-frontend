import React from "react";
import * as S from "@/pages/SignUpPage/styled/SignUpPage.InsertInfoPage.style";

function InsertInfoPage() {
    return (
        <>
            {/* <S.GlobalStyle /> */}
            <S.InfoPageContainer>
            <S.Wrapper>
                <S.NavButtons>
                    <S.NavBtn>약관 동의</S.NavBtn>
                    <S.NavBtn className="active">회원 정보</S.NavBtn>
                    <S.NavBtn>가입 완료</S.NavBtn>
                </S.NavButtons>

                <S.Container>
                    <S.Header>
                        <S.Title>PROJECT-X</S.Title>
                        <S.Subtitle>회원 정보 입력</S.Subtitle>
                        <hr />
                    </S.Header>

                    <form>
                        <S.FormGroup>
                            <label htmlFor="username">아이디</label>
                            <input id="username" placeholder="영문, 숫자 조합 4-16자" required />
                            <S.ErrorMessage>아이디는 4-16자의 영문, 숫자 조합이어야 합니다.</S.ErrorMessage>
                        </S.FormGroup>

                        <S.FormGroup>
                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" placeholder="영문, 숫자, 특수문자 조합 8자 이상" required />
                            <S.ErrorMessage>비밀번호는 8자 이상이어야 합니다.</S.ErrorMessage>
                        </S.FormGroup>

                        <S.FormGroup>
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <input type="password" id="confirmPassword" placeholder="비밀번호를 다시 입력해주세요" required />
                            <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
                        </S.FormGroup>

                        <S.FormGroup>
                            <label htmlFor="name">이름</label>
                            <input id="name" placeholder="실명을 입력하세요" required />
                        </S.FormGroup>

                        <S.FormGroup>
                            <label htmlFor="nickname">닉네임</label>
                            <input id="nickname" placeholder="※특수문자 입력 금지" required />
                        </S.FormGroup>

                        <S.FormRow>
                            <S.FormGroup>
                                <label htmlFor="birthdate">생년월일</label>
                                <input type="date" id="birthdate" required />
                            </S.FormGroup>
                            <S.FormGroup>
                                <label htmlFor="gender">성별</label>
                                <select id="gender" required>
                                    <option value="">선택해주세요</option>
                                    <option value="M">남성</option>
                                    <option value="F">여성</option>
                                </select>
                            </S.FormGroup>
                        </S.FormRow>

                        <S.FormGroup>
                            <label htmlFor="email">이메일</label>
                            <S.EmailVerification>
                                <input type="email" id="email" required />
                                <S.VerifyBtn type="button">인증 요청</S.VerifyBtn>
                            </S.EmailVerification>
                            <S.SuccessMessage>인증 메일이 발송되었습니다.</S.SuccessMessage>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.EmailVerification style={{ marginTop: "10px" }}>
                                <input type="text" id="verify-code" placeholder="인증번호 입력" />
                                <S.VerifyBtn type="button">인증 확인</S.VerifyBtn>
                            </S.EmailVerification>
                        </S.FormGroup>

                        <S.PrimaryBtn type="submit">다음</S.PrimaryBtn>
                    </form>
                </S.Container>
            </S.Wrapper>
            </S.InfoPageContainer>
        </>
    );
}

export default InsertInfoPage;
