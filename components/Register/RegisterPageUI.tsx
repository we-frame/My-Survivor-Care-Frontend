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

const RegisterPageUI = () => {
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
      },
    },

    onSubmit: async ({ value }) => {
      console.log("Register form values ::", value);
    },
  });

  return (
    <div>
      <div className="flex flex-col justify-start items-start gap-3">
        <Title title="Register" className="text-4xl font-semibold" />
        <p className="text-base font-normal">
          If you already have an account, log in{" "}
          <Link href={"/login"} className="text-[#4338ca]">
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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className={cn(
                "border rounded-lg px-3 py-2 bg-green-700 text-white",
                !canSubmit &&
                  "bg-green-300 text-black disabled:cursor-not-allowed"
              )}
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default RegisterPageUI;
