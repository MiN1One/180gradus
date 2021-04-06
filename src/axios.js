import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // timeout: 15000,
});

export default axiosInstance;