import ConsumerResourcesUI from "@/components/ConsumerResources/ConsumerResourcesUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consumer Resources - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <ConsumerResourcesUI />
    </div>
  );
};

export default page;
