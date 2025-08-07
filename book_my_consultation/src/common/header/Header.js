import React, { useState } from "react"; 
import "./Header.css"; 
import logo from "../../assets/logo.jpeg"; 
import { Button, Modal, Tab, Tabs, Box, Typography } from "@mui/material"; 
import Login from "../../screens/login/Login"; 
import Register from "../../screens/register/Register"; 

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <header className="header">
      {/* Left section: Logo & Title */}
      <div className="header-left">
        <img src={logo} alt="App Logo" className="logo" />
        <Typography variant="h6" className="header-title">Doctor Finder</Typography>
      </div>

      {/* Right section: Login / Logout button */}
      {!isLoggedIn ? (
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          Login
        </Button>
      ) : (
        <Button variant="contained" className="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      )}

      <Modal open={openModal} onClose={handleModalClose}>
        <Box className="modal-box">
        <Typography variant="h5" align="center" className="auth-header">
            Authentication
          </Typography>
          <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
            <Tab label="LOGIN" />
            <Tab label="REGISTER" />
          </Tabs>

          <div className="tab-content">
            {activeTab === 0 && <Login setIsLoggedIn={setIsLoggedIn} onClose={handleModalClose} />}
            {activeTab === 1 && <Register onClose={handleModalClose} />}
          </div>
        </Box>
      </Modal>
    </header>
  );
};

export default Header;
