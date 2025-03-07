import React, { useState } from "react";
import Button from "../Common/Button";
import GoogleIcon from "../Icon/GoogleIcon";
import AppleIcon from "../Icon/AppleIcon";
import Title from "../Common/Title";
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
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import useRegistrationStore from "@/store/userRegistrationStore";

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
  const router = useRouter();
  const path = usePathname();

  // Use React Query hooks
  const { user, refetch: refetchUser } = useUser();
  const { login, register, checkUserExists, googleLogin, googleRegister } =
    useAuth();

  // Keep using registration store for eligibility checks
  const {
    step,
    interested,
    eligible,
    setStep,
    setInterested,
    setEligible,
    setNotInterestedMsg,
  } = useRegistrationStore();

  // Handle Google registration using React Query
  const handleGoogleRegister = async (firebaseUser: any) => {
    try {
      // Use the googleRegister mutation from useAuth hook
      await googleRegister.mutateAsync(firebaseUser);

      // Store firebase user data in cookie for registration completion
      Cookie.set("google-auth-userData", btoa(JSON.stringify(firebaseUser)));

      // Navigate to registration page
      router.push(`/register?u=${btoa(JSON.stringify(firebaseUser))}`);

      // Refetch user data
      refetchUser();
    } catch (error: any) {
      console.log(error);

      // Error handling is done in the mutation's onError callback
    }
  };

  // Handle Google login using React Query
  const handleGoogleLogin = async (firebaseUser: any) => {
    try {
      // Use the googleLogin mutation from useAuth hook
      await googleLogin.mutateAsync(firebaseUser);

      // Store firebase user data in cookie
      Cookie.set("google-auth-userData", btoa(JSON.stringify(firebaseUser)));

      // Refetch user data
      refetchUser();

      // Navigation is handled in the mutation's onSuccess callback
    } catch (error: any) {
      console.log(error);

      // Error handling is done in the mutation's onError callback
    }
  };

  // Function to handle Google sign-in
  const handleGoogle = async () => {
    // Commented out eligibility checks for brevity

    setLoadingButton(true); // Enable loading state
    const provider = new GoogleAuthProvider(); // Google Auth provider
    try {
      // Firebase Google sign-in
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result?.user;

      // Check if user exists using React Query
      const userExists = await checkUserExists.mutateAsync(
        firebaseUser.email || "",
      );
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

  // This function is responsible for registering a new user using information from Firebase

  const handleApple = async () => {
    // Eligibility checks are kept for this function
    if (!eligible) {
      if (step === 1) {
        toast.custom((t: any) => (
          <div
            className={`w-[350px] bg-yellow-100 p-3 rounded-lg shadow-lg text-yellow-700 flex items-center justify-center gap-5 ${
              t.visible ? "toast-animate-enter" : "toast-animate-leave"
            }`}
          >
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
            }`}
          >
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
              t.visible ? "toast-animate-enter" : "toast-animate-leave",
            )}
          >
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
                  className="px-2 py-1 rounded-md border border-yellow-700 shadow-md"
                >
                  Re-take
                </button>
                <button
                  onClick={() => toast.dismiss()}
                  className="px-2 py-1 rounded-md bg-red-200 text-red-700 border border-red-700 shadow-md"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ),
        { duration: 5000 },
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

        // Check if user exists using React Query
        const userExists = await checkUserExists.mutateAsync(
          appleUser?.email || "",
        );
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

  // Handle Apple login using React Query
  const handleAppleLogin = async (appleUser: any) => {
    try {
      // Use the login mutation from useAuth hook
      await login.mutateAsync({
        email: appleUser?.email || "",
        password: appleUser?.uid || "",
      });

      // Store apple user data in cookie
      Cookie.set("apple-auth-userData", btoa(JSON.stringify(appleUser)));

      // Refetch user data
      refetchUser();

      // Navigation is handled in the mutation's onSuccess callback
    } catch (error: any) {
      console.log(error);

      // Error handling is done in the mutation's onError callback
    }
  };

  // Handle Apple registration using React Query
  const handleAppleRegister = async (appleUser: any) => {
    try {
      // Create user data object
      const userData = {
        first_name:
          appleUser?.displayName?.substring(
            0,
            appleUser?.displayName?.indexOf(" ") || 0,
          ) || "Apple",
        last_name:
          appleUser?.displayName?.substring(
            (appleUser?.displayName?.indexOf(" ") || 0) + 1,
          ) || "User",
        email: appleUser?.email || "",
        password: appleUser?.uid || "",
        auth_type: "apple",
        role: "40607d3a-0760-4ae0-b60a-60dfd0fae8ba",
      };

      // Use the register mutation from useAuth hook
      await register.mutateAsync(userData);

      // After registration, login the user
      await login.mutateAsync({
        email: appleUser?.email || "",
        password: appleUser?.uid || "",
      });

      // Store apple user data in cookie
      Cookie.set("apple-auth-userData", btoa(JSON.stringify(appleUser)));

      // Navigate to registration page
      router.push(`/register?u=${btoa(JSON.stringify(appleUser))}`);

      // Refetch user data
      refetchUser();
    } catch (error: any) {
      console.log(error);

      // Error handling is done in the mutation's onError callback
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
          !noBgStyle && "bg-[#FFFFFF] shadow-xl px-5 py-7 rounded-xl",
        )}
      >
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
