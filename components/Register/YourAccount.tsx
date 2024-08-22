"use client";

import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LoginCard from "../Login/LoginCard";

interface YourAccountTypes {
  privacy?: boolean;
  setPrivacy?: any;
}

const YourAccount = ({ privacy, setPrivacy }: YourAccountTypes) => {
  const [googleData, setGoogleData] = useState<any>();
  const params = useSearchParams();
  const uData: string | null = params.get("u");

  useEffect(() => {
    if (uData) {
      try {
        const decodedData = atob(uData); // Decode from base64
        const parsedData = JSON.parse(decodedData); // Parse the JSON string
        setGoogleData(parsedData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, [uData]);
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
            {googleData ? (
              <div className="text-2xl font-semibold">{`Welcome! ${googleData?.displayName}`}</div>
            ) : (
              <LoginCard noBgStyle noHeading />
            )}
          </div>

          <div className="form-control">
            <label className="cursor-pointer label flex items-center justify-start gap-2">
              <input
                type="checkbox"
                checked={privacy}
                className="checkbox checkbox-sm"
                onChange={(e: any) => {
                  setPrivacy(e.target.checked);
                }}
              />
              <p className="text-sm font-normal">
                I have read and agree with the{" "}
                <Link href="/privacy" className="text-[#4338ca]">
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
