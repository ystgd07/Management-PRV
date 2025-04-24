import { api } from "@/shared/api/apiClient";
import { createQueryParams, normalizeResponse } from "./adapters";
import {
  Experience,
  FilterParams,
  GetJobsParams,
  Job,
  JobCategoriesResponse,
  JobsResponse,
  Region,
} from "./model";

export const jobService = {
  async getJobs(params: GetJobsParams = {}): Promise<JobsResponse> {
    const queryParams = createQueryParams(params);
    const url = `/jobs?${queryParams.toString()}`;
    const response = await api.get<JobsResponse>(url);
    return normalizeResponse(response, "db");
  },

  async getFilteredJobs(params: FilterParams = {}): Promise<JobsResponse> {
    try {
      const queryParams = createQueryParams(params);
      const url = `/search/categories?${queryParams.toString()}`;

      const response = await api.get<JobCategoriesResponse>(url);

      const normalized = normalizeResponse(response, "elasticsearch");

      return normalized;
    } catch (error) {
      return { jobs: [], totalCount: 0 };
    }
  },

  async getJob(id: string): Promise<Job> {
    return api.get<Job>(`/jobs/${id}`);
  },

  async getRegions(): Promise<Region[]> {
    return api.get<Region[]>("/jobs/regions");
  },

  async getExperiences(): Promise<Experience[]> {
    return api.get<Experience[]>("/jobs/experiences");
  },
  async getUnifiedJobs(
    isFiltered: boolean,
    params: any
  ): Promise<JobsResponse> {
    if (isFiltered) {
      return this.getFilteredJobs(params);
    } else {
      return this.getJobs(params);
    }
  },
};
