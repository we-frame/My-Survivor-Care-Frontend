import ProfileUI from "@/components/Profile/ProfileUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <ProfileUI />
    </div>
  );
};

export default page;
