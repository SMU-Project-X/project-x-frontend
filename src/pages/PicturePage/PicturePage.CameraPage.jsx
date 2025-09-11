import React, { useEffect, useRef } from "react"
import Header from "./components/PicturePage.Header"
import * as itemS from "@/pages/PicturePage/styled/PicturePage.CameraPage.style"
import { useCamera } from "./hooks/PicturePage.CameraPage.useCamera";
import CameraFrame from "./components/PicturePage.CameraPage.CameraFrame";
import { useLocation } from "react-router-dom"

function CameraPage () {
    const { videoRef, photoRef, handleCapture } = useCamera()
    const location = useLocation();
    const imageData = location.state?.decoratedImage;


    return (
        <div>
            
            <Header />

            <itemS.container>
                <itemS.title>Photo Booth</itemS.title>
                <CameraFrame videoRef={videoRef} photoRef={photoRef} imgSrc={imageData} handleCapture={handleCapture}/>
            </itemS.container>

        </div>
    );
}

export default CameraPage