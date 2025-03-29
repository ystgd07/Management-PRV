import { create } from "zustand";
import { toast } from "sonner";

interface JobStore {
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  savedJobs: [],
  toggleSaveJob: (jobId) =>
    set((state) => {
      const isAlreadySaved = state.savedJobs.includes(jobId);

      if (isAlreadySaved) {
        toast("관심 공고에서 제거되었습니다.", {
          duration: 2000,
        });
        return {
          savedJobs: state.savedJobs.filter((id) => id !== jobId),
        };
      } else {
        toast("관심 공고에 추가되었습니다.", {
          duration: 2000,
        });
        return {
          savedJobs: [...state.savedJobs, jobId],
        };
      }
    }),
}));
