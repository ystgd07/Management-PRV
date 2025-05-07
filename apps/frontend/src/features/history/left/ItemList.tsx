import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";

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

export default function ItemList({
  applications,
  selectedApplication,
  setSelectedApplication,
}: {
  applications: Application[];
  selectedApplication: number | null;
  setSelectedApplication: (id: number) => void;
}) {
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

  return (
    <ScrollArea className='h-[calc(100vh-280px)]'>
      <div className='space-y-3 pr-4'>
        {applications.map((app) => (
          <Card
            key={app.id}
            className={cn(
              "cursor-pointer hover:border-primary transition-colors",
              selectedApplication === app.id && "border-primary"
            )}
            onClick={() => setSelectedApplication(app.id)}
          >
            <CardContent className='p-4'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='font-bold'>{app.jobTitle}</h3>
                  <p className='text-sm text-muted-foreground'>{app.company}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(app.status)}>
                  {getStatusLabel(app.status)}
                </Badge>
              </div>
              <div className='flex items-center gap-2 mt-2 text-xs text-muted-foreground'>
                <Calendar className='h-3 w-3' />
                <span>지원일: {formatDate(app.appliedDate, "yyyy-MM-dd")}</span>
              </div>
              {app.nextStep && (
                <div className='mt-2 text-xs'>
                  <span className='font-medium'>다음 단계: </span>
                  {app.nextStep}
                  {app.nextDate &&
                    ` (${formatDate(app.nextDate, "yyyy-MM-dd")})`}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {applications.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
