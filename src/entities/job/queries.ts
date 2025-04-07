import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getJobs, GetJobsParams } from "./api";
import { JobsResponse, Job } from "./model";
import { api } from "@/shared/api/apiClient";

export const useJobsQuery = (params: GetJobsParams = { limit: 10 }) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
  });
};

export const useInfiniteJobsQuery = (params: GetJobsParams = { limit: 10 }) => {
  return useInfiniteQuery<JobsResponse>({
    queryKey: ["jobs", "infinite", params],
    queryFn: ({ pageParam }) =>
      getJobs({ ...params, cursor: pageParam as string }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

// 단일 Job 조회 쿼리
export const useJobQuery = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => api.get<Job>(`/jobs/${id}`),
    enabled: !!id,
  });
};
