"use client";

import ReAssessmentTimerModal from "@/components/Common/ReAssessmentTimerModal";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

interface MainLayoutTypes {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutTypes) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const path = usePathname();

  useEffect(() => {
    // Ensure state is hydrated from localStorage
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // or a loading spinner
  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          style: {
            color: "black",
            background: "#f9f5ed",
          },
        }}
      />
      <Navbar />
      <main>{children}</main>
      {path !== "/re-assessment" && <ReAssessmentTimerModal />}
    </>
  );
};

export default MainLayout;
