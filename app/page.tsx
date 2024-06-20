import HomePageUI from "@/components/HomePage/HomePageUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - MySurvivorCare",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

export default function Home() {
  return (
    <div>
      <HomePageUI />
    </div>
  );
}
