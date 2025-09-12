import React from "react";
import * as S from "@/pages/LoginPage/styled/LoginPage.ChangePw.style";

function ChangePW() {
    return (
        <S.Container>
            <S.LoginForm>
                <S.Top>
                    <h2>PO-PIN</h2>
                </S.Top>
                <form method="POST" action="/login/change-pw">
                    <hr />
                    <h3>비밀번호 재설정</h3>
                    <S.Subtitle>새로운 비밀번호를 입력하세요.</S.Subtitle>

                    {/* 에러 메시지 예시 */}
                    {/* <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage> */}

                    <label htmlFor="pw1">새 비밀번호</label>
                    <S.Input type="password" name="pw1" id="pw1" placeholder="8자 이상 16자 이하 입력" />

                    <label htmlFor="pw2">새 비밀번호 확인</label>
                    <S.Input type="password" name="pw2" id="pw2" placeholder="동일한 비밀번호 입력" />

                    <S.FindPWBtn type="submit" value="비밀번호 재설정" />
                    <S.BackBtn
                        type="button"
                        value="로그인 페이지로"
                        onClick={() => (window.location.href = "/login")}
                    />
                </form>
            </S.LoginForm>
        </S.Container>
    );
}

export default ChangePW;
