"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FilterState } from "./typing";
import { NASA_IMAGE_SEARCH_PAGE_SIZE, searchNasaImages } from "@/lib/nasa";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import LoadingSpinner from "@/components/loading-spinner";
import ButtonBase from "@/components/buttons/button-base";
import FiltersSection from "./filters-section";
import GalleryPagination from "./gallery-pagination";
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
  const [page, setPage] = useState(1);
  const [pageContext, setPageContext] = useState(initialFilterState.search);

  if (debouncedSearch !== pageContext) {
    setPageContext(debouncedSearch);
    setPage(1);
  }

  const canSearch = debouncedSearch.length >= 2;

  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["image-search", debouncedSearch, page],
    queryFn: () =>
      searchNasaImages({
        q: debouncedSearch,
        page,
        pageSize: NASA_IMAGE_SEARCH_PAGE_SIZE,
      }),
    enabled: canSearch,
    placeholderData: keepPreviousData,
  });

  const isLoading = isPending || isFetching;
  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / NASA_IMAGE_SEARCH_PAGE_SIZE))
    : 1;

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

        {canSearch && isLoading && !data && (
          <div className="flex justify-center rounded-2xl border border-zinc-200 bg-white p-8">
            <LoadingSpinner label="Searching NASA images…" />
          </div>
        )}

        {canSearch && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
            <p className="font-medium text-red-700">Failed to load images</p>
            <p className="mt-2 text-sm text-red-600">{error.message}</p>
            <ButtonBase
              variant="destructive"
              className="mt-4"
              onClick={() => refetch()}
            >
              Try again
            </ButtonBase>
          </div>
        )}

        {canSearch && data && (
          <div className="relative space-y-4">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70">
                <LoadingSpinner label="Searching NASA images…" />
              </div>
            )}
            <p className="text-sm text-zinc-500">
              {data.total.toLocaleString()} results
            </p>
            <ResultGallery {...data} />
            <GalleryPagination
              page={data.page}
              totalPages={totalPages}
              hasNextPage={data.hasNextPage}
              onPageChange={setPage}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
