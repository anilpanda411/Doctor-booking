// Base URL for API requests, dynamically set using an environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function to make a GET request to a specified API endpoint with error handling
export const getRequest = async (endpoint) => {
  try {
    // Concatenate the base URL with the provided endpoint
    const response = await fetch(`${BASE_URL}${endpoint}`);

    // Check if the response status indicates a successful request
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.status} ${response.statusText}`);
    }

    // Convert the response to JSON format and return it
    return await response.json();
  } catch (error) {
    // Log the error for debugging and re-throw it for further handling
    console.error("Error in GET request:", error.message);
    throw error;
  }
};

// Function to make a POST request to a specified API endpoint with data, optional headers, and error handling
export const postRequest = async (endpoint, data, headers = {}) => {
  try {
    // Send an HTTP POST request using the Fetch API
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON for the request
        ...headers, // Spread operator to include any additional headers passed to the function
      },
      body: JSON.stringify(data), // Convert the JavaScript object (data) to a JSON string
    });

    // Check if the response status indicates a successful request
    if (!response.ok) {
      throw new Error(`POST request failed: ${response.status} ${response.statusText}`);
    }

    // Convert the response to JSON format and return it
    return await response.json();
  } catch (error) {
    // Log the error for debugging and re-throw it for further handling
    console.error("Error in POST request:", error.message);
    throw error;
  }
};
