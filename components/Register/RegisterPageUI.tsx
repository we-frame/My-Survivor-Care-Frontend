"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Title from "../Common/Title";
import Link from "next/link";
import YourAccount from "./YourAccount";
import BackgroundInformation from "./BackgroundInformation";
import { useForm } from "@tanstack/react-form";
import { RegisterFormValuesTypes } from "@/types/data";
import { cn } from "@/lib/utils";
import MedicalInformation from "./MedicalInformation";
import MenopauseAssessment from "./MenopauseAssessment";
import useSettingStore from "@/store/SettingStore";
import { makeRequest } from "@/lib/api";

const RegisterPageUI = () => {
  const { buttonBgColor } = useSettingStore((state) => ({
    buttonBgColor: state.buttonBgColor,
  }));
  const [backgroundInformation, setBackgroundInformation] = useState<any>();
  const [medicalInformation, setMedicalInformation] = useState<any>();
  const [menopauseAssessment, setMenopauseAssessment] = useState<any>();
  // Initializing form with default values and submission handler
  const form = useForm<any>({
    defaultValues: {
      BackgroundInformation: {},
      MedicalInformation: {},
      MenopauseAssessment: {},
    },

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("Register form values ::", value);
    },
  });

  const getBackgroundInformationData = async () => {
    try {
      const data = await makeRequest(
        "GET",
        `/items/form?filter={"key": {"_eq": "RBI"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*`
      );
      setBackgroundInformation(data?.data[0]);

      if (data?.data[0]) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMedicalInformationData = async () => {
    try {
      const data = await makeRequest(
        "GET",
        `/items/form?filter={"key": {"_eq": "MI"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*`
      );
      setMedicalInformation(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMenopauseAssessmentData = async () => {
    try {
      const data = await makeRequest(
        "GET",
        `/items/form?filter={"key": {"_eq": "MA"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*`
      );
      setMenopauseAssessment(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBackgroundInformationData();
    getMedicalInformationData();
    getMenopauseAssessmentData();
  }, []);

  console.log(backgroundInformation);
  console.log(medicalInformation);
  console.log(menopauseAssessment);

  return (
    <div className="mt-5 lg:mt-10">
      <div className="flex flex-col justify-start items-start gap-3">
        <Title title="Register" className="text-4xl font-semibold" />
        <p className="text-base font-normal">
          If you already have an account, log in{" "}
          <Link href={"/login"} style={{ color: buttonBgColor }}>
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
        <YourAccount />
        <BackgroundInformation form={form} formData={backgroundInformation} />
        <MedicalInformation form={form} formData={medicalInformation} />
        <MenopauseAssessment form={form} />        

        <div className="w-full flex items-center justify-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                style={{
                  backgroundColor: buttonBgColor,
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
