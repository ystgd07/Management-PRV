import { JobsResponse, JobCategoriesResponse } from "./model";

export type DataSource = "db" | "elasticsearch";

export function normalizeJobsResponse(data: any): JobsResponse {
  return {
    jobs: data.jobs || [],
    nextCursor: data.nextCursor,
    totalCount: data.totalCount || 0,
  };
}

export function normalizeCategoriesResponse(
  data: JobCategoriesResponse | any
): JobsResponse {
  if (data.jobs) {
    return {
      jobs: data.jobs || [],
      nextCursor: data.nextCursor,
      totalCount: data.totalCount || 0,
    };
  }

  const jobs =
    data.categories && Array.isArray(data.categories)
      ? data.categories.flatMap(
          (category: any) =>
            // category.jobs가 없는 경우를 대비하여 빈 배열 처리
            category.jobs || []
        )
      : [];

  return {
    jobs,
    nextCursor: data.nextCursor,
    totalCount: data.totalCount || 0,
  };
}

export function normalizeResponse(data: any, source: DataSource): JobsResponse {
  if (source === "db") {
    return normalizeJobsResponse(data);
  } else {
    return normalizeCategoriesResponse(data as JobCategoriesResponse);
  }
}

export function createQueryParams(
  params: Record<string, any>
): URLSearchParams {
  const queryParams = new URLSearchParams();

  if (params.cursor) {
    queryParams.append("cursor", params.cursor);
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.categories && params.categories.length > 0) {
    queryParams.append("categories", params.categories.join(","));
  }

  if (params.regions && params.regions.length > 0) {
    queryParams.append("regions", params.regions.join(","));
  }

  if (params.experiences && params.experiences.length > 0) {
    queryParams.append("experiences", params.experiences.join(","));
  }

  return queryParams;
}
