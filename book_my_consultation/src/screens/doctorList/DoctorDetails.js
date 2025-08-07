import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate} from "react-router-dom";
import "./DoctorList.css"; // Import styles

const DoctorDetails = ({ selectedDoctorDetails,setSelectedDoctor }) => {
  const doctorId  = selectedDoctorDetails;
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!doctorId) return; // Ensure doctorId is provided

      try {
        console.log("Fetching details for doctorId:", doctorId);
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error("Doctor not found");
        const { doctor } = await response.json();
        setDoctor(doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);



  return (
    <Dialog open={true} onClose={()=>navigate("/doctors")} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-header">Doctor Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography>Loading doctor details...</Typography>
        ) : doctor ? (
          <Paper className="doctor-details-container">
            <Card className="doctor-card">
              <CardContent>
              <Typography variant="h5" gutterBottom>{doctor.name}</Typography>
                <Typography variant="body1"><strong>Specialization:</strong> {doctor.specialization}</Typography>
                <Typography variant="body1"><strong>Experience:</strong> {doctor.experience} years</Typography>
                <Typography variant="body1"><strong>Rating:</strong> ⭐ {doctor.ratings}</Typography> {/* ✅ FIXED: Use correct field name */}
                <Typography variant="body1"><strong>Experience:</strong> {doctor.totalExperience} years</Typography>
                <Typography variant="body1"><strong>Date of Birth:</strong> {new Date(doctor.dateOfBirth).toLocaleDateString()}</Typography>
                <Typography variant="body1"><strong>City:</strong> {doctor.city}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {doctor.email}</Typography>
                <Typography variant="body1"><strong>Mobile:</strong> {doctor.mobile}</Typography>

              </CardContent>
            </Card>
          </Paper>
        ) : (
          <Typography color="error">Doctor details not available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
      <Button onClick={() =>setSelectedDoctor(null)} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DoctorDetails;
