import { TabsContent } from "@/components/ui/tabs";
import { FilterParams, useUnifiedInfiniteJobsQuery } from "@/entities/job";
import { useState } from "react";
import ActiveFilters from "../Filter/ActiveFilters";
import SearchBar from "../Filter/SearchBar";
import ListItems from "../List/ListItems";
import FilteredListItems from "../List/FilteredListItems";

export default function ContentContainer() {
  // 필터 관련 상태
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterParams, setFilterParams] = useState<FilterParams>({ limit: 20 });

  // 필터 적용 핸들러
  const handleFilterApplied = (params: FilterParams) => {
    setIsFiltered(true);
    setFilterParams(params);
  };

  // 필터 제거 핸들러
  const handleFilterRemoved = (params: FilterParams) => {
    // 필터가 모두 제거되었는지 확인
    const hasNoFilters =
      !params.categories?.length &&
      !params.regions?.length &&
      !params.experiences?.length;

    if (hasNoFilters) {
      // 모든 필터가 제거되었으면 일반 모드로 전환
      setIsFiltered(false);
      setFilterParams({ limit: 20 });
    } else {
      // 일부 필터만 제거된 경우 파라미터 업데이트
      setFilterParams(params);
    }
  };

  return (
    <>
      {/* Search Tab */}
      <TabsContent value='search' className='p-4 space-y-4'>
        {/* Search Bar */}
        <SearchBar onFilterApplied={handleFilterApplied} />

        {/* Active Filters */}
        <ActiveFilters
          filterParams={filterParams}
          onFilterRemoved={handleFilterRemoved}
        />

        {/* Items Filter,Default */}
        {isFiltered ? (
          // 필터링된 결과 표시
          <FilteredListItems
            isFiltered={isFiltered}
            filterParams={filterParams}
          />
        ) : (
          // 기본 전체 리스트 표시
          <ListItems />
        )}
      </TabsContent>
    </>
  );
}
