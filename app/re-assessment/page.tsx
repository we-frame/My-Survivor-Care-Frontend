import ReAssessmentUI from "@/components/ReAssessment/ReAssessmentUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Re-Assessment - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <ReAssessmentUI />
    </div>
  );
};

export default page;
