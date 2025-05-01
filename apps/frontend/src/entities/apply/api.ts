import { api } from "@/shared/api/apiClient";
import {
  PostApplyRequest,
  PostApplyResponse,
  GetApplicationsResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  ApplicationId,
} from "./model";

export const postApply = async (
  data: PostApplyRequest
): Promise<PostApplyResponse> => {
  return api.post<PostApplyResponse>("/apply", data);
};

export const getApply = async (): Promise<GetApplicationsResponse> => {
  return api.get<GetApplicationsResponse>("/apply");
};

export const updateApply = async (
  id: ApplicationId,
  data: UpdateApplicationRequest
): Promise<UpdateApplicationResponse> => {
  return api.patch<UpdateApplicationResponse>(`/apply/${id}`, data);
};