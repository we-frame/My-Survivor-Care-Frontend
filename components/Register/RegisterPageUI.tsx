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

const RegisterPageUI = () => {
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
            await makeRequest("PATCH", "/users/me", {
              last_assessment_date: new Date().toISOString(),
              is_registration_completed: true,
            });

            Cookie.remove("google-auth-userData");
            router.push("/");
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
        `/items/form?filter={"key": {"_eq": "${key}"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*`
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

        <div className="w-full flex items-center justify-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                style={{
                  backgroundColor: "#14b8a6",
                }}
                className={cn(
                  "border rounded-lg px-5 py-3 text-[#C7D2FE]",
                  !canSubmit &&
                    "bg-green-300 text-black disabled:cursor-not-allowed"
                )}
                type="submit"
                disabled={!canSubmit}
              >
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
