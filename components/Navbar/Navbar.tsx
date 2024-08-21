"use client";

import React, { useEffect } from "react";
import Button from "../Common/Button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { makeRequest } from "@/lib/api";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import useLoadingStore from "@/store/loadingStore";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/profile", label: "My Profile" },
  { href: "/consumer-resources", label: "Consumer Resources" },
  { href: "/practitioner-resources", label: "Practitioner Resources" },
  { href: "/healthcare-professional", label: "Find a Healthcare Professional" },
];

const Navbar: React.FC = () => {
  const { refresh, setRefresh } = useLoadingStore();
  // Function to close the drawer menu
  const closeDrawer = () => {
    (document.getElementById("my-drawer-3") as HTMLInputElement).checked =
      false;
  };

  const logout = async () => {
    const refreshToken = Cookie.get("refresh-token");
    try {
      if (refreshToken) {
        await makeRequest("POST", "/auth/logout", {
          refresh_token: refreshToken,
        });
      }
      Cookie.remove("access-token");
      Cookie.remove("refresh-token");
      Cookie.remove("google-auth-userData");

      setRefresh(!refresh);

      toast.success("Logged out!");

      if (typeof window.localStorage !== "undefined") {
        window.localStorage.removeItem("user-store");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(refresh);
  }, [refresh]);

  return (
    <nav>
      <div className="drawer">
        {/* Input checkbox to control the drawer state */}
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Top navigation bar */}
          <div className="w-full flex items-center justify-between sticky top-0 left-0 py-2 z-50 bg-[#f8fafc]">
            {/* Hamburger menu button for mobile view */}
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <Menu />
              </label>
            </div>
            {/* Logo linking to the homepage */}
            <Link href={"/"}>
              <div className="flex-1 pr-2">
                <h1 className="text-lg xl-text-2xl font-semibold">
                  MySurvivorCare
                </h1>
              </div>
            </Link>
            {/* Desktop navigation links */}
            <div className="flex-none hidden lg:block">
              <div className="flex items-center gap-8">
                {Cookie.get("access-token") &&
                  navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <button className="text-base font-normal">
                        {item.label}
                      </button>
                    </Link>
                  ))}

                {Cookie.get("access-token") ? (
                  <Button
                    text="Log out"
                    className="text-black bg-[#f3f4f6] text-base font-medium"
                    btnBg="#f3f4f6"
                    onClick={logout}
                  />
                ) : (
                  <Button
                    text="Log in"
                    className="text-white text-base font-normal"
                    link="/login"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Drawer sidebar for mobile view */}
        <div className="drawer-side z-[100]">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar logo linking to the homepage */}
            <Link href={"/"} onClick={closeDrawer}>
              <div className="w-full px-2 flex items-center justify-between">
                <h1 className="text-lg font-semibold">MySurvivorCare</h1>
                <div className="btn btn-square btn-ghost">
                  <X />
                </div>
              </div>
            </Link>
            {/* Sidebar navigation links */}
            <div className="menu flex flex-col items-start justify-start gap-8 mt-10">
              {Cookie.get("access-token") &&
                navItems?.map((item: NavItem) => (
                  <Link
                    onClick={closeDrawer}
                    key={item?.href}
                    href={item?.href}
                  >
                    <button
                      onClick={closeDrawer}
                      className="text-base font-normal"
                    >
                      {item?.label}
                    </button>
                  </Link>
                ))}
              {Cookie.get("access-token") ? (
                <Button
                  text="Log out"
                  className="text-black bg-[#f3f4f6] text-base font-medium"
                  btnBg="#f3f4f6"
                  onClick={() => {
                    closeDrawer();
                    logout();
                  }}
                />
              ) : (
                <Button
                  onClick={closeDrawer}
                  text="Log in"
                  className="text-white text-base font-normal"
                  link="/login"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
