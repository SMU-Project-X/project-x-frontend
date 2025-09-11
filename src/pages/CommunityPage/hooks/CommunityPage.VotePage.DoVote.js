import axios from "axios";
import { useEffect, useState } from "react"


// 투표 기능
export function DoVote(userId) {

    const [units, setUnits] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    
    useEffect(()=> {
        axios.get(`http://localhost:8080/api`).then(res => setUnits(res.data));
        console.log("list : ",units);
        fetch(`http://localhost:8080/api/votes/${userId}`)
        .then((res) => res.json())
        .then((data) => setHasVoted(data.hasVoted));
    },[userId]);


    // DB에서 유닛/ 투표 불러오기
    // http://localhost:8080/api  -> data : list
    useEffect(()=> {
        axios.get(`http://localhost:8080/api`)
        .then(res => setUnits(res.data));
        console.log("list : ",units);
        fetch(`/api/votes/${userId}`)
        .then((res) => res.json())
        .then((data) => setHasVoted(data.hasVoted));
    }, (userId));

    // 투표하기 버튼
    const handleVote = () => {
        if(!selectedUnit || !selectedMember) {
            alert("체크를 해주세요!");
            return;
        }

        fetch(`http://localhost:8080/api/votes`, {
            method: "POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({
                userId,
                unitId: selectedUnit,
                memerId: selectedMember,
            }),
        })
        .then((res)=> res.json()) 
        .then((data) => {
            if(data.success){
                alert("투표가 완료되었습니다.");
                setHasVoted(true);
            } else {
                alert(data.message || "이미 투표하셨습니다.");
                setHasVoted(true);
            }
        });
    };
    return {
        units,
        hasVoted,
        selectedMember,
        selectedUnit,
        setSelectedMember,
        handleVote,
    };
}