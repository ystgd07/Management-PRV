import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface JobStore {
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
  clearAllSavedJobs: () => void;
  removeSavedJob: (jobId: string) => void;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
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
      removeSavedJob: (jobId) =>
        set((state) => ({
          savedJobs: state.savedJobs.filter((id) => id !== jobId),
        })),
      clearAllSavedJobs: () => set({ savedJobs: [] }),
    }),
    {
      name: "job-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
);
