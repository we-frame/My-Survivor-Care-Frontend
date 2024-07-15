import React, { useState } from "react";
import Button from "../Common/Button";
import GoogleIcon from "../Icon/GoogleIcon";
import AppleIcon from "../Icon/AppleIcon";
import Title from "../Common/Title";
import { makeRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import useLoadingStore from "@/store/loadingStore";
import { getUserDetails } from "@/lib/getUserAPI";

interface LoginCardTypes {
  textCenter?: boolean;
}

const LoginCard = ({ textCenter }: LoginCardTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { setUser } = useUserStore(); // Get the setUser function from the store
  const router = useRouter();
  const { refresh, setRefresh } = useLoadingStore();

  // Function to handle Google sign-in
  const handleGoogle = async () => {
    setLoadingButton(true); // Enable loading state
    const provider = new GoogleAuthProvider(); // Google Auth provider
    try {
      // Firebase Google sign-in
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result?.user;

      // Check if user exists in your system
      const checkUser = await makeRequest(
        "GET",
        // `/users?filter[email][_eq]=${firebaseUser?.email}&fields=auth_type`
        `/users?filter={"email": {"_eq": "${firebaseUser?.email}"}}&fields=*`
      );

      const userExists = checkUser?.data[0];
      const authType = userExists?.auth_type; // Checking userAuth type

      // Determine whether to log in or register the user
      if (userExists && authType === "google") {
        await handleGoogleLogin(firebaseUser); // Existing user login
      } else if (!userExists) {
        await handleGoogleRegister(firebaseUser); // New user registration
      } else {
        toast.error("Please log in with email and password.");
      }
    } catch (error) {
      console.error("Firebase Sign-in Error:", error); // Log the error
      toast.error("An error occurred during sign-in."); // Show error toast
    } finally {
      setLoadingButton(false); // Disable loading state
    }
  };

  const handleGoogleLogin = async (firebaseUser: any) => {
    try {
      // login API
      const response = await makeRequest("POST", "/auth/login", {
        email: firebaseUser?.email,
        password: firebaseUser?.uid,
      });

      // Set cookies for tokens
      Cookie.set("access-token", response.data.access_token);
      Cookie.set("refresh-token", response.data.refresh_token);

      // Save user data in Zustand store
      const getUserData = await makeRequest("GET", "/users/me?fields=*,latest_menopause_history.*,menopause_history.*");
      setUser(getUserData?.data);
      if (!getUserData?.data?.is_registration_completed) {
        toast.error("Please complete your registration!.");

        Cookie.set("google-auth-userData", btoa(JSON.stringify(firebaseUser)));

        router.push(`/register?u=${btoa(JSON.stringify(firebaseUser))}`);
      } else {
        // Notify user of successful login
        toast.success("Login successful");

        router.push("/");
      }

      setRefresh(!refresh);
    } catch (error: any) {
      // Handle login errors
      console.log(error);

      // Show error message
      toast.error("Invalid Credentials, Please check your email and password");
    }
  };

  // This function is responsible for registering a new user using information from Firebase
  const handleGoogleRegister = async (firebaseUser: any) => {
    try {
      // Make an API request to create a new user
      await makeRequest("POST", "/users", {
        // Extracting the first name from the Firebase user's display name
        first_name: firebaseUser?.displayName?.substring(
          0,
          firebaseUser?.displayName?.indexOf(" ")
        ),
        // Extracting the last name from the Firebase user's display name
        last_name: firebaseUser?.displayName?.substring(
          firebaseUser?.displayName?.indexOf(" ") + 1
        ),
        // Using the email from the Firebase user
        email: firebaseUser?.email,
        // Using the Firebase user's UID as the password (can be adjusted based on security requirements)
        password: firebaseUser?.uid,
        // Setting the authentication type to Google
        auth_type: "google",
        // Assigning a default role to the user
        role: "40607d3a-0760-4ae0-b60a-60dfd0fae8ba",
      });

      // Displaying a success message upon successful registration
      toast.success("SignIn Successfully!");

      // login API
      const userResponse = await makeRequest("POST", "/auth/login", {
        // Using the email from the Firebase user
        email: firebaseUser?.email,
        // Using the Firebase user's UID as the password (can be adjusted based on security requirements)
        password: firebaseUser?.uid,
      });

      // Set cookies for tokens
      Cookie.set("access-token", userResponse?.data?.access_token);
      Cookie.set("refresh-token", userResponse?.data?.refresh_token);

      Cookie.set("google-auth-userData", btoa(JSON.stringify(firebaseUser)));

      router.push(`/register?u=${btoa(JSON.stringify(firebaseUser))}`);

      // Fetching user details after successful registration and updating the user store
      getUserDetails(setUser);

      setRefresh(!refresh);
    } catch (error: any) {
      // Logging the error for debugging purposes
      console.log(error);

      // Displaying error messages based on the type of error encountered
      if (error?.response?.status === 400) {
        toast.error("User already exists, Please use another mail!");
      } else {
        toast.error("Something Went Wrong!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-5">
      <Title
        title="Login to MySurvivorCare"
        className={
          textCenter
            ? "text-center text-xl font-semibold"
            : "text-center lg:text-left text-xl font-semibold"
        }
      />
      <div className="bg-[#FFFFFF] flex flex-col items-center justify-center gap-3 shadow-xl px-5 py-7 rounded-xl">
        <Button
          text={`Continue with Google`}
          className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base font-semibold btn-outline hover:text-black disabled:cursor-not-allowed"
          btnBg="#f8fafc"
          jsxIcon={<GoogleIcon width="20" height="20" />}
          disabled={loadingButton}
          onClick={handleGoogle}
        />
        <Button
          text={`Continue with Apple`}
          className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base font-semibold btn-outline hover:text-black disabled:cursor-not-allowed"
          btnBg="#f8fafc"
          jsxIcon={<AppleIcon width="20" height="20" />}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default LoginCard;
