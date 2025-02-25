import { cn } from "@/lib/utils";
import { AccordionTypes } from "@/types/accordion";
import React from "react";
import { Plus, Minus } from "lucide-react";
import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordion = ({
  title,
  children,
  className = "",
  defaultChecked = false,
  groupName = "",
}: AccordionTypes) => {
  // Create a unique ID for each accordion
  const uniqueId = React.useId();
  const accordionId = groupName
    ? `${groupName}-${uniqueId}`
    : `accordion-${uniqueId}`;

  return (
    <ShadcnAccordion
      type={groupName ? "single" : "multiple"}
      collapsible
      className="w-full ">
      <AccordionItem
        value={accordionId}
        className="rounded-[var(--radius)] bg-base-200">
        <AccordionTrigger
          className={cn("flex justify-between py-4 px-4 group", className)}>
          {title}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 pt-0">
          {children}
        </AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};

export default Accordion;
