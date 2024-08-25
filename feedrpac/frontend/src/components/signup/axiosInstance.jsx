import axios from 'axios';

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5050/api/auth', // Base URL for your API
    withCredentials: true // This ensures cookies are sent with requests
});

export default axiosInstance;