import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.MemberDecoPage.style";

function DecoImg({imgSrc}){
    return (
        <itemS.deco_img>
            <img src={imgSrc} alt="" />
        </itemS.deco_img>
    );
}

export default DecoImg;