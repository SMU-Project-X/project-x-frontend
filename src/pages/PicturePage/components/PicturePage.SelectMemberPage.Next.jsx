import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"
import { useNavigate } from "react-router-dom";

function Next({selectedMember}) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedMember) {
      navigate('/picture/deco', { state: {selectedMember}});
    } else {
      alert("멤버를 선택해주세요");
    }
  }

  return (
    <itemS.nextBtn onClick={handleNext}>
      다음 &gt;
    </itemS.nextBtn>
  );
}

export default Next