import React from "react";
import Title from "../Common/Title";
import SelectInput from "../FormInputs/SelectInput";
import MultipleCheckboxInput from "../FormInputs/MultipleCheckboxInput";
import TextInput from "../FormInputs/TextInput";

interface MedicalInformationTypes {
  form?: any;
  formData?: any;
}

const MedicalInformation = ({ form, formData }: MedicalInformationTypes) => {
  console.log(formData);
  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-7 lg:gap-32">
      <div className="w-full lg:w-[20%] flex flex-col gap-3">
        <Title title={formData?.title} className="text-xl font-semibold" />
        <p className="text-xs font-normal">{formData?.description}</p>
      </div>

      <div className="max-w-full lg:max-w-[80%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-4">
        {formData?.form_components?.map((component: any) => {
          const { question_id } = component;
          if (question_id?.type === "multiple_response") {
            form?.MedicalInformation?.setValue(question_id?.id, []);
          } else {
            form?.MedicalInformation?.setValue(question_id?.id, "");
          }
          switch (question_id?.question_type) {
            case "input":
              return (
                <div key={question_id?.id}>
                  <form.Field
                    name={`MedicalInformation.${question_id?.id}`}
                    children={(field: any) => (
                      <TextInput
                        field={field}
                        label={question_id?.question}
                        isRequired={question_id?.required}
                        placeholder={question_id?.question}
                        type={question_id?.input_datatype}
                        bottomText={question_id?.description}
                      />
                    )}
                  />
                </div>
              );
            case "select":
              return (
                <div key={question_id?.id}>
                  <form.Field
                    name={`MedicalInformation.${question_id?.id}`}
                    children={(field: any) => (
                      <SelectInput
                        field={field}
                        selectOptions={question_id?.options?.map(
                          (option: any) => ({
                            label: option?.option_id?.title,
                            value: JSON.stringify([
                              option?.option_id?.id,
                            ]),
                          })
                        )}
                        placeholder={question_id?.question}
                        label={question_id?.question}
                        isRequired={question_id?.required}
                        bottomText={question_id?.description}
                      />
                    )}
                  />
                </div>
              );
            case "multiple_checkbox":
              return (
                <div key={question_id?.id}>
                  <form.Field
                    name={`MedicalInformation.${question_id?.id}`}
                    children={(field: any) => (
                      <MultipleCheckboxInput
                        containerClassName="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4"
                        field={field}
                        label={question_id?.question}
                        options={question_id?.options?.map((option: any) => ({
                          label: option?.option_id?.title,
                          value: option?.option_id?.id,
                        }))}
                        isRequired={true}
                      />
                    )}
                  />
                </div>
              );
            default:
              return null;
          }
        })}

        {/* <div>
          <form.Field
            name="MedicalInformation.treatment_types"
            children={(field: any) => (
              <MultipleCheckboxInput
                containerClassName="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4"
                field={field}
                label="What type of treatment/s have you ever received or are currently receiving? (Select all that apply)"
                options={[
                  {
                    value: "chemotherapy",
                    label: "Chemotherapy",
                    className: "text-red-500",
                  },
                  {
                    value: "radiotherapy",
                    label: "Radiotherapy",
                    className: "text-blue-500",
                  },
                  {
                    value: "brachytherapy",
                    label: "Brachytherapy",
                    className: "text-green-500",
                  },
                  {
                    value: "surgery",
                    label: "Surgery",
                    className: "text-yellow-500",
                  },
                  {
                    value: "endocrine_therapy",
                    label: "Endocrine therapy",
                    className: "text-purple-500",
                  },
                  {
                    value: "stem_cell_transplant",
                    label: "Stem cell transplant",
                    className: "text-orange-500",
                  },
                  {
                    value: "immunotherapy",
                    label: "Immunotherapy",
                    className: "text-pink-500",
                  },
                  {
                    value: "targeted_therapy",
                    label: "Targeted therapy",
                    className: "text-gray-500",
                  },
                  { value: "unsure", label: "Unsure", className: "text-black" },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
                isRequired={true}
              />
            )}
          />
        </div> */}
      </div>
    </div>
  );
};

export default MedicalInformation;
