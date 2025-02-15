import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const { data } = await api.get('/api/auth/me');
            setUser(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            setError('Session expired. Please login again.');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/api/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', data.token);
            setUser(data.user);
            setError(null);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.error || 'Login failed');
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/api/auth/register', userData);
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setError(null);
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.error || 'Registration failed');
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 