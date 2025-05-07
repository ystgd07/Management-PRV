import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Category() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSort, setDateSort] = useState<string>("newest");

  return (
    <div className='flex gap-2'>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className='flex-1'>
          <SelectValue placeholder='상태 필터' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>모든 상태</SelectItem>
          <SelectItem value='submitted'>서류 제출</SelectItem>
          <SelectItem value='reviewing'>서류 검토중</SelectItem>
          <SelectItem value='document_passed'>서류 합격</SelectItem>
          <SelectItem value='interview_scheduled'>면접 예정</SelectItem>
          <SelectItem value='interview_passed'>면접 합격</SelectItem>
          <SelectItem value='final_passed'>최종 합격</SelectItem>
          <SelectItem value='rejected'>불합격</SelectItem>
          <SelectItem value='cancelled'>지원 취소</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dateSort} onValueChange={setDateSort}>
        <SelectTrigger className='w-[130px]'>
          <SelectValue placeholder='정렬' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='newest'>최신순</SelectItem>
          <SelectItem value='oldest'>오래된순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
