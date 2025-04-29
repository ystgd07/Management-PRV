import { queryClient } from "@/shared/api/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApply, postApply } from "./api";
import { PostApplyRequest } from "./model";

export const useApplyMutation = () => {
  return useMutation({
    mutationFn: (data: PostApplyRequest) => postApply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apply"] });
    },
  });
};

export const useApplyQuery = () => {
  return useQuery({
    queryKey: ["apply"],
    queryFn: () => getApply(),
  });
};