import React, { useState } from "react";
import Button from "../Common/Button";
import GoogleIcon from "../Icon/GoogleIcon";
import AppleIcon from "../Icon/AppleIcon";
import Title from "../Common/Title";
import { makeRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

interface LoginCardTypes {
  textCenter?: boolean;
  data?: any;
}

const LoginCard = ({ textCenter, data }: LoginCardTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const Login = async (authProvider: string) => {
    setLoading(true);

    if (authProvider === "google") {
      router.replace(
        "https://api.mysurviour.agpro.co.in/auth/login/google?redirect=https://mysurvivorcare.netlify.app"
      );
    }

    // try {

    // } catch (error) {
    //   console.log(error);
    // } finally {
    setLoading(false);
    // }
  };

  const logout = async () => {
    try {
      // await makeRequest("POST", "/auth/logout", null, {
      //   credentials: "include",
      // });
      await fetch("https://api.mysurviour.agpro.co.in/auth/refresh", {
        method: "POST",
        credentials: "include", // this is required in order to send the refresh/session token cookie
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "session" }), // using 'session' mode, but can also be 'cookie' or 'json'
      });
    } catch (error) {
      console.log(error);
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
        {data?.map((item: any) => {
          if (item?.name === "google") {
            return (
              <Button
                key={item?.name}
                text={`Continue with Google`}
                className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base font-semibold btn-outline hover:text-black disabled:cursor-not-allowed"
                btnBg="#f8fafc"
                jsxIcon={<GoogleIcon width="20" height="20" />}
                onClick={() => Login(item?.name)}
                disabled={loading}
              />
            );
          } else if (item.name === "apple") {
            return (
              <Button
                key={item?.name}
                text={`Continue with Apple`}
                className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base font-semibold btn-outline hover:text-black disabled:cursor-not-allowed"
                btnBg="#f8fafc"
                jsxIcon={<AppleIcon width="20" height="20" />}
                onClick={() => Login(item?.name)}
                disabled={loading}
              />
            );
          } else {
            return null;
          }
        })}

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default LoginCard;
