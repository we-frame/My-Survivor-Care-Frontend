import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import Button from "../Common/Button";
import Accordion from "../Common/Accordion";
import Link from "next/link";
import { makeRequest } from "@/lib/api";
import { moderateText } from "@/data/moderate-symptom-text";
import RichText from "../Common/RichText";
import { ProfileActions } from "@/data/profile-button-actions";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useReassessmentMessages } from "@/hooks/useReassessmentMessages";

const getRatingCategory = (rating: any) => {
  if (rating >= 0 && rating <= 3.9) return "0-3.9";
  if (rating >= 4 && rating <= 6.9) return "4-6.9";
  if (rating >= 7 && rating <= 10) return "7-10";
  return "";
};

const RecommendationsTab: React.FC = () => {
  const { user, isLoading, updateProfile } = useUser();
  const queryClient = useQueryClient();
  const { getRecommendations } = useRecommendations();
  const { data: recommendations, isLoading: isLoadingRecommendations } =
    getRecommendations();
  const { data: reassessmentMessages, isLoading: isLoadingMessages } =
    useReassessmentMessages();

  const [showQuestion, setShowQuestion] = useState(true);
  const [userResponse, setUserResponse] = useState(null);
  const [averageRating, setAverageRating] = useState(
    user?.latest_menopause_history?.average_rating ?? null,
  );
  const [messageRating, setMessageRating] = useState(
    user?.symptom_reassessment_logic?.message_rating ??
      user?.latest_menopause_history?.average_rating,
  );
  const [btnResponse, setBtnResponse] = useState(false);
  const { hormonal } = user?.symptom_reassessment_logic ?? false;
  const previousRating = user?.previous_rating ?? null;
  const [category, setCategory] = useState(getRatingCategory(averageRating));
  const [scoreChange, setScoreChange] = useState("same");

  useEffect(() => {
    if (user?.latest_menopause_history?.average_rating !== averageRating) {
      setAverageRating(user?.latest_menopause_history?.average_rating ?? null);
    }
    setShowQuestion(
      (user?.show_dedicated_support_button ?? true) && !!user?.previous_rating,
    );
  }, [user, averageRating]);

  useEffect(() => {
    setCategory(getRatingCategory(averageRating));
    if (
      user?.latest_menopause_history?.average_rating !== averageRating &&
      btnResponse
    ) {
      makeRequest("POST", "/items/junction_directus_users_menopause_history", {
        menopause_history_id: {
          average_rating: averageRating,
        },
      })
        .then(() =>
          makeRequest("PATCH", "/users/me", {
            last_assessment_date: new Date().toISOString(),
            latest_menopause_history: {
              ...user?.latest_menopause_history,
              average_rating: averageRating,
            },
          }),
        )
        .then((updatedUser) => {
          updateProfile.mutate(updatedUser);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          toast.error("Failed to update profile");
        });
    }
    const scores =
      getRatingCategory(previousRating) == getRatingCategory(averageRating)
        ? "same"
        : previousRating < averageRating
          ? "increase"
          : "decrease";
    setScoreChange(scores);
  }, [
    averageRating,
    previousRating,
    btnResponse,
    user?.latest_menopause_history,
    updateProfile,
  ]);

  // Find the recommendation that matches the current rating category
  const currentRecommendation = recommendations?.find(
    (rec) => rec.rating_range === category,
  );

  // Transform reassessment messages into the format expected by the component
  const messages = reassessmentMessages?.reduce((acc, message) => {
    if (!acc[message.change_direction]) {
      acc[message.change_direction] = {};
    }

    acc[message.change_direction][message.score_range] = {
      message: message.message,
      question: message.question,
      yesResponse: message.yes_response,
      noResponse: message.no_response,
      onYesTitle: message.on_yes_title,
    };

    return acc;
  }, {} as any) ?? {
    // Fallback messages when API data is not available
    decrease: {},
    increase: {},
    same: {},
  };

  // Fallback object for when recommendations are not available
  const fallbackInfos: any = {
    "0-3.9": {
      title: "No recommendation available",
      subtitle: <p>Please try again later.</p>,
    },
    "4-6.9": {
      title: "No recommendation available",
      subtitle: <p>Please try again later.</p>,
    },
    "7-10": {
      title: "No recommendation available",
      subtitle: <p>Please try again later.</p>,
    },
  };

  const Infos = recommendations ? {} : fallbackInfos;

  const getSymptomsHeading = (rating: any) => {
    if (rating >= 0 && rating <= 3.9) return "Mild symptoms";
    if (rating >= 4 && rating <= 6.9) return "Moderate symptoms";
    if (rating >= 7 && rating <= 10) return "Severe symptoms";
    return "Symptoms";
  };

  const handleButtonClick = (response: any) => {
    setUserResponse(response);

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

      try {
        const updatedData = {
          show_dedicated_support_button: false,
          symptom_reassessment_logic: {
            ...user?.symptom_reassessment_logic,
            message_rating: message_rating,
          },
        };

        // Use the updateProfile mutation
        updateProfile.mutate(updatedData);
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Failed to update profile");
      }
    }

    PatchBtnResponse(response);
    setShowQuestion(false);
  };

  const displayInfo: any = messages[scoreChange][category];

  const handleDownload = () => {
    // Create a link element, hide it, direct it towards the blob, and click it
    const link = document.createElement("a");

    // Use the download_letter_type from the current recommendation if available
    const letterType =
      currentRecommendation?.download_letter_type ||
      (averageRating < 7 ? "moderate" : "severe");
    const fileName = `MSC-letter-${letterType}.pdf`;

    link.href = `/${fileName}`; // Path to your PDF file in the public folder
    link.download = fileName; // The file name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up and remove the link
  };

  if (isLoading || isLoadingRecommendations || isLoadingMessages) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <>
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
    );
  }

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

      <Title title="Results" className="text-3xl font-semibold my-5" />
      <RichText content={displayInfo?.message} className="text-base my-3" />
      {showQuestion && displayInfo?.question ? (
        <div>
          <p className="text-base font-semibold mb-2">
            {displayInfo?.question}
          </p>
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
          {userResponse === "no" && displayInfo?.noResponse && (
            <RichText
              content={displayInfo.noResponse}
              className="text-base text-green-600 font-medium"
            />
          )}
          {userResponse === "yes" && displayInfo?.yesResponse && (
            <RichText
              content={displayInfo.yesResponse}
              className="text-base text-green-600 font-medium"
            />
          )}
        </div>
      ) : previousRating === null || previousRating === undefined ? (
        <div className="space-y-5">
          {currentRecommendation ? (
            <>
              <Title
                title={currentRecommendation.title}
                className="text-xl lg:text-2xl font-semibold my-5"
              />
              <RichText
                content={currentRecommendation.subtitle}
                className="text-base"
              />

              {/* Display clinics if available */}
              {currentRecommendation.clinics &&
                currentRecommendation.clinics.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-semibold text-lg">
                      Details of Specialist Menopause After Cancer Clinics
                    </h2>
                    <ol className="pl-4 pt-2 space-y-2">
                      {currentRecommendation.clinics.map((clinic, index) => (
                        <li key={index} className="list-decimal">
                          <p>{clinic.item.name}</p>
                          <p>
                            For more information about the clinic, visit{" "}
                            <a
                              href={clinic.item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-violet-600"
                            >
                              {clinic.item.url_text}
                            </a>
                            .
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

              {/* Show download button if download_letter_type is available */}
              {currentRecommendation.download_letter_type && (
                <Button
                  text="Download introductory letter"
                  className="text-white font-normal text-sm mt-5"
                  onClick={handleDownload}
                />
              )}
            </>
          ) : (
            <>
              <Title
                title={fallbackInfos[category]?.title}
                className="text-xl lg:text-2xl font-semibold my-5"
              />
              {fallbackInfos[category]?.subtitle}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {currentRecommendation ? (
            <>
              <Title
                title={currentRecommendation.title}
                className="text-xl lg:text-2xl font-semibold my-5"
              />
              <RichText
                content={currentRecommendation.subtitle}
                className="text-base"
              />

              {/* Display clinics if available */}
              {currentRecommendation.clinics &&
                currentRecommendation.clinics.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-semibold text-lg">
                      Details of Specialist Menopause After Cancer Clinics
                    </h2>
                    <ol className="pl-4 pt-2 space-y-2">
                      {currentRecommendation.clinics.map((clinic, index) => (
                        <li key={index} className="list-decimal">
                          <p>{clinic.item.name}</p>
                          <p>
                            For more information about the clinic, visit{" "}
                            <a
                              href={clinic.item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-violet-600"
                            >
                              {clinic.item.url_text}
                            </a>
                            .
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
            </>
          ) : (
            <>
              <Title
                title={
                  fallbackInfos[
                    getRatingCategory(messageRating ?? averageRating)
                  ]?.title
                }
                className="text-xl lg:text-2xl font-semibold my-5"
              />
              {
                fallbackInfos[getRatingCategory(messageRating ?? averageRating)]
                  ?.subtitle
              }
            </>
          )}

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
                  ? moderateText.hormonal.para.map((el, index) => (
                      <p key={index}>{el}</p>
                    ))
                  : moderateText.default.para.map((el, index) => (
                      <p key={index}>{el}</p>
                    ))}
                {hormonal ? (
                  <div>{moderateText.hormonal.richText}</div>
                ) : (
                  <div>{moderateText.default.richText}</div>
                )}
                <p>
                  While you wait for your appointment to share your introductory
                  letter and the recommended clinical guideline with your GP,
                  you could try some self-help strategies at home.
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
      )}

      <div className="pt-6 flex gap-6">
        <Button
          text="Visit online self-management platform"
          btnBg=""
          link="/self-management"
          className="text-white "
        />
        {(currentRecommendation?.download_letter_type ||
          ProfileActions?.[getSymptomsHeading(averageRating ?? 0)]?.[
            "moderate-gp-button"
          ] ||
          ProfileActions?.[getSymptomsHeading(averageRating ?? 0)]?.[
            "severe-gp-button"
          ]) && (
          <Button
            text="Download letter for GP"
            className=" border-1 border-[#cfcfcf]"
            btnBg="#F3F4F6"
            onClick={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default RecommendationsTab;
