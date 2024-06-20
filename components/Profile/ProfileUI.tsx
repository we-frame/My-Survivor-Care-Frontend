"use client";

import React, { useState } from "react";
import Title from "../Common/Title";
import ProfileTabs from "./ProfileTabs";
import Image from "next/image";
import { RegisterFormValuesTypes } from "@/types/data";
import { useForm } from "@tanstack/react-form";

const ProfileUI = () => {
  const [editBackgroundInfo, setEditBackgroundInfo] = useState<boolean>(false);
  const [editMedicalInformation, setEditMedicalInformation] =
    useState<boolean>(false);
  // Initializing form with default values and submission handler
  const form = useForm<RegisterFormValuesTypes>({
    defaultValues: {
      BackgroundInformation: {
        name: "",
        dob: "",
        preferred_pronoun: "",
        ethnic_group: "unsure",
        postcode: 12345,
      },
      MedicalInformation: {
        cancer_treatment: "yes",
        removal_ovaries: "no",
        removal_uterus: "yes",
        treatment_types: ["chemotherapy", "brachytherapy"],
        cancer_type: "",
        type_of_breast_cancer: "",
        other_cancers: "",
      },
      MenopauseAssessment: {
        work: 50,
        social_activities: 50,
        leisure_activities: 0,
        sleep: 100,
        mood: 50,
        concentration: 0,
        relations_with_others: 0,
        sexuality: 0,
        enjoyment_of_life: 50,
        quality_of_life: 50,
      },
    },

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("Register form values ::", value);
    },
  });
  return (
    <div className="mt-5 lg:mt-10 flex flex-col gap-10">
      <Title title="Hi Emily!" className="text-5xl font-bold" />

      <div className="flex flex-col gap-4 max-w-[830px]">
        <Title
          title="Welcome to your MySurvivorCare profile page."
          className="text-xl font-semibold"
        />
        <p className="text-base font-normal">
          This page allows you to view and update your personal and medical
          information.
        </p>
        <p className="text-base font-normal">
          You can also reassess your menopause symptoms to track changes. You
          can check if you need to change what you are doing or think about
          trying something else to manage your symptoms.
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-start gap-5 lg:gap-10">
        <div className="w-full lg:w-[75%]">
          <ProfileTabs
            form={form}
            editBackgroundInfo={editBackgroundInfo}
            setEditBackgroundInfo={setEditBackgroundInfo}
            editMedicalInformation={editMedicalInformation}
            setEditMedicalInformation={setEditMedicalInformation}
          />
        </div>
        <div className="w-full lg:w-[25%] rounded-xl shadow-lg mt-7">
          <Image
            alt="/public/profile_right_card_img.jpeg"
            src={"/profile_right_card_img.jpeg"}
            width={1000}
            height={1000}
            className="rounded-t-xl object-cover"
          />

          <div className="p-5 flex flex-col items-start justify-start gap-3">
            <Title
              title="Online Self-Management Platform"
              className="text-2xl font-semibold"
            />

            <p className="text-base font-normal">
              While you wait for your appointment to share your introductory
              letter and the recommended clinical guideline with your GP, you
              could try some self-help strategies at home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUI;
