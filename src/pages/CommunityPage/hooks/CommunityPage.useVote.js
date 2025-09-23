import axios from "axios";
import React,{ useEffect, useState } from "react";

export const useVote = () => {
    const [votes,setVotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);


    // 투표저장
    const postVote = async(bannerId,unitId) => {

        if(!bannerId){
            alert("투표할 유닛을 선택해주세요!");
            return;
        }

        setLoading(true);
        try{
            const Response = await axios.post(`http://localhost:8080/api/vote/save`,{
                bannerId,
                optionId : unitId,
            });

            console.log("투표저장됨: ", Response.data);
            alert("투표완료!");
            fetchVotes(bannerId);  // 결과 갱신

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
            console.log(res.data);
        } catch(err) {
            console.error("결과 조회 오류: ",err);
        }
    }


    return {postVote, fetchVotes,loading,error};
};


