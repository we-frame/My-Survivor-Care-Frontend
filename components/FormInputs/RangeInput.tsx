import React from "react";
import Title from "../Common/Title";
import { cn } from "@/lib/utils";
import { RangeInputTypes } from "@/types/formInput";

const RangeInput = ({
  field,
  label,
  subLabel,
  containerClassName,
  className,
  rangeLength = 10,
  minValue = 0,
  maxValue = 100,
  rangeStep = 10,
  isRequired = false,
  isDisabled = false,
}: RangeInputTypes) => {
  const rangeLabels = Array.from({ length: rangeLength + 1 }, (_, i) => i);

  return (
    <div
      className={cn(
        containerClassName,
        "w-full flex flex-col lg:flex-row items-start justify-start gap-10"
      )}
    >
      {(label || subLabel) && (
        <div className="w-full lg:w-[35%]">
          {label && <Title title={label} className="text-sm font-semibold" />}
          {subLabel && <p className="text-xs font-normal">{subLabel}</p>}
        </div>
      )}
      <div className="w-full">
        <input
          type="range"
          name={field?.name}
          required={isRequired}
          value={field?.state?.value || 0}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={isDisabled}
          min={minValue}
          max={maxValue}
          className={cn(className, "range range-xs")}
          step={rangeStep}
        />
        <div className="w-full flex justify-between text-xs px-1">
          {rangeLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
