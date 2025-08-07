

//******************************************************************************** */
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./common/header/Header";
import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import DoctorList from "./screens/doctorList/DoctorList";
import BookAppointment from "./screens/doctorList/BookAppointment";
import Appointment from "./screens/appointment/Appointment";
import DoctorDetails from "./screens/doctorList/DoctorDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("authToken"));
  const navigate = useNavigate();

  // Update login state when authToken changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login"); // Redirect user to login
  };

  return (
    <>
      {/* Include the shared Header */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Define routing logic */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login and Register routes */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor-details/:doctorId" element={<DoctorDetails />} />
        
        {/* Protected Routes - Requires Login */}
        <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
       
        <Route 
          path="/appointments" 
          element={isLoggedIn ? <Appointment /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
};

export default App;
