"use client";

import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import ProfileTabs from "./ProfileTabs";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import Button from "../Common/Button";
import Link from "next/link";
import ProfileRightCardImg from "@/public/profile_right_card_img.jpeg";
import TimeToReassessImg from "@/public/time-to-reassessment.jpeg";
import Question from "../Common/Question";
import { useUser } from "@/hooks/useUser";
const ProfileUI = () => {
  const [editBackgroundInfo, setEditBackgroundInfo] = useState<boolean>(false);
  const [editMedicalInformation, setEditMedicalInformation] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    backgroundInformation: null,
    medicalInformation: null,
  });

  // Use React Query hooks
  const { user, updateAnswer } = useUser();
  const { data: biAnswers, isLoading: biLoading } = useUser().getUserAnswers('BI');
  const { data: miAnswers, isLoading: miLoading } = useUser().getUserAnswers('MI');

  const averageRating =
    user?.latest_menopause_history?.average_rating ?? null;
  const isoDateString =
    user?.latest_menopause_history?.date_created;
  const date = isoDateString ? new Date(isoDateString) : new Date();

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
        // Use Promise.all to wait for all updates to complete
        await Promise.all(
          Object.keys(value).map(async (answerID: any) => {
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

            // Use the updateAnswer mutation
            return updateAnswer.mutateAsync({
              answerId: answerID,
              data: reqBody
            });
          })
        );

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
        // Use Promise.all to wait for all updates to complete
        await Promise.all(
          Object.keys(value).map(async (answerID: any) => {
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

            // Use the updateAnswer mutation
            return updateAnswer.mutateAsync({
              answerId: answerID,
              data: reqBody
            });
          })
        );

        setEditMedicalInformation(false);
        toast.success("Medical Information Updated!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update Medical Information");
      }
    },
  });

  // Process answers data when it's available
  useEffect(() => {
    if (biAnswers) {
      const data = biAnswers;
      
      if (data) {
        data.forEach((item: any) => {
          // Check the type of question and set the value in the form
          if (item?.question?.question_type === "multiple_checkbox") {
            const optionIds = item?.answered_options?.map(
              (option: any) => option?.option_id
            );
            backgroundInformationForm.setFieldValue(item?.id, optionIds);
          } else {
            // Handle single response by providing a default value if `answer` is undefined
            if (item?.answer) {
              backgroundInformationForm.setFieldValue(item?.id, item?.answer);
            } else if (item?.answered_options) {
              const optionID = item?.answered_options?.map(
                (option: any) => option?.option_id
              );
              backgroundInformationForm.setFieldValue(item?.id, optionID);
            }
          }
        });
      }

      setFormData((prev: any) => ({ ...prev, backgroundInformation: data }));
    }
  }, [biAnswers]);

  // Process medical information answers when available
  useEffect(() => {
    if (miAnswers) {
      const data = miAnswers;
      
      if (data) {
        data.forEach((item: any) => {
          // Check the type of question and set the value in the form
          if (item?.question?.question_type === "multiple_checkbox") {
            const optionIds = item?.answered_options?.map(
              (option: any) => option?.option_id
            );
            medicalInformationForm.setFieldValue(item?.id, optionIds);
          } else {
            // Handle single response by providing a default value if `answer` is undefined
            if (item?.answer) {
              medicalInformationForm.setFieldValue(item?.id, item?.answer);
            } else if (item?.answered_options) {
              const optionID = item?.answered_options?.map(
                (option: any) => option?.option_id
              );
              medicalInformationForm.setFieldValue(item?.id, optionID);
            }
          }
        });
      }

      setFormData((prev: any) => ({ ...prev, medicalInformation: data }));
    }
  }, [miAnswers]);

  // Show loading state while data is being fetched
  if (biLoading || miLoading) {
    return <div className="mt-5 lg:mt-10 flex flex-col gap-10">Loading profile data...</div>;
  }

  return (
    <div className="mt-5 lg:mt-10 flex flex-col gap-10">
      <Title
        title={`Hi ${user ? user.first_name : "Emily"}!`}
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
