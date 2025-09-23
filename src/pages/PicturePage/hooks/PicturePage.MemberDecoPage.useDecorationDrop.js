import { useRef, useState } from "react";

function useDecorationDrop() {
    const wrapperRef = useRef(null);    // 캡쳐용 전체영역
    const imgRef = useRef(null);        // 좌표 계산용

    const [decorations, setDecorations] = useState([]);

    const handleDragStart = (e, imgSrc) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // 포인터가 이미지의 좌측 상단에서 얼마나 떨어져 있는지 저장
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        e.dataTransfer.setData("imgSrc", imgSrc);
        e.dataTransfer.setData("offsetX", offsetX);
        e.dataTransfer.setData("offsetY", offsetY);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const imgSrc = e.dataTransfer.getData("imgSrc");
        const offsetX = parseFloat(e.dataTransfer.getData("offsetX"));
        const offsetY = parseFloat(e.dataTransfer.getData("offsetY"));

        const rect = imgRef.current.getBoundingClientRect();
        const dropX = e.clientX - rect.left - offsetX + 50; // +50 = 중심 기준
        const dropY = e.clientY - rect.top - offsetY + 50;

        setDecorations(prev => [...prev, { imgSrc, x: dropX, y: dropY }]);
    };

    const resetDecorations = () => setDecorations([]);

    return {
        wrapperRef,
        imgRef,
        decorations,
        setDecorations,
        handleDragStart,
        handleDragOver,
        handleDrop,
        resetDecorations,
    };
}

export default useDecorationDrop;