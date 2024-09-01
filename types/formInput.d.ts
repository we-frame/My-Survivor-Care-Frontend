import { FieldApi } from "@tanstack/react-form";

// Interface for Text Input component props
export interface TextInputTypes {
  field: FieldApi<any, any, any, any>;
  label?: string;
  placeholder: string;
  type?: string;
  isRequired?: boolean;
  bottomText?: string;
  className?: string;
  isDisabled?: boolean;
  apiData?: any;
}

// Interface for Select Input component props
export interface SelectInputTypes {
  field: FieldApi<any, any, any, any>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  bottomText?: string;
  className?: string;
  isDisabled?: boolean;
  // Array of options for the select input, each option has a value and a label
  selectOptions: {
    value: string | number;
    label: string;
  }[];
  defaultValue?: string;
  options?: any;
  form?:any;
}

// Interface for individual Checkbox options in a Multiple Checkbox component
export interface MultipleCheckboxOption {
  value: string;
  label: string;
  className?: string;
}

// Interface for Multiple Checkbox Input component props
export interface MultipleCheckboxInputTypes {
  field: FieldApi<any, any, any, any>;
  label?: string;
  options: CheckboxOption[]; // Array of checkbox options
  isRequired?: boolean;
  isDisabled?: boolean;
  containerClassName?: string;
}

export interface RangeInputTypes {
  field?: FieldApi<any, any, any, any>;
  label?: string;
  subLabel?: string;
  containerClassName?: string;
  className?: string;
  rangeLength?: number;
  minValue?: number;
  maxValue?: number;
  rangeStep?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
}
