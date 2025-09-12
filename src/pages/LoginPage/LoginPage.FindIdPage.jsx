import React, { useState } from "react";
import * as S from "@/pages/LoginPage/styled/LoginPage.FindId.style"

function FindID() {
    const [name, setName] = useState("");
    const [emailFront, setEmailFront] = useState("");
    const [emailBack, setEmailBack] = useState("");
    const [code, setCode] = useState("");

    const handleDomainSelect = (e) => {
        if (e.target.value !== "직접입력") {
            setEmailBack(e.target.value);
        } else {
            setEmailBack("");
        }
    };

    const sendVerificationCode = () => {
        const fullEmail = `${emailFront}@${emailBack}`;
        console.log("이메일 인증 요청:", { name, fullEmail });
        alert("이메일 전송 시도 (API 연결 필요)");
    };

    return (
        <S.Container>
            <S.LoginForm>
                <S.Top>
                    <h2>PROJECT-X</h2>
                </S.Top>
                <S.Subtitle>아이디를 잊어버리셨나요?</S.Subtitle>
                <hr />
                <h3>아이디 찾기</h3>
                <S.Subtitle>가입 시 입력했던 정보를 통해 아이디를 찾을 수 있습니다.</S.Subtitle>

                <form>
                    <S.Label>이름</S.Label>
                    <S.Input
                        type="text"
                        value={name}
                        placeholder="이름 입력"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <S.Label>이메일 주소</S.Label>
                    <S.Email>
                        <S.Input
                            type="text"
                            placeholder="example"
                            value={emailFront}
                            onChange={(e) => setEmailFront(e.target.value)}
                            required
                        />
                        <span>@</span>
                        <S.Input
                            type="text"
                            placeholder="domain.com"
                            value={emailBack}
                            onChange={(e) => setEmailBack(e.target.value)}
                            required
                        />
                    </S.Email>
                    <S.EmailAuto onChange={handleDomainSelect}>
                        <option value="">선택하세요.</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="naver.com">naver.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="직접입력">직접입력</option>
                    </S.EmailAuto>

                    <S.Code>
                        <S.Input
                            type="text"
                            placeholder="인증번호 6자리"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                        <S.Button type="button" onClick={sendVerificationCode}>
                            인증번호 전송
                        </S.Button>
                    </S.Code>

                    <S.FindBtn type="submit" value="아이디 찾기" />
                    <S.BackBtn type="button" onClick={() => alert("로그인 페이지 이동")}>
                        로그인 페이지로 이동
                    </S.BackBtn>
                </form>
            </S.LoginForm>
        </S.Container>
    );
}

export default FindID;
