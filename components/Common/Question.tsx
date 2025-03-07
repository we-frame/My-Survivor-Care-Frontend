"use client";

import { useEffect, useState } from "react";
import SelectInput from "../FormInputs/SelectInput";
import { Field } from "@tanstack/react-form";
import toast from "react-hot-toast";
import TextInput from "../FormInputs/TextInput";
import MultipleCheckboxInput from "../FormInputs/MultipleCheckboxInput";
import { useAssessment } from "@/hooks/useAssessment";
interface QuestionProps {
  question_id: string;
  fieldName?: string;
  form?: any;
}

export default function Question({
  question_id,
  fieldName = "",
  form,
}: QuestionProps) {
  const [options, setOptions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);

  // Use React Query to fetch question details
  const {
    data: question,
    isLoading,
    error,
  } = useAssessment().getQuestionDetails(question_id);

  // Process question data when it's available
  useEffect(() => {
    if (question) {
      try {
        const optionData = question.options.map((option: any) => {
          return {
            value: JSON.stringify([option?.option_id?.id]),
            label: option?.option_id?.title,
          };
        });

        setAnswers(question?.options?.map((option: any) => option?.option_id));
        setOptions([...optionData]);
      } catch (error) {
        console.error("Error processing question data:", error);
        toast.error("Error processing question data");
      }
    }
  }, [question]);

  // Show loading state
  if (isLoading) {
    return <div>Loading question...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error loading question. Please try again.</div>;
  }

  const name = fieldName.substring(0, fieldName.indexOf("."));

  return (
    question && (
      <div className="mt-4">
        {/* <p>{question?.question_type}</p> */}
        <Field form={form} name={`${name}.${question?.id}`}>
          {(field: any) => {
            switch (question?.question_type) {
              case "input":
                return (
                  <TextInput
                    field={field}
                    label={question?.question}
                    isRequired={question?.required}
                    placeholder={question?.question}
                    type={question?.input_datatype}
                    bottomText={question?.description}
                  />
                );

              case "multiple_checkbox":
                return (
                  <MultipleCheckboxInput
                    containerClassName="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4"
                    field={field}
                    label={question?.question}
                    options={options}
                    isRequired={true}
                    optionObject={question?.options}
                  />
                );

              default:
                return (
                  <SelectInput
                    field={field}
                    selectOptions={options}
                    label={question?.question}
                    options={answers}
                    form={form}
                    placeholder={question?.question}
                    isRequired={question?.required}
                    bottomText={question?.bottomText}
                  />
                );
            }
          }}
        </Field>
      </div>
    )
  );

  // const { field } = form;
  // const [optionData, setOptionData] = useState<any>([]);
  // const [questionData, setQuestionData] = useState([]);
  // const [field, setField] = useState({});

  // //   console.log("Question ::", field.getValue());
  // console.log(question_id, "questionId");
  // useEffect(() => {
  //   const id = question_id;
  //   makeRequest(
  //     "GET",
  //     `/items/option/${id}?fields=questions.question_id.*.*`
  //   ).then((res: any) => setQuestionData(res.data?.questions ?? []));
  //   //   setQuestionData(res.data ?? { question_id: null })
  // }, [question_id]);

  // // console.log(questionData, "Questions");
  // return questionData
  //   ? questionData.map((question: any) => {
  //       let { question_id } = question;
  //       console.log("Question:::", question);
  //       return (
  //         <form.Field
  //           name={`MedicalAssessment.${question_id?.id ?? "question"}`}
  //           children={(field: any) => {
  //             const value = field.getValue();
  //             let answ = [];
  //             makeRequest(
  //               "GET",
  //               `/items/question/${question_id?.id}?fields=options.option_id.*`
  //             ).then((res: any) => {
  //               console.log(res.data, "options");
  //               setOptionData(res.data);
  //             });

  //             return (
  //               <SelectInput
  //                 label={question_id?.question ?? ""}
  //                 field={field}
  //                 selectOptions={
  //                   Array.isArray(optionData?.options) &&
  //                   optionData?.options.map((option: any) => ({
  //                     label: option?.option_id?.title,
  //                     value: option?.option_id?.id,
  //                   }))
  //                 }
  //                 placeholder="Select an option"
  //                 isRequired={true}
  //               />
  //             );
  //           }}
  //         />
  //       );
  //     })
  //   : null;
}
