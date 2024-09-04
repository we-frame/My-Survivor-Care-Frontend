import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { makeRequest } from "@/lib/api";
import { getUserDetails } from "@/lib/getUserAPI";
import { moderateText } from "@/data/moderate-symptom-text";

const getRatingCategory = (rating: any) => {
  if (rating >= 0 && rating <= 3.9) return "0-3.9";
  if (rating >= 4 && rating <= 6.9) return "4-6.9";
  if (rating >= 7 && rating <= 10) return "7-10";
  return "";
};

const RecommendationsTab: React.FC = () => {
  const { userData, setUser } = useUserStore();
  const [showQuestion, setShowQuestion] = useState(true);
  const [userResponse, setUserResponse] = useState(null);
  const [averageRating, setAverageRating] = useState(
    userData?.userData?.latest_menopause_history?.average_rating ?? null
  );
  const [btnResponse, setBtnResponse] = useState(false);
  const { hormonal } = userData?.userData?.symptom_reassessment_logic ?? false;
  const previousRating = userData?.userData?.previous_rating ?? null;
  const [category, setCategory] = useState(getRatingCategory(averageRating));

  useEffect(() => {
    setAverageRating(
      userData?.userData?.latest_menopause_history?.average_rating ?? null
    );
  }, [userData]);

  useEffect(() => {
    setCategory(getRatingCategory(averageRating));
    if (averageRating && btnResponse) {
      const data = makeRequest(
        "POST",
        "/items/junction_directus_users_menopause_history",
        {
          menopause_history_id: {
            average_rating: averageRating,
          },
        }
      )
        .then(() =>
          makeRequest("PATCH", "/users/me", {
            last_assessment_date: new Date().toISOString(),
            latest_menopause_history: {
              ...userData?.userData?.latest_menopause_history,
              average_rating: averageRating,
            },
          })
        )
        .then((res) => getUserDetails(setUser));
    }
  }, [averageRating]);

  const Infos: any = {
    "0-3.9": {
      title: `To help address your symptoms, we recommend using the self-help program. `,
      subtitle: `This self-help program is designed for women who are looking for non-medical opDons instead of menopause or hormone replacement therapy (HRT). Research suggests it works well for women dealing with menopause after cancer treatment. It has also been recommended by the North American Menopause Society (NAMS 2015)(read more here) and The National Institute for Health and Care Excellence (NICE, 2015b)(read more here) for hot flushes, night sweats, stress, sleep problems, anxiety and depressed mood during menopause.`,
    },
    "4-6.9": {
      title: "Clinical Practice Guidelines ",
      subtitle:
        "Cancer patients dealing with menopausal symptoms often need a different approach for symptom management compared to women going through natural menopause. However, with proper care, most symptoms can be effectively managed. Clinical guidelines exist to help guide your doctors to provide suitable care. These guidelines can also help you make informed decisions about the available treatment opDons for managing your menopausal symptoms...",
    },
    "7-10": {
      title: "Introductory letter to take to your GP",
      subtitle: `We advise you to ask for a referral to a specialist for more dedicated support, for example, a gynaecologist, oncologist, surgeon, or cancer care nurse. Please share this introductory letter with your doctor (GP).`,
    },
  };

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
        message: `Thank you for using this reassessment tool. Your answers suggest that the impact of your symptoms has shifted from ${
          previousRating < 4
            ? "mild"
            : previousRating < 7
            ? "moderate"
            : "severe"
        } to severe. We recommend seeking additional support.`,
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
        onYesTitle: "Moderate symptoms",
      },
      "4-6.9": {
        message:
          "Thank you for using this reassessment tool. Your answers show that the impact of your symptoms remains at a moderate level. We advise continuing what you are doing with your primary care doctor (GP) using the clinical guideline recommendations. If you feel this is not working for you, you could seek additional support.",
        question: "Do you want more dedicated support?",
        onYesTitle: "Severe symptoms",
      },
      "7-10": {
        message:
          "Thank you for using this reassessment tool. Your answers suggest that the impact of your symptoms remains severe. We recommend continuing what you are doing with your specialist.",
        question:
          "Have you visited a specialist menopause after cancer clinic?",
        yesResponse:
          "We advise that you take your current report to your specialist for more care.",
        onYesTitle: "Severe symptoms",
        noResponse:
          "We advise asking for a referral from your GP to a specialist; for example, to a gynaecologist, oncologist, surgeon, cancer care nurse for more support.",
      },
    },
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
    if (response === "yes") {
      setBtnResponse(true);
      const rating = averageRating;
      if (rating >= 0 && rating <= 3.9) setAverageRating("4");
      if (rating >= 4 && rating <= 6.9) setAverageRating("7");
      if (rating >= 7 && rating <= 10) setAverageRating("8");
    }
  };

  // const category = getRatingCategory(averageRating);
  const scoreChange =
    previousRating > averageRating
      ? "decrease"
      : previousRating < averageRating
      ? "increase"
      : "same";
  const displayInfo: any = messages[scoreChange][category];

  const handleDownload = () => {
    // Create a link element, hide it, direct it towards the blob, and click it
    const link = document.createElement("a");
    const moderate = "MSC-letter-moderate.pdf";
    const severe = "MSC-letter-severe.pdf";
    link.href = `/${averageRating < 7 ? moderate : severe}`; // Path to your PDF file in the public folder
    link.download = averageRating < 7 ? moderate : severe; // The file name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up and remove the link
  };

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
            // defaultChecked
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

      {averageRating !== null && averageRating !== undefined ? (
        <div>
          <div className="space-y-5">
            <Title
              title={Infos[category].title}
              className="text-xl lg:text-2xl font-semibold my-5"
            />
            <p className="text-base font-normal">{Infos[category].subtitle}</p>
          </div>
          {previousRating == null ? (
            Number(averageRating) <= 3.9 ? (
              ""
            ) : (
              <Button
                text="Download introductory letter"
                className="text-white font-normal text-sm mt-5"
                onClick={handleDownload}
              />
            )
          ) : (
            <>
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
                  style={{ color: "green", fontWeight: 500 }}>
                  {displayInfo?.noResponse}
                </p>
              )}
              {userResponse === "yes" && (
                <p
                  className="text-base"
                  style={{ color: "green", fontWeight: 500 }}>
                  {displayInfo?.yesResponse}
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="w-full lg:w-[90%] flex flex-col items-start justify-start gap-5 mt-10 lg:mt-20">
          <Title title="" className="text-xl lg:text-2xl font-semibold" />
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

      {averageRating &&
        Number(averageRating ?? 0) > 3.9 &&
        Number(averageRating ?? 0) < 7 && (
          <div className="w-full lg:w-[90%] flex flex-col items-start justify-start gap-5 mt-10 ">
            <Title
              title={
                hormonal
                  ? moderateText?.hormonal.title
                  : moderateText.default.title
              }
              className="text-xl lg:text-2xl font-semibold"
            />
            {hormonal
              ? moderateText.hormonal.para.map((el) => <p>{el}</p>)
              : moderateText.default.para.map((el) => <p>{el}</p>)}
            {hormonal ? (
              <div>{moderateText.hormonal.richText}</div>
            ) : (
              <div>{moderateText.default.richText}</div>
            )}
            <p>
              While you wait for your appointment to share your introductory
              letter and the recommended clinical guideline with your GP, you
              could try some self-help strategies at home.
            </p>
            <p>
              Click on this link to access the online{" "}
              <Link href="/profile" className="text-violet-600 underline">
                self-management platform
              </Link>
            </p>
          </div>
        )}
    </div>
  );
};

export default RecommendationsTab;
