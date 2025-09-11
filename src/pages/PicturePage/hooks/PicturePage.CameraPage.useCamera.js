import { useEffect, useRef } from "react"

export function useCamera() {
    const videoRef = useRef(null)
    const photoRef = useRef(null)

    // 카메라 연결
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch(() => {
                alert('카메라 권한을 허용해주세요.')
            })
    }, [])

    // 캡처 함수
    const handleCapture = () => {
        const video = videoRef.current
        const photo = photoRef.current

        if (!video || !photo) return

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // 오버레이 이미지 위치 조절
        const photoX = 5
        const photoY = canvas.height - 430 - 5
        const photoWidth = 250
        const photoHeight = 430

        context.drawImage(photo, photoX, photoY, photoWidth, photoHeight)

        // 다운로드
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = '찰칵.png'
        a.click()

        // 클립보드 저장
        if (navigator.clipboard && window.ClipboardItem) {
            canvas.toBlob(async (blob) => {
                try {
                    const item = new ClipboardItem({ 'image/png': blob })
                    await navigator.clipboard.write([item])
                    alert('이미지가 클립보드에 복사되었습니다!')
                } catch (err) {
                    console.error('클립보드 복사 실패:', err)
                    alert('클립보드 복사에 실패했습니다.')
                }
            }, 'image/png')
        } else {
            alert('브라우저가 클립보드 이미지 복사를 지원하지 않습니다.')
        }
    }

    return {
        videoRef,
        photoRef,
        handleCapture
    }
}