import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ReassessmentMessage {
  id: number;
  change_direction: "decrease" | "increase" | "same";
  score_range: string;
  message: string;
  question: string;
  yes_response: string | null;
  no_response: string | null;
  on_yes_title: string | null;
}

// Query keys
export const reassessmentMessageKeys = {
  all: ["reassessment-messages"] as const,
  list: () => [...reassessmentMessageKeys.all, "list"] as const,
};

export const useReassessmentMessages = (enabled: boolean = true) => {
  const query = useQuery({
    queryKey: reassessmentMessageKeys.list(),
    queryFn: async () => {
      const response = await axios.get(
        "https://api.mysurviour.agpro.co.in/items/reassessment_messages?fields=*",
      );
      return response.data.data as ReassessmentMessage[];
    },
    enabled,
  });

  return query;
};
