// 직무 카테고리 상수
export const JOB_CATEGORIES = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  MOBILE: "mobile",
  DEVOPS: "devops",
  DATA: "data",
  SECURITY: "security",
  FULLSTACK: "fullstack",
} as const;

// 지역 상수
export const REGIONS = {
  SEOUL: "서울",
  GYEONGGI: "경기",
  INCHEON: "인천",
  BUSAN: "부산",
  DAEJEON: "대전",
  DAEGU: "대구",
  GWANGJU: "광주",
  CHUNGCHEONG: "충청",
} as const;

// 경력 상수
export const EXPERIENCES = {
  NEWCOMER: "신입",
  YEAR_1: "1년차",
  YEAR_2: "2년차",
  YEAR_3: "3년차",
  YEAR_4: "4년차",
  YEAR_5: "5년차",
  YEAR_6: "6년차",
  YEAR_7: "7년차",
  YEAR_8: "8년차",
  YEAR_9: "9년차",
  YEAR_10_PLUS: "10년차 이상",
} as const;

// 타입 정의
export type JobCategory = (typeof JOB_CATEGORIES)[keyof typeof JOB_CATEGORIES];
export type Region = (typeof REGIONS)[keyof typeof REGIONS];
export type Experience = (typeof EXPERIENCES)[keyof typeof EXPERIENCES];

// 모든 카테고리 배열
export const ALL_JOB_CATEGORIES = Object.values(JOB_CATEGORIES);

// 모든 지역 배열
export const ALL_REGIONS = Object.values(REGIONS);

// 모든 경력 배열
export const ALL_EXPERIENCES = Object.values(EXPERIENCES);
