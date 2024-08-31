// This file is only if the BackEnd does not use cookie to store JWT token. Our BackEnd already use cookie, so this file will not be used.

import axios from 'axios';

export const setupAxiosInterceptors = (logoutCallback) => {

    // Request Interceptor: Adds the Authorization header with the JWT token
    axios.interceptors.request.use(
        (config) => {                                               // modify config/adds header.
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor: Handles token expiry or unauthorized responses
    axios.interceptors.response.use(
        response => response,  // Pass through successful responses
        error => {
            if (error.response && error.response.status === 401) {  // If unauthorized, clear token and log out.
                logoutCallback();                                   // This is where the logout function from AuthProvider will be called.
            }
            return Promise.reject(error);
        }
    );
};