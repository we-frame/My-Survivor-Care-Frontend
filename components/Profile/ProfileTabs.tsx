"use client";

import { cn } from "@/lib/utils";
import React, { FormEvent, useState } from "react";
import BackgroundInformationTab from "./BackgroundInformationTab";
import Button from "../Common/Button";
import MedicalInformationTab from "./MedicalInformationTab";
import RecommendationsTab from "./RecommendationsTab";

// Define the types for the ProfileTabs props
interface ProfileTabsTypes {
  medicalInformationForm: any; // Form data for medical information
  backgroundInformationForm: any; // Form data for background information
  editBackgroundInfo?: boolean;
  setEditBackgroundInfo?: any;
  editMedicalInformation?: boolean;
  setEditMedicalInformation?: any;
  formData?: any;
}

const ProfileTabs = ({
  medicalInformationForm,
  backgroundInformationForm,
  editBackgroundInfo,
  setEditBackgroundInfo,
  editMedicalInformation,
  setEditMedicalInformation,
  formData,
}: ProfileTabsTypes) => {
  const [activeTab, setActiveTab] = useState<number>(1); // State for active tab

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
              borderColor: "#14b8a6",
              color: "#14b8a6",
            }}
            role="tab"
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
        <div
          className="hidden lg:flex lg:justify-center lg:items-center w-full"
          role="tablist"
        >
          <button
            onClick={() => handleTabChange(1)}
            className={cn(
              "border-b-2 px-4 py-2",
              activeTab === 1 && `tab-active`,
            )}
            style={{
              borderColor: activeTab === 1 ? "#14b8a6" : "",
              color: activeTab === 1 ? "#14b8a6" : "",
            }}
            role="tab"
            aria-selected={activeTab === 1}
            aria-controls="recommendations-panel"
            id="recommendations-tab"
          >
            Recommendations
          </button>
          <button
            onClick={() => handleTabChange(2)}
            className={cn(
              "border-b-2 px-4 py-2",
              activeTab === 2 && `tab-active`,
            )}
            style={{
              borderColor: activeTab === 2 ? "#14b8a6" : "",
              color: activeTab === 2 ? "#14b8a6" : "",
            }}
            role="tab"
            aria-selected={activeTab === 2}
            aria-controls="background-info-panel"
            id="background-info-tab"
          >
            Background information
          </button>
          <button
            onClick={() => handleTabChange(3)}
            className={cn(
              "border-b-2 px-4 py-2",
              activeTab === 3 && `tab-active`,
            )}
            style={{
              borderColor: activeTab === 3 ? "#14b8a6" : "",
              color: activeTab === 3 ? "#14b8a6" : "",
            }}
            role="tab"
            aria-selected={activeTab === 3}
            aria-controls="medical-info-panel"
            id="medical-info-tab"
          >
            Medical information
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5 rounded-xl shadow-lg bg-white">
        {/* Recommendations Tab */}
        <div
          className={cn(activeTab === 1 ? "block" : "hidden")}
          role="tabpanel"
          id="recommendations-panel"
          aria-labelledby="recommendations-tab"
        >
          <RecommendationsTab />
        </div>

        {/* Background Information Tab */}
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            backgroundInformationForm.handleSubmit();
          }}
          className={cn(activeTab === 2 ? "block" : "hidden")}
          role="tabpanel"
          id="background-info-panel"
          aria-labelledby="background-info-tab"
        >
          <BackgroundInformationTab
            form={backgroundInformationForm}
            editBackgroundInfo={editBackgroundInfo}
            formData={formData?.backgroundInformation}
          />

          {editBackgroundInfo ? (
            <backgroundInformationForm.Subscribe
              selector={(state: any) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]: any) => (
                <button
                  style={{
                    backgroundColor: "#14b8a6",
                  }}
                  className={cn(
                    "border rounded-lg px-5 py-3 text-white",
                    !canSubmit &&
                      "bg-green-300 text-black disabled:cursor-not-allowed",
                  )}
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting
                    ? "Loading..."
                    : "Update background information"}
                </button>
              )}
            </backgroundInformationForm.Subscribe>
          ) : (
            <Button
              text="Edit background information"
              className="text-white text-sm font-normal mt-5"
              onClick={() => setEditBackgroundInfo(true)}
            />
          )}
        </form>

        {/* Medical Information Tab */}
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            medicalInformationForm.handleSubmit();
          }}
          className={cn(activeTab === 3 ? "block" : "hidden")}
          role="tabpanel"
          id="medical-info-panel"
          aria-labelledby="medical-info-tab"
        >
          <MedicalInformationTab
            form={medicalInformationForm}
            editMedicalInformation={editMedicalInformation}
            formData={formData?.medicalInformation}
          />

          {editMedicalInformation ? (
            <medicalInformationForm.Subscribe
              selector={(state: any) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]: any) => (
                <button
                  style={{
                    backgroundColor: "#14b8a6",
                  }}
                  className={cn(
                    "border rounded-lg px-5 py-3 text-white",
                    !canSubmit &&
                      "bg-green-300 text-black disabled:cursor-not-allowed",
                  )}
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "Loading..." : "Update medical information"}
                </button>
              )}
            </medicalInformationForm.Subscribe>
          ) : (
            <Button
              text="Edit Medical information"
              className="text-white text-sm font-normal mt-5"
              onClick={() => setEditMedicalInformation(true)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileTabs;
