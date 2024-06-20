import React from "react";
import Button from "../Common/Button";
import GoogleIcon from "../Icon/GoogleIcon";
import AppleIcon from "../Icon/AppleIcon";
import Title from "../Common/Title";

interface LoginCardTypes {
  textCenter?: boolean;
}

const LoginCard = ({ textCenter }: LoginCardTypes) => {
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
          text="Continue with Google"
          className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base font-semibold btn-outline hover:text-black"
          btnBg="#f8fafc"
          jsxIcon={<GoogleIcon width="20" height="20" />}
        />
        <Button
          text="Continue with Apple"
          className="w-full px-10 rounded-3xl border border-[#c1c9d2] text-base font-semibold btn-outline hover:text-black"
          btnBg="#f8fafc"
          jsxIcon={<AppleIcon width="20" height="20" />}
        />
      </div>
    </div>
  );
};

export default LoginCard;
