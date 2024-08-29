import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5050/api/auth/login', { username, password });
            setUser(response.data);
            setError(null);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/');
    };

    const update = async (profileData) => {
        try {
            const response = await axios.put('http://localhost:5050/api/auth/update', profileData);
            setUser(prevUser => ({ ...prevUser, ...response.data })); // Update user state with new profile data
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to update profile.');
        }
    };


    return (
        <AuthContext.Provider value={{ user, error, login, logout, update, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
