import { api } from "@/shared/api/apiClient";
import { PatchHistoryResponse } from "./model";

export const patchHistory = async (
  historyId: number,
  notes: string
): Promise<PatchHistoryResponse> => {
  return api.patch<PatchHistoryResponse>(`/apply/${historyId}`, { notes });
};
