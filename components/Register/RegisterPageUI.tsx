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

const steps = [
  { id: "account", title: "Your Account" },
  { id: "background", title: "Background Information" },
  { id: "medical", title: "Medical Information" },
  { id: "menopause", title: "Menopause Assessment" },
];

const RegisterPageUI = () => {
  const { setUser, userData } = useUserStore();
  const [formData, setFormData] = useState<any>({
    backgroundInformation: null,
    medicalInformation: null,
    menopauseAssessment: null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [privacy, setPrivacy] = useState<any>(false);
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [stepData, setStepData] = useState<any>({
    BackgroundInformation: {},
    MedicalInformation: {},
    MenopauseAssessment: {},
  });

  const params = useSearchParams();
  const uData: any = params.get("u");
  const encodedNewUserData = uData ? atob(uData) : null;
  const router = useRouter();
  const [MenoData, setMenoData] = useState<any>(null);
  const [timerDays, setTimerDays] = useState<any>(1);

  if (userData && userData?.userData?.is_registration_completed) {
    router.replace("/profile");
  }

  useEffect(() => {
    async function fetchMenoPauseQuestions() {
      try {
        const { data } = await makeRequest(
          "GET",
          "/items/form?filter[title][_contains]=Menopause&fields=form_components.question_id.question,Menopause&fields=form_components.question_id.id"
        );
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

  useEffect(() => {
    const getTimerDays = async () => {
      try {
        const data = await makeRequest("GET", "/items/config");
        setTimerDays(data?.data?.assessment_duration);
      } catch (error) {
        console.log(error);
      }
    };
    getTimerDays();
  }, []);

  // Initializing form with default values and submission handler
  const form = useForm<any>({
    defaultValues: {
      BackgroundInformation: stepData.BackgroundInformation,
      MedicalInformation: stepData.MedicalInformation,
      MenopauseAssessment: stepData.MenopauseAssessment,
    },

    // Form submission handler
    onSubmit: async ({ value }) => {
      // Validate all sections before submission
      const backgroundInfoValid =
        Object.keys(value.BackgroundInformation).length > 0;
      const medicalInfoValid = Object.keys(value.MedicalInformation).length > 0;
      const menopauseAssessmentValid =
        Object.keys(value.MenopauseAssessment).length > 0;

      if (!backgroundInfoValid) {
        toast.error("Please complete all background information questions");
        return;
      }

      if (!medicalInfoValid) {
        toast.error("Please complete all medical information questions");
        return;
      }

      if (!menopauseAssessmentValid) {
        toast.error("Please complete the menopause assessment");
        return;
      }
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
                question_type: "multiple_checkbox",
                answered_options: rawAnswer.map((option_id) => {
                  return { option_id: option_id?.slice(2, -2) };
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
            var markedSeven = false;
            Object.keys(value.MenopauseAssessment).forEach((title) => {
              counter++;
              const individualRating = parseInt(
                value.MenopauseAssessment[title]
              );

              if (individualRating >= 7 && !markedSeven) {
                markedSeven = true;
              }
              ratingSum = ratingSum + value;

              parameterRating.push({
                title: MenoData[title] ?? title,
                rating: value.MenopauseAssessment[title],
              });
            });

            const averageRating = ratingSum / counter;

            const requestBody = {
              menopause_history_id: {
                average_rating: markedSeven
                  ? Math.max(averageRating, 4)
                  : averageRating,
                parameter_rating: parameterRating,
              },
            };

            try {
              await makeRequest(
                "POST",
                "/items/junction_directus_users_menopause_history",
                requestBody
              );

              let next_assessment_date = new Date();
              next_assessment_date.setDate(
                next_assessment_date.getDate() + timerDays
              );

              await makeRequest("PATCH", "/users/me", {
                last_assessment_date: new Date().toISOString(),
                latest_menopause_history: requestBody?.menopause_history_id,
                next_assessment_date: next_assessment_date.toISOString(),
                show_dedicated_support_button: true,
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

  useEffect(() => {
    form.setFieldValue("BackgroundInformation", stepData.BackgroundInformation);
    form.setFieldValue("MedicalInformation", stepData.MedicalInformation);
    form.setFieldValue("MenopauseAssessment", stepData.MenopauseAssessment);
  }, [stepData]);

  const validateSection = (sectionData: any, sectionFormData: any) => {
    if (!sectionFormData || !sectionFormData.form_components) return false;

    // Filter out required questions
    const requiredQuestions = sectionFormData.form_components.filter(
      (component: any) => component.question_id.required
    );

    // Check if all required questions have been answered
    const missingRequiredQuestions = requiredQuestions.filter(
      (question: any) => {
        const questionId = question.question_id.id;
        const answer = sectionData[questionId];

        // Check different answer types
        if (answer === undefined || answer === null) return true;

        // For array answers (multi-select, checkboxes)
        if (Array.isArray(answer)) {
          return answer.length === 0;
        }

        // For string/number answers
        if (typeof answer === "string" || typeof answer === "number") {
          return answer.toString().trim() === "";
        }

        return false;
      }
    );

    return missingRequiredQuestions.length === 0;
  };
  const nextStep = (e: FormEvent) => {
    e.preventDefault();

    // Validation logic for each step
    switch (currentStep) {
      case 0:
        if (!isAccountValid) {
          toast.error("Please complete your account information");
          return;
        }
        break;

      case 1: // Background Information
        const backgroundValues = form.getFieldValue("BackgroundInformation");
        const isBackgroundValid = validateSection(
          backgroundValues,
          formData.backgroundInformation
        );

        if (!isBackgroundValid) {
          // Get the specific required questions that are missing
          const requiredQuestions =
            formData.backgroundInformation.form_components.filter(
              (component: any) => component.question_id.is_required
            );

          const missingQuestionNames = requiredQuestions
            .filter((question: any) => {
              const questionId = question.question_id.id;
              return !backgroundValues[questionId];
            })
            .map((question: any) => question.question_id.question);

          toast.error(
            `Please answer all required background questions:\n${missingQuestionNames.join(
              "\n"
            )}`
          );
          return;
        }

        // Save background information
        setStepData((prev: Object) => ({
          ...prev,
          BackgroundInformation: backgroundValues,
        }));
        break;

      case 2: // Medical Information
        const medicalValues = form.getFieldValue("MedicalInformation");
        const isMedicalValid = validateSection(
          medicalValues,
          formData.medicalInformation
        );

        if (!isMedicalValid) {
          const requiredQuestions =
            formData.medicalInformation.form_components.filter(
              (component: any) => component.question_id.is_required
            );

          const missingQuestionNames = requiredQuestions
            .filter((question: any) => {
              const questionId = question.question_id.id;
              return !medicalValues[questionId];
            })
            .map((question: any) => question.question_id.question);

          toast.error(
            `Please answer all required medical questions:\n${missingQuestionNames.join(
              "\n"
            )}`
          );
          return;
        }

        // Save medical information
        setStepData((prev: Object) => ({
          ...prev,
          MedicalInformation: medicalValues,
        }));
        break;

      case 3: // Menopause Assessment
        const menopauseValues = form.getFieldValue("MenopauseAssessment");
        const isMenopauseValid = validateSection(
          menopauseValues,
          formData.menopauseAssessment
        );

        if (!isMenopauseValid) {
          const requiredQuestions =
            formData.menopauseAssessment.form_components.filter(
              (component: any) => component.question_id.is_required
            );

          const missingQuestionNames = requiredQuestions
            .filter((question: any) => {
              const questionId = question.question_id.id;
              return !menopauseValues[questionId];
            })
            .map((question: any) => question.question_id.question);

          toast.error(
            `Please answer all required menopause assessment questions:\n${missingQuestionNames.join(
              "\n"
            )}`
          );
          return;
        }

        // Save menopause assessment
        setStepData((prev: Object) => ({
          ...prev,
          MenopauseAssessment: menopauseValues,
        }));
        break;
    }
    if (currentStep === 0 && !isAccountValid) {
      toast.error("Please complete your account information");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <YourAccount
            setPrivacy={setPrivacy}
            privacy={privacy}
            setIsAccountValid={setIsAccountValid}
          />
        );
      case 1:
        return (
          <BackgroundInformation
            form={form}
            formData={formData.backgroundInformation}
          />
        );
      case 2:
        return (
          <MedicalInformation
            form={form}
            formData={formData.medicalInformation}
          />
        );
      case 3:
        return (
          <MenopauseAssessment
            form={form}
            formData={formData.menopauseAssessment}
          />
        );
      default:
        return null;
    }
  };

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

      {/* Progress Indicator */}
      <div className="w-full mt-6">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-sm font-medium ${
                index <= currentStep ? "text-teal-500" : "text-gray-400"
              }`}>
              {step.title}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-teal-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}></div>
        </div>
      </div>

      <div className="bg-[#ffffff] mt-6 p-4 lg:p-6 rounded-lg shadow-lg">
        <form onSubmit={handleFinalSubmit}>
          {renderStep()}

          <div className="w-full flex items-center justify-between mt-10">
            <button
              type="button"
              onClick={prevStep}
              className={`px-5 py-2 border rounded-lg ${
                currentStep === 0 ? "invisible" : "bg-gray-200"
              }`}>
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                style={{ backgroundColor: "#14b8a6" }}
                className="px-5 py-2 border rounded-lg text-white">
                Next
              </button>
            ) : (
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    style={{ backgroundColor: "#14b8a6" }}
                    className={cn(
                      "border rounded-lg px-5 py-2 text-white",
                      !canSubmit &&
                        "bg-green-300 text-black disabled:cursor-not-allowed"
                    )}
                    type="submit"
                    disabled={!canSubmit}>
                    {isSubmitting ? "Loading..." : "Create my profile"}
                  </button>
                )}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPageUI;
