"use client";

import { ReAssessmentFormTypes } from "@/types/data";
import { useForm } from "@tanstack/react-form";
import React, { FormEvent } from "react";
import MenopauseAssessment from "../Register/MenopauseAssessment";
import Title from "../Common/Title";
import SelectInput from "../FormInputs/SelectInput";
import useSettingStore from "@/store/SettingStore";
import { cn } from "@/lib/utils";

const ReAssessmentUI = () => {
  const { buttonBgColor } = useSettingStore((state) => ({
    buttonBgColor: state.buttonBgColor,
  }));
  // Initializing form with default values and submission handler
  const form = useForm<ReAssessmentFormTypes>({
    defaultValues: {
      follow_the_recommendation: "yes",
      find_the_recommendation: "yes",
      reassess_your_symptoms: "yes",
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
      <div className="w-[50%] flex flex-col items-start justify-start gap-5">
        <Title
          title="Symptom re-assessment"
          className="text-4xl font-semibold"
        />
        <p className="text-base font-normal">
          This tool helps you check if the methods you have been using to manage
          your symptoms are working for you.
        </p>
        <p className="text-base font-normal">
          For the best results, use this tool after trying out the
          recommendations from your previous assessment. Based on your score,
          you'll be guided to either keep doing what you’re doing or think about
          trying something else.
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
        <div className="w-full flex items-start justify-start gap-32">
          <div className="w-[20%] flex flex-col gap-3">
            <Title title="Before you start" className="text-xl font-semibold" />
          </div>

          <div className="max-w-[40%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-5">
            <div>
              <form.Field
                name="follow_the_recommendation"
                children={(field: any) => (
                  <SelectInput
                    field={field}
                    selectOptions={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    label="Did you follow the recommendation as you were advised?"
                    isRequired
                  />
                )}
              />
            </div>
            <div>
              <form.Field
                name="find_the_recommendation"
                children={(field: any) => (
                  <SelectInput
                    field={field}
                    selectOptions={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    label="Did you find the recommendation to be useful for you?"
                    isRequired
                  />
                )}
              />
            </div>
            <div>
              <form.Field
                name="reassess_your_symptoms"
                children={(field: any) => (
                  <SelectInput
                    field={field}
                    selectOptions={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    label="Do you still want to reassess your symptoms?"
                    isRequired
                  />
                )}
              />
            </div>
          </div>
        </div>
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
                {isSubmitting ? "Loading..." : "Submit re-assessment"}
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default ReAssessmentUI;
