import React from "react";
import { RenderHtml } from "./render-html";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { useResources } from "@/hooks/useResources";

type PageType = "healthcare" | "practitioner" | "consumer";

function ResourceAccordions({ page }: { page: PageType }) {
  // Use React Query to fetch accordion data
  const {
    data: accData,
    isLoading,
    error,
  } = useResources().getAccordionData(page, !!page);

  // Define the type for accordion data
  interface AccordionItem {
    title: string;
    content: string;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-start justify-start gap-4 w-full">
        Loading resources...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-start justify-start gap-4 w-full">
        Error loading resources. Please try again later.
      </div>
    );
  }

  // Process the data to ensure it matches our expected format
  const processedData: AccordionItem[] = Array.isArray(accData)
    ? accData.map((item: any) => ({
        title: item.title || "",
        content: item.content || "",
      }))
    : [];

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      {processedData.length > 0 ? (
        <Accordion
          type={page ? "single" : "multiple"}
          collapsible
          className="w-full flex flex-col items-start justify-start gap-4 "
        >
          {processedData.map(({ title, content }, index) => (
            <AccordionItem
              value={String(index + 1)}
              key={index}
              className="rounded-[var(--radius)] bg-base-200 w-full"
            >
              <AccordionTrigger
                className={cn(
                  "flex justify-between py-4 px-4 group !w-full",
                  "text-xl font-semibold ",
                )}
              >
                {title}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-base text-pretty font-normal">
                <RenderHtml html={content || ""} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div>No resources available for this section.</div>
      )}
    </div>
  );
}

export default ResourceAccordions;
