import { ApplicationStatusId } from "@/shared/constants/applicationStatus";
import { create } from "zustand";

interface HistoryStore {
  selectedApplication: number | null;
  /*
   ** @param application: number(각 지원별 고유 번호)
   */
  setSelectedApplication: (application: number) => void;
  searchQuery: string;
  /*
   ** @param query: string(검색 쿼리) debounce Custom Hook에서 사용(useSearchWithDebounce)
   */
  setSearchQuery: (query: string) => void;
  statusFilter: ApplicationStatusId | null;
  /*
   ** @param status: ApplicationStatusId[](각 상태별 ID 배열)
   */
  setStatusFilter: (status: ApplicationStatusId | null) => void;
  editingNote: { appId: number; index: number } | null;
  /*
   ** @param editing: boolean(노트 수정 여부)
   */
  setEditingNote: (editing: { appId: number; index: number } | null) => void;
  expandStatus: string | null;
  /*
   ** @param expand: boolean(상태 확장 여부)
   */
  setExpandStatus: (expand: string | null) => void;
  dateSort: "newest" | "oldest";
  /*
   ** @param dateSort: "newest" | "oldest"(날짜 정렬 기준)
   */
  setDateSort: (dateSort: "newest" | "oldest") => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  selectedApplication: null,
  setSelectedApplication: (application) =>
    set({ selectedApplication: application }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: null,
  setStatusFilter: (status) => set({ statusFilter: status }),
  editingNote: null,
  setEditingNote: (editing) => set({ editingNote: editing }),
  expandStatus: null,
  setExpandStatus: (expand) => set({ expandStatus: expand }),
  dateSort: "newest",
  setDateSort: (dateSort) => set({ dateSort }),
}));
