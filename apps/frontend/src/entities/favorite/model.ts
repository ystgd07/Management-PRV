import { Job } from "../job/model";

export interface Favorite {
  id: number;
  jobId: number | string;
  notes?: string;
  status: "active" | "archived";
  createdAt: string;
  job?: Job;
}

export interface AddFavoriteRequest {
  jobId: number | string;
  notes?: string;
}

export interface AddFavoriteResponse extends Favorite {}

export interface DeleteFavoriteResponse {
  success: boolean;
}
