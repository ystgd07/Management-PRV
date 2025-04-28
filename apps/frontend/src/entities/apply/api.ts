import { api } from "@/shared/api/apiClient";
import { PostApplyRequest, PostApplyResponse } from "./model";

export const postApply = async (
  data: PostApplyRequest
): Promise<PostApplyResponse> => {
  return api.post<PostApplyResponse>("/apply", data);
};
