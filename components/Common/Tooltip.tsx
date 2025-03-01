import { TooltipTypes } from "@/types/tooltip";
import { useState } from "react";
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Tooltip = ({ content, children }: TooltipTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TooltipProvider>
      <ShadTooltip open={isOpen}>
        <TooltipTrigger onClick={() => setIsOpen(!isOpen)}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-60 bg-white text-black p-4 shadow-md ">
          {content}
        </TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
