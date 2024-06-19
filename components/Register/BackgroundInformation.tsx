import React from "react";
import Title from "../Common/Title";
import TextInput from "../FormInputs/TextInput";
import SelectInput from "../FormInputs/SelectInput";

interface BackgroundInformationTypes {
  form?: any;
}

const BackgroundInformation = ({ form }: BackgroundInformationTypes) => {
  return (
    <div className="w-full flex items-start justify-start gap-32">
      <div className="w-[20%] flex flex-col gap-3">
        <Title
          title="Background Information"
          className="text-xl font-semibold"
        />
        <p className="text-xs font-normal">
          Menopausal symptoms in cancer survivors vary from person to person. To
          figure out how your traits may affect your symptoms, we need some
          information about you.
        </p>
        <p className="text-xs font-normal">
          Sharing this information helps us give you the best care and support.
          Some information will also help us customise this site for you.
        </p>
      </div>

      <div className="max-w-[80%] grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4">
        <div>
          <form.Field
            name="BackgroundInformation.name"
            // validators={{
            //   onChange: ({ value }: any) =>
            //     !value ? "Firstname is required" : undefined,
            // }}
            children={(field: any) => (
              <TextInput
                field={field}
                label="Name"
                isRequired
                placeholder="Name"
                type="text"
                bottomText="This will be used to personalise the platform. For example, how your name will look on the website."
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
                bottomText="Your age is important when it comes to assessing how menopause may affect you."
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
                bottomText="This will help us identify you on this platform."
                isRequired
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
                bottomText="This can help us to further understand the symptoms you experience."
                isRequired
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
                bottomText="This gives us a sense of where our users are located across Australia."
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundInformation;
