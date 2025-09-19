import axios from 'axios';

// Axios 인스턴스
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true, // 세션 쿠키 자동 전송
    headers: {
        'Content-Type': 'application/json',
    }
});

// 요청 인터셉터로 CSRF 토큰 자동 설정
apiClient.interceptors.request.use((config) => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
});

export default apiClient;
