import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className='flex flex-row gap-2'>
      <Input
        placeholder='공고명 또는 회사명 검색'
        className='flex-1'
        onChange={(e) => console.log(e.target.value)}
      />
      <Button variant='outline' size='icon'>
        <SearchIcon className='w-4 h-4' />
      </Button>
    </div>
  );
}
