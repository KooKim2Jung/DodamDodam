import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("jwtToken");
    config.baseURL = "http://15.164.184.14/api";

    // 회원가입 및 로그인 요청일 경우 Authorization 헤더를 추가하지 않음
    if (token && !config.url.endsWith('/auth/join') && !config.url.endsWith('/auth/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
