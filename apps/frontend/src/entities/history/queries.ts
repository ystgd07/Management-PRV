import { useMutation } from "@tanstack/react-query";
import { patchHistory } from "./api";
import { queryClient } from "@/shared/api/queryClient";

export const usePatchHistoryMutation = () => {
  return useMutation({
    mutationFn: ({ historyId, notes }: { historyId: number; notes: string }) =>
      patchHistory(historyId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apply"] });
    },
  });
};
