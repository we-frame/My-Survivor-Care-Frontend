import { cn } from "@/lib/utils";
import { MultipleCheckboxInputTypes } from "@/types/formInput";
import React from "react";

const MultipleCheckboxInput: React.FC<MultipleCheckboxInputTypes> = ({
  field,
  label,
  options,
  isRequired = false,
  isDisabled = false,
  containerClassName = "",
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-normal">{label}</span>
          {/* {isRequired && <span className="text-red-500 ml-1">*</span>} */}
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
              checked={field.state.value.includes(option?.value)}
              onChange={(e) => {
                if (isDisabled) return;
                const value = e.target.value;
                const isChecked = e.target.checked;
                const newValue = isChecked
                  ? [...field.state.value, value]
                  : field.state.value.filter((v: string) => v !== value);
                field.handleChange(newValue);
              }}
              disabled={isDisabled}
            />
            <span className="text-sm font-normal">{option?.label}</span>
          </label>
        ))}
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
