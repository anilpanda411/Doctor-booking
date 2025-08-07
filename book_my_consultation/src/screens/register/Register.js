import React, { useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
//import { useNavigate } from "react-router-dom"; // Added for redirection

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //const navigate = useNavigate(); // Added for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.mobile) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setErrorMessage("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.message === "User registered successfully") {
        setSuccessMessage("Registration Successful."); // Updated success message
        setErrorMessage("");

        setTimeout(() => {
         // navigate("/login"); // Added automatic redirection to login page
        }, 2000);
      } else {
        setErrorMessage(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to register. Please check your network connection and try again."); // Improved error handling
    }
  };

  return (
    <div className="form-container" ><>
      <FormControl className="centered-form" margin="normal">
        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
      </FormControl>

      <FormControl className="centered-form" margin="normal">
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
      </FormControl>

      <FormControl className="centered-form" margin="normal">
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
      </FormControl>

      <FormControl className="centered-form" margin="normal">
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
      </FormControl>

      <FormControl className="centered-form" margin="normal">
        <TextField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleInputChange} />
      </FormControl>

      {errorMessage && <Typography color="error" variant="body2">{errorMessage}</Typography>}
      {successMessage && <Typography color="success" variant="body2">{successMessage}</Typography>}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
      <Button variant="contained" color="primary" onClick={handleRegister} >
        Register
      </Button>
      </div>
      </>
    </div>
  );
};

export default Register;
