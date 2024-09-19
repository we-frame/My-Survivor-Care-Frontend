"use client";

import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import ProfileTabs from "./ProfileTabs";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import useUserStore from "@/store/userStore";
import { makeRequest } from "@/lib/api";
import toast from "react-hot-toast";
import Button from "../Common/Button";
import Link from "next/link";
import ProfileRightCardImg from "@/public/profile_right_card_img.jpeg";
import TimeToReassessImg from "@/public/time-to-reassessment.jpeg";
import { getUserDetails } from "@/lib/getUserAPI";
import Cookies from "js-cookie";
import axios from "axios";
import Question from "../Common/Question";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const localToken = Cookies.get("access-token");
const ProfileUI = () => {
  const [editBackgroundInfo, setEditBackgroundInfo] = useState<boolean>(false);
  const [editMedicalInformation, setEditMedicalInformation] =
    useState<boolean>(false);
  const { userData, setUser } = useUserStore();
  const [formData, setFormData] = useState<any>({
    backgroundInformation: null,
    medicalInformation: null,
  });

  const averageRating =
    userData?.userData?.latest_menopause_history?.average_rating ?? null;
  const isoDateString =
    userData?.userData?.latest_menopause_history?.date_created;
  const date = new Date(isoDateString);

  // Extracting the day, month, and year
  const day = date.getDate(); // gets the day of the month
  const month = date.getMonth() + 1; // getMonth returns 0-11, so add 1 for a 1-12 range
  const year = date.getFullYear();

  // Formatting the date as d-m-y
  const formattedReAssessmentDate = `${day}-${month}-${year}`;

  const backgroundInformationForm = useForm<any>({
    defaultValues: {},

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("backgroundInformationForm values ::", value);

      try {
        Object.keys(value).forEach(async (answerID: any) => {
          const reqBody: any = {};

          if (Array.isArray(value[answerID])) {
            reqBody.answered_options = value[answerID].map((option: any) => {
              return { option_id: option };
            });
          } else {
            try {
              const optionIDS = JSON.parse(value[answerID]);
              reqBody.answered_options = optionIDS.map((optionID: any) => {
                return { option_id: optionID };
              });
            } catch (error) {
              reqBody.answer = value[answerID];
            }
          }

          await makeRequest(
            "PATCH",
            `/items/answers/${answerID}`,
            JSON.stringify(reqBody),
            { "Content-Type": "application/json" }
          );
        });

        getUserDetails(setUser);
        setEditBackgroundInfo(false);
        toast.success("Background Information Updated!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update Background Information");
      }
    },
  });

  const medicalInformationForm = useForm<any>({
    defaultValues: {},

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("medicalInformationForm values ::", value);

      try {
        Object.keys(value).forEach(async (answerID: any) => {
          const reqBody: any = {};

          if (Array.isArray(value[answerID])) {
            reqBody.answered_options = value[answerID].map((option: any) => {
              return { option_id: option };
            });
          } else {
            try {
              const optionIDS = JSON.parse(value[answerID]);
              reqBody.answered_options = optionIDS.map((optionID: any) => {
                return { option_id: optionID };
              });
            } catch (error) {
              reqBody.answer = value[answerID];
            }
          }

          await makeRequest(
            "PATCH",
            `/items/answers/${answerID}`,
            JSON.stringify(reqBody),
            { "Content-Type": "application/json" }
          );
        });

        getUserDetails(setUser);
        setEditMedicalInformation(false);
        toast.success("Medical Information Updated!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update Medical Information");
      }
    },
  });

  // Function to handle fetching and setting form data based on a specific key and section
  const fetchData = async (key: string, section: string, formSetter: any) => {
    try {
      // const response = await makeRequest("GET", `/api/answerbyform/${key}`);
      const response = await axios.get(`${baseUrl}/items/answers`, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
        params: {
          fields: "*.*,question.options.option_id.*",
          filter: JSON.stringify({
            user_created: userData?.userData?.id,
            question: {
              key: {
                _starts_with: key,
              },
            },
          }),
          sort: "question.key",
        },
      });
      const data = response?.data?.data;


      if (data) {
        data.forEach((item: any) => {
          // Check the type of question and set the value in the form
          if (item?.question?.question_type === "multiple_checkbox") {
            const optionIds = item?.answered_options?.map(
              (option: any) => option?.option_id
            );
            formSetter(item?.id, optionIds);
          } else {
            // Handle single response by providing a default value if `answer` is undefined
            if (item?.answer) {
              formSetter(item?.id, item?.answer);
            } else if (item?.answered_options) {
              const optionID = item?.answered_options?.map(
                (option: any) => option?.option_id
              );
              formSetter(item?.id, optionID);
            }
          }
        });
      }

      setFormData((prev: any) => ({ ...prev, [section]: data }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData(
      "BI",
      "backgroundInformation",
      backgroundInformationForm.setFieldValue
    );
    fetchData("MI", "medicalInformation", medicalInformationForm.setFieldValue);
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
        {/* {averageRating ? (
          <div className="w-full lg:w-[25%] rounded-xl shadow-lg mt-12 bg-white">
            <Image
              alt="/public/time-to-reassessment.jpeg"
              src={TimeToReassessImg}
              width={1000}
              height={1000}
              className="rounded-t-xl object-cover"
            />

            <div className="p-5 flex flex-col items-start justify-start gap-3">
              <Title
                title="Time to re-assess!"
                className="text-2xl font-semibold"
              />

              <p className="text-base font-normal flex flex-col">
                <span>You assessed your symptons on</span>
                <span className="font-bold">{formattedReAssessmentDate}</span>
              </p>

              <Link href={"/re-assessment"}>
                <Button text="Reassess my symptoms" className="text-white" />
              </Link>
            </div>
          </div>
        ) :  */}

        <div className="w-full lg:w-[25%] rounded-xl shadow-lg mt-7 bg-white">
          <Image
            alt="/public/profile_right_card_img.jpeg"
            src={ProfileRightCardImg}
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

            <Link href={"/re-assessment"}>
              <Button text="Access platform" className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUI;
