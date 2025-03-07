import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import QueryProvider from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Survivor Care",
  description:
    "MySurvivorCare - This is a platform which assesses your menopause symptoms and give you resources to help manage your symptoms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={
          "min-w-full min-h-screen px-5 md:px-6 lg:px-8 pb-5 md:pb-6 lg:pb-8 "
        }
      >
        <QueryProvider>
          <MainLayout>{children}</MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
