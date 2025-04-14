import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterModal from "./FilterModal";
import { useState } from "react";
import { FilterParams } from "@/entities/job";

interface SearchBarProps {
  onFilterApplied: (params: FilterParams) => void;
}

export default function SearchBar({ onFilterApplied }: SearchBarProps) {
  const [open, setOpen] = useState(false);

  const handleFilterApplied = (params: FilterParams) => {
    onFilterApplied(params);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex items-center space-x-2'>
      {/* 검색 UI 삭제 예정 - 불필요 */}
      {/* <div className='relative flex-1'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='직무, 회사, 키워드 검색'
          className='pl-8'
        />
      </div> */}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2'
          >
            <Filter className='h-4 w-4' />
            <span>상세 필터</span>
          </Button>
        </SheetTrigger>
        <FilterModal
          onClose={handleClose}
          onFilterApplied={handleFilterApplied}
        />
      </Sheet>
    </div>
  );
}
