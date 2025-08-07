/************************************************************************************* */
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import "./Home.css";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment"; // Import Appointment component

const Home = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const isLoggedIn = sessionStorage.getItem("token") !== null;

    return (
        <>
            {/* Material-UI Tabs for Navigation */}
            <Tabs
                value={tabIndex}
                onChange={(event, newValue) => setTabIndex(newValue)}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
                className="context-tab"
            >
                <Tab label="Doctors" />
                <Tab label="Appointment" />
            </Tabs>

            {/* Render Components Based on Active Tab */}
            {tabIndex === 0 && <DoctorList isLoggedIn={isLoggedIn} />}
            {tabIndex === 1 && <Appointment isLoggedIn={isLoggedIn} />}
        </>
    );
};

export default Home;
