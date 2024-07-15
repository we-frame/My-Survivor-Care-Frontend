"use client";

import { useForm } from "@tanstack/react-form";
import React, { FormEvent, useEffect, useState } from "react";
import Title from "../Common/Title";
import { cn } from "@/lib/utils";
import { makeRequest } from "@/lib/api";
import MenopauseReAssessment from "./MenopauseReAssessment";
import useUserStore from "@/store/userStore";
import { getUserDetails } from "@/lib/getUserAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ReAssessmentUI = () => {
  const { setUser } = useUserStore(); // Get the setUser function from the store

  const [formDataAPI, setFormDataAPI] = useState<any>({
    menopauseAssessment: null,
  });

  const [formData, setFormData] = useState<any>({
    follow_the_recommendation: "",
    find_the_recommendation: "",
    reassess_your_symptoms: "",
    inputField: "",
  });

  const router = useRouter();

  // Initializing form with default values and submission handler
  const form = useForm<any>({
    defaultValues: {},

    // Form submission handler
    onSubmit: async ({ value }) => {
      console.log("Re-Assessment form values ::", value);

      const parameterRating: any = [];
      var counter = 0;
      var ratingSum = 0;
      Object.keys(value).forEach((title) => {
        counter++;
        ratingSum = ratingSum + parseInt(value[title]);

        parameterRating.push({
          title: title,
          rating: value[title],
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
          latest_menopause_history: requestBody?.menopause_history_id,
        });

        getUserDetails(setUser);

        // Redirect to the home page after successful form submission
        router.push("/profile");
        toast.success("Re-Assessment form submitted successfully!");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async (key: string, section: any) => {
    try {
      const response = await makeRequest(
        "GET",
        `/items/form?filter={"key": {"_eq": "${key}"}}&fields=*,form_components.*,form_components.question_id.*,form_components.question_id.options.*,form_components.question_id.options.option_id.*`
      );
      setFormDataAPI((prev: any) => ({
        ...prev,
        [section]: response?.data[0],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("MA", "menopauseAssessment");
  }, []);

  return (
    <div className="mt-5 lg:mt-10">
      <div className="w-full lg:w-[50%] flex flex-col items-start justify-start gap-5">
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
        <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-7 lg:gap-32">
          <div className="w-full lg:w-[20%] flex flex-col gap-3">
            <Title title="Before you start" className="text-xl font-semibold" />
          </div>

          <div className="max-w-full lg:max-w-[40%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-5">
            {/* <div>
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
                    placeholder={"Choose a recommendation"}
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
                    placeholder="Choose a recommendation"
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
                    placeholder="Choose a recommendation"
                    isRequired
                  />
                )}
              />
            </div> */}

            <div>
              <label
                htmlFor="follow_the_recommendation"
                className="form-control w-full max-w-md"
              >
                <div className="label">
                  <span className="label-text font-normal">
                    Did you follow the recommendation as you were advised?
                  </span>
                </div>

                <select
                  className={cn(`select select-bordered max-w-xs`)}
                  id="follow_the_recommendation"
                  name="follow_the_recommendation"
                  value={formData.follow_the_recommendation}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Choose a recommendation
                  </option>
                  <option value={"yes"} className="text-black">
                    Yes
                  </option>
                  <option value={"no"} className="text-black">
                    No
                  </option>
                </select>
              </label>
            </div>

            {formData.follow_the_recommendation === "yes" ? (
              <>
                <div>
                  <label
                    htmlFor="find_the_recommendation"
                    className="form-control w-full max-w-md"
                  >
                    <div className="label">
                      <span className="label-text font-normal">
                        Did you find the recommendation to be useful for you?
                      </span>
                    </div>

                    <select
                      className={cn(`select select-bordered max-w-xs`)}
                      id="find_the_recommendation"
                      name="find_the_recommendation"
                      value={formData.find_the_recommendation}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Choose a recommendation
                      </option>
                      <option value={"yes"} className="text-black">
                        Yes
                      </option>
                      <option value={"no"} className="text-black">
                        No
                      </option>
                    </select>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="reassess_your_symptoms"
                    className="form-control w-full max-w-md"
                  >
                    <div className="label">
                      <span className="label-text font-normal">
                        Do you still want to reassess your symptoms?
                      </span>
                    </div>

                    <select
                      className={cn(`select select-bordered max-w-xs`)}
                      id="reassess_your_symptoms"
                      name="reassess_your_symptoms"
                      value={formData.reassess_your_symptoms}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Choose a recommendation
                      </option>
                      <option value={"yes"} className="text-black">
                        Yes
                      </option>
                      <option value={"no"} className="text-black">
                        No
                      </option>
                    </select>
                  </label>
                </div>
              </>
            ) : formData.follow_the_recommendation === "no" ? (
              <>
                <div>
                  <label
                    htmlFor="inputField"
                    className="form-control w-full max-w-xs"
                  >
                    <div className="label">
                      <span className="label-text font-normal">
                        Please tell us why you did not follow the previous
                        recommendation?
                      </span>
                    </div>

                    <textarea
                      className={cn(
                        "border rounded-md p-3 text-sm input-bordered w-full max-w-xs"
                      )}
                      id="inputField"
                      name="inputField"
                      value={formData.inputField}
                      onChange={handleChange}
                      rows={4}
                      cols={50}
                    />
                  </label>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {formData.follow_the_recommendation === "yes" &&
          formData.reassess_your_symptoms === "yes" && (
            <MenopauseReAssessment
              form={form}
              formData={formDataAPI.menopauseAssessment}
            />
          )}

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
