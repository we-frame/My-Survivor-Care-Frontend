"use client";

import { cn } from "@/lib/utils";
import useSettingStore from "@/store/SettingStore";
import React, { useState } from "react";
import BackgroundInformationTab from "./BackgroundInformationTab";
import Button from "../Common/Button";
import MedicalInformationTab from "./MedicalInformationTab";
import RecommendationsTab from "./RecommendationsTab";

// Define the types for the ProfileTabs props
interface ProfileTabsTypes {
  form: any; // Form data
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
  const [activeTab, setActiveTab] = useState<number>(1); // State for active tab

  const { buttonBgColor } = useSettingStore((state) => ({
    buttonBgColor: state.buttonBgColor,
  }));

  // Function to change the active tab
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  // Function to go to the next tab
  const handleNextTab = () => {
    if (activeTab < 3) {
      setActiveTab(activeTab + 1);
    }
  };

  // Function to go to the previous tab
  const handlePreviousTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="w-full flex justify-between items-center">
        {/* Previous tab button (mobile view) */}
        <button
          onClick={handlePreviousTab}
          disabled={activeTab === 1}
          className="lg:hidden px-4 py-2"
        >
          &lt;
        </button>

        {/* Active tab indicator (mobile view) */}
        <div className="w-full flex items-center justify-center lg:hidden">
          <button
            className={cn("border-b-2 px-4 py-2 tab-active")}
            style={{
              borderColor: buttonBgColor,
              color: buttonBgColor,
            }}
            aria-selected={activeTab === activeTab}
          >
            {activeTab === 1
              ? "Recommendations"
              : activeTab === 2
              ? "Background information"
              : "Medical information"}
          </button>
        </div>

        {/* Next tab button (mobile view) */}
        <button
          onClick={handleNextTab}
          disabled={activeTab === 3}
          className="lg:hidden px-4 py-2"
        >
          &gt;
        </button>

        {/* Tab buttons (desktop view) */}
        <div className="hidden lg:flex lg:justify-center lg:items-center w-full">
          <button
            onClick={() => handleTabChange(1)}
            className={cn(
              "border-b-2 px-4 py-2",
              activeTab === 1 && `tab-active`
            )}
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
            className={cn(
              "border-b-2 px-4 py-2",
              activeTab === 2 && `tab-active`
            )}
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
            className={cn(
              "border-b-2 px-4 py-2",
              activeTab === 3 && `tab-active`
            )}
            style={{
              borderColor: activeTab === 3 ? buttonBgColor : "",
              color: activeTab === 3 ? buttonBgColor : "",
            }}
            aria-selected={activeTab === 3}
          >
            Medical information
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5 rounded-xl shadow-lg">
        {/* Recommendations Tab */}
        <div className={cn(activeTab === 1 ? "block" : "hidden")}>
          <RecommendationsTab />
        </div>

        {/* Background Information Tab */}
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

        {/* Medical Information Tab */}
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
