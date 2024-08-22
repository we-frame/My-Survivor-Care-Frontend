"use client";

import Button from "../Common/Button";
import LoginCard from "../Login/LoginCard";
import useLoadingStore from "@/store/loadingStore";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import useRegistrationStore from "@/store/userRegistrationStore";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const HomePageUI = () => {
  const { refresh } = useLoadingStore();
  const {
    step,
    setStep,
    interested,
    setInterested,
    notInterestedMsg,
    setNotInterestedMsg,
    setEligible,
  } = useRegistrationStore();
  const { userData } = useUserStore();

  const [isNotInterested, setIsNotInterested] = useState<boolean>(
    notInterestedMsg !== null && notInterestedMsg !== ""
  );

  const router = useRouter();

  useEffect(() => {
    setIsNotInterested(notInterestedMsg !== null && notInterestedMsg !== "");
  }, [notInterestedMsg, step]);

  useEffect(() => {}, [refresh]);

  return (
    <div className="w-full mt-5 lg:mt-10 flex flex-col lg:flex-row marker:items-center justify-center lg:items-start lg:justify-start gap-12 lg:gap-20">
      <div
        className={cn(
          "w-full flex flex-col items-start justify-start gap-20",
          !Cookie.get("access-token") && "lg:w-[60%]"
        )}>
        <div className="w-full flex flex-col items-start justify-start gap-5">
          <h1 className="text-2xl xl:text-4xl font-semibold">
            Welcome to the MySurvivorCare Platform.
          </h1>

          <p className="text-base xl:text-xl font-normal">
            This is a platform which assesses your menopause symptoms and give
            you resources to help manage your symptoms.
          </p>
          <p className="text-base xl:text-xl font-normal">
            Menopause symptoms – namely hot flushes and night sweats - are
            common after cancer treatment. They can impact negatively on your
            quality of life. There may be treatment that can reduce the impact
            of these symptoms.
          </p>
          <p className="text-base xl:text-xl font-normal">
            Associate Professor Michelle Peate, in collaboration with consumer
            organisations, and researchers and clinicians at the Universities of
            Melbourne, Western Sydney, Western Australia, and the Peter
            MacCallum Cancer Centre have developed this web-based app to help
            cancer survivors manage menopause symptoms after cancer.
          </p>
          <p className="text-base xl:text-xl font-normal">
            Survivors can use the MySurvivorCare app to assess their symptoms.
            Based on this, recommendations on how to manage symptoms will be
            provided.
          </p>
          <p className="text-base xl:text-xl font-normal">
            We invite you to take part in early testing of the MySurvivorCare
            app. We hope that it will help you to manage your symptoms. Your
            feedback will help us create a platform that is practical, easy to
            use, and caters to your needs.
          </p>
        </div>

        {!userData && (
          <div className="w-full flex flex-col items-start justify-start gap-5">
            <div className="w-full">
              <p
                className={cn(
                  (isNotInterested || step !== 1) && "text-[#c8cbd0]",
                  "text-xl xl:text-3xl font-semibold text-center"
                )}>
                Are you interested in taking part in this early testing of the
                platform?
              </p>
            </div>

            <div className="w-full flex items-center justify-center gap-3">
              <Button
                text="Yes, I am"
                className="text-white"
                disabled={isNotInterested || step !== 1}
                onClick={() => {
                  setStep(2);
                }}
              />
              <Button
                text="No, I'm not"
                btnBg={"#f3f4f6"}
                disabled={isNotInterested || step !== 1}
                onClick={() => {
                  setInterested(false);
                  setEligible(true);
                  setNotInterestedMsg(
                    "For now, access to this platform is only available to those participating in the early testing. Thank you for your time."
                  );
                }}
              />
            </div>

            {step === 2 && (
              <>
                <div className="w-full">
                  <p
                    className={cn(
                      (isNotInterested || interested) && "text-[#c8cbd0]",
                      "text-xl xl:text-3xl font-semibold text-center"
                    )}>
                    Have you been affected by cancer in the past, or are you
                    currently, living with it?
                  </p>
                </div>

                <div className="w-full flex items-center justify-center gap-3">
                  <Button
                    text="Yes, I am"
                    className="text-white"
                    disabled={isNotInterested || interested}
                    onClick={() => {
                      setInterested(true);
                      setEligible(true);
                      setStep(2);
                      router.push("/register");
                    }}
                  />
                  <Button
                    text="No, I'm not"
                    btnBg={"#f3f4f6"}
                    disabled={isNotInterested || interested}
                    onClick={() => {
                      setInterested(false);
                      setEligible(true);
                      setNotInterestedMsg(
                        "We are sorry, but as this platform is for women living with or beyond cancer you are not eligible to create an account. Thank you for being so understanding."
                      );
                    }}
                  />
                </div>
              </>
            )}

            {!interested && (
              <div className="w-full">
                <p className="text-center text-xl 2xl:text-3xl font-semibold text-green-700">
                  {notInterestedMsg}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {!Cookie.get("access-token") && <LoginCard />}
    </div>
  );
};

export default HomePageUI;
