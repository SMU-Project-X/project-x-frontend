import React, { useState } from "react";
import * as S from "@/pages/LoginPage/styled/LoginPage.FindId.style"

function FindID() {
    const [name, setName] = useState("");
    const [emailFront, setEmailFront] = useState("");
    const [emailBack, setEmailBack] = useState("");
    const [userId, setUserId] = useState("");
    const [visibleId, setVisibleId] = useState(false);

    const handleDomainSelect = (e) => {
        if (e.target.value !== "직접입력") {
            setEmailBack(e.target.value);
        } else {
            setEmailBack("");
        }
    };

    // const sendVerificationCode = (e) => {
    //     e.preventDefault();
    //     const email = `${emailFront}@${emailBack}`;
    //     console.log("이메일 인증 요청:", { name, email });

    //     fetch("/api/signup/emailSend", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ name, email }),
    //     })
    //         .then((res) => res.text())
    //         .then((data) => console.log("응답:", data))
    //         .catch((err) => console.error(err));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = `${emailFront}@${emailBack}`;

        fetch("/api/login/findid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("응답:", data);
                if (data.status == "success") {
                    setUserId(data.userId)
                    setVisibleId(true);
                } else {
                    setVisibleId(false);
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <S.Container>
            <S.LoginForm>
                <S.Top>
                    <h2>PROJECT-X</h2>
                </S.Top>
                <S.Subtitle>아이디를 잊어버리셨나요?</S.Subtitle>
                <hr />
                <h3>아이디 찾기</h3>
                <S.Subtitle>
                    {!visibleId
                        ? "가입 시 입력했던 정보를 통해 아이디를 찾을 수 있습니다."
                        : `회원님의 아이디는 ${userId}입니다.`}
                </S.Subtitle>

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

                    {/* <S.Code>
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
                    </S.Code> */}

                    <S.FindBtn type="button" value="아이디 찾기" onClick={handleSubmit} />
                    <S.BackBtn type="button" onClick={() => alert("로그인 페이지 이동")}>
                        로그인 페이지로 이동
                    </S.BackBtn>
                </form>
            </S.LoginForm>
        </S.Container>
    );
}

export default FindID;
