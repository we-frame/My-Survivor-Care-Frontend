"use client";

import React from "react";
import Button from "../Common/Button";
import LoginCard from "../Login/LoginCard";

const HomePageUI = () => {
  return (
    <div className="w-full mt-5 lg:mt-10 flex flex-col lg:flex-row marker:items-center justify-center lg:items-start lg:justify-start gap-12 lg:gap-20">
      <div className="w-full lg:w-[60%] flex flex-col items-start justify-start gap-5">
        <h1 className="text-4xl font-semibold">
          Welcome to the MySurvivorCare Platform.
        </h1>

        <p className="text-base font-normal">
          This is a platform which assesses your menopause symptoms and give you
          resources to help manage your symptoms.
        </p>
        <p className="text-base font-normal">
          Menopause symptoms – namely hot flushes and night sweats - are common
          after cancer treatment. They can impact negatively on your quality of
          life. There may be treatment that can reduce the impact of these
          symptoms.
        </p>
        <p className="text-base font-normal">
          Associate Professor Michelle Peate, in collaboration with consumer
          organisations, and researchers and clinicians at the Universities of
          Melbourne, Western Sydney, Western Australia, and the Peter MacCallum
          Cancer Centre have developed this web-based app to help cancer
          survivors manage menopause symptoms after cancer.
        </p>
        <p className="text-base font-normal">
          Survivors can use the MySurvivorCare app to assess their symptoms.
          Based on this, recommendations on how to manage symptoms will be
          provided.
        </p>
        <p className="text-base font-normal">
          We invite you to take part in early testing of the MySurvivorCare app.
          We hope that it will help you to manage your symptoms. Your feedback
          will help us create a platform that is practical, easy to use, and
          caters to your needs.
        </p>

        <div className="w-full">
          <p className="text-xl font-semibold text-center">
            Are you interested in taking part in this early testing of the
            platform?
          </p>
        </div>

        <div className="w-full flex items-center justify-center gap-3">
          <Button text="Yes, I am" className="text-[#C7D2FE]" />
          <Button text="No, I'm not" btnBg={"#f3f4f6"} />
        </div>
      </div>

      <LoginCard />
    </div>
  );
};

export default HomePageUI;
