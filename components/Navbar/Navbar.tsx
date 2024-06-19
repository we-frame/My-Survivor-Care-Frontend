"use client";

import React from "react";
import Button from "../Common/Button";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between sticky top-0 left-0 py-2 z-50 bg-[#f8fafc]">
      <div>
        <h1 className="text-lg font-semibold">MySurvivorCare</h1>
      </div>
      <div className="flex items-center gap-7">
        <button className="text-base font-normal">Home</button>
        <button className="text-base font-normal">About</button>
        <Button
          text={"Log in"}
          className="text-[#C7D2FE] text-base font-normal"
          link="/login"
        />
      </div>
    </nav>
  );
};

export default Navbar;
