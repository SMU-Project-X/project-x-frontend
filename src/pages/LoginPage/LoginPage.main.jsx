import React, { useEffect, useState } from "react";
import * as itemS from "@/pages/LoginPage/styled/LoginPage.main.style"
import kakaoLogin from "@/assets/images/LoginPage/kakao_login_large_wide.png"

function Login() {
    const [savedId, setSavedId] = useState("");

    useEffect(() => {
        const storedId = localStorage.getItem("savedId");
        if (storedId) setSavedId(storedId);
    }, []);

    const handleSaveId = (e) => {
        if (e.target.checked) {
            localStorage.setItem("savedId", savedId);
        } else {
            localStorage.removeItem("savedId");
        }
    };

    return (
        <itemS.Container>
            <itemS.LoginForm>
                <itemS.Top>
                    <h2>PROJECT-X</h2>
                </itemS.Top>
                <itemS.Subtitle>미래의 감정을 함께하는 네 소녀</itemS.Subtitle>
                <itemS.Hr />
                <form method="POST" action="{% url 'login:loginp' %}">
                    <itemS.FormTitle>로그인</itemS.FormTitle>

                    {/* {messages && messages.length > 0 && (
                        <itemS.ErrorMessages>
                            {messages.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </itemS.ErrorMessages>
                    )} */}

                    <itemS.Label htmlFor="id">아이디</itemS.Label>
                    <itemS.Input
                        type="text"
                        id="id"
                        name="username"
                        placeholder="아이디를 입력하세요."
                        value={savedId}
                        onChange={(e) => setSavedId(e.target.value)}
                        required
                    />

                    <itemS.Label htmlFor="password">비밀번호</itemS.Label>
                    <itemS.Input type="password" name="password" placeholder="비밀번호를 입력하세요." required />

                    <itemS.LoginOptions>
                        <itemS.IdSave>
                            <input type="checkbox" id="saveId" onChange={handleSaveId} checked={!!savedId} />
                            <span>아이디 저장</span>
                        </itemS.IdSave>

                        <itemS.RightOptions>
                            <a href="/login/loginID/">아이디 찾기</a>
                            <span>|</span>
                            <a href="/login/loginPW/">비밀번호 찾기</a>
                        </itemS.RightOptions>
                    </itemS.LoginOptions>

                    <itemS.LoginBtn type="submit" value="로그인" />
                </form>

                <a href="{% url 'login:kakao_login' %}">
                    <itemS.KakaoBtn src={kakaoLogin} alt="카카오톡 로그인" />
                </a>

                <itemS.Signup>
                    <p>아직 계정이 없으신가요?</p>
                    <a className="join" href="/signup/agree/">회원가입</a>
                </itemS.Signup>
            </itemS.LoginForm>
        </itemS.Container>
    );
}
export default Login