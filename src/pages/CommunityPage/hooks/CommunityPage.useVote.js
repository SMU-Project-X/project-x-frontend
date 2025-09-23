import axios from "axios";
import React,{ useEffect, useState } from "react";

export const useVote = () => {
    const [votes,setVotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);


    // 투표저장
    const postVote = async(bannerId,unitId) => {
        const userId = localStorage.getItem("userId");
        // if (!userId) {
        //     alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        //     window.location.href = "/login"; // ✅ 로그인 페이지 리다이렉트
        //     return;
        //     }
        if(!bannerId){
            alert("투표할 유닛을 선택해주세요!");
            return;
        }

        setLoading(true);
        try{
            const Response = await axios.post(`http://localhost:8080/api/vote/save`,{
                bannerId,
                optionId : unitId,
                userId:1
            });

            console.log("투표저장됨: ", Response.data);
            alert("투표완료!");
            fetchVotes(bannerId);  // 결과 갱신
            // const newVote={bannerId, unitId, votedAt:new Date().toISOString().split('T')[0]}
            // setVotes((prev) => [...prev,newVote])
            // console.log("투표 저장됨: ", newVote);
            // alert(`투표완료! bannerId=${bannerId}, unitId=${unitId}`);
        } catch(err) {
            setError(err);
            console.log("투표저장 실패: ",err)
        } finally {
            setLoading(false);
        }
    };



    // 투표결과 불러오기
    const fetchVotes = async(bannerId) => {
        try{
            const res = await axios.get(`http://localhost:8080/api/vote/voteResult/${bannerId}`)
            console.log("투표결과: ",res.data);

            const res = await axios.get(`http://localhost:8080/api/vote/${bannerId}`)
        } catch(err) {
            console.error("결과 조회 오류: ",err);
        }
    }

    return {postVote, fetchVotes,loading,error};

};


