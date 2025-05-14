import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { Favorite } from "@/entities/favorite/model";

interface JobStore {
  savedJobIds: string[];
  favorites: Favorite[];
  setSavedJobIds: (ids: string[]) => void;
  setFavorites: (favorites: Favorite[]) => void;
  // 로컬 동작용 임시 토글 함수 (실제 API 요청은 훅을 통해 처리)
  toggleSaveJob: (jobId: string) => void;
  removeSavedJob: (jobId: string) => void;
  clearAllSavedJobs: () => void;
  getFavoriteIdByJobId: (jobId: string) => number | null;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      savedJobIds: [],
      favorites: [],
      setSavedJobIds: (ids) => set({ savedJobIds: ids }),
      setFavorites: (favorites) => set({ favorites }),

      // UI 빠른 업데이트를 위한 로컬 토글 함수
      toggleSaveJob: (jobId) =>
        set((state) => {
          const isAlreadySaved = state.savedJobIds.includes(jobId);

          if (isAlreadySaved) {
            toast("관심 공고에서 제거되었습니다.", {
              duration: 2000,
              icon: "💔",
              style: {
                backgroundColor: "#f43f5e",
                color: "#fff",
              },
            });
            return {
              savedJobIds: state.savedJobIds.filter((id) => id !== jobId),
            };
          } else {
            toast("관심 공고에 추가되었습니다.", {
              duration: 2000,
              icon: "💖",
              style: {
                backgroundColor: "#34d399",
                color: "#fff",
              },
            });
            return {
              savedJobIds: [...state.savedJobIds, jobId],
            };
          }
        }),

      removeSavedJob: (jobId) =>
        set((state) => ({
          savedJobIds: state.savedJobIds.filter((id) => id !== jobId),
        })),

      clearAllSavedJobs: () => set({ savedJobIds: [] }),

      getFavoriteIdByJobId: (jobId) => {
        const favorite = get().favorites.find(
          (fav) => String(fav.jobId) === String(jobId)
        );
        return favorite ? favorite.id : null;
      },
    }),
    {
      name: "job-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
);
