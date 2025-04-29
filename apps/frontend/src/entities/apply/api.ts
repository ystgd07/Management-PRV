import { api } from "@/shared/api/apiClient";
import {
  PostApplyRequest,
  PostApplyResponse,
  GetApplicationsResponse,
} from "./model";

export const postApply = async (
  data: PostApplyRequest
): Promise<PostApplyResponse> => {
  return api.post<PostApplyResponse>("/apply", data);
};

export const getApply = async (): Promise<GetApplicationsResponse> => {
  return api.get<GetApplicationsResponse>("/apply");
};