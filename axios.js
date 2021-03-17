import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'localhost:3003',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    timeoutErrorMessage: 'Time out, check your connection'
});

export default axiosInstance;