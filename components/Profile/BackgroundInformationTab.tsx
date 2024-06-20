import React from "react";
import TextInput from "../FormInputs/TextInput";
import SelectInput from "../FormInputs/SelectInput";

interface BackgroundInformationTabsTypes {
  form?: any;
  editBackgroundInfo?: boolean;
}

const BackgroundInformationTab = ({
  form,
  editBackgroundInfo,
}: BackgroundInformationTabsTypes) => {
  return (
    <div className="grid grid-cols-2 auto-rows-auto gap-x-0 gap-y-4">
      <div>
        <form.Field
          name="BackgroundInformation.name"
          children={(field: any) => (
            <TextInput
              field={field}
              label="Name"
              isRequired
              placeholder="Name"
              type="text"
              isDisabled={!editBackgroundInfo}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="BackgroundInformation.dob"
          children={(field: any) => (
            <TextInput
              field={field}
              label="Date of birth"
              isRequired
              placeholder="Date of birth"
              type="date"
              isDisabled={!editBackgroundInfo}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="BackgroundInformation.preferred_pronoun"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                { label: "She", value: "she" },
                { label: "Her", value: "her" },
                { label: "Hers", value: "hers" },
              ]}
              placeholder="She/Her/Hers"
              label="Preferred Pronoun"
              isRequired
              isDisabled={!editBackgroundInfo}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="BackgroundInformation.ethnic_group"
          children={(field: any) => (
            <SelectInput
              field={field}
              selectOptions={[
                { label: "Sure", value: "sure" },
                { label: "Unsure", value: "unsure" },
              ]}
              defaultValue="unsure"
              label="Ethnic group/ancestry"
              isRequired
              isDisabled={!editBackgroundInfo}
            />
          )}
        />
      </div>

      <div>
        <form.Field
          name="BackgroundInformation.postcode"
          children={(field: any) => (
            <TextInput
              field={field}
              label="Postcode"
              type="number"
              placeholder="3000"
              isRequired
              isDisabled={!editBackgroundInfo}
            />
          )}
        />
      </div>
    </div>
  );
};

export default BackgroundInformationTab;
