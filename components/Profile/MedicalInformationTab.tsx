import React from "react";
import SelectInput from "../FormInputs/SelectInput";
import MultipleCheckboxInput from "../FormInputs/MultipleCheckboxInput";

interface MedicalInformationTabTypes {
  form: any;
  editMedicalInformation?: boolean;
}

const MedicalInformationTab = ({
  form,
  editMedicalInformation,
}: MedicalInformationTabTypes) => {
  return (
    <div className="max-w-[80%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-4">
      <div>
        <form.Field
          name="MedicalInformation.cancer_treatment"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              label="Have you had treatment for cancer, either currently or in the past?"
              isRequired
              className="w-full"
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="MedicalInformation.removal_ovaries"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              label="Did the treatment involve the removal of your ovaries?"
              isRequired
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="MedicalInformation.removal_uterus"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              label="Did the treatment involve the removal of your uterus or womb?"
              isRequired
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>

      <div>
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
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="MedicalInformation.cancer_type"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[{ label: "Breast", value: "breast" }]}
              label="What type of cancer were you first diagnosed with?"
              isRequired
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="MedicalInformation.type_of_breast_cancer"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                {
                  label: "progesterone-receptor-positive",
                  value: "Progesterone-receptor-positive",
                },
              ]}
              label="What specific type of breast cancer were you diagnosed with?"
              isRequired
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="MedicalInformation.other_cancers"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              label="Have you been diagnosed with any other cancer/s?"
              isRequired
              isDisabled={!editMedicalInformation}
            />
          )}
        />
      </div>
    </div>
  );
};

export default MedicalInformationTab;
