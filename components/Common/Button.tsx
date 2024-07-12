"use client";

import { cn } from "@/lib/utils";
import { ButtonTypes } from "@/types/button";
import React from "react";
import Link from "next/link";

const Button = ({
  text,
  btnBg,
  icon: Icon,
  jsxIcon,
  iconProps,
  link,
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonTypes) => {
  const buttonClasses = cn(
    className,
    "btn flex items-center justify-center gap-2"
  );

  const buttonContent = (
    <>
      {Icon && <Icon {...iconProps} />}
      {jsxIcon && jsxIcon}
      {text}
    </>
  );

  return link ? (
    <Link href={link}>
      <button
        className={buttonClasses}
        style={{ backgroundColor: btnBg ? btnBg : "#14b8a6" }}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {buttonContent}
      </button>
    </Link>
  ) : (
    <button
      className={buttonClasses}
      style={{ backgroundColor: btnBg ? btnBg : "#14b8a6" }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
