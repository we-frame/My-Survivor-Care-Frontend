"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Title from "../Common/Title";
import Link from "next/link";
import YourAccount from "./YourAccount";
import BackgroundInformation from "./BackgroundInformation";
import { useForm } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import MedicalInformation from "./MedicalInformation";
import MenopauseAssessment from "./MenopauseAssessment";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import useUserStore from "@/store/userStore";
import { HormonalCancer } from "@/data/hormonal-cancer-question-id";
import { useRegistration } from "@/hooks/useRegistration";
import { useUser } from "@/hooks/useUser";

const RegisterPageUI = () => {
  const { user, refetch: refetchUser } = useUser();
  const {
    getFormData,
    getMenopauseQuestions,
    getConfig,
    submitAnswers,
    updateUserProfile,
    submitMenopauseHistory,
  } = useRegistration();

  const params = useSearchParams();
  const uData: any = params.get("u");
  const encodedNewUserData = atob(uData);
  const [privacy, setPrivacy] = useState<any>(false);
  const router = useRouter();

  // Get config data for timer days
  const { data: configData } = getConfig();
  const timerDays = configData?.data?.assessment_duration || 1;

  // Get menopause questions
  const { data: menoQuestions } = getMenopauseQuestions();
  const MenoData = menoQuestions?.data?.[0]?.form_components?.reduce(
    (acc: any, component: any) => {
      const { id, question } = component.question_id;
      acc[id] = question;
      return acc;
    },
    {},
  );

  // Get form data for different sections
  const { data: backgroundData } = getFormData("RBI");
  const { data: medicalData } = getFormData("MI");
  const { data: assessmentData } = getFormData("MA");

  const formData = {
    backgroundInformation: backgroundData?.data?.[0],
    medicalInformation: medicalData?.data?.[0],
    menopauseAssessment: assessmentData?.data?.[0],
  };

  if (user?.is_registration_completed) {
    router.replace("/profile");
  }

  // Initializing form with default values and submission handler
  const form = useForm<any>({
    defaultValues: {
      BackgroundInformation: {},
      MedicalInformation: {},
      MenopauseAssessment: {},
    },

    // Form submission handler
    onSubmit: async ({ value }) => {
      if (!encodedNewUserData) {
        toast.error("Please choose a sign-in method!");
        return;
      }

      if (!privacy) {
        toast.error("Please check privacy policy");
        return;
      }

      try {
        const Answer: any = [];
        Object.keys(value).forEach((answerKey) => {
          Object.keys(value[answerKey]).forEach((question_id) => {
            const rawAnswer = value[answerKey][question_id];
            try {
              let parsedAnswer: any = JSON.parse(rawAnswer);
              if (Array.isArray(parsedAnswer)) {
                Answer.push({
                  question: question_id,
                  question_type: "select",
                  answered_options: parsedAnswer.map((option_id) => ({
                    option_id: option_id,
                  })),
                });
              } else {
                Answer.push({
                  question: question_id,
                  question_type: "range",
                  answer: parsedAnswer,
                });
              }
            } catch (error) {
              if (Array.isArray(rawAnswer)) {
                Answer.push({
                  question: question_id,
                  question_type: "multiple_checkbox",
                  answered_options: rawAnswer.map((option_id) => ({
                    option_id: option_id?.slice(2, -2),
                  })),
                });
              } else {
                Answer.push({
                  question: question_id,
                  question_type: "input",
                  answer: rawAnswer,
                });
              }
            }
          });
        });

        // Submit answers
        await submitAnswers.mutateAsync(Answer);

        const isHormonalCancer = Answer.some(
          (answer: any) =>
            answer.question_type === "select" &&
            HormonalCancer.includes(answer.answered_options[0].option_id),
        );

        // Update user profile
        await updateUserProfile.mutateAsync({
          last_assessment_date: new Date().toISOString(),
          is_registration_completed: true,
          symptom_reassessment_logic: { hormonal: isHormonalCancer },
        });

        // Calculate ratings
        const parameterRating: any = [];
        let counter = 0;
        let ratingSum = 0;
        Object.keys(value.MenopauseAssessment).forEach((title) => {
          counter++;
          ratingSum += parseInt(value.MenopauseAssessment[title]);

          parameterRating.push({
            title: MenoData?.[title] ?? title,
            rating: value.MenopauseAssessment[title],
          });
        });

        const averageRating = ratingSum / counter;
        const requestBody = {
          menopause_history_id: {
            average_rating: averageRating,
            parameter_rating: parameterRating,
          },
        };

        // Submit menopause history
        await submitMenopauseHistory.mutateAsync(requestBody);

        // Update user profile with assessment dates
        let next_assessment_date = new Date();
        next_assessment_date.setDate(
          next_assessment_date.getDate() + timerDays,
        );

        await updateUserProfile.mutateAsync({
          last_assessment_date: new Date().toISOString(),
          latest_menopause_history: requestBody?.menopause_history_id,
          next_assessment_date: next_assessment_date.toISOString(),
          show_dedicated_support_button: true,
        });

        // Refetch user data
        await refetchUser();

        Cookie.remove("google-auth-userData");
        router.push("/profile");
        toast.success("Registration successful!");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An error occurred during registration");
      }
    },
  });

  return (
    <div className="mt-5 lg:mt-10">
      <div className="flex flex-col justify-start items-start gap-3">
        <Title title="Register" className="text-4xl font-semibold" />
        <p className="text-base font-normal">
          If you already have an account, log in{" "}
          <Link href={"/login"} style={{ color: "#14b8a6" }}>
            here.
          </Link>
        </p>
      </div>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="bg-[#ffffff] mt-10 p-4 lg:p-6 rounded-lg shadow-lg flex flex-col gap-10"
      >
        <YourAccount setPrivacy={setPrivacy} privacy={privacy} />
        <BackgroundInformation
          form={form}
          formData={formData.backgroundInformation}
        />
        <MedicalInformation
          form={form}
          formData={formData.medicalInformation}
        />
        <MenopauseAssessment
          form={form}
          formData={formData.menopauseAssessment}
        />
        <button
          type="submit"
          className={cn(
            "w-full bg-[#14b8a6] text-white py-2 rounded-lg mt-4",
            "hover:bg-[#0f9488] transition-colors duration-200",
            "disabled:bg-gray-400 disabled:cursor-not-allowed",
          )}
          disabled={!privacy}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPageUI;
