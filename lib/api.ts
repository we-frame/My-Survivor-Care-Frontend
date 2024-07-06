import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Base URL from environment variables
const apiLink = process.env.NEXT_PUBLIC_BASE_URL;

// Function to make API requests
export const makeRequest = async (
  method: string, // HTTP method (GET, POST, etc.)
  endpoint: string, // API endpoint
  data?: any, // Data to be sent in the request body (for POST, PUT requests)
  headers?: { [key: string]: string } // Additional headers for the request
) => {
  // Configuring Axios request options
  const axiosOptions: AxiosRequestConfig = {
    baseURL: `${apiLink ?? ""}`, // Base URL for the request
    method, // HTTP method
    url: endpoint, // Endpoint URL
    data, // Data payload for the request
    timeout: 10000, // Request timeout set to 10 seconds
  };

  // Retrieving the access token from cookies
  const localToken = Cookies.get("access-token");
  if (localToken) {
    axiosOptions.headers = {
      Authorization: `Bearer ${localToken}`, // Setting Authorization header
      // Authorization: `Bearer qvt97I85V4ZM-1LYIIRcDXFWF3sqq1HG`, // Setting Authorization header
      ...headers, // Spreading any additional headers
    };
  }

  // Making the request with configured options
  const res = await axios.request({
    ...axiosOptions,
  });

  return res.data; // Returning the response data
};
