import React from "react";
import Title from "../Common/Title";
import RangeInput from "../FormInputs/RangeInput";

interface MenopauseAssessmentTypes {
  form?: any;
  formData?: any;
}

const MenopauseAssessment = ({ form, formData }: MenopauseAssessmentTypes) => {
  console.log(formData);
  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-start gap-7 lg:gap-32">
      <div className="w-full lg:w-[20%] flex flex-col gap-3">
        <Title title={formData?.title} className="text-xl font-semibold" />
        <p className="text-xs font-normal">{formData?.description}</p>
      </div>

      <div className="max-w-full lg:max-w-[40%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-10">
        <div className="flex flex-col gap-3">
          <Title title={formData?.title} className="text-xl font-semibold" />
          <p className="text-xs font-normal">{formData?.description}</p>
        </div>
        {formData?.form_components?.map((component: any) => {
          const { question_id } = component;
          if (question_id?.type === "multiple_response") {
            form?.MedicalInformation?.setValue(question_id?.id, []);
          } else {
            form?.MedicalInformation?.setValue(question_id?.id, "");
          }
          switch (question_id?.question_type) {
            case "range":
              return (
                <div key={question_id?.id}>
                  <form.Field
                    name={`MenopauseAssessment.${question_id?.id}`}
                    children={(field: any) => (
                      <RangeInput
                        field={field}
                        label={question_id?.question}
                        subLabel={question_id?.description}
                        isRequired={question_id?.required}
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

export default MenopauseAssessment;
