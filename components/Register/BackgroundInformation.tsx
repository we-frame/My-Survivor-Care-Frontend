import React from "react";
import Title from "../Common/Title";
import TextInput from "../FormInputs/TextInput";
import SelectInput from "../FormInputs/SelectInput";

interface BackgroundInformationTypes {
  form?: any;
  showHeading?: boolean;
  formData: any;
}

const BackgroundInformation = ({
  form,
  showHeading = true,
  formData,
}: BackgroundInformationTypes) => {
  console.log(formData)
  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-7 lg:gap-32">
      {showHeading && (
        <div className="w-full lg:w-[20%] flex flex-col gap-3">
          <Title title={formData?.title} className="text-xl font-semibold" />
          <p className="text-xs font-normal">{formData?.description}</p>
        </div>
      )}
      <div className="max-w-full lg:max-w-[80%] grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-x-10 gap-y-4">
        {formData?.form_components?.map((component: any) => {
          const { question_id } = component;
          switch (question_id?.question_type) {
            case "input":
              return (
                <div key={question_id?.id}>
                  <form.Field
                    name={`BackgroundInformation.${question_id?.id}`}
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
                    name={`BackgroundInformation.${question_id?.id}`}
                    children={(field: any) => (
                      <SelectInput
                        field={field}
                        selectOptions={question_id?.options?.map(
                          (option: any) => ({
                            label: option?.option_id?.title,
                            value: option?.option_id?.id,
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
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BackgroundInformation;
