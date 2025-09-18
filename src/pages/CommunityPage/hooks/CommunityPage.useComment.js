import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { number } from 'framer-motion';
import { member } from '@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style';


export const useComment = (memberId, memberName, user_id) => {
    const [reply, setReply] = useState([]); 
    const [error, setError] = useState(null);


    // // 댓글 목록
    // useEffect(() => {
    //     if(!memberId || !memberName) return;

    //     axios.get('http://localhost:8080/api/comments/search',{
    //         params: {memberId, memberName, user_id}
    //     })
    //     .then((res) => {
    //         console.log('성공:', res.data);
    //         const sortReply = res.data.sort(
    //             (a,b) => new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()
    //         );
    //         setReply(sortReply);
    //     })
    //     .catch((error) => {
    //         console.error('에러 발생:', error); // 여기에서 AxiosError 상세 확인
    //         setError(error);
    //     });
    // }, [memberId,memberName]);
    

    // 댓글 불러오기
    const fetchComments = async () => {
        if (!memberId || !memberName) return;
        try {
            const res = await axios.get('http://localhost:8080/api/comments/search', {
                params: { memberId, memberName, user_id }
            });

            const sorted = res.data.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setReply(sorted);
            setError(null);
        } catch (err) {
            console.error('댓글 불러오기 실패:', err);
            setError(err);
        }
    };

    // 마운트 또는 멤버 변경 시 댓글 불러오기
    useEffect(() => {
        fetchComments();
    }, [memberId, memberName]);


    
    // 댓글 저장
    const saveComment = async (commentText) => {
        console.log("useComment.saveComment호출됨: ", {memberId,memberName,commentText})
        try{
            const res = await axios.post("http://localhost:8080/api/comments/save",{
                // 컬럼명: 변수명(컬럼명과 꼭 맞춰주기)
                memberId,
                name: memberName,
                content: commentText,
        });
        
        // 새댓글을 reply 바로 반영
        // console.log("res.data 반환 데이터:",res.data)
        const newComment = res.data;
        setReply((prev) => [newComment, ...prev]);
        await fetchComments();

        return newComment;
            
        } catch(err) {
            setError(err);
            throw err;
        }
    };
    
    
    return {reply, error, saveComment};
};
