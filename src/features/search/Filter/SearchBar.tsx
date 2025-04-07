import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterModal from "./FilterModal";

export default function SearchBar() {
  return (
    <div className='flex items-center space-x-2'>
      {/* <div className='relative flex-1'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='직무, 회사, 키워드 검색'
          className='pl-8'
        />
      </div> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2'
          >
            <Filter className='h-4 w-4 max-w-[420px]' />
            <span>상세 필터</span>
          </Button>
        </SheetTrigger>
        <FilterModal />
      </Sheet>
    </div>
  );
}
