import React, { useState } from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";
import useUserStore from "@/store/userStore";
import Link from "next/link";

const RecommendationsTab: React.FC = () => {
  const { userData } = useUserStore();
  const [showQuestion, setShowQuestion] = useState(true);
  const [userResponse, setUserResponse] = useState(null);
  const averageRating =
    userData?.userData?.latest_menopause_history?.average_rating ?? null;
  const previousRating = userData?.userData?.previous_rating ?? null;

  const messages: any = {
    decrease: {
      "0-3.9": {
        message:
          "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from moderate to mild. Now, you can choose to self-manage your symptoms and/or continue working with your GP.",
        question: "Do you want to self-manage your symptoms now?",
        noResponse:
          "Thanks for using this reassessment tool. We hope you continue working with your GP to manage your symptoms.",
      },
      "4-6.9": {
        message:
          "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from severe to moderate. Your GP may be able to take over managing your symptoms. You could ask your specialist to transfer your care to your GP or, you can continue with the current management plan with your specialists.",
        question: "Do you want to self-manage your symptoms now?",
        noResponse:
          "Thanks for using the reassessment tool. We hope you continue working with your specialist to reduce the impact of your symptoms.",
      },
    },
    increase: {
      "4-6.9": {
        message:
          "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has shifted from mild to moderate. We recommend more dedicated support.",
        question: "Do you want more dedicated support?",
        noResponse:
          "Thanks for using the reassessment tool. We advise that you keep practicing the self-management tips to help reduce the impact of your symptoms.",
      },
      "7-10": {
        message:
          "Thank you for using this reassessment tool. Your answers suggest that the impact of your symptoms has shifted from moderate to severe. We recommend seeking additional support.",
        question: "Do you want more dedicated support?",
        noResponse:
          "Thanks for using the reassessment tool. We advise that you keep practicing the self-management tips to help reduce the impact of your symptoms.",
      },
    },
    same: {
      "0-3.9": {
        message:
          "Thank you for using this reassessment tool. Your answers show that the impact of your symptoms remains mild. We suggest continuing with your current self-management. If you feel this is not working for you, you could seek more dedicated support.",
        question: "Do you want more dedicated support?",
      },
      "4-6.9": {
        message:
          "Thank you for using this reassessment tool. Your answers show that the impact of your symptoms remains at a moderate level. We advise continuing what you are doing with your primary care doctor (GP) using the clinical guideline recommendations. If you feel this is not working for you, you could seek additional support.",
        question: "Do you want more dedicated support?",
      },
      "7-10": {
        message:
          "Thank you for using this reassessment tool. Your answers suggest that the impact of your symptoms remains severe. We recommend continuing what you are doing with your specialist.",
        question:
          "Have you visited a specialist menopause after cancer clinic?",
        yesResponse:
          "We advise that you take your current report to your specialist for more care.",
        noResponse:
          "We advise asking for a referral from your GP to a specialist; for example, to a gynaecologist, oncologist, surgeon, cancer care nurse for more support.",
      },
    },
  };

  const getRatingCategory = (rating: any) => {
    if (rating >= 0 && rating <= 3.9) return "0-3.9";
    if (rating >= 4 && rating <= 6.9) return "4-6.9";
    if (rating >= 7 && rating <= 10) return "7-10";
    return "";
  };

  const getSymptomsHeading = (rating: any) => {
    if (rating >= 0 && rating <= 3.9) return "Mild symptoms";
    if (rating >= 4 && rating <= 6.9) return "Moderate symptoms";
    if (rating >= 7 && rating <= 10) return "Severe symptoms";
    return "Symptoms";
  };

  const handleButtonClick = (response: any) => {
    setUserResponse(response);
    setShowQuestion(false);
  };

  const category = getRatingCategory(averageRating);
  const scoreChange =
    previousRating > averageRating
      ? "decrease"
      : previousRating < averageRating
      ? "increase"
      : "same";
  const displayInfo: any = messages[scoreChange][category];

  return (
    <div className="flex flex-col">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-5 lg:gap-10">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="text-sm font-normal">Symptom severity</p>
          <Title
            title={getSymptomsHeading(averageRating)}
            className="text-3xl lg:text-4xl font-semibold"
          />

          <Link href={averageRating ? "/download-result" : "#"}>
            <Button
              text="Download my results"
              btnBg="#f3f4f6"
              className="text-black shadow-sm"
              disabled={!averageRating}
            />
          </Link>
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
                answers, your symptoms have this level of interference.
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

      {averageRating ? (
        <div>
          <Title title="Results" className="text-3xl font-semibold my-5" />
          <p className="text-base my-3">{displayInfo?.message}</p>
          {showQuestion && (
            <div className="flex gap-3">
              <Button
                text="Yes"
                btnBg="#14b8a6"
                onClick={() => handleButtonClick("yes")}
              />
              <Button
                text="No"
                btnBg="#f44336"
                onClick={() => handleButtonClick("no")}
              />
            </div>
          )}
          {userResponse === "no" && (
            <p
              className="text-base"
              style={{ color: "green", fontWeight: 500 }}
            >
              {displayInfo?.noResponse}
            </p>
          )}
          {userResponse === "yes" && (
            <p
              className="text-base"
              style={{ color: "green", fontWeight: 500 }}
            >
              {displayInfo?.yesResponse}
            </p>
          )}
        </div>
      ) : (
        <div className="w-full lg:w-[90%] flex flex-col items-start justify-start gap-5 mt-10 lg:mt-20">
          <Title
            title="Clinical Practice Guidelines"
            className="text-xl lg:text-2xl font-semibold"
          />
          <p className="text-base font-normal">
            Cancer patients dealing with menopausal symptoms often need a
            different approach for symptom management compared to women going
            through natural menopause. However, with proper care, most symptoms
            can be effectively managed. Clinical guidelines exist to help guide
            your doctors to provide suitable care. These guidelines can also
            help you make informed decisions about the available treatment
            options for managing your menopausal symptoms.
          </p>
          <p className="text-base font-normal">
            Based on this, we advise sharing this introductory letter and
            clinical guideline with your primary care doctor (GP) to work
            together on the best plan to manage your symptoms.
          </p>

          <Button
            text="Download introductory letter"
            className="text-white font-normal text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default RecommendationsTab;
