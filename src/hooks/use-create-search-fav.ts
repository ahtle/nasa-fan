"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSearchFavorite } from "@/lib/nasa";
import { searchFavoriteIdsQueryKey } from "@/hooks/use-search-favorite-ids";

export function useCreateSearchFav() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSearchFavorite,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: searchFavoriteIdsQueryKey,
      });
    },
  });
}
