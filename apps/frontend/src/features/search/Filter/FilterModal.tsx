import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { JOB_CATEGORIES, REGIONS, FilterParams } from "@/entities/job";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface FilterModalProps {
  onClose: () => void;
  onFilterApplied: (params: FilterParams) => void;
}

export default function FilterModal({
  onClose,
  onFilterApplied,
}: FilterModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const getExperienceAsArray = (): string[] => {
    if (experienceLevel === 0) return [];
    if (experienceLevel === 1) return ["신입"];
    return [`${experienceLevel}년`];
  };

  const handleApplyFilters = () => {
    setIsSubmitting(true);

    const filterParams: FilterParams = {
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      regions: selectedRegions.length > 0 ? selectedRegions : undefined,
      experiences: experienceLevel > 0 ? getExperienceAsArray() : undefined,
      limit: 20,
    };

    onFilterApplied(filterParams);

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <SheetContent
      side='bottom'
      className='p-5 mx-auto left-0 right-0 max-w-[420px] rounded-t-lg h-[80vh] overflow-hidden'
    >
      <SheetHeader>
        <SheetTitle>필터</SheetTitle>
      </SheetHeader>
      <ScrollArea className='h-full py-4'>
        <div className='space-y-6'>
          {/* Job Categories */}
          <div className='space-y-2'>
            <h3 className='font-medium'>직무 분야</h3>
            <div className='grid grid-cols-2 gap-2'>
              {Object.entries(JOB_CATEGORIES).map(([key, value]) => (
                <div key={key} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`category-${value}`}
                    checked={selectedCategories.includes(value)}
                    onCheckedChange={() => toggleCategory(value)}
                  />
                  <Label htmlFor={`category-${value}`}>{value}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className='space-y-2'>
            <h3 className='font-medium'>지역</h3>
            <div className='grid grid-cols-2 gap-2'>
              {Object.entries(REGIONS).map(([key, value]) => (
                <div key={key} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`location-${value}`}
                    checked={selectedRegions.includes(value)}
                    onCheckedChange={() => toggleRegion(value)}
                  />
                  <Label htmlFor={`location-${value}`}>{value}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className='space-y-2'>
            <h3 className='font-medium'>경력</h3>
            <div className='px-2'>
              <Slider
                defaultValue={[experienceLevel]}
                value={[experienceLevel]}
                onValueChange={(values) => setExperienceLevel(values[0])}
                max={10}
                step={1}
              />
              <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
                <span>신입</span>
                <span>{experienceLevel}년</span>
                <span>10년+</span>
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <Button
            className='w-full'
            onClick={handleApplyFilters}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                적용 중...
              </>
            ) : (
              "필터 적용"
            )}
          </Button>
        </div>
      </ScrollArea>
    </SheetContent>
  );
}
