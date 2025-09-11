import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.MemberDecoPage.style"

function MemberImg({imgSrc}){
    return (
        <itemS.member_img>
            <img src={imgSrc} alt="" />
        </itemS.member_img>
    );
}

export default MemberImg;