import React, { useEffect, useState } from "react";
import * as itemS from "@/pages/LoginPage/styled/LoginPage.main.style";
import kakaoLogin from "@/assets/images/LoginPage/kakao_login_large_wide.png";
import { useNavigate } from "react-router-dom";

function Login() {
    const [savedId, setSavedId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [saveIdChecked, setSaveIdChecked] = useState(false);


    useEffect(() => {
        const storedId = localStorage.getItem("savedId");
        if (storedId) setSavedId(storedId);
    }, []);

    const handleSaveId = (e) => {
    setSaveIdChecked(e.target.checked);
    if (e.target.checked) {
        localStorage.setItem("savedId", savedId);
    } else {
        localStorage.removeItem("savedId");
    }
};
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            // 쿠키 전달 + CSRF 헤더
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const res = await fetch("/api/login", {
                method: "POST",
                credentials: "include", // ✅ 세션 쿠키 포함
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrfToken || "",
                },
                body: JSON.stringify({ userId: savedId, password }),
            });

            if (!res.ok) {
                if (res.status === 401) throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
                else throw new Error("로그인 실패");
            }

            const data = await res.json();
            console.log("로그인 성공:", data);

            // 로그인 성공 시 localStorage에 상태 저장
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);

            navigate("/home");
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
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

                <form onSubmit={handleLogin}>
                    <itemS.FormTitle>로그인</itemS.FormTitle>

                    {errorMsg && <itemS.ErrorMessages>{errorMsg}</itemS.ErrorMessages>}

                    <itemS.Label htmlFor="id">아이디</itemS.Label>
                    <itemS.Input
                        type="text"
                        id="id"
                        placeholder="아이디를 입력하세요."
                        value={savedId}
                        onChange={(e) => setSavedId(e.target.value)}
                        required
                    />

                    <itemS.Label htmlFor="password">비밀번호</itemS.Label>
                    <itemS.Input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <itemS.LoginOptions>
                        <itemS.IdSave>
                            <input type="checkbox" id="saveId" onChange={handleSaveId} checked={saveIdChecked} />
                            <span>아이디 저장</span>
                        </itemS.IdSave>

                        <itemS.RightOptions>
                            <a href="/login/findid">아이디 찾기</a>
                            <span>|</span>
                            <a href="/login/findpw">비밀번호 찾기</a>
                        </itemS.RightOptions>
                    </itemS.LoginOptions>

                    <itemS.LoginBtn type="submit" value="로그인" />
                </form>

                <a href="/api/kakao/login">
                    <itemS.KakaoBtn src={kakaoLogin} alt="카카오톡 로그인" />
                </a>

                <itemS.Signup>
                    <p>아직 계정이 없으신가요?</p>
                    <a className="join" href="/signup/terms/">회원가입</a>
                </itemS.Signup>
            </itemS.LoginForm>
        </itemS.Container>
    );
}

export default Login;
