// src/pages/LoginPage.js

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignInUser } from "../services/Auth"
import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

const LoginPage = ({ setUser, fetchUserSession }) => {
  let navigate = useNavigate()
  let initialState = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await SignInUser(formValues)
      setFormValues(initialState)
      setUser(payload)
      localStorage.setItem("user", JSON.stringify(payload))
      fetchUserSession()
      navigate("/")
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="form-container">
      <h1>Login to TradeX</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={handleChange}
            id="outlined-email"
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
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
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
