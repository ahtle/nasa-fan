"use client";

import { useState } from "react";
import { FilterState } from "./typing";
import FiltersSection from "./filters-section";

const initialFilterState = {
  search: "moon",
};

export default function GalleryPage() {
  const [filterState, setFilterState] =
    useState<FilterState>(initialFilterState);

  return (
    <div className="page-container">
      <div className="space-y-2 md:space-y-4">
        <h2 className="text-center">
          Explore the latest images and videos from NASA.
        </h2>
        <FiltersSection
          filterState={filterState}
          setFilterState={setFilterState}
        />
      </div>
    </div>
  );
}
