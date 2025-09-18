import axios from "axios";
import { useEffect, useState } from "react"

// 배너 타이틀, 이미지, 시작일, 종료일
export const UseBanner = () => {
    const[banners, setBanners] = useState([]);
    const[error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/banners/list")
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