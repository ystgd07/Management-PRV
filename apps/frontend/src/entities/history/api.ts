import { api } from "@/shared/api/apiClient";
import { PatchHistoryResponse } from "./model";

export const patchApiHistory = async (
  historyId: number,
  notes: string
): Promise<PatchHistoryResponse> => {
  return api.patch<PatchHistoryResponse>(`/apply/history/${historyId}/note`, {
    notes,
  });
};
