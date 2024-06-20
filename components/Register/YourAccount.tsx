import React from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import GoogleIcon from "../Icon/GoogleIcon";
import AppleIcon from "../Icon/AppleIcon";
import Link from "next/link";

const YourAccount = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-7 lg:gap-32">
      <div className="w-full lg:w-[20%] flex flex-col gap-3">
        <Title title="Your Account" className="text-xl font-semibold" />
        <p className="text-xs font-normal">
          This is how you will log in to the MySurvivorCare platform.
        </p>
      </div>

      <div className="max-w-full lg:max-w-[80%]">
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-3">
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

          <div className="form-control">
            <label className="cursor-pointer label flex items-center justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-sm"
              />
              <p className="text-sm font-normal">
                I have read and agree with the{" "}
                <Link href="" className="text-[#4338ca]">
                  privacy statement
                </Link>
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourAccount;
