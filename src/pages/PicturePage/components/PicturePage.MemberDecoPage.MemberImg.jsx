import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.MemberDecoPage.style"

function MemberImg({imgRef, imgSrc}){
    return (
        <itemS.member_img>
            <img ref={imgRef} src={imgSrc} alt=""/>
        </itemS.member_img>
    );
}

export default MemberImg;