import React from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";

const RecommendationsTab = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full grid grid-cols-2 auto-rows-auto gap-10">
        <div className="flex flex-col items-start justify-start  gap-4">
          <p className="text-sm font-normal">Symptom severity</p>
          <Title title="Moderate symptoms" className="text-4xl font-semibold" />
          <Button
            text="Download my results"
            btnBg="#f3f4f6"
            className="text-black shadow-sm"
          />
        </div>
        <div>
          <Accordion
            title="About your score"
            className="text-sm font-bold"
            defaultChecked
            // groupName="recommendations-tab"
          >
            <div className="w-full flex flex-col gap-3">
              <p className="text-xs font-normal">
                This result is based on the tool you used to assess how your
                menopause symptoms interfere with your daily life. Based on your
                answers, your symptoms have a this level of interference.
              </p>
              <p className="text-xs font-normal">
                Each option selected has a score of 0-10. To find out how your
                symptoms affect your life, we added the scores for each answer
                and divided them by the number of questions.
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div className="w-[90%] flex flex-col items-start justify-start gap-5 mt-20">
        <Title
          title="Clinical Practice Guidelines"
          className="text-2xl font-semibold"
        />
        <p className="text-base font-normal">
          Cancer patients dealing with menopausal symptoms often need a
          different approach for symptom management compared to women going
          through natural menopause. However, with proper care, most symptoms
          can be effectively managed. Clinical guidelines exist to help guide
          your doctors to provide suitable care. These guidelines can also help
          you make informed decisions about the available treatment options for
          managing your menopausal symptoms.
        </p>
        <p className="text-base font-normal">
          Based on this, we advise sharing this introductory letter and clinical
          guideline with your primary care doctor (GP) to work together on the
          best plan to manage your symptoms.
        </p>

        <Button
          text="Download introductory letter"
          className="text-[#c7d2fe] font-normal text-sm"
        />
      </div>
    </div>
  );
};

export default RecommendationsTab;
