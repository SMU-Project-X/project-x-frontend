import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCamera() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [lastCapture, setLastCapture] = useState(null); // 마지막 캡처 저장
    const navigate = useNavigate();


    // 카메라 연결
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(() => {
                alert('카메라 권한을 허용해주세요.');
            })
    }, [])

    // 캡처 함수
    const handleCapture = () => {
        const video = videoRef.current;
        const photo = photoRef.current;

        if (!video || !photo) return;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // 캔버스 기본 크기 (video CSS 크기 기준)
        const cw = video.clientWidth;
        const ch = video.clientHeight;
        canvas.width = cw;
        canvas.height = ch;

        // 비디오 object-fit: cover 계산
        const vw = video.videoWidth;
        const vh = video.videoHeight;

        const videoScale = Math.max(cw / vw, ch / vh);
        const scaledW = vw * videoScale;
        const scaledH = vh * videoScale;
        const dx = (cw - scaledW) / 2;
        const dy = (ch - scaledH) / 2;

        // 비디오 그리기
        context.drawImage(video, dx, dy, scaledW, scaledH);

        // 오버레이 위치 계산 (DOM 좌표 → 캔버스 좌표)
        const rect = photo.getBoundingClientRect();
        const videoRect = video.getBoundingClientRect();

        const scaleX = cw / videoRect.width;
        const scaleY = ch / videoRect.height;

        let photoX = (rect.left - videoRect.left) * scaleX;
        let photoY = (rect.top - videoRect.top) * scaleY;
        const photoWidth = rect.width * scaleX;
        const photoHeight = rect.height * scaleY;

        // crop offset 보정
        photoX += dx;
        photoY += dy;

        // 오버레이 object-fit: cover 계산
        const iw = photo.naturalWidth;
        const ih = photo.naturalHeight;

        const overlayScale = Math.max(photoWidth / iw, photoHeight / ih);
        const sw = photoWidth / overlayScale;
        const sh = photoHeight / overlayScale;
        const sx = (iw - sw) / 2;
        const sy = (ih - sh) / 2;

        // 오버레이 그리기
        context.drawImage(
            photo,
            sx, sy, sw, sh, // 원본에서 잘라낼 영역
            photoX, photoY, photoWidth, photoHeight // 캔버스에 그릴 영역
        );

        // 다운로드
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "찰칵.png";
        a.click();

        // 마지막 캡처 저장
        setLastCapture(dataUrl);
    }

    // 공유 버튼 클릭 시 실행
    const sharing = async () => {
        if (!lastCapture) {
            alert("먼저 사진을 찍어주세요!");
            return;
        }
        navigate('/picture/post');
    }

    return {
        videoRef,
        photoRef,
        handleCapture,
        sharing
    }
}