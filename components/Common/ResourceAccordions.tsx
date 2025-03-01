import React, { useEffect, useState } from "react";
import { RenderHtml } from "./render-html";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";

type PageType = "healthcare" | "practitioner" | "consumer";

function ResourceAccordions({ page }: { page: PageType }) {
  const [accData, setAccData] = useState<{ title: string; content: string }[]>(
    []
  );
  useEffect(() => {
    // Don't proceed if page is falsy
    if (!page) return;

    // Define fetchAccordion outside to avoid recreating the function on each render
    const fetchAccordion = async () => {
      try {
        const response = await fetch(
          `https://api.mysurviour.agpro.co.in/items/accordion/?filter[page][_eq]=${page}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const { data } = await response.json();

        // Simplified mapping and added type safety
        const processedData = Array.isArray(data)
          ? data.map((item) => ({
              title: item.title,
              content: item.content,
            }))
          : [];

        setAccData(processedData);
      } catch (error) {
        console.error("Error fetching accordion data:", error);
      }
    };

    fetchAccordion();
  }, [page]);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      {accData && (
        <Accordion
          type={page ? "single" : "multiple"}
          collapsible
          className="w-full flex flex-col items-start justify-start gap-4 ">
          {accData.map(({ title, content }, index: any) => (
            <AccordionItem
              value={index + 1}
              key={index}
              className="rounded-[var(--radius)] bg-base-200   w-full">
              <AccordionTrigger
                className={cn(
                  "flex justify-between py-4 px-4 group !w-full",
                  "text-xl font-semibold "
                )}>
                {title}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-base text-pretty font-normal">
                <RenderHtml html={content || ""} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default ResourceAccordions;
