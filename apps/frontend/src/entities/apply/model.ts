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
