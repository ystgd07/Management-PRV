import { api } from "@/shared/api/apiClient";
import {
  AddFavoriteRequest,
  AddFavoriteResponse,
  DeleteFavoriteResponse,
  Favorite,
} from "./model";

export const getFavorites = async (): Promise<Favorite[]> => {
  return api.get<Favorite[]>("/favorites");
};

export const addFavorite = async (
  data: AddFavoriteRequest
): Promise<AddFavoriteResponse> => {
  return api.post<AddFavoriteResponse>("/favorites", data);
};

export const deleteFavorite = async (
  favoriteId: number
): Promise<DeleteFavoriteResponse> => {
  return api.delete<DeleteFavoriteResponse>(`/favorites/${favoriteId}`);
};
