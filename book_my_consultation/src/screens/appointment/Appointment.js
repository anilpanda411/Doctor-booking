import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Button
} from "@mui/material";
import RateAppointment from "./RateAppointment";
import "./Appointment.css";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setAppointments([]);
      return;
    }

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Appointments:", data);
          setAppointments(data.appointments || []);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [token]);

  if (!token) {
    return (
      <Typography variant="h6" align="center" style={{ marginTop: 20 }}>
        Kindly login to see the appointments.
      </Typography>
    );
  }

  return (
    <div className="appointment-container">
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2} direction="column">
          {appointments.length === 0 ? (
            <Typography variant="h6" align="center" style={{ width: "100%" }}>
              No appointments found.
            </Typography>
          ) : (
            appointments.map((appointment) => {
              const doctor = appointment.doctorId || {}; // Handle missing doctorId
              const doctorName = doctor.name || "N/A";
              
              // Format Date and Time
              const appointmentDate = appointment.appointmentDate
                ? new Date(appointment.appointmentDate).toLocaleDateString()
                : "N/A";
              
              return (
                <Grid item xs={12}  key={appointment._id}>
                  <Card className="appointment-card">
                    <CardContent>
                      <Typography variant="h6">
                        {doctorName}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Date:</strong> {appointmentDate}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {appointment.status || "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Medical History:</strong> {appointment.medicalHistory}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: 10 }}
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        RATE APPOINTMENT
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      )}
          {/* Render RateAppointment modal if an appointment is selected */}
          {selectedAppointment && (
        <RateAppointment
          open={Boolean(selectedAppointment)}
          handleClose={() => setSelectedAppointment(null)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default Appointment;

