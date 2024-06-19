import React from "react";
import Title from "../Common/Title";
import RangeInput from "../FormInputs/RangeInput";

interface MenopauseAssessmentTypes {
  form?: any;
}

const MenopauseAssessment = ({ form }: MenopauseAssessmentTypes) => {
  return (
    <div className="w-full flex items-start justify-start gap-32">
      <div className="w-[20%] flex flex-col gap-3">
        <Title title="Menopause assessment" className="text-xl font-semibold" />
        <p className="text-xs font-normal">
          To help assess your symptoms and suggest a suitable level of care,
          please complete the following questions.
        </p>
        <p className="text-xs font-normal">
          Please tell us what is true for you and not just what you think should
          be true or what others want you to say.
        </p>
      </div>

      <div className="max-w-[40%] grid grid-cols-1 auto-rows-auto gap-x-10 gap-y-10">
        <div className="flex flex-col gap-3">
          <Title
            title="Menopause After Cancer Self-Assessment Tool"
            className="text-xl font-semibold"
          />

          <p className="text-xs font-normal">
            Please select one number to the right of each phrase to describe how
            much, <strong>DURING THE PAST WEEK</strong>, hot flushes have{" "}
            <strong>INTERFERED</strong> with each aspect of your life.
          </p>

          <p className="text-xs font-normal">
            <strong>Higher numbers</strong> indicate more interference with your
            life.
          </p>

          <p className="text-xs font-normal">
            If you are not experiencing hot flushes or if hot flushes do not
            interfere with these aspects of your life, please mark zero to the
            right of each question.
          </p>
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.work"
            children={(field: any) => (
              <RangeInput
                field={field}
                label="Work"
                subLabel="(Work outside the home and housework)"
              />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.social_activities"
            children={(field: any) => (
              <RangeInput
                field={field}
                label="Social activities"
                subLabel="(Time spent with family, friends, etc.)"
              />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.leisure_activities"
            children={(field: any) => (
              <RangeInput
                field={field}
                label="Leisure activities"
                subLabel="(Time spent relaxing, doing hobbies, etc.)"
              />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.sleep"
            children={(field: any) => (
              <RangeInput field={field} label="Sleep" />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.mood"
            children={(field: any) => <RangeInput field={field} label="Mood" />}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.concentration"
            children={(field: any) => (
              <RangeInput field={field} label="Concentration" />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.relations_with_others"
            children={(field: any) => (
              <RangeInput field={field} label="Relations with others" />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.sexuality"
            children={(field: any) => (
              <RangeInput field={field} label="Sexuality" />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.enjoyment_of_life"
            children={(field: any) => (
              <RangeInput field={field} label="Enjoyment of life" />
            )}
          />
        </div>

        <div>
          <form.Field
            name="MenopauseAssessment.quality_of_life"
            children={(field: any) => (
              <RangeInput field={field} label="The overall quality of life" />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default MenopauseAssessment;
