import { useRef, useState } from "react";

function useDecorationDrop() {
    const wrapperRef = useRef(null);    // 캡쳐용 전체영역
    const imgRef = useRef(null);        // 좌표 계산용

    const [decorations, setDecorations] = useState([]);

    const handleDragStart = (e, imgSrc) => {
        e.dataTransfer.setData("imgSrc", imgSrc);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const imgSrc = e.dataTransfer.getData("imgSrc");
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 이미지 영역 벗어나면 무시
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

        setDecorations((prev) => [...prev, { imgSrc, x, y }]);
    };

    const resetDecorations = () => setDecorations([]);

    return {
        wrapperRef,
        imgRef,
        decorations,
        handleDragStart,
        handleDragOver,
        handleDrop,
        resetDecorations,
    };
}

export default useDecorationDrop;