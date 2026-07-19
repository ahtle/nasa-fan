"use client";

import { useQuery } from "@tanstack/react-query";
import { hasAccessToken } from "@/lib/api";
import { getSearchFavoriteIds } from "@/lib/nasa";
import { useHasMounted } from "@/hooks/use-has-mounted";

export const searchFavoriteIdsQueryKey = ["search-favorites", "ids"] as const;

export function useSearchFavoriteIds() {
  const hasMounted = useHasMounted();

  return useQuery({
    queryKey: searchFavoriteIdsQueryKey,
    queryFn: getSearchFavoriteIds,
    enabled: hasMounted && hasAccessToken(),
    retry: false,
  });
}
