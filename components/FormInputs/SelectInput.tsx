import React from "react";
import { SelectInputTypes } from "@/types/formInput";
import { cn } from "@/lib/utils";

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
}) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        {label && (
          <div className="label">
            <span className="label-text font-normal">
              {label}
              {/* {isRequired && <span className="text-red-500">*</span>} */}
            </span>
          </div>
        )}

        <select
          className={cn(`select select-bordered`, className)}
          name={field.name}
          required={isRequired}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          defaultValue={field.state.value || defaultValue}
          disabled={isDisabled}
        >
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {selectOptions &&
            selectOptions.map(
              ({ value, label }: { value: string | number; label: string }) => (
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

      {field.state.meta.touchedErrors && (
        <p className="mt-2 text-xs font-medium text-red-500">
          {field.state.meta.touchedErrors}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
