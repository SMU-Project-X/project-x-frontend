import axios from "axios";
import React,{ useEffect, useState } from "react";

export const useVote = () => {
    const [votes,setVotes] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error,setError] = useState(null);

    const postVote = async(bannerId,unitId) => {
        if(!bannerId || !unitId){
            alert("투표할 유닛을 선택해주세요!");
            return;
        }

        setLoading(true);
        try{
            const newVote={bannerId, unitId, votedAt:new Date().toISOString().split('T')[0]}
            setVotes((prev) => [...prev,newVote])

            console.log("투표 저장됨: ", newVote);
            alert(`투표완료! bannerId=${bannerId}, unitId=${unitId}`);
            // await axios.get(`http://localhost:8080/api/votes/save`,{bannerId,unitId,userId:1});
        } catch(err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const voteSave = () => {
        useEffect(()=> {
            axios.post(`http://localhost:8080/api/vote/save`);
        })


    }


    return {postVote,loading,error};
};

















// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export const useVote = (bannerId) => {

//     const [votedUnit, setVotedUnit] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(()=> {
//         axios.get("http://localhost:8080/api/Vote")
//         .then(res => setVotedUnit(res.data))
//         .catch(error => setError(error));
//     }, []);


//     // 투표하기
//     const submitVote = async (unitId) => {
//         try {
//         const ip = await axios.get("https://api64.ipify.org?format=json"); // 사용자 IP
//         const res = await axios.post("http://localhost:8080/api/votes", {
//             bannerId,
//             unitId,
//             ipAddress: ip.data.ip,
//         });
//         console.log("투표 성공:", res.data);
//         setVotedUnit(unitId);
//         return res.data;
//         } catch (err) {
//         console.error("투표 실패:", err);
//         setError(err);
//         throw err;
//         }
//     };

//     return { votedUnit, submitVote, error };
// }

// export const useVoteUnits = (bannerId) => {
//     const [units, setUnits] = useState([]);

//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/vote/units?bannerId=${bannerId}`)
//         .then(res=> setUnits(res.data))
//         .catch(err => console.error(err));
//     }, [bannerId]);

//     return { units };
// }