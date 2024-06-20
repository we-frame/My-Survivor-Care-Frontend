"use client";

import React, { FormEvent } from "react";
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

const RegisterPageUI = () => {
  const { buttonBgColor } = useSettingStore((state) => ({
    buttonBgColor: state.buttonBgColor,
  }));
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
    <div className="mt-10">
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
        className="bg-[#ffffff] mt-10 p-6 rounded-lg shadow-lg flex flex-col gap-10"
      >
        <YourAccount />
        <BackgroundInformation form={form} />
        <MedicalInformation form={form} />
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
