import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("jwtToken");
    // 요청 URL에 따라 baseURL 동적으로 설정
    if (config.url.includes('/auth')) {
        config.baseURL = "http://localhost:8082/api";
    } else {
        config.baseURL = "http://localhost:8080/api";
    }

    // 회원가입 및 로그인 요청일 경우 Authorization 헤더를 추가하지 않음
    if (token && !config.url.endsWith('/auth/join') && !config.url.endsWith('/auth/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
