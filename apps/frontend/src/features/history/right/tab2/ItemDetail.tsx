import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "date-fns";

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

export default function ItemDetail({
  selectedApp,
}: {
  selectedApp: Application;
}) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>지원 정보</h3>
        <Card>
          <CardContent className='p-4 space-y-3'>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <p className='text-sm text-muted-foreground'>지원일</p>
                  <p>{formatDate(selectedApp.appliedDate, "yyyy-MM-dd")}</p>
                </div>
                <div className='flex-1'>
                  <p className='text-sm text-muted-foreground'>현재 상태</p>
                  <Badge variant={getStatusBadgeVariant(selectedApp.status)}>
                    {getStatusLabel(selectedApp.status)}
                  </Badge>
                </div>
              </div>
              {selectedApp.nextStep && (
                <div className='w-full'>
                  <p className='text-sm text-muted-foreground'>다음 단계</p>
                  <p>{selectedApp.nextStep}</p>
                  {selectedApp.nextDate && (
                    <p className='text-sm text-muted-foreground'>
                      일정:{" "}
                      {formatDate(selectedApp.nextDate, "yyyy년 MM월 dd일")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
