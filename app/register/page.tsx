import RegisterPageUI from "@/components/Register/RegisterPageUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <RegisterPageUI />
    </div>
  );
};

export default page;
