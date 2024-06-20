import { cn } from "@/lib/utils";
import { AccordionTypes } from "@/types/accordion";
import React from "react";

const Accordion = ({
  title,
  children,
  className = "",
  defaultChecked = false,
  groupName = "",
}: AccordionTypes) => {
  return (
    <div className="collapse collapse-plus bg-base-200" style={{ zIndex: 10 }}>
      {groupName ? (
        <>
          <input type="radio" name={groupName} id={title} />
          <label htmlFor={title} className={cn(className, "collapse-title")}>
            {title}
          </label>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            id="accordion-checkbox"
            defaultChecked={defaultChecked}
          />
          <label
            htmlFor="accordion-checkbox"
            className={cn(className, "collapse-title")}
          >
            {title}
          </label>
        </>
      )}

      {children && (
        <div className="collapse-content" style={{ zIndex: 10 }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
