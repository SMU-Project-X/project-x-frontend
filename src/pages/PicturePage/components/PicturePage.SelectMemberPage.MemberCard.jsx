import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"

function MemberCard ({imgSrc, name, position, selected, onSelect}) {
    return (
        <itemS.member onClick={onSelect} className={selected ? "selected" : ""}>
            <img src={imgSrc} alt={name} />
            <itemS.member_name>{name}</itemS.member_name>
            <itemS.member_position>{position}</itemS.member_position>
        </itemS.member>
    );
}

export default MemberCard