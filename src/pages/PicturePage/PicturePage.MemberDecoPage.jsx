import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import { useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation();

    const {
        wrapperRef,
        imgRef,
        decorations,
        setDecorations,
        handleDragStart,
        handleDragOver,
        handleDrop,
        resetDecorations,
    } = useDecorationDrop();

    // 새로고침(reload) 시 세션 초기화
    useEffect(() => {
        // sessionStorage에 이전 decorations이 있으면 유지
        const savedDecorations = sessionStorage.getItem("decorations");
        if(savedDecorations) {
            setDecorations(JSON.parse(savedDecorations));
        }
        
        // 새로고침 감지
        window.addEventListener("beforeunload", () => {
            //새로고침 시만 decorations 초기화
            sessionStorage.removeItem("decorations");
            sessionStorage.removeItem("decorationImage");
        });
    }, []);

    // 마운트 시 sessionStorage에서 불러오기
    useEffect(() => {
        const saved = sessionStorage.getItem("decorations");
        if (saved) {
        setDecorations(JSON.parse(saved));
        }
    }, [setDecorations]);

    // decorations 변경될 때마다 저장
    useEffect(() => {
        if (decorations.length > 0) {
        sessionStorage.setItem("decorations", JSON.stringify(decorations));
        }
    }, [decorations]);

    const handleNext = async () => {
        if(!wrapperRef.current) return;

        const canvas = await html2canvas(wrapperRef.current, {backgroundColor:null,});    // 배경 투명으로 저장
        const imageData = canvas.toDataURL("image/png");

        // 최종 캡쳐본 세션에 저장
        sessionStorage.setItem("decoratedImage", imageData);
        navigate("/picture/camera", { state: { decoratedImage: imageData }});
    };


    return (
        <div>

            
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
                    <itemS.reset onClick={() => {resetDecorations(); sessionStorage.removeItem("decorations");}}>
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