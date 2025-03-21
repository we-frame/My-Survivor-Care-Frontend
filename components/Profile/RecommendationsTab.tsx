import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { makeRequest } from "@/lib/api";
import { getUserDetails } from "@/lib/getUserAPI";
import { moderateText } from "@/data/moderate-symptom-text";
import RichText from "../Common/RichText";
import { ProfileActions } from "@/data/profile-button-actions";
import { Tooltip } from "@radix-ui/react-tooltip";
import { CustomTooltip } from "../Common/render-html";

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
  const [messageRating, setMessageRating] = useState(
    userData?.userData?.symptom_reassessment_logic?.message_rating ??
      userData?.userData?.latest_menopause_history?.average_rating
  );
  const [btnResponse, setBtnResponse] = useState(false);
  const { hormonal } = userData?.userData?.symptom_reassessment_logic ?? false;
  const previousRating = userData?.userData?.previous_rating ?? null;
  const [category, setCategory] = useState(getRatingCategory(averageRating));
  const [scoreChange, setScoreChange] = useState("same");

  useEffect(() => {
    if (
      userData?.userData?.latest_menopause_history?.average_rating !==
      averageRating
    ) {
      setAverageRating(
        userData?.userData?.latest_menopause_history?.average_rating ?? null
      );
    }
    setShowQuestion(
      (userData?.userData?.show_dedicated_support_button ?? true) &&
        !!userData?.userData?.previous_rating
    );
  }, [userData]);

  useEffect(() => {
    setCategory(getRatingCategory(averageRating));
    if (
      userData?.userData?.latest_menopause_history?.average_rating !==
        averageRating &&
      btnResponse
    ) {
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
    const scores =
      getRatingCategory(previousRating) == getRatingCategory(averageRating)
        ? "same"
        : previousRating < averageRating
        ? "increase"
        : "decrease";
    setScoreChange(scores);
  }, [averageRating, previousRating]);

  const Infos: any = {
    "0-3.9": {
      title: `To help address your symptoms, we recommend using the self-help program. `,
      subtitle: (
        <p>
          This self-help program is designed for women who are looking for
          non-medical options instead of menopause or hormone replacement
          therapy (HRT). Research suggests it works well for women dealing with
          menopause after cancer treatment. It has also been recommended by the
          North American Menopause Society (NAMS 2015)(read more here) and The
          National Institute for Health and Care Excellence (NICE, 2015b)(read
          more here) for hot flushes, night sweats, stress, sleep problems,
          anxiety and depressed mood during menopause.
        </p>
      ),
    },
    "4-6.9": {
      title: "Clinical Practice Guidelines ",
      subtitle: (
        <div>
          <p>
            Cancer patients dealing with menopausal symptoms often need a
            different approach for symptom management compared to women going
            through natural menopause. However, with proper care, most symptoms
            can be effectively managed. Clinical guidelines exist to help guide
            your doctors to provide suitable care. These guidelines can also
            help you make informed decisions about the available treatment
            options for managing your menopausal symptoms.
          </p>
          <br />
          <p>
            Based on this, we advise sharing this introductory letter and
            clinical guideline with your primary care doctor (GP) to work
            together on the best plan to manage your symptoms.
          </p>
        </div>
      ),
    },
    "7-10": {
      title: "Introductory letter to take to your GP",
      subtitle: (
        <div>
          <p>
            We advise you to ask for a referral to a specialist for more
            dedicated support, for example, a gynaecologist, oncologist,
            surgeon, or cancer care nurse. Please share this introductory letter
            with your doctor (GP).
          </p>
          <br />
          <div>
            <h2 className="font-semibold text-lg">
              Details of Specialist Menopause After Cancer Clinics
            </h2>
            <ol className="pl-4 pt-2 space-y-2">
              <li className="list-decimal">
                <p>
                  King Edward Memorial Hospital: The Menopausal Symptoms After
                  Cancer (MSAC) Clinic
                </p>
                <p>
                  For more information about the clinic, visit{" "}
                  <a
                    href="https://www.kemh.health.wa.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-violet-600">
                    www.kemh.health.wa.gov.au
                  </a>{" "}
                  <CustomTooltip>
                    <span>
                      From the home page, click on "Women's Health", and from
                      the dropdown list, click on "Menopause Services" to access
                      the contact details.
                    </span>
                  </CustomTooltip>
                </p>
              </li>
              <li className="list-decimal">
                <p>
                  The Royal Women's Hospital - The Menopause Symptoms After
                  Cancer Clinic
                </p>
                <p>
                  For more information about the clinic, visit{" "}
                  <a
                    href="https://www.thewomens.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-violet-600">
                    www.thewomens.org.au
                  </a>{" "}
                  <CustomTooltip>
                    <span>
                      From the home page, click on "Patients & visitors", and
                      select "Clinics and services". Scroll down to click on
                      "Menopause" and select "Menopause symptoms after cancer"
                      to access the contact details.
                    </span>
                  </CustomTooltip>
                </p>
              </li>
            </ol>
          </div>
        </div>
      ),
    },
  };

  const messages: any = {
    decrease: {
      "0-3.9": {
        message:
          "Thank you for using this reassessment tool.Your answers indicate that the impact of your symptoms has decreased from a quite disruptive and uncomfortable state to mildly disruptive.  Now, you can choose to self-manage your symptoms and/or continue working with your GP.",
        question: "Do you want to self-manage your symptoms now?",
        noResponse:
          "Thanks for using this reassessment tool. We hope you continue working with your GP to manage your symptoms.",
      },
      "4-6.9": {
        message:
          "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has decreased from highly disruptive to quite disruptive. Your GP may be able to take over managing your symptoms. You could ask your specialist to transfer your care to your GP or, you can continue with the current management plan with your specialists.",
        question: "Do you want to self-manage your symptoms now?",
        noResponse:
          "Thanks for using the reassessment tool. We hope you continue working with your specialist to reduce the impact of your symptoms.",
      },
    },
    increase: {
      "4-6.9": {
        message:
          "Thank you for using this reassessment tool. Your answers indicate that the impact of your symptoms has shifted from bit of an impact to quite an uncomfortable level. We recommend more dedicated support.",
        question: "Do you want more dedicated support?",
        noResponse:
          "Thanks for using the reassessment tool. We advise that you keep practicing the self-management tips to help reduce the impact of your symptoms.",
      },
      "7-10": {
        message: `Thank you for using this reassessment tool. Your answers suggest that the impact of your symptoms has shifted from quite a disruptive level to a more noticeable impact. We recommend seeking additional support.`,
        question: "Do you want more dedicated support?",
        noResponse:
          "Thanks for using the reassessment tool. We advise that you keep practicing the self-management tips to help reduce the impact of your symptoms.",
      },
    },
    same: {
      "0-3.9": {
        message:
          "Thank you for using this reassessment tool. Your answers show that your symptoms continue to have a bit of an impact on your daily life but are not too disruptive. We suggest continuing with your current self-management. If you feel this is not working for you, you could seek more dedicated support.",
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
          "Thank you for using this reassessment tool. Your answers suggest that your symptoms continue to have a high impact. This means that they are causing noticeable disruptions to your daily life.  We recommend continuing what you are doing with your specialist.",
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

    // console.log(typeof averageRating, previousRating, scoreChange, "ratings");

    async function PatchBtnResponse(response: string) {
      let message_rating = averageRating.toString();
      if (
        response === "yes" &&
        (scoreChange === "increase" || scoreChange === "same")
      ) {
        setBtnResponse(true);
        const rating = averageRating;
        if (rating >= 0 && rating <= 3.9) {
          message_rating = "4";
        }
        if (rating >= 4 && rating <= 6.9) {
          message_rating = "7";
        }
        if (rating >= 7 && rating <= 10) {
          message_rating = "8";
        }
      }
      setMessageRating(message_rating);
      await makeRequest("PATCH", "/users/me", {
        show_dedicated_support_button: false,
        symptom_reassessment_logic: {
          ...userData?.userData?.symptom_reassessment_logic,
          message_rating: message_rating,
        },
      }).then(() => {
        getUserDetails(setUser);
      });
    }
    PatchBtnResponse(response);
    setShowQuestion(false);
  };

  // const category = getRatingCategory(averageRating);
  // const scoreChange =
  //   getRatingCategory(previousRating) == getRatingCategory(averageRating)
  //     ? "same"
  //     : previousRating < averageRating
  //     ? "increase"
  //     : "decrease";
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
      {/* profile heading  */}
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
            title={`About your score: ${category}`}
            className="text-sm font-bold"
            // defaultChecked
          >
            <div className="w-full flex flex-col gap-3">
              <p className="text-xs font-normal">
                Thank you for using this tool to assess how your menopause
                symptoms affect your daily life. This result is based on the
                answers you provided for each question.
              </p>
              <p className="text-xs font-normal">
                Each option selected has a score of 0-10. To find out how your
                symptoms affect your life, we added the scores for each answer
                and divided them by the number of questions (=10).
              </p>
            </div>
          </Accordion>
        </div>
      </div>
      {/* results sections */}

      {averageRating == null || averageRating == undefined ? (
        <>
          {" "}
          <Title
            title="Profile Unavailable"
            className="text-3xl font-semibold my-5"
          />
          <p>
            Please complete your registration process by visiting{" "}
            <Link href={"/register"} className="underline text-violet-600">
              Register
            </Link>
          </p>
        </>
      ) : (
        <>
          <Title title="Results" className="text-3xl font-semibold my-5" />
          <p className="text-base my-3">{displayInfo?.message}</p>
          {showQuestion && displayInfo?.question ? (
            <div>
              <p className="text-base font-semibold mb-2">
                {displayInfo?.question}
              </p>
              <div className="flex  gap-3">
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
            </div>
          ) : previousRating === null || previousRating === undefined ? (
            <div className="space-y-5">
              <Title
                title={Infos[category].title}
                className="text-xl lg:text-2xl font-semibold my-5"
              />
              {Infos[category].subtitle}
              {/* {Number(averageRating) <= 3.9 ? (
                ""
              ) : (
                <Button
                  text="Download introductory letter"
                  className="text-white font-normal text-sm mt-5"
                  onClick={handleDownload}
                />
              )} */}
            </div>
          ) : (
            <div className="space-y-5">
              <Title
                title={Infos[category].title}
                className="text-xl lg:text-2xl font-semibold my-5"
              />
              {
                Infos[getRatingCategory(messageRating ?? averageRating)]
                  .subtitle
              }
              {Number(messageRating ?? averageRating ?? 0) > 3.9 &&
                Number(messageRating ?? averageRating ?? 0) < 7 && (
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
                      While you wait for your appointment to share your
                      introductory letter and the recommended clinical guideline
                      with your GP, you could try some self-help strategies at
                      home.
                    </p>
                    <p>
                      Click on this link to access the online{" "}
                      <Link
                        href="/profile"
                        className="text-violet-600 underline">
                        self-management platform
                      </Link>
                    </p>
                  </div>
                )}
            </div>
          )}
        </>
      )}

      {/* {!showQuestion &&} */}

      {/* {averageRating &&
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
        )} */}
      <div className="pt-6 flex gap-6">
        <Button
          text="Visit online self-management platform"
          btnBg=""
          link="/self-management"
          className="text-white "
        />
        {ProfileActions?.[getSymptomsHeading(averageRating ?? 0)]?.[
          "moderate-gp-button"
        ] && (
          <Button
            text="Download letter for GP"
            className=" border-1 border-[#cfcfcf]"
            btnBg="#F3F4F6"
            onClick={handleDownload}
          />
        )}
        {ProfileActions?.[getSymptomsHeading(averageRating ?? 0)]?.[
          "severe-gp-button"
        ] && (
          <Button
            text="Download letter for GP"
            className="border-1 border-[#cfcfcf]"
            btnBg="#F3F4F6"
            onClick={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default RecommendationsTab;
