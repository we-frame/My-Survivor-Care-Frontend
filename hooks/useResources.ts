import { useQuery } from "@tanstack/react-query";
import { resourceService } from "@/services/api";

// Query keys
export const resourceKeys = {
  all: ["resources"] as const,
  accordions: (page: string) =>
    [...resourceKeys.all, "accordions", page] as const,
};

export const useResources = () => {
  // Get accordion data for a specific page
  const getAccordionData = (page: string, enabled: boolean = true) => {
    return useQuery({
      queryKey: resourceKeys.accordions(page),
      queryFn: () => resourceService.getAccordionData(page),
      enabled, // Can be disabled if needed
    });
  };

  return {
    getAccordionData,
  };
};
