import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

export const useSelectMember = () => {
    const [members, setMembers] = useState([]); 
    const [error,setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/members/select')
        .then((res) => {
            console.log('성공:', res.data);
            setMembers(res.data);
        })
        .catch((error) => {
            console.error('에러 발생:', error); // 여기에서 AxiosError 상세 확인
            setError(error);
        });
    }, []);
    
    return members;
}
