import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { jobService } from "../services";
import { JobsResponse, UnifiedJobParams } from "../model";

export function useUnifiedInfiniteJobsQuery(options: UnifiedJobParams) {
  const { isFiltered, params } = options;

  const queryKey = isFiltered
    ? ["filteredJobs", "infinite", params]
    : ["jobs", "infinite", params];

  return useInfiniteQuery<JobsResponse>({
    queryKey,
    queryFn: ({ pageParam }) => {
      const queryParams = { ...params, cursor: pageParam };
      return jobService.getUnifiedJobs(isFiltered, queryParams);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
