// 모델 타입
export type {
  Job,
  JobsResponse,
  JobCategory as JobCategoryType,
  JobCategoriesResponse,
  Region as RegionType,
  Experience as ExperienceType,
  FilterParams,
  UnifiedJobParams,
  GetJobsParams,
} from "./model";

// 어댑터 함수 export
export {
  normalizeResponse,
  normalizeJobsResponse,
  normalizeCategoriesResponse,
  createQueryParams,
} from "./adapters";

// 어댑터 타입 export
export type { DataSource } from "./adapters";

// 서비스 레이어 export
export { jobService } from "./services";

// 통합 쿼리 훅 export
export { useUnifiedInfiniteJobsQuery } from "./hooks/hooks";

// 상수 export
export {
  JOB_CATEGORIES,
  REGIONS,
  EXPERIENCES,
  ALL_JOB_CATEGORIES,
  ALL_REGIONS,
  ALL_EXPERIENCES,
} from "./const/constants";

// 상수 타입
export type { JobCategory, Region, Experience } from "./const/constants";
