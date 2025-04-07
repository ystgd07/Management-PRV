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
}

export interface JobsResponse {
  jobs: Job[];
  nextCursor?: string;
  totalCount?: number;
}
