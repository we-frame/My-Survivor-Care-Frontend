"use client";
import React, { useEffect, useState, useRef } from "react";
import useUserStore from "@/store/userStore";
import Title from "./Title";
import Link from "next/link";
import Button from "./Button";
import { makeRequest } from "@/lib/api";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { getUserDetails } from "@/lib/getUserAPI";

const ReAssessmentTimerModal = () => {
  const { userData } = useUserStore(); // Fetch userData from the store
  const [showModal, setShowModal] = useState<boolean>(false); // State to manage modal visibility
  const [timerDays, setTimerDays] = useState<number | null>(null); // State to hold the number of days until reassessment
  const dialogRef = useRef<HTMLDialogElement>(null); // Ref to access the dialog element directly
  const path = usePathname();

  const isoDateString = userData?.userData?.last_assessment_date;
  const nextAssessmentDay = userData?.userData?.next_assessment_date;
  const date = isoDateString ? new Date(isoDateString) : new Date(); // Convert the ISO date string to a Date object or default to today if null
  const [reAssessmentDate, setReAssessmentDate] = useState<Date | null>(
    nextAssessmentDay ? new Date(nextAssessmentDay) : null
  );
  const { setUser } = useUserStore();

  // Calculate reAssessmentDate only if timerDays is not null

  // if (timerDays !== null && isoDateString) {
  //   let AssessmentDate = new Date(date);
  //   AssessmentDate.setDate(AssessmentDate.getDate() + timerDays);
  //   setReAssessmentDate(AssessmentDate); // Set the reassessment date based on timerDays
  // }

  // useEffect(() => {
  //   console.log("i ran");
  //   if (timerDays !== null && isoDateString) {
  //     let AssessmentDate = new Date(date);
  //     AssessmentDate.setDate(AssessmentDate.getDate() + timerDays);
  //     console.log(AssessmentDate, "changes");
  //     setReAssessmentDate(AssessmentDate); // Set the reassessment date based on timerDays
  //   }
  // }, [timerDays]);

  //  useEffect(() => {
  //   console.log("i ran");
  //   if (nextAssessmentDate) {

  //     setReAssessmentDate(nextAssessmentDate); // Set the reassessment date based on timerDays
  //   }
  // }, [timerDays]);

  const ChangeNextAssessmendDate = async (date: Date) => {
    try {
      await makeRequest("PATCH", "/users/me", {
        next_assessment_date: date.toISOString(),
      })
        .then(() => setReAssessmentDate(date))
        .then(() =>
          toast.error("Re-assessment date postponed successfully", {
            icon: null,
            duration: 5000,
          })
        )
        .then(() => {
          getUserDetails(setUser);
        });
    } catch (err) {
      console.log(err);
      toast.error(
        "Something went wrong while postponing reassessment, please try again",
        { duration: 5000 }
      );
    }
  };

  const today = new Date(); // Current date

  // Function to fetch timer days from the server
  const getTimerDays = async () => {
    try {
      const data = await makeRequest("GET", "/items/config");
      setTimerDays(data?.data?.assessment_duration);
      // setTimerDays(0.04);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch timer days on component mount
  useEffect(() => {
    getTimerDays();
  }, [path]);

  // Effect to check the current date against the reassessment date
  useEffect(() => {
    if (reAssessmentDate && today >= reAssessmentDate) {
      setShowModal(true);
      if (dialogRef.current) {
        dialogRef.current.showModal(); // Use the dialog ref to show the modal
      }
    } else {
      setShowModal(false);
    }
  }, [reAssessmentDate, today]);

  const PostponeAssessment = () => {
    if (timerDays) {
      const PostponedDate = new Date();
      PostponedDate.setDate(PostponedDate.getDate() + timerDays);
      ChangeNextAssessmendDate(PostponedDate);
    }
    // timerDays && setTimerDays((prev) => (prev ?? 0) + 1);
  };

  return (
    <>
      {timerDays && showModal ? (
        <dialog
          ref={dialogRef}
          id="reAssessmentTimer"
          className="w-11/12 max-w-md border-none rounded-lg shadow-xl p-0 overflow-hidden">
          <div className="p-5 flex flex-col items-center justify-center gap-6 bg-white">
            <Title
              title="Reassessment Reminder"
              className="text-2xl font-semibold text-center text-red-600"
            />
            <p className="text-base font-normal text-center text-gray-700">
              It's time to reassess your symptoms and track your progress. Click
              the button below to take your reassessment.
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <Link href="/re-assessment">
                <Button
                  text="Reassess my symptoms"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                />
              </Link>
              <Button
                type={"reset"}
                text="Do it later"
                btnBg="#ef4444"
                onClick={PostponeAssessment}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              />
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
};

export default ReAssessmentTimerModal;
