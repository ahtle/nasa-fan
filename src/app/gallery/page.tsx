"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilterState } from "./typing";
import { searchNasaImages } from "@/lib/nasa";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import FiltersSection from "./filters-section";
import ResultGallery from "./result-gallery";

const initialFilterState = {
  search: "moon",
};

const SEARCH_DEBOUNCE_MS = 300;

export default function GalleryPage() {
  const [filterState, setFilterState] =
    useState<FilterState>(initialFilterState);
  const debouncedSearch = useDebouncedValue(
    filterState.search,
    SEARCH_DEBOUNCE_MS,
  );

  const canSearch = debouncedSearch.length >= 2;

  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["image-search", debouncedSearch],
    queryFn: () => searchNasaImages({ q: debouncedSearch }),
    enabled: canSearch,
  });

  console.log(data);

  return (
    <div className="page-container">
      <div className="w-full space-y-2 md:space-y-4">
        <h2 className="text-center">
          Explore the latest images and videos from NASA.
        </h2>
        <FiltersSection
          filterState={filterState}
          setFilterState={setFilterState}
        />

        {!canSearch && (
          <p className="text-center text-zinc-500">
            Enter at least 2 characters to search.
          </p>
        )}

        {canSearch && isPending && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="text-zinc-500">Searching NASA images…</p>
          </div>
        )}

        {canSearch && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
            <p className="font-medium text-red-700">Failed to load images</p>
            <p className="mt-2 text-sm text-red-600">{error.message}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Try again
            </button>
          </div>
        )}

        {canSearch && data && !isPending && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-500">
              {data.total.toLocaleString()} results
            </p>
            <ResultGallery {...data} />
          </div>
        )}
      </div>
    </div>
  );
}
