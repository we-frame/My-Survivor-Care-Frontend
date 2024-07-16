import React, { useState } from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";
import useUserStore from "@/store/userStore";
import Link from "next/link";

const RecommendationsTab: React.FC = () => {
  const { userData } = useUserStore();
  const averageRating: number | null =
    userData?.userData?.latest_menopause_history?.average_rating ?? null;
  const [showQuestion, setShowQuestion] = useState<boolean>(true);
  const [userResponse, setUserResponse] = useState<string | null>(null);

  const handleYesClick = () => {
    setUserResponse("yes");
    setShowQuestion(false);
  };

  const handleNoClick = () => {
    setUserResponse("no");
    setShowQuestion(false);
  };

  const getMessage = (rating: number): string => {
    if (rating <= 3.9) {
      return "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from moderate to mild. Now, you can choose to self-manage your symptoms and/or continue working with your GP.";
    } else if (rating <= 6.9) {
      return "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from severe to moderate. Your GP may be able to take over managing your symptoms. You could ask your specialist to transfer your care to your GP or, you can continue with the current management plan with your specialists.";
    } else if (rating >= 4 && rating <= 6.9) {
      return "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has shifted from mild to moderate. We recommend more dedicated support.";
    } else if (rating >= 7 && rating <= 10) {
      return "Thank you for using this reassessment tool. Your answers suggest that the impact of your symptoms has shifted from moderate to severe. We recommend seeking additional support.";
    }
    return "";
  };

  const getFollowUpMessage = (rating: number, response: string): string => {
    if (rating <= 3.9) {
      return response === "no"
        ? "Thanks for using this reassessment tool. We hope you continue working with your GP to manage your symptoms."
        : "";
    } else if (rating <= 6.9) {
      return response === "no"
        ? "Thanks for using the reassessment tool. We hope you continue working with your specialist to reduce the impact of your symptoms."
        : "";
    } else if (rating >= 4 && rating <= 6.9) {
      return response === "no"
        ? "Thanks for using the reassessment tool. We advise that you keep practicing the self-management tips to help reduce the impact of your symptoms."
        : "";
    } else if (rating >= 7 && rating <= 10) {
      return response === "no"
        ? "Thanks for using the reassessment tool. We hope you continue working with your GP to reduce the impact of your symptoms."
        : "";
    }
    return "";
  };

  const getQuestion = (rating: number): string => {
    if (rating <= 3.9) {
      return "Do you want to self-manage your symptoms now?";
    } else if (rating <= 6.9) {
      return "Do you want to self-manage your symptoms now?";
    } else if (rating >= 4 && rating <= 6.9) {
      return "Do you want more dedicated support?";
    } else if (rating >= 7 && rating <= 10) {
      return "Do you want more dedicated support?";
    }
    return "";
  };

  const getButtonResponse = (rating: number): string => {
    if (rating >= 7 && rating <= 10) {
      return "Have you visited a specialist menopause after cancer clinic?";
    }
    return "";
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
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
          <Link href={"/download-result"}>
            <Button
              text="Download my results"
              btnBg="#f3f4f6"
              className="text-black shadow-sm"
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

      <div className="w-full lg:w-[90%] flex flex-col items-start justify-start gap-5 mt-10 lg:mt-20">
        {averageRating !== null && (
          <>
            <Title
              title="Results"
              className="text-xl lg:text-2xl font-semibold"
            />
            <p className="text-base font-normal">{getMessage(averageRating)}</p>
            {showQuestion ? (
              <div className="flex flex-col gap-3">
                <p className="text-base font-normal">
                  {getQuestion(averageRating)}
                </p>
                <div className="flex gap-3">
                  <Button
                    text="Yes"
                    btnBg="#14b8a6"
                    className="text-white"
                    onClick={handleYesClick}
                  />
                  <Button
                    text="No"
                    btnBg="#f44336"
                    className="text-white"
                    onClick={handleNoClick}
                  />
                </div>
              </div>
            ) : (
              <Button
                text="Show Question"
                btnBg="#f3f4f6"
                className="text-black shadow-sm"
                onClick={handleShowQuestion}
              />
            )}
            {userResponse && (
              <p className="text-base font-normal">
                {getFollowUpMessage(averageRating, userResponse)}
              </p>
            )}
            {averageRating >= 7 && averageRating <= 10 && (
              <div className="flex flex-col gap-3 mt-5">
                <p className="text-base font-normal">
                  {getButtonResponse(averageRating)}
                </p>
                <div className="flex gap-3">
                  <Button
                    text="Yes"
                    btnBg="#4caf50"
                    className="text-white"
                    onClick={handleYesClick}
                  />
                  <Button
                    text="No"
                    btnBg="#f44336"
                    className="text-white"
                    onClick={handleNoClick}
                  />
                </div>
                {userResponse && (
                  <p className="text-base font-normal">
                    {userResponse === "no"
                      ? "We advise asking for a referral from your GP to a specialist; for example, to a gynaecologist, oncologist, surgeon, cancer care nurse for more support."
                      : "We advise that you take your current report to your specialist for more care."}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsTab;
