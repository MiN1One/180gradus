import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://127.0.0.1:8005/api',
    baseURL: '/api',
    // withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // timeout: 15000,
});

export default axiosInstance;