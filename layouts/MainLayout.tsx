"use client";

import Navbar from "@/components/Navbar/Navbar";
import useSettingStore from "@/store/SettingStore";
import React, { useEffect, useState } from "react";

interface MainLayoutTypes {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutTypes) => {
  const { backgroundColor, buttonBgColor, textColor } = useSettingStore(
    (state) => ({
      backgroundColor: state.backgroundColor,
      buttonBgColor: state.buttonBgColor,
      textColor: state.textColor,
    })
  );

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure state is hydrated from localStorage
    setIsHydrated(true);
  }, []);

  useEffect(() => {}, [backgroundColor, buttonBgColor, textColor]);

  if (!isHydrated) {
    return null; // or a loading spinner
  }
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
