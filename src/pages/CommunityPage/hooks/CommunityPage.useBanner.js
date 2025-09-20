import axios from "axios";
import { useEffect, useState } from "react"

// 배너 목록 가져오기: 배너 타이틀, 이미지, 시작일, 종료일
export const UseBanner = () => {
    const[banners, setBanners] = useState([]);
    const[error, setError] = useState(null);

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

    return banners ;
}

// 후보 옵션 가져오기
export const useBannerOptions = (bannerId) => {
    const [options, setOptions ] = useState([]);
    const [error, setError ] = useState(null);

    useEffect(() => {
        if(!bannerId) return;

        axios.get(`http://localhost:8080/api/banners/${bannerId}/units`)
        .then((res)=> {
            setOptions(res.data)
            console.log("units 데이터: ",res.data)
        })
        .catch((err) => setError(err))
    }, [bannerId]);
    return options;
}