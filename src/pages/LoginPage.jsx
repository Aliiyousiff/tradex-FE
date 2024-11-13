import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInUser } from '../services/Auth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const LoginPage = ({ setUser, fetchUserSession }) => {
  // console.log("fetchUserSession", fetchUserSession)
  const navigate = useNavigate();
  const initialState = { username: '', password: '' }; // Changed 'identifier' to 'username'
  const [formValues, setFormValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form values:', formValues);
    try {
      const payload = await SignInUser(formValues);
      console.log('Received payload:', payload); // Added for debugging
      setFormValues(initialState);
      setUser(payload);
      localStorage.setItem('user', JSON.stringify(payload));
      fetchUserSession();
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message); // Added for debugging
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1>Login to TradeX</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <Box
          component="div"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          autoComplete="off"
        >
          <TextField
            onChange={handleChange}
            id="outlined-username"
            label="Username" // Changed label
            name="username" // Changed 'identifier' to 'username'
            type="text"
            placeholder="Enter your username" // Changed placeholder
            value={formValues.username} // Changed 'identifier' to 'username'
            required
            variant="outlined"
          />
          <TextField
            id="outlined-password"
            label="Password"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formValues.password}
            required
          />
        </Box>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;