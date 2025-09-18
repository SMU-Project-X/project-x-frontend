import React from 'react';

function Header({ S }) {
    return (
        <S.Header>
            <S.NavContainer>
                <S.Logo>Project - X</S.Logo>
                <S.NavMenu>
                    <S.NavItem href="#">Home</S.NavItem>
                    <S.NavItem href="#">MD</S.NavItem>
                    <S.NavItem href="#">Community</S.NavItem>
                    <S.NavItem href="#">Content</S.NavItem>
                    <S.NavItem href="#">Chat</S.NavItem>
                </S.NavMenu>
                <S.LoginBtn href="#">
                    <span>👤</span>
                    로그인
                </S.LoginBtn>
            </S.NavContainer>
        </S.Header>
    );
}

export default Header;