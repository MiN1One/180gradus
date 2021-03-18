import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    timeoutErrorMessage: 'Time out, check your connection'
});

export default axiosInstance;