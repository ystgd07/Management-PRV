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

// stageHistory 오름차순 정렬 유틸
const sortStageHistory = (applications : GetApplicationsResponse) => {
  return {
    applications: applications.applications.map(app => ({
      ...app,
      stageHistory: [...app.stageHistory].sort((a, b) => a.id - b.id),
    })),
  };
};

export const getApply = async (): Promise<GetApplicationsResponse> => {
  const response = await api.get<GetApplicationsResponse>("/apply");
  return sortStageHistory(response);
};

export const updateApply = async (
  id: ApplicationId,
  data: UpdateApplicationRequest
): Promise<UpdateApplicationResponse> => {
  return api.patch<UpdateApplicationResponse>(`/apply/${id}`, data);
};