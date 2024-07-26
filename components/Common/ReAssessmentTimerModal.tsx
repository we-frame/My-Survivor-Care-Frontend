import React, { useEffect, useState, useRef } from "react";
import useUserStore from "@/store/userStore";
import Title from "./Title";
import Link from "next/link";
import Button from "./Button";
import { makeRequest } from "@/lib/api";
import { usePathname } from "next/navigation";

const ReAssessmentTimerModal = () => {
  const { userData } = useUserStore(); // Fetch userData from the store
  const [showModal, setShowModal] = useState<boolean>(false); // State to manage modal visibility
  const [timerDays, setTimerDays] = useState<number | null>(null); // State to hold the number of days until reassessment
  const dialogRef = useRef<HTMLDialogElement>(null); // Ref to access the dialog element directly
  const path = usePathname();

  const isoDateString = userData?.userData?.last_assessment_date;
  const date = isoDateString ? new Date(isoDateString) : new Date(); // Convert the ISO date string to a Date object or default to today if null

  // Calculate reAssessmentDate only if timerDays is not null
  let reAssessmentDate: Date | null = null;
  if (timerDays !== null && isoDateString) {
    reAssessmentDate = new Date(date);
    reAssessmentDate.setDate(reAssessmentDate.getDate() + timerDays); // Set the reassessment date based on timerDays
  }

  const today = new Date(); // Current date

  // Function to fetch timer days from the server
  const getTimerDays = async () => {
    try {
      const data = await makeRequest("GET", "/items/config");
      setTimerDays(data?.data?.assessment_duration);
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
    }
  }, [reAssessmentDate, today]);

  return (
    <>
      {showModal ? (
        <dialog
          ref={dialogRef}
          id="reAssessmentTimer"
          className="w-11/12 max-w-md border-none rounded-lg shadow-xl p-0 overflow-hidden"
        >
          <div className="p-5 flex flex-col items-center justify-center gap-6 bg-white">
            <Title
              title="Reassessment Reminder"
              className="text-2xl font-semibold text-center text-red-600"
            />
            <p className="text-base font-normal text-center text-gray-700">
              It's time to reassess your symptoms and track your progress. Click
              the button below to take your reassessment.
            </p>
            <Link href="/re-assessment">
              <Button
                text="Reassess my symptoms"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              />
            </Link>
          </div>
        </dialog>
      ) : null}
    </>
  );
};

export default ReAssessmentTimerModal;
