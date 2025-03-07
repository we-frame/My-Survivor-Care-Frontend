import { cn } from "@/lib/utils";
import { MultipleCheckboxInputTypes } from "@/types/formInput";
import React from "react";
import Question from "../Common/Question";
import { CustomTooltip } from "../Common/render-html";

const MultipleCheckboxInput: React.FC<MultipleCheckboxInputTypes> = ({
  field,
  label,
  options,
  isRequired = false,
  isDisabled = false,
  containerClassName = "",
  optionObject,
  tooltip = null,
}) => {
  let selectedOptions =
    (field.state.value?.length > 0 &&
      field.state.value?.map((el: any) => el && el.slice(1, -1))) ??
    [];

  let QuestionObject: { [key: string]: any } = {};

  if (optionObject) {
    optionObject.forEach((el: any) => {
      if (el?.option_id?.questions) {
        QuestionObject[el?.option_id?.id] = el?.option_id?.questions;
      }
    });
  }

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // console.log("config::::", selectedOptions, QuestionObject, optionObject);
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-normal">{label}</span>
          {/* {isRequired && <span className="text-red-500 ml-1">*</span>} */}
          {tooltip && (
            <span
              onClick={handleTooltipClick}
              onMouseDown={(e) => e.preventDefault()}>
              <CustomTooltip>
                <p>{tooltip}</p>
              </CustomTooltip>
            </span>
          )}
        </label>
      )}
      <div className={cn(containerClassName)}>
        {options.map((option) => (
          <label
            key={option?.value}
            className={`cursor-pointer label flex items-center justify-start gap-4 ${
              isDisabled ? "cursor-not-allowed" : ""
            }`}
          >
            <input
              type="checkbox"
              className={`checkbox checkbox-sm ${option?.className}`}
              value={option?.value}
              checked={field?.state?.value?.includes(option?.value)}
              onChange={(e) => {
                if (isDisabled) return;
                const value = e.target.value;
                const isChecked = e.target.checked;
                const currentValues = field?.state?.value || []; // Ensure it's always an array
                const newValue = isChecked
                  ? [...currentValues, value]
                  : currentValues.filter((v: string) => v !== value);
                field.handleChange(newValue);
              }}
              disabled={isDisabled}
            />
            <span className="text-sm font-normal">{option?.label}</span>
          </label>
        ))}
      </div>
      <div>
        {QuestionObject &&
          field.state.value?.length > 0 &&
          field.state.value.map((el: any) => {
            const question = QuestionObject?.[el?.slice(2, -2)];
            if (question) {
              return (
                <Question
                  key={question[0].question_id}
                  question_id={question[0].question_id}
                  form={field.form}
                  fieldName={field.name}
                />
              );
            }
            return null; // Add explicit return for when question is falsy
          })}
      </div>
      {field.state.meta.touchedErrors && (
        <p className="mt-2 text-xs font-medium text-red-500">
          {field.state.meta.touchedErrors}
        </p>
      )}
    </div>
  );
};

export default MultipleCheckboxInput;
