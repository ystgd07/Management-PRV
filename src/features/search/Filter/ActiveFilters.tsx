import { Badge } from "@/components/ui/badge";

export default function ActiveFilters() {
  return (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='outline' className='flex items-center gap-1'>
        프론트엔드
        <button className='ml-1 text-xs'>✕</button>
      </Badge>
      <Badge variant='outline' className='flex items-center gap-1'>
        서울
        <button className='ml-1 text-xs'>✕</button>
      </Badge>
      <Badge variant='outline' className='flex items-center gap-1'>
        3년 이상
        <button className='ml-1 text-xs'>✕</button>
      </Badge>
    </div>
  );
}
