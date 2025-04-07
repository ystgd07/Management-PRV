import { api } from "@/shared/api/apiClient";
import { Job, JobsResponse } from "./model";

export interface GetJobsParams {
  cursor?: string;
  limit?: number;
  keyword?: string;
  category?: string;
  location?: string;
  experience?: string;
  workType?: string;
}

export const getJobs = async (params: GetJobsParams): Promise<JobsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.cursor) queryParams.append("cursor", params.cursor);
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.keyword) queryParams.append("keyword", params.keyword);
  if (params.category) queryParams.append("category", params.category);
  if (params.location) queryParams.append("location", params.location);
  if (params.experience) queryParams.append("experience", params.experience);
  if (params.workType) queryParams.append("workType", params.workType);

  // api 클라이언트를 사용하여 데이터 요청
  const url = `/jobs?${queryParams.toString()}`;
  return api.get<JobsResponse>(url);
};

export const getJob = async (id: string): Promise<Job> => {
  return api.get<Job>(`/jobs/${id}`);
};
