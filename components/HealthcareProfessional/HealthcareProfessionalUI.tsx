"use client";

import React from "react";
import Title from "../Common/Title";

import ResourceAccordions from "../Common/ResourceAccordions";

const HealthcareProfessionalUI = () => {
  return (
    <div className="mt-5 lg:mt-10 w-full lg:w-[60%] flex flex-col items-start justify-start gap-10">
      <Title
        title="Find a Healthcare Professional"
        className="text-4xl font-semibold"
      />
      <ResourceAccordions page={"healthcare"} />
    </div>
  );
};

export default HealthcareProfessionalUI;
