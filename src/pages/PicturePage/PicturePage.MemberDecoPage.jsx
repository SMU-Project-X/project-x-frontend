import React from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import Header from "@/pages/PicturePage/components/PicturePage.Header";
import DecoImg from "@/pages/PicturePage/components/PicturePage.MemberDecoPage.DecoImg";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.MemberDecoPage.style";
import useDecorationDrop from "./hooks/PicturePage.MemberDecoPage.useDecorationDrop";
import MemberDropArea from "./components/PicturePage.MemberDecoPage.MemberDropArea";

import deco1 from "@/assets/images/PicturePage/deco1.png"
import deco2 from "@/assets/images/PicturePage/deco2.png"
import deco3 from "@/assets/images/PicturePage/deco3.png"
import deco4 from "@/assets/images/PicturePage/deco4.png"
import deco5 from "@/assets/images/PicturePage/deco5.png"
import reset from "@/assets/images/PicturePage/reset.png"
import next from "@/assets/images/PicturePage/next.png"

// 데코 이미지
const decoList = [
    deco1,
    deco2,
    deco3,
    deco4,
    deco5,
]

function MemberDecoPage(){
    const navigate = useNavigate();

    const {
        wrapperRef,
        imgRef,
        decorations,
        handleDragStart,
        handleDragOver,
        handleDrop,
        resetDecorations,
    } = useDecorationDrop();

    const handleNext = async () => {
        if(!wrapperRef.current) return;

        const canvas = await html2canvas(wrapperRef.current, {backgroundColor:null,});    // 배경 투명으로 저장
        const imageData = canvas.toDataURL("image/png");

        navigate("/picture/camera", { state: { decoratedImage: imageData }});
    };

    return (
        <div>

            <Header />
            
            <itemS.container>
                <itemS.background>
                    <MemberDropArea wrapperRef={wrapperRef} imgRef={imgRef} decorations={decorations} onDrop={handleDrop} onDragOver={handleDragOver}/>
                    <itemS.deco_title>Decoration</itemS.deco_title>
                    <itemS.deco_imgs>
                        {decoList.map((imgSrc, index) => (
                            <div key={index} draggable onDragStart={(e) => handleDragStart(e, imgSrc)}>
                                <DecoImg imgSrc={imgSrc} />
                            </div>
                        ))}
                    </itemS.deco_imgs>
                </itemS.background>

                <itemS.buttons>
                    <itemS.reset onClick={resetDecorations}>
                        <img src={reset} alt=""/>
                    </itemS.reset>
                    <itemS.next onClick={handleNext}>
                        <img src={next} alt=""/>
                    </itemS.next>
                </itemS.buttons>
            </itemS.container>

        </div>
    );
}

export default MemberDecoPage