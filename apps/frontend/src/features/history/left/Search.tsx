import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSearchWithDebounce } from "../hooks/useSearchWithDebounce";

export default function Search() {
  const { inputValue, setInputValue } = useSearchWithDebounce("", 500);

  return (
    <div className='flex flex-row gap-2'>
      <Input
        placeholder='공고명 또는 회사명 검색'
        className='flex-1'
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <Button variant='outline' size='icon'>
        <SearchIcon className='w-4 h-4' />
      </Button>
    </div>
  );
}
