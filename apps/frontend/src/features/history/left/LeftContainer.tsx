import Search from "./Search";
import Category from "./Category";
import { Separator } from "@/components/ui/separator";
import ItemList from "./ItemList";
// 샘플 데이터 타입 정의
interface StatusHistoryItem {
  status: string;
  date: string;
  note: string;
}

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  nextStep?: string;
  nextDate?: string | null;
  statusHistory: StatusHistoryItem[];
}

export default function LeftContainer({
  applications,
  selectedApplication,
  setSelectedApplication,
  searchQuery,
  setSearchQuery,
}: {
  applications: Application[];
  selectedApplication: number | null;
  setSelectedApplication: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <Search />
      <Category />
      <Separator />
      <div className='text-sm text-muted-foreground'>
        {applications.length}개의 지원 내역이 있습니다.
      </div>
      <ItemList applications={applications} />
    </div>
  );
}
