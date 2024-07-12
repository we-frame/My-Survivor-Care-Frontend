// Import necessary Axios and Cookie handling modules
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Custom Axios request config to include a retry flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// Define the base URL for API requests, defaulting if env variable is not set
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("Base URL: " + BASE_URL);

// Create an Axios instance with the base URL
const client: AxiosInstance = axios.create();

client.defaults.baseURL = "https://api.saley.agpro.co.in";

// Set up a response interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  }, // On success, return the response
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error); // If config is not available, reject the promise
    }

    // Cast error config to the custom Axios request config
    const originalRequest: CustomAxiosRequestConfig =
      error.config as CustomAxiosRequestConfig;

    // Handle 401 Unauthorized responses
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Set retry flag
      try {
        // Retrieve the refresh token from cookies
        const refreshToken = Cookies.get("refresh-token");
        if (!refreshToken) {
          throw new Error("No refresh token available"); // If no refresh token, throw error
        }

        // Axios request options
        const axiosRequestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            refresh_token: refreshToken,
            mode: "json",
          },
        };

        // API call to refresh the token using Axios
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          axiosRequestOptions.data,
          { headers: axiosRequestOptions.headers }
        );

        const data = response?.data;

        // Extract new tokens from data response
        const accessToken = data?.data?.access_token;
        const newRefreshToken = data?.data?.refresh_token;

        // Update cookies with new tokens
        Cookies.set("access-token", accessToken);
        Cookies.set("refresh-token", newRefreshToken);

        // Update Axios instance headers with new access token
        client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        return client(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);

        toast.error("Session time out. Please login again.");

        Cookies.remove("access-token");
        Cookies.remove("refresh-token");
        return Promise.reject(refreshError); // If token refresh fails, reject the promise
      }
    }

    console.log("Axios Interceptor Error ::", error);
    return Promise.reject(error); // For all other errors, reject the promise
  }
);

export default client; // Export the configured Axios instance
