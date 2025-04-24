export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements?: string[];
  postedDate: string;
  dueTime?: string;
  experience?: string;
  workType?: string;
  isRemote?: boolean;
  category?: string; // 직무 카테고리
  region?: string; // 지역
}

export interface JobsResponse {
  jobs: Job[];
  nextCursor?: string;
  totalCount?: number;
}

// 직무 카테고리 타입 정의
export interface JobCategory {
  id: string;
  name: string;
  count?: number; // 해당 카테고리의 채용 공고 수 (선택적)
  subCategories?: JobCategory[]; // 하위 카테고리
  jobs?: Job[]; // 해당 카테고리의 채용 공고 목록
}

// 카테고리 API 응답 타입
export interface JobCategoriesResponse {
  categories: JobCategory[];
  nextCursor?: string;
  totalCount?: number;
}

// 지역 정보 타입
export interface Region {
  id: string;
  name: string;
  count?: number; // 해당 지역의 채용 공고 수
}

// 경력 정보 타입
export interface Experience {
  id: string;
  name: string;
  count?: number; // 해당 경력의 채용 공고 수
}

// 일반 Jobs 조회 파라미터 타입
export interface GetJobsParams {
  cursor?: string;
  limit?: number;
  categories?: string[];
  regions?: string[];
  experiences?: string[];
}

// 필터 조회 파라미터 타입
export interface FilterParams {
  categories?: string[];
  regions?: string[];
  experiences?: string[];
  cursor?: string;
  limit?: number;
}

// 통합 API 파라미터 타입
export interface UnifiedJobParams {
  isFiltered: boolean;
  params: FilterParams | GetJobsParams;
}
