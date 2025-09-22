import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.CameraPage.style"
import { useCamera } from "./hooks/PicturePage.CameraPage.useCamera";
import CameraFrame from "./components/PicturePage.CameraPage.CameraFrame";
import { useLocation, useNavigate } from "react-router-dom"

import share from "@/assets/images/PicturePage/share.png"
import back from "@/assets/images/PicturePage/back.png"

function CameraPage () {
    const navigate = useNavigate();
    const { videoRef, photoRef, handleCapture, sharing } = useCamera()
    const location = useLocation();
    const imageData = location.state?.decoratedImage;

    return (
        <div>
            

            <itemS.container>
                <itemS.title>
                    <itemS.back onClick={() => {navigate(-1)}} >
                        <img src={back} alt="" />
                    </itemS.back>
                    <itemS.photobooth>Photo Booth</itemS.photobooth>
                    <itemS.share onClick={sharing}>
                        <img src={share} alt="" />
                    </itemS.share>
                </itemS.title>
                <CameraFrame videoRef={videoRef} photoRef={photoRef} imgSrc={imageData} handleCapture={handleCapture}/>
            </itemS.container>

        </div>
    );
}

export default CameraPage