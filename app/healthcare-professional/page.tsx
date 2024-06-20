import HealthcareProfessionalUI from "@/components/HealthcareProfessional/HealthcareProfessionalUI";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Find a Healthcare Professional - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <HealthcareProfessionalUI />
    </div>
  );
};

export default page;
