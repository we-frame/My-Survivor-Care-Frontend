"use client";

import React, { useRef } from "react";
import Button from "@/components/Common/Button";
import useUserStore from "@/store/userStore";
import RangeInput from "@/components/FormInputs/RangeInput";

const Page: React.FC = () => {
  const { userData } = useUserStore();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <h1 className="mt-10 font-semibold text-2xl lg:text-4xl">
          MySurvivorCare Menopause Assessment
        </h1>
        <Button
          text="Print results"
          onClick={handlePrint}
          className="text-white"
        />
      </div>

      {/* Print section */}
      <div ref={printRef}>
        <p className="mt-10 font-semibold mb-3">Symptom severity</p>
        <h3 className="font-semibold text-2xl lg:text-4xl">
          Moderate symptoms
        </h3>

        <div className="mt-10 w-full">
          <h4 className="text-xl font-semibold mb-10">Your answers</h4>
          <div className="max-w-full lg:max-w-[40%] grid grid-cols-1 auto-rows-auto gap-x-7 gap-y-7">
            {userData?.userData?.latest_menopause_history?.parameter_rating?.map(
              (item: any) => (
                <div key={item.parameter_id}>
                  <RangeInput
                    label={item.title}
                    defaultValue={item.rating.toString()}
                    isDisabled={true}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
