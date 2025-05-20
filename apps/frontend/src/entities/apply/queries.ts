import { queryClient } from "@/shared/api/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApply, postApply, updateApply } from "./api";
import {
  ApplicationId,
  PostApplyRequest,
  UpdateApplicationRequest,
} from "./model";

export const useApplyMutation = () => {
  return useMutation({
    mutationFn: (data: PostApplyRequest) => postApply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apply"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useApplyQuery = () => {
  return useQuery({
    queryKey: ["apply"],
    queryFn: () => getApply(),
  });
};

export const useUpdateApplyMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: ApplicationId;
      data: UpdateApplicationRequest;
    }) => updateApply(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apply"] });
    },
  });
};
