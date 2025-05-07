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
  editingNote: boolean;
  /*
   ** @param editing: boolean(노트 수정 여부)
   */
  setEditingNote: (editing: boolean) => void;
  expandStatus: boolean;
  /*
   ** @param expand: boolean(상태 확장 여부)
   */
  setExpandStatus: (expand: boolean) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  selectedApplication: null,
  setSelectedApplication: (application) =>
    set({ selectedApplication: application }),
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: null,

  setStatusFilter: (status) => set({ statusFilter: status }),
  editingNote: false,

  setEditingNote: (editing) => set({ editingNote: editing }),
  expandStatus: false,

  setExpandStatus: (expand) => set({ expandStatus: expand }),
}));
