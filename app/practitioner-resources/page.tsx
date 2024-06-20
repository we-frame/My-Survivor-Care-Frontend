import PractitionerResourcesUI from "@/components/PractitionerResources/PractitionerResourcesUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practitioner Resources - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <PractitionerResourcesUI />
    </div>
  );
};

export default page;
