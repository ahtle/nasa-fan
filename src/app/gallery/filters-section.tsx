import { Dispatch, SetStateAction } from "react";
import { FilterState } from "./typing";
import InputBase from "@/components/inputs/input-base";

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
      <InputBase
        id="search"
        label="Search"
        placeholder="search"
        value={filterState.search}
        onChange={(search) => setFilterState((prev) => ({ ...prev, search }))}
      />
    </div>
  );
}
