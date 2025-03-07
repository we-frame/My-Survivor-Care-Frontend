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
  // console.log(formData, "Background Info");
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
          if (question_id?.type === "multiple_response") {
            form?.MedicalInformation?.setValue(question_id?.id, []);
          } else {
            form?.MedicalInformation?.setValue(question_id?.id, "");
          }

          switch (question_id?.question_type) {
            case "input":
              return (
                <div key={question_id?.id}>
                  <form.Field name={`BackgroundInformation.${question_id?.id}`}>
                    {(field: any) => (
                      <TextInput
                        field={field}
                        label={question_id?.question}
                        isRequired={question_id?.required}
                        placeholder={question_id?.question}
                        type={question_id?.input_datatype}
                        bottomText={question_id?.description}
                      />
                    )}
                  </form.Field>
                </div>
              );
            case "select":
              return (
                <div key={question_id?.id}>
                  <form.Field name={`BackgroundInformation.${question_id?.id}`}>
                    {(field: any) => {
                      const selected = field.getValue();
                      const descrptionBox = question_id?.options.filter(
                        (el: any) =>
                          el.option_id.id === (selected ?? "").slice(2, -2),
                      );

                      return (
                        <>
                          <SelectInput
                            field={field}
                            selectOptions={question_id?.options?.map(
                              (option: any) => ({
                                label: option?.option_id?.title,
                                value: JSON.stringify([option?.option_id?.id]),
                              }),
                            )}
                            options={question_id?.options.map(
                              (el: any) => el.option_id,
                            )}
                            placeholder={question_id?.question}
                            label={question_id?.question}
                            isRequired={question_id?.required}
                            bottomText={question_id?.description}
                            form={form}
                          />
                          {/* {descrptionBox.length > 0 &&
                            [
                              "prefer not to say",
                              "other (please describe)",
                              "prefer to self-describe",
                            ].includes(
                              descrptionBox[0].option_id.title.toLocaleLowerCase()
                            ) && (
                              <textarea
                                rows={4}
                                cols={33}
                                placeholder="Describe here"
                                className="border-2 rounded-lg px-3 py-2"></textarea>
                            )} */}
                        </>
                      );
                    }}
                  </form.Field>
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
