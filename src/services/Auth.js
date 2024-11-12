// services/auth.js

import axiosClient from './api';

// Register a new user
export const RegisterUser = async (userData) => {
  try {
    const response = await axiosClient.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

// Login a user
export const SignInUser = async (data) => {
  try {
    const response = await axiosClient.post('/api/auth/login', data);
    // Save the token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error signing in:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Check user session (if implemented in backend)
export const CheckSession = async () => {
  try {
    const response = await axiosClient.get('/api/auth/check-session');
    return response.data;
  } catch (error) {
    console.error('Error checking session:', error.response?.data || error.message);
    throw error;
  }
};