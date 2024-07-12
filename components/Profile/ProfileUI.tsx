"use client";

import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import ProfileTabs from "./ProfileTabs";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import useUserStore from "@/store/userStore";
import { makeRequest } from "@/lib/api";
import toast from "react-hot-toast";

const ProfileUI = () => {
  const [editBackgroundInfo, setEditBackgroundInfo] = useState<boolean>(false);
  const [editMedicalInformation, setEditMedicalInformation] =
    useState<boolean>(false);
  const { userData } = useUserStore();
  const [formData, setFormData] = useState<any>({
    backgroundInformation: null,
    medicalInformation: null,
  });

  const backgroundInformationForm = useForm<any>({
    defaultValues: {},

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("backgroundInformationForm values ::", value);

      Object.keys(value).forEach(async (answerID: any) => {
        try {
          const reqBody: any = {};
          if (Array.isArray(value[answerID])) {
            reqBody.answered_options = value[answerID].map((option: any) => {
              return { option_id: option, answer_id: answerID };
            });
          } else {
            try {
              const optionIDS = JSON.parse(value[answerID]);
              reqBody.answered_options = optionIDS.map((optionID: any) => {
                return { option_id: optionID, answer_id: answerID };
              });
            } catch (error) {
              reqBody.answer = value[answerID];
            }
          }

          console.log(reqBody);
          await makeRequest(
            "PATCH",
            `/items/answers/${answerID}`,
            JSON.stringify(reqBody),
            { "Content-Type": "application/json" }
          );

          setEditBackgroundInfo(false);
          toast.success("Background Information Updated!");
        } catch (error) {
          console.log(error);
          toast.error("Failed to update Background Information");
        }
      });
    },
  });

  const medicalInformationForm = useForm<any>({
    defaultValues: {},

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("medicalInformationForm values ::", value);

      Object.keys(value).forEach(async (answerID: any) => {
        try {
          const reqBody: any = {};
          if (Array.isArray(value[answerID])) {
            reqBody.answered_options = value[answerID].map((option: any) => {
              return { option_id: option, answer_id: answerID };
            });
          } else {
            try {
              const optionIDS = JSON.parse(value[answerID]);
              reqBody.answered_options = optionIDS.map((optionID: any) => {
                return { option_id: optionID, answer_id: answerID };
              });
            } catch (error) {
              reqBody.answer = value[answerID];
            }
          }

          console.log(reqBody);
          await makeRequest(
            "PATCH",
            `/items/answers/${answerID}`,
            JSON.stringify(reqBody),
            { "Content-Type": "application/json" }
          );

          setEditMedicalInformation(false);
          toast.success("Medical Information Updated!");
        } catch (error) {
          console.log(error);
          toast.error("Failed to update Medical Information");
        }
      });
    },
  });

  const fetchData = async (key: string, section: any) => {
    try {
      const response = await makeRequest("GET", `/api/answerbyform/${key}`);
      const data = response?.data;

      if (data) {
        data?.forEach((item: any) => {
          if (section === "backgroundInformation") {
            if (item?.question?.type === "multiple_response") {
              // Map answered options to an array of option IDs
              const optionIds = item?.answered_options?.map(
                (option: any) => option?.option_id?.id
              );
              backgroundInformationForm.setFieldValue(item?.id, optionIds);
            } else {
              // Handle other types like 'single_response'
              backgroundInformationForm.setFieldValue(
                item?.id,
                item?.answer
                  ? item?.answer
                  : item?.answered_options[0]?.option_id?.id
              );
            }
          } else if (section === "medicalInformation") {
            if (item?.question?.type === "multiple_response") {
              // Map answered options to an array of option IDs
              const optionIds = item?.answered_options?.map(
                (option: any) => option?.option_id?.id
              );
              medicalInformationForm.setFieldValue(item?.id, optionIds);
            } else {
              // Handle other types like 'single_response'
              medicalInformationForm.setFieldValue(
                item?.id,
                item?.answer
                  ? item?.answer
                  : item?.answered_options[0]?.option_id?.id
              );
            }
          }
        });
      }
      setFormData((prev: any) => ({ ...prev, [section]: response?.data }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("BI", "backgroundInformation");
    fetchData("MI", "medicalInformation");
  }, []);
  return (
    <div className="mt-5 lg:mt-10 flex flex-col gap-10">
      <Title
        title={`Hi ${userData ? userData?.userData?.first_name : "Emily"}!`}
        className="text-5xl font-bold"
      />

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
            medicalInformationForm={medicalInformationForm}
            backgroundInformationForm={backgroundInformationForm}
            editBackgroundInfo={editBackgroundInfo}
            setEditBackgroundInfo={setEditBackgroundInfo}
            editMedicalInformation={editMedicalInformation}
            setEditMedicalInformation={setEditMedicalInformation}
            formData={formData}
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
