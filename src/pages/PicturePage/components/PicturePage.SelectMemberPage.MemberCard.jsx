import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"

function MemberCard ({imgSrc, name, position}) {
    return (
        <itemS.member>
            <img src={imgSrc} alt={imgSrc} />
            <itemS.member_name>{name}</itemS.member_name>
            <itemS.member_position>{position}</itemS.member_position>
        </itemS.member>
    );
}

export default MemberCard