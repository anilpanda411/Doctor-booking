/********************************************************************** */
import React from "react";
import ReactDOM from "react-dom/client"; // Correct way with React 18
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Use createRoot to render the application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Measure app performance
reportWebVitals();
