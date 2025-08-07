
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Navigation & Tracking

const Login = ({ setIsLoggedIn, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    // Store last visited page before login
    if (!isLoggedIn) {
      localStorage.setItem("previousPage", location.pathname);
    }
  }, [location, isLoggedIn]);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);

        if (onClose) onClose();

        // Redirect to the last visited page
        const previousPage = localStorage.getItem("previousPage") || "/";
        navigate(previousPage);
      } else {
        setErrorMessage(data.error || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("Failed to log in. Please check your network connection and try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    
    setTimeout(() => {
      window.location.reload(); // Refresh the page after logout
    }, 100);

    // Redirect back to previous page or home
    const previousPage = localStorage.getItem("previousPage") || "/";
    navigate(previousPage);
  };

  return (
    <div className="form-container">
       <>
          <FormControl className="centered-form" margin="normal" >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl className="centered-form" margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          {errorMessage && <Typography color="error" variant="body2">{errorMessage}</Typography>}
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
          <Button variant="contained" color="primary"  onClick={handleLogin} >
            Login
          </Button>
          </div>
        </>
    </div>
  );
};

export default Login;
