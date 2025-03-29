import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function FilterModal() {
  return (
    <SheetContent
      side='bottom'
      className='p-5 mx-auto left-0 right-0 max-w-[420px] rounded-t-lg h-[80vh] overflow-hidden '
    >
      <SheetHeader>
        <SheetTitle>필터</SheetTitle>
      </SheetHeader>
      <ScrollArea className='h-full py-4 '>
        <div className='space-y-6'>
          {/* Job Categories */}
          <div className='space-y-2'>
            <h3 className='font-medium'>직무 분야</h3>
            <div className='grid grid-cols-2 gap-2'>
              {[
                "프론트엔드",
                "백엔드",
                "풀스택",
                "모바일",
                "데브옵스",
                "데이터",
                "디자인",
              ].map((category) => (
                <div key={category} className='flex items-center space-x-2'>
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className='space-y-2'>
            <h3 className='font-medium'>지역</h3>
            <div className='grid grid-cols-2 gap-2'>
              {["서울", "경기", "인천", "부산", "대전", "대구", "광주"].map(
                (location) => (
                  <div key={location} className='flex items-center space-x-2'>
                    <Checkbox id={`location-${location}`} />
                    <Label htmlFor={`location-${location}`}>{location}</Label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Experience Level */}
          <div className='space-y-2'>
            <h3 className='font-medium'>경력</h3>
            <div className='px-2'>
              <Slider defaultValue={[3]} max={10} step={1} />
              <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
                <span>신입</span>
                <span>3년</span>
                <span>10년+</span>
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <Button className='w-full'>필터 적용</Button>
        </div>
      </ScrollArea>
    </SheetContent>
  );
}
