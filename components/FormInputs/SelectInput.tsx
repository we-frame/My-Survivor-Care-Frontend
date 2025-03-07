import React from "react";
import { SelectInputTypes } from "@/types/formInput";
import { cn } from "@/lib/utils";
import Question from "../Common/Question";
import { CustomTooltip } from "../Common/render-html";

const SelectInput: React.FC<SelectInputTypes> = ({
  field,
  label = "",
  placeholder = "",
  isRequired = false,
  bottomText = "",
  className = "",
  isDisabled = false,
  selectOptions,
  defaultValue = "",
  options = [],
  form,
  tooltip,
}) => {
  let subQuestion = options.find(
    (option: any) => option?.id === field.state?.value?.slice(2, -2)
  )?.questions;
  // console.log(field.state.value, "subQuestion", subQuestion, options[0]?.id);

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <label className="form-control w-full max-w-md">
          {label && (
            <div className="label flex justify-between flex-row">
              <span className="label-text font-normal">
                {label}

                {tooltip && (
                  <span
                    onClick={handleTooltipClick}
                    onMouseDown={(e) => e.preventDefault()}>
                    <CustomTooltip>
                      <p>{tooltip}</p>
                    </CustomTooltip>
                  </span>
                )}
                {/* {isRequired && <span className="text-red-500">*</span>} */}
              </span>
            </div>
          )}

          <select
            className={cn(`select select-bordered max-w-xs`, className)}
            name={field.name}
            required={isRequired}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            defaultValue={field.state.value}
            disabled={isDisabled}>
            {placeholder && (
              <option value="" disabled selected>
                {placeholder}
              </option>
            )}
            {selectOptions &&
              selectOptions.map(
                ({
                  value,
                  label,
                }: {
                  value: string | number;
                  label: string;
                }) => (
                  <option key={value} value={value} className="text-black">
                    {label}
                  </option>
                )
              )}
          </select>

          {bottomText && (
            <div className="label">
              <span className="label-text-alt">{bottomText}</span>
            </div>
          )}
        </label>
      </div>
      <>
        {
          <div>
            {Array.isArray(subQuestion) &&
              subQuestion.length > 0 &&
              subQuestion.map((question: any) => {
                // console.log(question.question_id, field.state.value);
                let questionId = question?.question_id?.id;
                if (typeof question?.question_id === "string") {
                  questionId = question?.question_id;
                } else {
                  questionId = question?.question_id?.id;
                }
                return (
                  <div key={questionId}>
                    {/* <>{console.log(form, "form")}</> */}
                    <Question
                      question_id={questionId}
                      fieldName={field.name}
                      form={form}
                    />
                  </div>
                );
              })}
          </div>
        }
      </>

      {field.state.meta.touchedErrors && (
        <p className="mt-2 text-xs font-medium text-red-500">
          {field.state.meta.touchedErrors}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
