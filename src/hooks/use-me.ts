"use client";

import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";
import { hasAccessToken } from "@/lib/api";
import { authMeQueryKey, getMe } from "@/lib/auth";

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useMe() {
  const hasMounted = useHasMounted();

  const query = useQuery({
    queryKey: authMeQueryKey,
    queryFn: getMe,
    enabled: hasMounted && hasAccessToken(),
    retry: false,
  });

  const isAuthLoading =
    !hasMounted || (hasAccessToken() && query.isPending);

  return { ...query, isAuthLoading };
}
