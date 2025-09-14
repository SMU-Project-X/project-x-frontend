import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"

import fixie1 from "@/assets/images/PicturePage/fixie1.png"
import fixie2 from "@/assets/images/PicturePage/fixie2.png"

function Title() {
    return (
        <itemS.title>
            <img src={fixie1} alt="" />
            <itemS.group_title>We Are Fixie</itemS.group_title>
            <img src={fixie2} alt="" />
        </itemS.title>
    );
}

export default Title