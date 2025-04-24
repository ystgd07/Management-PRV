import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavorite, deleteFavorite, getFavorites } from "./api";
import { AddFavoriteRequest } from "./model";

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
  });
};

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddFavoriteRequest) => addFavorite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useDeleteFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (favoriteId: number) => deleteFavorite(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
