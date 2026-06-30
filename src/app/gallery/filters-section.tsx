import { Dispatch, SetStateAction } from "react";
import { FilterState } from "./typing";
import BaseInput from "@/components/inputs/base-input";

interface FilterSectionProp {
  filterState: FilterState;
  setFilterState: Dispatch<SetStateAction<FilterState>>;
}

export default function FiltersSection({
  filterState,
  setFilterState,
}: FilterSectionProp) {
  return (
    <div className="w-full grid md:grid-cols-4 gap-2">
      <BaseInput
        id="search"
        label="Search"
        placeholder="search"
        value={filterState.search}
        onChange={(search) => setFilterState((prev) => ({ ...prev, search }))}
      />
      <p>{filterState.search}</p>
    </div>
  );
}
