import { Badge } from "@/components/ui/badge";
import { FilterParams } from "@/entities/job";
import { X } from "lucide-react";

export interface ActiveFiltersProps {
  filterParams: FilterParams;
  onFilterRemoved: (params: FilterParams) => void;
}

export default function ActiveFilters({
  filterParams,
  onFilterRemoved,
}: ActiveFiltersProps) {
  const handleRemoveFilter = (
    type: "category" | "region" | "experience",
    value?: string
  ) => {
    const updatedParams = { ...filterParams };

    if (type === "category" && value && updatedParams.categories) {
      updatedParams.categories = updatedParams.categories.filter(
        (c) => c !== value
      );
    } else if (type === "region" && value && updatedParams.regions) {
      updatedParams.regions = updatedParams.regions.filter((r) => r !== value);
    } else if (type === "experience" && updatedParams.experiences) {
      updatedParams.experiences = [];
    }

    onFilterRemoved(updatedParams);
  };

  const hasActiveFilters =
    (filterParams.categories && filterParams.categories.length > 0) ||
    (filterParams.regions && filterParams.regions.length > 0) ||
    (filterParams.experiences && filterParams.experiences.length > 0);

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {/* 카테고리 필터 */}
      {filterParams.categories?.map((category) => (
        <Badge
          key={`category-${category}`}
          variant='outline'
          className='flex items-center gap-1'
        >
          {category}
          <button
            className='ml-1 text-xs hover:bg-muted rounded-full p-0.5'
            onClick={() => handleRemoveFilter("category", category)}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}

      {/* 지역 필터 */}
      {filterParams.regions?.map((region) => (
        <Badge
          key={`region-${region}`}
          variant='outline'
          className='flex items-center gap-1'
        >
          {region}
          <button
            className='ml-1 text-xs hover:bg-muted rounded-full p-0.5'
            onClick={() => handleRemoveFilter("region", region)}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}

      {/* 경력 필터 */}
      {filterParams.experiences && filterParams.experiences.length > 0 && (
        <Badge variant='outline' className='flex items-center gap-1'>
          {filterParams.experiences[0] === "신입"
            ? "신입"
            : `${filterParams.experiences[0]}`}
          <button
            className='ml-1 text-xs hover:bg-muted rounded-full p-0.5'
            onClick={() => handleRemoveFilter("experience")}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      )}
    </div>
  );
}
