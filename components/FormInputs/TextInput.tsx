import React from "react";
import { TextInputTypes } from "@/types/formInput";
import { cn } from "@/lib/utils";

const TextInput: React.FC<TextInputTypes> = ({
  field,
  label = "",
  placeholder,
  type = "text",
  isRequired = false,
  bottomText = "",
  className = "",
  isDisabled = false,
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

        <input
          className={cn(
            className,
            type === "number" && "appearance-none",
            "input input-bordered w-full max-w-xs",
          )}
          placeholder={placeholder}
          type={type}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          required={isRequired}
          disabled={isDisabled}
        />

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

export default TextInput;
