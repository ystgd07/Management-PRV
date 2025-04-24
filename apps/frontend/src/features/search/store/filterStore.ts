import { create } from "zustand";
import {
  ALL_JOB_CATEGORIES,
  ALL_REGIONS,
  ALL_EXPERIENCES,
  JOB_CATEGORIES,
  REGIONS,
  EXPERIENCES,
  Experience,
} from "@/entities/job";

export interface FilterState {
  // 필터 상태
  selectedCategories: string[];
  selectedRegions: string[];
  experienceLevel: number; // 0(신입) ~ 10(10년 이상)

  // 액션
  toggleCategory: (category: string) => void;
  toggleRegion: (region: string) => void;
  setExperienceLevel: (level: number) => void;
  resetFilters: () => void;

  // 선택된 값을 배열로 변환
  getExperienceAsArray: () => string[];

  // 필터가 적용되었는지 확인
  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  // 초기 상태
  selectedCategories: [],
  selectedRegions: [],
  experienceLevel: 0,

  // 액션
  toggleCategory: (category: string) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  toggleRegion: (region: string) =>
    set((state) => ({
      selectedRegions: state.selectedRegions.includes(region)
        ? state.selectedRegions.filter((r) => r !== region)
        : [...state.selectedRegions, region],
    })),

  setExperienceLevel: (level: number) => set({ experienceLevel: level }),

  resetFilters: () =>
    set({
      selectedCategories: [],
      selectedRegions: [],
      experienceLevel: 0,
    }),

  // 경력 수준을 배열로 변환 (API 요청용)
  getExperienceAsArray: () => {
    const level = get().experienceLevel;
    if (level === 0) return ["신입"];
    return ALL_EXPERIENCES.slice(0, level + 1);
  },

  // 활성화된 필터가 있는지 확인
  hasActiveFilters: () => {
    const { selectedCategories, selectedRegions, experienceLevel } = get();
    return (
      selectedCategories.length > 0 ||
      selectedRegions.length > 0 ||
      experienceLevel > 0
    );
  },
}));
