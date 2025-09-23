import axios from "axios";
import { useEffect, useState } from "react"

// 배너 목록 가져오기: 배너 타이틀, 이미지, 시작일, 종료일
export const UseBanner = () => {
    const[banners, setBanners] = useState([]);
    const[error, setError] = useState(null);

    // 선택된 배너
    const [selectedBannerId, setSelectedBannerId] = useState(null);
    const [options, setOptions] = useState([]);


    // 배너 전체 리스트
    useEffect(() => {
        axios.get(`http://localhost:8080/api/banners/list`)
        .then((res) => {
            setBanners(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log("에러 발생: ",error)
        })
    }, []);
    
    
    // 선택된 배너 가져오기
    useEffect(() => {
    if(!selectedBannerId) return;

    axios.get(`http://localhost:8080/api/banners/${selectedBannerId}`)
    .then((res)=> {
        setOptions(res.data)
        console.log("units 데이터: ",res.data)
    })
    .catch((err) => setError(err))
    }, [selectedBannerId]);

    return {
        banners,
        selectedBannerId,
        setSelectedBannerId
    };
}
