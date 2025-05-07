import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHistoryStore } from "@/store/history/store";
import {
  ApplicationStatusId,
  getAllStatueses,
} from "@/shared/constants/applicationStatus";

export default function Category() {
  const { statusFilter, setStatusFilter, dateSort, setDateSort } =
    useHistoryStore();

  const allStatuses = getAllStatueses();

  // 상태 ID → 문자열 변환 함수
  const getStatusValue = (id: ApplicationStatusId | null) => {
    if (id === null) return "all";
    return id.toString();
  };

  // 문자열 → 상태 ID 변환 함수
  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setStatusFilter(null);
    } else {
      // 숫자로 변환 (문자열 "1" → 숫자 1)
      const numId = parseInt(value, 10) as ApplicationStatusId;
      setStatusFilter(numId);
    }
  };

  return (
    <div className='flex gap-2'>
      <Select
        value={getStatusValue(statusFilter)}
        onValueChange={(value) => handleStatusChange(value)}
      >
        <SelectTrigger className='flex-1'>
          <SelectValue placeholder='상태 필터' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>모든 상태</SelectItem>
          {allStatuses.map((status) => (
            <SelectItem key={status.id} value={status.id.toString()}>
              {status.label}
            </SelectItem>
          ))}
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
