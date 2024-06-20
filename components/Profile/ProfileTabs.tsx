"use client";

import { cn } from "@/lib/utils";
import useSettingStore from "@/store/SettingStore";
import React, { useState } from "react";
import BackgroundInformationTab from "./BackgroundInformationTab";
import Button from "../Common/Button";
import MedicalInformationTab from "./MedicalInformationTab";
import RecommendationsTab from "./RecommendationsTab";

interface ProfileTabsTypes {
  form: any;
  editBackgroundInfo?: boolean;
  setEditBackgroundInfo?: any;
  editMedicalInformation?: boolean;
  setEditMedicalInformation?: any;
}

const ProfileTabs = ({
  form,
  editBackgroundInfo,
  setEditBackgroundInfo,
  editMedicalInformation,
  setEditMedicalInformation,
}: ProfileTabsTypes) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const { buttonBgColor } = useSettingStore((state) => ({
    buttonBgColor: state.buttonBgColor,
  }));

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => handleTabChange(1)}
          className={cn("border-b-2 px-4", activeTab === 1 && `tab-active`)}
          style={{
            borderColor: activeTab === 1 ? buttonBgColor : "",
            color: activeTab === 1 ? buttonBgColor : "",
          }}
          aria-selected={activeTab === 1}
        >
          Recommendations
        </button>
        <button
          onClick={() => handleTabChange(2)}
          className={cn("border-b-2 px-4", activeTab === 2 && `tab-active`)}
          style={{
            borderColor: activeTab === 2 ? buttonBgColor : "",
            color: activeTab === 2 ? buttonBgColor : "",
          }}
          aria-selected={activeTab === 2}
        >
          Background information
        </button>
        <button
          onClick={() => handleTabChange(3)}
          className={cn("border-b-2 px-4", activeTab === 3 && `tab-active`)}
          style={{
            borderColor: activeTab === 3 ? buttonBgColor : "",
            color: activeTab === 3 ? buttonBgColor : "",
          }}
          aria-selected={activeTab === 3}
        >
          Medical information
        </button>
      </div>

      <div className="p-5 rounded-xl shadow-lg">
        <div className={cn(activeTab === 1 ? "block" : "hidden")}>
          <RecommendationsTab />
        </div>
        <div className={cn(activeTab === 2 ? "block" : "hidden")}>
          <BackgroundInformationTab
            form={form}
            editBackgroundInfo={editBackgroundInfo}
          />
          <Button
            text="Edit background information"
            className="text-[#c7d2fe] text-sm font-normal mt-5"
            onClick={() => setEditBackgroundInfo(true)}
          />
        </div>
        <div className={cn(activeTab === 3 ? "block" : "hidden")}>
          <MedicalInformationTab
            form={form}
            editMedicalInformation={editMedicalInformation}
          />
          <Button
            text="Edit Medical information"
            className="text-[#c7d2fe] text-sm font-normal mt-5"
            onClick={() => setEditMedicalInformation(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
