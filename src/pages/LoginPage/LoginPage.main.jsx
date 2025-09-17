import React, { useEffect, useState } from "react";
import * as itemS from "@/pages/LoginPage/styled/LoginPage.main.style";
import kakaoLogin from "@/assets/images/LoginPage/kakao_login_large_wide.png";
import { useNavigate } from "react-router-dom";

function Login() {
    const [savedId, setSavedId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

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

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: savedId, password }),
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json(); // 성공 시 JSON 데이터 반환
                } else if (res.status === 401) {
                    throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
                } else {
                    throw new Error("로그인 실패");
                }
            })
            .then((data) => {
                console.log("로그인 성공:", data);
                navigate("/home"); // 로그인 성공 시 메인 페이지 이동
            })
            .catch((err) => {
                console.error(err);
                setErrorMsg(err.message);
            });
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
                            <input type="checkbox" id="saveId" onChange={handleSaveId} checked={!!savedId} />
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
