import React from "react";
import TextInput from "../FormInputs/TextInput";
import SelectInput from "../FormInputs/SelectInput";

interface BackgroundInformationTabsTypes {
  form?: any;
  editBackgroundInfo?: boolean;
  formData?: any;
}

const BackgroundInformationTab = ({
  form,
  editBackgroundInfo,
  formData,
}: BackgroundInformationTabsTypes) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-x-0 gap-y-4">
      {formData?.map((component: any) => {
        const { question } = component;
        // if (question?.type === "multiple_response") {
        //   form?.MedicalInformation?.setValue(question?.id, []);
        // } else {
        //   form?.MedicalInformation?.setValue(question?.id, "");
        // }

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
                      isDisabled={!editBackgroundInfo}
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
                        // value: JSON.stringify([option?.option_id?.id]),
                        value: option?.option_id?.id,
                      }))}
                      placeholder={question?.question}
                      label={question?.question}
                      isRequired={question?.required}
                      bottomText={question?.description}
                      // defaultValue={"Hello"}
                      isDisabled={!editBackgroundInfo}
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

export default BackgroundInformationTab;
