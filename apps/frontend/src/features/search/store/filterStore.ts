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

  toggleCategory: (category: string) => void;
  toggleRegion: (region: string) => void;
  setExperienceLevel: (level: number) => void;
  resetFilters: () => void;

  getExperienceAsArray: () => string[];

  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedCategories: [],
  selectedRegions: [],
  experienceLevel: 0,

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

  hasActiveFilters: () => {
    const { selectedCategories, selectedRegions, experienceLevel } = get();
    return (
      selectedCategories.length > 0 ||
      selectedRegions.length > 0 ||
      experienceLevel > 0
    );
  },
}));
