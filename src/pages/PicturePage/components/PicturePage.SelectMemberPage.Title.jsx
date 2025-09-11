import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"

function Title() {
    return (
        <itemS.title>
            <img src="/images/PicturePage/fixie1.png" alt="" />
            <itemS.group_title>We Are Fixie</itemS.group_title>
            <img src="/images/PicturePage/fixie2.png" alt="" />
        </itemS.title>
    );
}

export default Title