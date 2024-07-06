"use client";

import Navbar from "@/components/Navbar/Navbar";
import useSettingStore from "@/store/SettingStore";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

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
    </>
  );
};

export default MainLayout;
