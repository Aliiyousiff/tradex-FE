import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInUser } from "../services/Auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await SignInUser(formValues);
      setUser(user);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Email" name="email" fullWidth />
        <TextField label="Password" name="password" fullWidth />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </Box>
    </div>
  );
};

export default LoginPage;
