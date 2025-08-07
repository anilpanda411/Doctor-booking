import React, { useState } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import "./Appointment.css"; // Import the CSS file

const RateAppointment = ({ open, handleClose, appointment }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!rating) {
      setError("Submit a rating");
      return;
    }

    if (!appointment || !appointment._id || !appointment.doctorId || !appointment.doctorId._id) {
        console.error("Error: Missing appointment details", appointment);
        alert("Error: Appointment details are missing.");
        return;
      }

        try {
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) {
          alert("You must be logged in to submit a rating.");
          return;
        }

        const payload = { 
            appointmentId:appointment._id, 
            doctorId: appointment.doctorId._id, 
            rating, 
            comment 
          };
        
          console.log("Sending payload:", payload);
      const response = await fetch("http://localhost:5000/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Server Response:", result); 
        throw new Error("Failed to submit rating");
      }

      alert("Rating submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{ onClick: handleClose }} // Close when clicking outside
    >
      <div className="modal-container" onClick={handleClose}>
        <Card className="card" onClick={(e) => e.stopPropagation()}>
          <CardHeader title="Rate an Appointment" className="card-header" />
          <CardContent>
            <FormControl fullWidth>
              <label>Comments</label>
              <TextField
                variant="outlined"
                multiline
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>

            <div className="rating-container">
              <label>Rating :</label>
              <Rating
                name="star-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                style={{ marginBottom: "30px" }} 
                precision={1}
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            <Button className="rate-button" onClick={handleSubmit}>
              RATE APPOINTMENT
            </Button>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default RateAppointment;

