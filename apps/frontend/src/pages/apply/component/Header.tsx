import { Link } from "react-router-dom";
import { History } from "lucide-react";

export default function ApplyHeader() {
  return (
    <div className='flex justify-between items-center'>
      <h2 className='text-lg font-semibold'>지원 현황</h2>
      <Link
        to='/history'
        className='flex items-center gap-1 text-primary text-sm'
      >
        <History className='w-4 h-4' />
        <span>히스토리 보기</span>
      </Link>
    </div>
  );
}
