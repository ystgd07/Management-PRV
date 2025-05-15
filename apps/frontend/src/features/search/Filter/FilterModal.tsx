import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent } from "@/components/ui/sheet";
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
  const [experienceLevel, setExperienceLevel] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 슬라이더 값을 0~100 범위로 변환(부드러운 애니메이션 효과를 위해)
  const [tempLevel, setTempLevel] = useState(experienceLevel * 10); // 0~100

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
    if (experienceLevel === 0) return ["신입"];
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
      <ScrollArea className='h-full py-4'>
        <div className='space-y-6'>
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

          <div className='space-y-2'>
            <h3 className='font-medium'>경력</h3>
            <div className='px-2'>
              {/* onValueCommit: 슬라이더 드래그가 완료 됐을 때, 실행되는 이벤트 */}
              <Slider
                value={[tempLevel]}
                onValueChange={(v) => setTempLevel(v[0])}
                onValueCommit={(v) => setExperienceLevel(Math.round(v[0] / 10))}
                step={1}
                max={100}
                className='relative px-2'
              >
                <Slider.Track className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                  <Slider.Range
                    className='absolute h-full bg-blue-500
                 transition-[width] duration-300 ease-in-out will-change-[width]'
                  />
                </Slider.Track>
                <Slider.Thumb
                  className='block w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow
               transition-transform duration-300 ease-in-out will-change-transform
               hover:scale-125 active:scale-150'
                />
              </Slider>

              <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
                <span>신입</span>
                <span>{experienceLevel}년</span>
                <span>10년+</span>
              </div>
            </div>
          </div>

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
