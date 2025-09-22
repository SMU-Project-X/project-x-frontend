import React, { useEffect, useState } from "react";
import * as S from "@/pages/SignUpPage/styled/SignUpPage.InsertInfoPage.style";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';

function InsertInfoPage() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState(0);
    const [sendCode, setSendCode] = useState(false);
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [checkCode, setCheckCode] = useState(false);
    const [checkCodeMessage, setCheckCodeMessage] = useState("");
    const [checkCodeStatus, setCheckCodeStatus] = useState(false);

    const [selectedCharacters] = useRecoilState(selectedCharactersState);

    // 유효성 검사 함수
    const isValidUserId = /^[a-zA-Z0-9]{4,16}$/.test(userId);
    const isValidPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/.test(password);
    const isPasswordMatch = password === confirmPassword;


    const handleSubmit = (e) => {

        e.preventDefault();

        // 조건 체크
        if (!isValidUserId) {
            alert("아이디는 4-16자의 영문, 숫자 조합이어야 합니다.");
            return;
        }
        if (!isValidPassword) {
            alert("비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.");
            return;
        }
        if (!isPasswordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!userName || !nickname || !age || !email) {
            alert("모든 필드를 입력해야 합니다.");
            return;
        }
        if (!checkCode || !checkCodeStatus) {
            alert("이메일 인증을 완료해야 합니다.");
            return;
        }

        console.log('전송 payload:', { userId, userName, nickname, age, email, selectedCharacters });

        fetch("/api/signup/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, userName, nickname, password, age, email, selectedCharacters }),
        })
            .then((res) => res.text())
            .then((data) => { console.log("응답:", data); })
            .catch((err) => console.error(err));
            
        navigate("/signup/complete");
    };

    const handleSendEmail = (e) => {
        e.preventDefault();

        fetch("/api/signup/emailSend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.text())
            .then((data) => { console.log("응답:", data); setSendCode(true); })
            .catch((err) => console.error(err));
    };

    const handelCheckCode = (e) => {
        e.preventDefault();

        fetch("/api/signup/emailVerify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, verifyCode })
        })
            .then((res) => res.json())   // JSON으로 바꾸기
            .then((data) => {
                console.log("응답:", data);
                setCheckCode(true);
                setCheckCodeMessage(data.message);
                if (data.status == "success") {
                    setCheckCodeStatus(true);
                }
            })
        
        
    }

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
                                <input id="username" placeholder="영문, 숫자 조합 4-16자" required onChange={(e) => setUserId(e.target.value)} />
                                {!isValidUserId && userId.length > 0 && (
                                    <S.ErrorMessage>아이디는 4-16자의 영문, 숫자 조합이어야 합니다.</S.ErrorMessage>
                                )}
                            </S.FormGroup>

                            <S.FormGroup>
                                <label htmlFor="password">비밀번호</label>
                                <input type="password" id="password" placeholder="영문, 숫자, 특수문자 조합 8자 이상" required onChange={(e) => setPassword(e.target.value)} />
                                {!isValidPassword && password.length > 0 && (
                                    <S.ErrorMessage>비밀번호는 영문, 숫자, 특수문자 조합 8자 이상이어야 합니다.</S.ErrorMessage>
                                )}
                            </S.FormGroup>

                            <S.FormGroup>
                                <label htmlFor="confirmPassword">비밀번호 확인</label>
                                <input type="password" id="confirmPassword" placeholder="비밀번호를 다시 입력해주세요" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                {!isPasswordMatch && confirmPassword.length > 0 && (
                                    <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
                                )}
                            </S.FormGroup>

                            <S.FormGroup>
                                <label htmlFor="name">이름</label>
                                <input id="name" placeholder="실명을 입력하세요" required onChange={(e) => setUserName(e.target.value)} />
                            </S.FormGroup>

                            <S.FormGroup>
                                <label htmlFor="nickname">닉네임</label>
                                <input id="nickname" placeholder="※특수문자 입력 금지" required onChange={(e) => setNickname(e.target.value)} />
                            </S.FormGroup>

                            <S.FormRow>
                                <S.FormGroup>
                                    <label htmlFor="age">나이</label>
                                    <input type="text" id="age" required value={age} onChange={(e) => setAge(e.target.value)} />
                                </S.FormGroup>
                                {/* <S.FormGroup>
                                    <label htmlFor="gender">성별</label>
                                    <select id="gender" required value={gender} onChange={(e) => setGender(e.target.value)} >
                                        <option value="">선택해주세요</option>
                                        <option value="남성">남성</option>
                                        <option value="여성">여성</option>
                                    </select>
                                </S.FormGroup> */}
                            </S.FormRow>

                            <S.FormGroup>
                                <label htmlFor="email">이메일</label>
                                <S.EmailVerification>
                                    <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                    <S.VerifyBtn type="button" onClick={handleSendEmail}>인증 요청</S.VerifyBtn>
                                </S.EmailVerification>
                                {sendCode && (
                                    <S.SuccessMessage>인증 메일이 발송되었습니다.</S.SuccessMessage>
                                )}

                            </S.FormGroup>

                            <S.FormGroup>
                                <S.EmailVerification style={{ marginTop: "10px" }}>
                                    <input type="text" id="verify-code" placeholder="인증번호 입력" onChange={(e) => setVerifyCode(e.target.value)} />
                                    <S.VerifyBtn type="button" onClick={handelCheckCode}>인증 확인</S.VerifyBtn>
                                </S.EmailVerification>
                                {checkCode && (
                                    <S.SuccessMessage>{checkCodeMessage}</S.SuccessMessage>
                                )}
                            </S.FormGroup>

                            <S.PrimaryBtn type="submit" onClick={handleSubmit}>다음</S.PrimaryBtn>
                        </form>
                    </S.Container>
                </S.Wrapper>
            </S.InfoPageContainer>
        </>
    );
}

export default InsertInfoPage;
