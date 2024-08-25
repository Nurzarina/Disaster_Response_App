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
            console.log('Response Data:', response.data); // Add this line to inspect the response
            setUser(response.data);         // 'setUser' taking in data from backend and storing them in 'user' state.
            setError(null);
            navigate('/');                  // Redirect to a protected route after login
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
