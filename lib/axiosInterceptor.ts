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

// Define the base URL for API requests
const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

// Create an Axios instance with the base URL
const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Handle session timeout actions
const handleSessionTimeout = (): void => {
  toast.error("Session timed out. Please log in again.");
  Cookies.remove("access-token");
  Cookies.remove("refresh-token");
  window.localStorage.removeItem("user-store");
  if (typeof window !== "undefined") {
    window.location.reload();
  }
};

// Set up a response interceptor
client.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response, // On success, return the response
  async (error: AxiosError): Promise<AxiosResponse | AxiosError> => {
    const originalRequest: CustomAxiosRequestConfig =
      error.config as CustomAxiosRequestConfig;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true; // Set retry flag

      const refreshToken: string | undefined = Cookies.get("refresh-token");
      if (!refreshToken) {
        handleSessionTimeout();
        return Promise.reject(new Error("No refresh token available"));
      }

      try {
        const response: AxiosResponse = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
            mode: "json",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const { access_token: accessToken, refresh_token: newRefreshToken } =
          response?.data?.data || {};

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
        handleSessionTimeout();
        return Promise.reject(refreshError);
      }
    }

    console.log("Axios Interceptor Error ::", error);
    return Promise.reject(error);
  }
);

export default client; // Export the configured Axios instance
