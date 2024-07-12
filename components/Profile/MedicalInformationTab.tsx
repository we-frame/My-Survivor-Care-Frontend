import React from "react";
import SelectInput from "../FormInputs/SelectInput";
import MultipleCheckboxInput from "../FormInputs/MultipleCheckboxInput";
import TextInput from "../FormInputs/TextInput";

interface MedicalInformationTabTypes {
  form: any;
  editMedicalInformation?: boolean;
  formData?: any;
}

const MedicalInformationTab = ({
  form,
  editMedicalInformation,
  formData,
}: MedicalInformationTabTypes) => {
  return (
    <div className="max-w-full lg:max-w-[80%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-4">
      {formData?.map((component: any) => {
        const { question } = component;

        switch (question?.question_type) {
          case "input":
            return (
              <div key={component?.id}>
                <form.Field
                  name={component?.id}
                  children={(field: any) => (
                    <TextInput
                      field={field}
                      label={question?.display_title}
                      isRequired={question?.required}
                      placeholder={question?.question}
                      type={question?.input_datatype}
                      // bottomText={question?.description}
                      isDisabled={!editMedicalInformation}
                    />
                  )}
                />
              </div>
            );
          case "select":
            return (
              <div key={component?.id}>
                <form.Field
                  name={component?.id}
                  children={(field: any) => (
                    <SelectInput
                      field={field}
                      selectOptions={question?.options?.map((option: any) => ({
                        label: option?.option_id?.title,
                        value: JSON.stringify([option?.option_id?.id]),
                      }))}
                      placeholder={question?.question}
                      label={question?.question}
                      isRequired={question?.required}
                      bottomText={question?.description}
                      defaultValue={
                        component?.answered_options[0]?.option_id?.id
                      }
                      isDisabled={!editMedicalInformation}
                    />
                  )}
                />
              </div>
            );
          case "multiple_checkbox":
            return (
              <div key={component?.id}>
                <form.Field
                  name={component?.id}
                  children={(field: any) => (
                    <MultipleCheckboxInput
                      containerClassName="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4"
                      field={field}
                      label={question?.question}
                      options={question?.options?.map((option: any) => ({
                        label: option?.option_id?.title,
                        value: option?.option_id?.id,
                      }))}
                      isRequired={true}
                      isDisabled={!editMedicalInformation}
                    />
                  )}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default MedicalInformationTab;
