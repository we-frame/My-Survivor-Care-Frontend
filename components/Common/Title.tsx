import { cn } from "@/lib/utils";
import { TitleTypes } from "@/types/title";
import React from "react";

const Title = ({ title, className = "" }: TitleTypes) => {
  return (
    <h1 className={cn(className, "w-full")} aria-label={title}>
      {title}
    </h1>
  );
};

export default Title;
