import React, { useState } from "react";
import Button from "../Common/Button";
import GoogleIcon from "../Icon/GoogleIcon";
import AppleIcon from "../Icon/AppleIcon";
import Title from "../Common/Title";
import { makeRequest } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import Cookie from "js-cookie";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import useLoadingStore from "@/store/loadingStore";
import { getUserDetails } from "@/lib/getUserAPI";
import useRegistrationStore from "@/store/userRegistrationStore";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface LoginCardTypes {
  textCenter?: boolean;
  noHeading?: boolean;
  noBgStyle?: boolean;
}

const LoginCard = ({
  textCenter,
  noHeading = false,
  noBgStyle = false,
}: LoginCardTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { setUser } = useUserStore(); // Get the setUser function from the store
  const router = useRouter();
  const { refresh, setRefresh } = useLoadingStore();
  const {
    step,
    interested,
    eligible,
    setStep,
    setInterested,
    setEligible,
    setNotInterestedMsg,
  } = useRegistrationStore();
  const path = usePathname();

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

      // login API
      const userResponse = await makeRequest("POST", "/auth/login", {
        // Using the email from the Firebase user
        email: firebaseUser?.email,
        // Using the Firebase user's UID as the password (can be adjusted based on security requirements)
        password: firebaseUser?.uid,
      });

      // Displaying a success message upon successful registration
      toast.success("Sign-Up Successfully!");

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
      const getUserData = await makeRequest(
        "GET",
        "/users/me?fields=*,latest_menopause_history.*,menopause_history.*"
      );
      setUser(getUserData?.data);
      if (!getUserData?.data?.is_registration_completed) {
        toast.error("Please complete your registration!.");

        Cookie.set("google-auth-userData", btoa(JSON.stringify(firebaseUser)));

        // router.push(`/register?u=${btoa(JSON.stringify(firebaseUser))}`);
        router.push("/profile");
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
      toast.error("Invalid Credentials, Please check your email and password", {
        duration: 5000,
      });
    }
  };

  // Function to handle Google sign-in
  const handleGoogle = async () => {
    // if (!eligible) {
    // if (step === 1) {
    //   toast.custom((t: any) => (
    //     <div
    //       className={`w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5 ${
    //         t.visible ? "toast-animate-enter" : "toast-animate-leave"
    //       }`}>
    //       <TriangleAlert className="text-yellow-700" size={40} /> Please
    //       answer whether you are interested in participating in the early
    //       testing.
    //     </div>
    //   ));
    // } else if (step === 2) {
    //   toast.custom((t: any) => (
    //     <div
    //       className={`w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5 ${
    //         t.visible ? "toast-animate-enter" : "toast-animate-leave"
    //       }`}>
    //       <TriangleAlert className="text-yellow-700" size={40} /> Please
    //       answer Have you been affected by cancer in the past, or are you
    //       currently, living with it?
    //     </div>
    //   ));
    // }

    //   if (path === "/") {
    //     return;
    //   } else {
    //     router.push("/");
    //     return;
    //   }
    // } else if (!interested) {
    //   // toast.error(
    //   //   "You are not eligible for this program. Please review your answers to the eligibility questions."
    //   // );
    //   toast.custom(
    //     (t: any) => (
    //       <div
    //         className={cn(
    //           "w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5",
    //           t.visible ? "toast-animate-enter" : "toast-animate-leave"
    //         )}>
    //         <div>
    //           <TriangleAlert className="text-yellow-700" size={20} />
    //         </div>
    //         <div>
    //           <p>
    //             You are not eligible for this program. Please review your
    //             answers to the eligibility questions.
    //           </p>

    //           <div className="w-full flex items-center justify-between mt-3">
    //             <button
    //               onClick={() => {
    //                 setStep(1);
    //                 setInterested(false);
    //                 setEligible(false);
    //                 setNotInterestedMsg(null);
    //                 router.push("/");
    //                 toast.dismiss();
    //               }}
    //               className="px-2 py-1 rounded-md border border-yellow-700 shadow-md">
    //               Re-take
    //             </button>
    //             <button
    //               onClick={() => toast.dismiss()}
    //               className="px-2 py-1 rounded-md bg-red-200 text-red-700 border border-red-700 shadow-md">
    //               Dismiss
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ),
    //     { duration: 5000 }
    //   );
    //   return;
    // } else {
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
    // }
  };

  // This function is responsible for registering a new user using information from Firebase

  const handleApple = async () => {
    if (!eligible) {
      if (step === 1) {
        toast.custom((t: any) => (
          <div
            className={`w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5 ${
              t.visible ? "toast-animate-enter" : "toast-animate-leave"
            }`}>
            <TriangleAlert className="text-yellow-700" size={40} /> Please
            answer whether you are interested in participating in the early
            testing.
          </div>
        ));
      } else if (step === 2) {
        toast.custom((t: any) => (
          <div
            className={`w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5 ${
              t.visible ? "toast-animate-enter" : "toast-animate-leave"
            }`}>
            <TriangleAlert className="text-yellow-700" size={40} /> Please
            answer Have you been affected by cancer in the past, or are you
            currently, living with it?
          </div>
        ));
      }

      if (path === "/") {
        return;
      } else {
        router.push("/");
        return;
      }
    } else if (!interested) {
      // toast.error(
      //   "You are not eligible for this program. Please review your answers to the eligibility questions."
      // );
      toast.custom(
        (t: any) => (
          <div
            className={cn(
              "w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5",
              t.visible ? "toast-animate-enter" : "toast-animate-leave"
            )}>
            <div>
              <TriangleAlert className="text-yellow-700" size={20} />
            </div>
            <div>
              <p>
                You are not eligible for this program. Please review your
                answers to the eligibility questions.
              </p>

              <div className="w-full flex items-center justify-between mt-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setInterested(false);
                    setEligible(false);
                    setNotInterestedMsg(null);
                    router.push("/");
                    toast.dismiss();
                  }}
                  className="px-2 py-1 rounded-md border border-yellow-700 shadow-md">
                  Re-take
                </button>
                <button
                  onClick={() => toast.dismiss()}
                  className="px-2 py-1 rounded-md bg-red-200 text-red-700 border border-red-700 shadow-md">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ),
        { duration: 5000 }
      );
      return;
    } else {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");

      setLoadingButton(true); // Enable loading state

      try {
        // Firebase Apple sign-in
        const result = await signInWithPopup(auth, provider);
        const appleUser = result?.user;
        const credential = OAuthProvider.credentialFromResult(result);
        console.log("Apple sign ::", appleUser);
        console.log("credential ::", credential);

        // Extract additional user info if needed
        const additionalUserInfo = getAdditionalUserInfo(result);
        console.log("Additional User Info ::", additionalUserInfo);

        // Check if user exists in your system
        const checkUser = await makeRequest(
          "GET",
          `/users?filter={"email": {"_eq": "${appleUser?.email}"}}&fields=*`
        );

        const userExists = checkUser?.data[0];
        const authType = userExists?.auth_type; // Checking userAuth type

        // Determine whether to log in or register the user
        if (userExists && authType === "apple") {
          await handleAppleLogin(appleUser); // Existing user login
        } else if (!userExists) {
          await handleAppleRegister(appleUser); // New user registration
        } else {
          toast.error("Please log in with email and password.");
        }
      } catch (error) {
        console.error("Apple Sign-in Error:", error); // Log the error
        toast.error("An error occurred during sign-in."); // Show error toast
      } finally {
        setLoadingButton(false); // Disable loading state
      }
    }
  };

  const handleAppleLogin = async (appleUser: any) => {
    try {
      const response = await makeRequest("POST", "/auth/login", {
        email: appleUser?.email,
        password: appleUser?.uid,
      });

      Cookie.set("access-token", response.data.access_token);
      Cookie.set("refresh-token", response.data.refresh_token);

      const getUserData = await makeRequest(
        "GET",
        "/users/me?fields=*,latest_menopause_history.*,menopause_history.*"
      );
      setUser(getUserData?.data);
      if (!getUserData?.data?.is_registration_completed) {
        toast.error("Please complete your registration!.");
        Cookie.set("apple-auth-userData", btoa(JSON.stringify(appleUser)));
        // router.push(`/register?u=${btoa(JSON.stringify(appleUser))}`);
        router.push("/profile");
      } else {
        toast.success("Login successful");
        router.push("/");
      }
      setRefresh(!refresh);
    } catch (error: any) {
      console.log(error);
      toast.error("Invalid Credentials, Please check your email and password",{
        duration:5000
      });
    }
  };

  const handleAppleRegister = async (appleUser: any) => {
    try {
      await makeRequest("POST", "/users", {
        first_name: appleUser?.displayName?.substring(
          0,
          appleUser?.displayName?.indexOf(" ")
        ),
        last_name: appleUser?.displayName?.substring(
          appleUser?.displayName?.indexOf(" ") + 1
        ),
        email: appleUser?.email,
        password: appleUser?.uid,
        auth_type: "apple",
        role: "40607d3a-0760-4ae0-b60a-60dfd0fae8ba",
      });

      const userResponse = await makeRequest("POST", "/auth/login", {
        email: appleUser?.email,
        password: appleUser?.uid,
      });

      toast.success("Sign-Up Successfully!");
      Cookie.set("access-token", userResponse?.data?.access_token);
      Cookie.set("refresh-token", userResponse?.data?.refresh_token);
      Cookie.set("apple-auth-userData", btoa(JSON.stringify(appleUser)));
      router.push(`/register?u=${btoa(JSON.stringify(appleUser))}`);
      getUserDetails(setUser);
      setRefresh(!refresh);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 400) {
        toast.error("User already exists, Please use another mail!");
      } else {
        toast.error("Something Went Wrong!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-5">
      {!noHeading && (
        <Title
          title="Login to MySurvivorCare"
          className={
            textCenter
              ? "text-center text-xl xl:text-3xl font-semibold"
              : "text-center lg:text-left text-xl xl:text-3xl font-semibold"
          }
        />
      )}

      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 disabled:cursor-not-allowed",
          !noBgStyle && "bg-[#FFFFFF] shadow-xl px-5 py-7 rounded-xl"
        )}>
        <Button
          text={`Continue with Google`}
          className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base xl:text-xl font-semibold btn-outline hover:text-black disabled:cursor-not-allowed"
          btnBg="#f8fafc"
          jsxIcon={<GoogleIcon width="20" height="20" />}
          disabled={loadingButton}
          onClick={handleGoogle}
        />
        <Button
          text={`Continue with Apple`}
          className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base xl:text-xl font-semibold btn-outline hover:text-black disabled:cursor-not-allowed"
          btnBg="#f8fafc"
          jsxIcon={<AppleIcon width="20" height="20" />}
          disabled={loading}
          onClick={handleApple}
        />
      </div>
    </div>
  );
};

export default LoginCard;
