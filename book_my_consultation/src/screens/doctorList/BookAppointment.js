import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const BookAppointment = (props) => {
  
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");

  // ✅ Removed setOpen to fix ESLint warning

  // Fetch doctor details from backend
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${props.props.doctorId}`);
        if (!response.ok) throw new Error("Doctor not found");
        const data = await response.json();
        console.log("Doctor API Response:", data);
        setDoctor(data.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    if (props.props.doctorId) {
      fetchDoctorDetails();
    }
  }, [props.props.doctorId]);

  // Handle booking appointment

  const handleBook_Appointment = async () => {
       
    if (!timeSlot) {
      setError("Please select a time slot.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to book an appointment.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId:props.props.doctorId,
          appointmentDate,
          timeSlot,
          medicalHistory,
          symptoms,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        props.props.setbookAppointment(null);// ✅ Go back to the previous page after booking
      } else {
        setError(data.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError("An error occurred while booking the appointment.");
    }
  };

  return (
    <Dialog open={!!doctor} onClose={() => navigate(-1)} maxWidth="sm" fullWidth>
      <DialogTitle>Book an Appointment</DialogTitle>
      <DialogContent>
        {doctor ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Doctor Name:{doctor.name}</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Appointment Date"
                value={appointmentDate}
                onChange={(newDate) => setAppointmentDate(newDate)}
              />
            </LocalizationProvider>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Time Slot</InputLabel>
              <Select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                <MenuItem value="09:00 AM">09:00 AM</MenuItem>
                <MenuItem value="10:00 AM">10:00 AM</MenuItem>
                <MenuItem value="11:00 AM">11:00 AM</MenuItem>
                <MenuItem value="02:00 PM">02:00 PM</MenuItem>
                <MenuItem value="03:00 PM">03:00 PM</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Medical History (Optional)"
              fullWidth
              multiline
              rows={2}
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              margin="normal"
            />

            <TextField
              label="Symptoms (Optional)"
              fullWidth
              multiline
              rows={2}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              margin="normal"
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </>
        ) : (
          <Typography>Loading doctor details...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.props.setbookAppointment(null)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleBook_Appointment} variant="contained" color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookAppointment;

