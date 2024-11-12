import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/Auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialState = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RegisterUser(formValues);
      setFormValues(initialState); // Reset form
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError("Registration failed! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Join TradeX!</h1>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          type="text"
          onChange={handleChange}
          value={formValues.username}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={formValues.email}
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formValues.password}
          required
          fullWidth
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="button">Register</button>
      </Box>
    </div>
  );
};

export default RegisterPage;
