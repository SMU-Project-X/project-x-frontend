import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { number } from 'framer-motion';
import { member } from '@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style';


// 댓글 훅
// @param{number} member_id
// @param {String} name


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

    // 댓글 저장
    const saveComment = async (commentText) => {
        console.log("useComment.saveComment호출됨: ", {memberId,name,commentText})
        try{
            const res = await axios.post("http://localhost:8080/api/comments/save",{
                memberId: memberId,
                memberName: name,
                content: commentText
            });
            // 새댓글을 reply 바로 반영
            setReply((prev) => [...prev, res.data]);
            return res.data;
        } catch(err) {
            seterror(err);
            throw err;
        }
    }

    return {reply, error, saveComment};
};
