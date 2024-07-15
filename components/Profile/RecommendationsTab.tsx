import React from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";
import useUserStore from "@/store/userStore";

const RecommendationsTab = () => {
  const { userData } = useUserStore();
  const averageRating =
    userData?.userData?.latest_menopause_history?.average_rating;

  // Helper function to determine the message based on averageRating
  const getMessage = (rating: any) => {
    if (rating <= 3.9) {
      return "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from moderate to mild. Now, you can choose to self-manage your symptoms and/or continue working with your GP.";
    } else if (rating <= 6.9) {
      return "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from severe to moderate. Your GP may be able to take over managing your symptoms. You could ask your specialist to transfer your care to your GP or, you can continue with the current management plan with your specialists.";
    }
    return "";
  };

  return (
    <div className="flex flex-col">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-5 lg:gap-10">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="text-sm font-normal">Symptom severity</p>
          <Title
            title="Moderate symptoms"
            className="text-3xl lg:text-4xl font-semibold"
          />
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

      <div className="w-full lg:w-[90%] flex flex-col items-start justify-start gap-5 mt-10 lg:mt-20">
        {averageRating !== null && (
          <>
            <Title
              title="Results"
              className="text-xl lg:text-2xl font-semibold"
            />
            <p className="text-base font-normal">{getMessage(averageRating)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsTab;
