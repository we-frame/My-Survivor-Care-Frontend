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
import { makeRequest } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { getUserDetails } from "@/lib/getUserAPI";
import useUserStore from "@/store/userStore";
import { HormonalCancer } from "@/data/hormonal-cancer-question-id";

const RegisterPageUI = () => {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState<any>({
    backgroundInformation: null,
    medicalInformation: null,
    menopauseAssessment: null,
  });

  const params = useSearchParams();
  const uData: any = params.get("u");
  const encodedNewUserData = atob(uData);
  const [privacy, setPrivacy] = useState<any>(false);
  const router = useRouter();
  const [MenoData, setMenoData] = useState<any>(null);

  useEffect(() => {
    async function fetchMenoPauseQuestions() {
      try {
        const { data } = await makeRequest(
          "GET",
          "/items/form?filter[title][_contains]=Menopause&fields=form_components.question_id.question,Menopause&fields=form_components.question_id.id"
        );
        // console.log(data?.[0]?.form_components, "meno");
        const QuestionsArray = data?.[0]?.form_components?.reduce(
          (acc: any, component: any) => {
            const { id, question } = component.question_id;
            acc[id] = question; // Setting id as the key and question as the value
            return acc;
          },
          {}
        );

        setMenoData(QuestionsArray);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMenoPauseQuestions();
  }, []);

  // Initializing form with default values and submission handler
  const form = useForm<any>({
    defaultValues: {
      BackgroundInformation: {},
      MedicalInformation: {},
      MenopauseAssessment: {},
    },

    // Form submission handler
    onSubmit: async ({ value }) => {
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
                answered_options: parsedAnswer.map((option_id) => {
                  return { option_id: option_id };
                }),
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
                question_type: "select",
                answered_options: rawAnswer.map((option_id) => {
                  return { option_id: option_id };
                }),
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

      if (encodedNewUserData) {
        if (privacy) {
          try {
            await makeRequest("POST", `/items/answers`, Answer);
            const isHormonalCancer = Answer.some((answer: any) => {
              return (
                answer.question_type === "select" &&
                HormonalCancer.includes(answer.answered_options[0].option_id)
              );
            });
            await makeRequest("PATCH", "/users/me", {
              last_assessment_date: new Date().toISOString(),
              is_registration_completed: true,
              symptom_reassessment_logic: { hormonal: isHormonalCancer },
            });

            const parameterRating: any = [];
            var counter = 0;
            var ratingSum = 0;
            Object.keys(value.MenopauseAssessment).forEach((title) => {
              counter++;
              ratingSum =
                ratingSum + parseInt(value.MenopauseAssessment[title]);

              parameterRating.push({
                title: MenoData[title] ?? title,
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

            try {
              await makeRequest(
                "POST",
                "/items/junction_directus_users_menopause_history",
                requestBody
              );

              await makeRequest("PATCH", "/users/me", {
                last_assessment_date: new Date().toISOString(),
                latest_menopause_history: requestBody?.menopause_history_id,
              });

              getUserDetails(setUser);
            } catch (error) {
              console.log("menopause_history_update:", error);
            }

            Cookie.remove("google-auth-userData");
            router.push("/profile");
            toast.success("Registration successful!");
          } catch (error) {
            console.log(error);
          }
        } else {
          toast.error("Please check privacy policy");
        }
      } else {
        toast.error("Please choose a sign-in method!");
      }
      console.log("Register form values ::", value);
    },
  });

  const fetchData = async (key: string, section: any) => {
    try {
      const response = await makeRequest(
        "GET",
        `/items/form?filter={"key": {"_eq": "${key}"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*,form_components.question_id.options.option_id.questions.*.*.*`
      );
      setFormData((prev: any) => ({ ...prev, [section]: response?.data[0] }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("RBI", "backgroundInformation");
    fetchData("MI", "medicalInformation");
    fetchData("MA", "menopauseAssessment");
  }, []);

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
        className="bg-[#ffffff] mt-10 p-4 lg:p-6 rounded-lg shadow-lg flex flex-col gap-10">
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

        <div className="w-full flex items-center justify-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                style={{
                  backgroundColor: "#14b8a6",
                }}
                className={cn(
                  "border rounded-lg px-5 py-3 text-white",
                  !canSubmit &&
                    "bg-green-300 text-black disabled:cursor-not-allowed"
                )}
                type="submit"
                disabled={!canSubmit}>
                {isSubmitting ? "Loading..." : "Create my profile"}
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPageUI;
