import React from "react";
import * as S from "@/pages/LoginPage/styled/LoginPage.FindPw.style";

function FindPW() {
    return (
        <S.Container>
            <S.LoginForm>
                <S.Top>
                    <h2>PROJECT-X</h2>
                </S.Top>
                <form method="POST" action="/login/findpw">
                    <hr />
                    <h3>비밀번호 찾기</h3>
                    <S.Subtitle>
                        아이디와 이메일을 입력하면,<br /> 비밀번호 재설정 링크를 받으실 수 있습니다.
                    </S.Subtitle>

                    {/* 에러 메시지 자리 */}
                    {/* <S.ErrorMessage>에러 메시지 예시</S.ErrorMessage> */}

                    <label htmlFor="id">아이디</label>
                    <S.Input type="text" name="id" id="id" placeholder="가입 시 사용한 아이디" />

                    <label htmlFor="email">이메일 주소</label>
                    <S.Input type="email" name="email" id="email" placeholder="가입 시 이메일 주소" />

                    <S.FindPWBtn type="submit" value="비밀번호 재설정 링크 받기" />
                    <S.BackBtn type="button" value="로그인 페이지로 돌아가기" onClick={() => (window.location.href = "/login")} />
                </form>
            </S.LoginForm>
        </S.Container>
    );
}

export default FindPW;
