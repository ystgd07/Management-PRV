export interface PostApplyRequest {
  jobId: number;
  companyName: string;
  position: string;
  appliedDate: string;
  nextStageDate: string;
  notes?: string;
}

export interface PostApplyResponse {
  appId: number;
  message: string;
}

type ApplyStatus = "active" | "completed" | "withdrawn";

export interface Stage {
  id: number;
  name: string;
  displayOrder: number;
  createdAt: string;
}

export interface StageHistory {
  id: number;
  applicationId: number;
  stageId: number;
  result: string;
  startDate: string;
  endDate: string | null;
  nextStageDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  stage: Stage;
}

/*
 ** 지원 기록 조회 응답 타입
 */
export interface Application {
  id: number;
  userId: number;
  jobId: number;
  companyName: string;
  position: string;
  appliedDate: string;
  currentStageId: number;
  nextStageDate: string;
  status: ApplyStatus;
  createdAt: string;
  updatedAt: string;
  currentStage: Stage;
  stageHistory: StageHistory[];
}

export interface GetApplicationsResponse {
  applications: Application[];
}

/*
 ** 진행 상태 타입
 */
export type ProgressStatus =
  | "서류 검토중"
  | "과제전형"
  | "코딩테스트"
  | "1차 면접"
  | "2차 면접"
  | "기술 면접"
  | "인성 면접"
  | "최종 합격"
  | "불합격";

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;