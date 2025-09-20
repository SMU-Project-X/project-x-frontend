import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.Header.style"
import { useNavigate } from "react-router-dom";

import login from "@/assets/images/PicturePage/login.png"

function Header() {
  const navigate = useNavigate();

  return (
      <itemS.header>
        <itemS.logo onClick={() => navigate("/")}>
          Project - <itemS.logo_x>x</itemS.logo_x>
        </itemS.logo>
        <itemS.menu>
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/MD")}>MD</span>
          <span onClick={() => navigate("/Community")}>Community</span>
          <span onClick={() => navigate("/picture/select")}>Content</span>
          <span onClick={() => navigate("/ChatChoice")}>Chat</span>
        </itemS.menu>
        <itemS.login>
          <img src={login} alt="login" />
          <itemS.login_text>로그인</itemS.login_text>
        </itemS.login>
      </itemS.header>
  );
}

export default Header