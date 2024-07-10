import React, { createContext, useState, useContext, useEffect } from 'react';
import { registerUser, loginUser, fetchCurrentUser, logoutUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenAndFetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetchCurrentUser();
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching current user:', error.message);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };

    checkTokenAndFetchUser();
    // const currentUser = async () => {
    //   try {
    //     const response = await fetchCurrentUser();
    //     setUser(response.data.user); 
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching current user:', error.message);
    //     setLoading(false);
    //   }
    // };

    // currentUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setUser(response.data.user);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/')
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response.data.user);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/login')
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      navigate('/login'); 
      console.log("User loggedout successfully");
    } catch (error) {
      console.error('Error during logout:', error.response?.data || error.message || error);
      throw error
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
