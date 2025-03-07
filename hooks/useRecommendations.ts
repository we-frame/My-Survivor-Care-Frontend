import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/lib/api";

// Define types for the recommendation data
export interface Clinic {
  item: {
    id: string;
    date_created: string;
    date_updated: string | null;
    name: string;
    url: string;
    url_text: string;
  };
}

export interface Recommendation {
  id: string;
  date_created: string;
  date_updated: string | null;
  rating_range: string;
  title: string;
  subtitle: string;
  download_letter_type: string | null;
  clinics: Clinic[];
}

// Query keys
export const recommendationKeys = {
  all: ["recommendations"] as const,
  list: () => [...recommendationKeys.all, "list"] as const,
};

export const useRecommendations = () => {
  // Get all recommendations
  const getRecommendations = (enabled: boolean = true) => {
    return useQuery({
      queryKey: recommendationKeys.list(),
      queryFn: async () => {
        const response = await makeRequest(
          "GET",
          "/items/recommendations?fields=*,clinics.item.*",
        );
        return response.data as Recommendation[];
      },
      enabled,
    });
  };

  return {
    getRecommendations,
  };
};
