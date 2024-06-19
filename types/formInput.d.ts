import { FieldApi } from "@tanstack/react-form";

export interface TextInputTypes {
  field: FieldApi<any, any, any, any>;
  label?: string;
  placeholder: string;
  type?: string;
  isRequired?: boolean;
  bottomText?: string;
  className?: string;
  isDisabled?: boolean;
}

export interface SelectInputTypes {
  field: FieldApi<any, any, any, any>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  bottomText?: string;
  className?: string;
  isDisabled?: boolean;
  selectOptions: {
    value: string | number;
    label: string;
  }[];
  defaultValue?: string;
}

export interface MultipleCheckboxOption {
  value: string;
  label: string;
  className?: string;
}

export interface MultipleCheckboxInputTypes {
  field: FieldApi<any, any, any, any>;
  label?: string;
  options: CheckboxOption[];
  isRequired?: boolean;
  isDisabled?: boolean;
  containerClassName?: string;
}
