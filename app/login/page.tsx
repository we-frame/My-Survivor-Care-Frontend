import LoginPageUI from "@/components/Login/LoginPageUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

const page = () => {
  return (
    <div>
      <LoginPageUI />
    </div>
  );
};

export default page;
