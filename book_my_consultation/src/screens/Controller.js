// // import React from "react";
// // import Home from "../screens/home/Home";
// // import { BrowserRouter as Router, Route } from "react-router-dom";

// // const Controller = () => {
// //   const baseUrl = "/api/v1/";
// //   return (
// //     <Router>
// //       <div className="main-container">
// //         <Route
// //           exact
// //           path="/"
// //           render={(props) => <Home {...props} baseUrl={baseUrl} />}
// //         />
// //       </div>
// //     </Router>
// //   );
// // };

// // export default Controller;


// import React from "react"; // Import React for building the component
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components from react-router-dom

// // Import all the component pages for routing
// import Home from "./home/Home"; // Home Page component
// import Login from "./login/Login"; // Login Page component
// import Register from "./register/Register"; // Registration Page component
// import DoctorList from "./doctorList/DoctorList"; // Doctor List component
// import BookAppointment from "./doctorList/BookAppointment"; // Component for booking an appointment
// import DoctorDetails from "./doctorList/DoctorDetails"; // Component for displaying detailed information about a doctor
// import Appointment from "./appointment/Appointment"; // Appointments Page component
// import RateAppointment from "./appointment/RateAppointment"; // Component for rating an appointment

// /**
//  * Controller.js
//  * This is the centralized routing file of the application.
//  * It defines the routing structure, mapping URL paths to their respective components.
//  * Each Route specifies a path and the component to render for that path.
//  */
// const Controller = () => {
//   return (
//     <Router> {/* BrowserRouter is the parent routing container that enables navigation across different components */}
//       <Routes> {/* Routes is used to define multiple route elements */}
        
//         {/* Route for the Home Page */}
//         <Route 
//           path="/" // URL path for this route
//           element={<Home />} // Component to render when the path matches
//         />

//         {/* Route for the Login Page */}
//         <Route 
//           path="/login" // URL path for this route
//           element={<Login />} // Component to render when the path matches
//         />

//         {/* Route for the Registration Page */}
//         <Route 
//           path="/register" // URL path for this route
//           element={<Register />} // Component to render when the path matches
//         />

//         {/* Route for the Doctor List Page */}
//         <Route 
//           path="/doctors" // URL path for this route
//           element={<DoctorList />} // Component to render when the path matches
//         />

//         {/* Route for Booking an Appointment */}
//         <Route 
//           path="/book-appointment" // URL path for this route
//           element={<BookAppointment />} // Component to render when the path matches
//         />

//         {/* Route for Doctor Details Page */}
//         <Route 
//           path="/doctor-details/:doctorId" // URL path for this route with a dynamic parameter (:doctorId)
//           element={<DoctorDetails />} // Component to render when the path matches
//         />

//         {/* Route for Appointments Page */}
//         <Route 
//           path="/appointments" // URL path for this route
//           element={<Appointment />} // Component to render when the path matches
//         />

//         {/* Route for Rating an Appointment */}
//         <Route 
//           path="/rate-appointment/:appointmentId" // URL path for this route with a dynamic parameter (:appointmentId)
//           element={<RateAppointment />} // Component to render when the path matches
//         />

//       </Routes>
//     </Router>
//   );
// };

// export default Controller; // Export the Controller component for use in other parts of the application

