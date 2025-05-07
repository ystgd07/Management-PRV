import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";

// 상태에 따른 배지 색상 결정 함수
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "document_passed":
    case "interview_passed":
    case "final_passed":
      return "default";
    case "reviewing":
    case "interview_scheduled":
      return "outline";
    case "rejected":
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

// 상태 ID에 따른 표시 텍스트 반환 함수
const getStatusLabel = (status: string) => {
  switch (status) {
    case "submitted":
      return "서류 제출";
    case "reviewing":
      return "서류 검토중";
    case "document_passed":
      return "서류 합격";
    case "interview_scheduled":
      return "면접 예정";
    case "interview_passed":
      return "면접 합격";
    case "final_passed":
      return "최종 합격";
    case "rejected":
      return "불합격";
    case "cancelled":
      return "지원 취소";
    default:
      return "상태 정보 없음";
  }
};

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

export default function Title({ selectedApp }: { selectedApp: Application }) {
  return (
    <div className='space-y-2'>
      <h2 className='text-2xl font-bold'>{selectedApp.jobTitle}</h2>
      <p className='text-lg text-muted-foreground'>{selectedApp.company}</p>
      <div className='flex items-center gap-2 mt-1'>
        <Badge variant='outline'>
          지원일: {formatDate(selectedApp.appliedDate, "yyyy-MM-dd")}
        </Badge>
        <Badge variant={getStatusBadgeVariant(selectedApp.status)}>
          {getStatusLabel(selectedApp.status)}
        </Badge>
      </div>
    </div>
  );
}
