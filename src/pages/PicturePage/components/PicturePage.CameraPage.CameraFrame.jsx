import React from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.CameraPage.style"

import camera from "@/assets/images/PicturePage/camera.png"

const CameraFrame = ({ videoRef, photoRef, imgSrc, handleCapture }) => {
    return (
        <itemS.camera_frame>
            <itemS.Video ref={videoRef} width="640" height="480" autoPlay/>
            <itemS.photo_container>
                <img ref={photoRef} src={imgSrc} alt="" width="310" height="360" object-fit="cover"/>
            </itemS.photo_container>
        <itemS.capture onClick={handleCapture}>
            <img src={camera} alt=""/>
        </itemS.capture>
        </itemS.camera_frame>
    );
}

export default CameraFrame