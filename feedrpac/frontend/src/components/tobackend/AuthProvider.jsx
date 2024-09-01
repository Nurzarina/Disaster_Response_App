import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuthLink, loginLink, logoutLink, updateLink } from './URL';
import axiosInstance from './axiosInstance';
// import { setupAxiosInterceptors } from './axiosSetup';

// This file allows you to manage the user state, authentication status, and context all in one place.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);                         // To handle user data.
    const [error, setError] = useState(null);                       // To handle error state.
    const [loading, setLoading] = useState(true);                   // To handle loading state.
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get(checkAuthLink); // Adjust the endpoint as needed.
            setUser(response.data);                                 //User date from BackEnd.
        } catch (error) {
            console.error('Error checking auth status:', error);
            setUser(null);                                          // User is not authenticated
        } finally {
            setLoading(false);                                      // Loading complete
        }
    };

    // Check if the user is authenticated on initial load
    useEffect(() => {
        checkAuth();
    }, []);

    // User 'login' function
    const login = async (username, password) => {
        try {
            // await axiosInstance.post('/signup', formData);
            const response = await axiosInstance.post(loginLink, { username, password });
            console.log('Full response data from login:', response.data);                  // Debugging: Check the entire response from backend

            setUser(response.data);                                                        // Saves the user info received from BackEnd.
            setError(null);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password.');
            console.error('Login error:', err.response ? err.response.data : err.message);
        }
    };

    // User 'logout' function
    const logout = async () => {
        try {
            await axiosInstance.post(logoutLink);           // Send POST request to backend to clear the cookie
            setUser(null);                                  // Clear the user data in the FrontEnd
            navigate('/');                                  // Redirect to the Dashboard page
        } catch (err) {
            console.error('Error logging out:', err.response ? err.response.data : err.message);
        }
    };
    

    // Update 'user's data' function
    const update = async (profileData) => {
        try {
            const response = await axiosInstance.put(updateLink, profileData);
            setUser(prevUser => ({ ...prevUser, ...response.data })); // Update user state with new profile data
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, error, loading, checkAuth, login, logout, update, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);   // Enable other components to import functions from this file.

