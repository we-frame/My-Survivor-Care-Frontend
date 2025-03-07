import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import client from "@/lib/axiosInterceptor";
import toast from "react-hot-toast";

// Base URL from environment variables
const apiLink = process.env.NEXT_PUBLIC_BASE_URL;

// Generic request function
export const makeRequest = async (
  method: string,
  endpoint: string,
  data?: any,
  headers?: { [key: string]: string },
) => {
  const axiosOptions: AxiosRequestConfig = {
    baseURL: `${apiLink ?? ""}`,
    method,
    url: endpoint,
    data,
    timeout: 10000,
  };

  const localToken = Cookies.get("access-token");
  if (localToken) {
    axiosOptions.headers = {
      Authorization: `Bearer ${localToken}`,
      ...headers,
    };
  }

  const res = await client.request({
    ...axiosOptions,
  });

  return res.data;
};

// User Services
export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await makeRequest(
        "GET",
        "/users/me?fields=*,latest_menopause_history.*,menopause_history.*",
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: any) => {
    try {
      const response = await makeRequest("PATCH", "/users/me", userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  // Get user answers
  getUserAnswers: async (key: string, userId: string) => {
    try {
      const response = await client.get(`${apiLink}/items/answers`, {
        params: {
          fields: "*.*,question.options.option_id.*",
          filter: JSON.stringify({
            user_created: userId,
            question: {
              key: {
                _starts_with: key,
              },
            },
          }),
          sort: "question.key",
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user answers:", error);
      throw error;
    }
  },

  // Update user answer
  updateAnswer: async (answerId: string, data: any) => {
    try {
      const response = await makeRequest(
        "PATCH",
        `/items/answers/${answerId}`,
        JSON.stringify(data),
        { "Content-Type": "application/json" },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating answer:", error);
      throw error;
    }
  },
};

// Assessment Services
export const assessmentService = {
  // Get assessment questions
  getQuestions: async (key: string) => {
    try {
      const response = await makeRequest(
        "GET",
        `/items/form?filter={"key": {"_eq": "${key}"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*,form_components.question_id.options.option_id.questions.*.*.*`,
      );
      return response.data[0];
    } catch (error) {
      console.error("Error fetching assessment questions:", error);
      throw error;
    }
  },

  // Get menopause questions
  getMenopauseQuestions: async () => {
    try {
      const response = await makeRequest(
        "GET",
        "/items/form?filter[title][_contains]=Menopause&fields=form_components.question_id.question,Menopause&fields=form_components.question_id.id",
      );
      return response.data[0];
    } catch (error) {
      console.error("Error fetching menopause questions:", error);
      throw error;
    }
  },

  // Get question details
  getQuestionDetails: async (questionId: string) => {
    try {
      const response = await makeRequest(
        "GET",
        `/items/question/${questionId}?fields=*,options.option_id.*,options.option_id.questions.*`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching question details:", error);
      throw error;
    }
  },

  // Submit answers
  submitAnswers: async (answers: any[]) => {
    try {
      const response = await makeRequest("POST", `/items/answers`, answers);
      return response;
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  },

  // Submit menopause history
  submitMenopauseHistory: async (data: any) => {
    try {
      const response = await makeRequest(
        "POST",
        "/items/junction_directus_users_menopause_history",
        data,
      );
      return response;
    } catch (error) {
      console.error("Error submitting menopause history:", error);
      throw error;
    }
  },

  // Get config
  getConfig: async () => {
    try {
      const response = await makeRequest("GET", "/items/config");
      return response.data;
    } catch (error) {
      console.error("Error fetching config:", error);
      throw error;
    }
  },
};

// Resource Services
export const resourceService = {
  // Get accordion data
  getAccordionData: async (page: string) => {
    try {
      const response = await fetch(
        `${apiLink}/items/accordion/?filter[page][_eq]=${page}`,
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching accordion data:", error);
      throw error;
    }
  },
};

// Authentication Services
export const authService = {
  // Login
  login: async (email: string, password: string) => {
    try {
      const response = await makeRequest("POST", "/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Register
  register: async (userData: any) => {
    try {
      const response = await makeRequest("POST", "/users", userData);
      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Check if user exists
  checkUserExists: async (email: string) => {
    try {
      const response = await makeRequest(
        "GET",
        `/users?filter={"email": {"_eq": "${email}"}}&fields=*`,
      );
      return response.data[0];
    } catch (error) {
      console.error("Error checking if user exists:", error);
      throw error;
    }
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post(
        `${apiLink}/auth/refresh`,
        {
          refresh_token: refreshToken,
          mode: "json",
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data.data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
    window.localStorage.removeItem("user-store");
    toast.success("Logged out successfully");
  },
};
