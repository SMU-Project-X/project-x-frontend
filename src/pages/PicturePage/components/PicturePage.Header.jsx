import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.Header.style"

function Header() {
  return (
      <itemS.header>
        <itemS.logo>
          Project - <itemS.logo_x>x</itemS.logo_x>
        </itemS.logo>
        <itemS.menu>
          <span>Home</span>
          <span>MD</span>
          <span>Community</span>
          <span>Content</span>
          <span>Chat</span>
        </itemS.menu>
        <itemS.login>
          <img src="/images/PicturePage/login.png" alt="login" />
          <itemS.login_text>로그인</itemS.login_text>
        </itemS.login>
      </itemS.header>
  );
}

export default Header