import { queryClient } from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { postApply } from "./api";
import { PostApplyRequest } from "./model";

export const useApplyMutation = () => {
  return useMutation({
    mutationFn: (data: PostApplyRequest) => postApply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apply"] });
    },
  });
};
