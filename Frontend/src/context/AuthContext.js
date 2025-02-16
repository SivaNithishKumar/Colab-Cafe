import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchUserProfile();
        } else {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const { data } = await api.get('/api/auth/me');
            setUser(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (error) => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setError(error.response?.data?.error || 'Authentication failed');
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const { data } = await api.post('/api/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.error || 'Login failed';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const { data } = await api.post('/api/auth/register', userData);
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.error || 'Registration failed';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
            setError(null);
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await api.put('/api/users/profile', profileData);
            setUser(data);
            return { success: true };
        } catch (error) {
            console.error('Profile update error:', error);
            const errorMessage = error.response?.data?.error || 'Failed to update profile';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        setError
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