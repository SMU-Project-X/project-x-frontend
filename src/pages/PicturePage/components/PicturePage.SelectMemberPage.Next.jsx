import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"
import { useNavigate } from "react-router-dom";

function Next() {
  const navigate = useNavigate();

  return (
    <itemS.nextBtn onClick={() => navigate("/picture/deco")}>
      다음 &gt;
    </itemS.nextBtn>
  );
}

export default Next