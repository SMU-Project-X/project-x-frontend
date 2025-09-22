import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"

function MemberCard ({imgSrc, name, selected, onSelect}) {
    return (
        <itemS.member onClick={onSelect} className={selected ? "selected" : ""}>
            <img src={imgSrc} alt={name} />
            <itemS.member_name>{name}</itemS.member_name>
        </itemS.member>
    );
}

export default MemberCard