/**************************************************************************************************************** */
  import React, { useEffect, useState } from "react";
  import {
    Button,
    Card,
    CardContent,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel
  } from "@mui/material";
  import Rating from "@mui/material/Rating";
  //import { useNavigate } from "react-router-dom";
  import "./DoctorList.css"; // Import styles
  import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";

  const DoctorList = () => {
    const [doctors, setDoctors] = useState([]); // Stores all doctors
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Stores filtered doctors
    const [specialization, setSpecialization] = useState(""); // Selected specialization filter
    const [selectedDoctor,setSelectedDoctor ] = useState(null); // Stores selected doctor details
    //const [viewDoctorDetails, setViewDoctorDetails] = useState(false);
    const[Book__Appointment,setbookAppointment] = useState(null);// Modal state
    
    const isLoggedIn = !!localStorage.getItem("token");
    
    console.log("User Logged In:", isLoggedIn);

    // Fetch doctors from backend
    useEffect(() => 
    {
      const fetchDoctors = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/doctors");
          if (response.ok) {
            const data = await response.json();
            setDoctors(data.doctors); // Set doctor list
            setFilteredDoctors(data.doctors); // Initially display all doctors
          } else {
            console.error("Failed to fetch doctors");
          }
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };

      fetchDoctors();
    }, []);

    // Handle filtering doctors by specialization
    const handleSpecializationChange = (event) => {
      const selectedSpecialty = event.target.value;
      setSpecialization(selectedSpecialty);
      if (selectedSpecialty) {
        setFilteredDoctors(doctors.filter((doctor) => doctor.specialization === selectedSpecialty));
      } else {
        setFilteredDoctors(doctors);
      }
    };

    // Handle clicking the Book Appointment button
    const handleBookAppointment = (doctorId) =>
       {
           if (!isLoggedIn){
             alert("You must be logged in to book an appointment."); // Show alert message
             return;// Stop further execution
           }
       
         setbookAppointment( {
            doctorId
         })
        };

      const handleViewDoctorDetails = (doctorId) => 
      {
         setSelectedDoctor(
          doctorId
        );
      };    
  

    return (
      <>
        <div className="doctor-list-container">
          {/* Specialization Filter Dropdown */}
          <FormControl className="filter-dropdown">
            <InputLabel>Select Specialization</InputLabel>
            <Select
              value={specialization}
              onChange={handleSpecializationChange}
            >
              <MenuItem value="">All Specializations</MenuItem>
              {[...new Set(doctors.map((doctor) => doctor.specialization))].map(
                (spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {/* Display Doctors */}
          <div className="doctor-cards">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Card key={doctor._id} className="doctor-card">
                  <CardContent>
                    <Typography variant="h6">{doctor.name}</Typography>
                    <Typography variant="body1">
                      Specialization: {doctor.specialization}
                    </Typography>
                    <Typography variant="body2">
                      Rating: <Rating value={doctor.ratings} readOnly />
                    </Typography>
                    <div className="button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookAppointment(doctor._id)}
                    >
                      Book Appointment
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      className="view-details"
                      onClick={(e) => handleViewDoctorDetails(doctor._id)} // Navigate to details page
                    >
                      View Details
                    </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No doctors available</p>
            )}
          </div>

          {/* Doctor Details Modal */}
        
        </div>
        {Book__Appointment && (
          <>
            <BookAppointment
              props={{
                doctorId: Book__Appointment.doctorId,
                setbookAppointment,
              }}
            />
          </>
                  )}
            {selectedDoctor && (
            <DoctorDetails
              selectedDoctorDetails={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
            />
          )} 
      </>
    );
  };

  export default DoctorList;

