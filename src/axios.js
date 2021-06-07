import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8005/api',
    // baseURL: '/api',
    // withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // timeout: 15000,
});

export default axiosInstance;