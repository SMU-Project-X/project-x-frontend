import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';



export const useComment = (memberId, name) => {
    const [reply, setReply] = useState([]); 
    const [error, seterror] = useState(null);


    // 댓글 목록
    useEffect(() => {
        if(!memberId || !name) return;

        axios.get('http://localhost:8080/api/comments/search',{
            params: {
                memberId,
                name
            }
        })
        .then((res) => {
            console.log('성공:', res.data);
            setReply(res.data);
            seterror(null);
        })
        .catch((error) => {
            console.error('에러 발생:', error); // 여기에서 AxiosError 상세 확인
            seterror(error);
        });
    }, [memberId,name]);
    return {reply, error};
};
