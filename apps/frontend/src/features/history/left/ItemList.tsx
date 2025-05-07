import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useHistoryStore } from "@/store/history/store";
import { GetApplicationsResponse } from "@/entities/apply/model";
import {
  ApplicationStatusId,
  getStatusById,
} from "@/shared/constants/applicationStatus";

export default function ItemList({
  applications,
}: {
  applications: GetApplicationsResponse | undefined;
}) {
  const {
    statusFilter,
    setSelectedApplication,
    selectedApplication,
    dateSort,
    searchQuery,
  } = useHistoryStore();

  // id로 다시 표시용 라벨 얻기
  const getStatusLabel = (statusId: number) => {
    const status = getStatusById(statusId as ApplicationStatusId);
    return status ? status.label : "상태 정보 없음";
  };

  // id에 맞는 배지 스타일 얻기
  const getStatusBadgeVariant = (statusId: number) => {
    const status = getStatusById(statusId as ApplicationStatusId);
    if (!status) return "secondary";

    switch (status.id) {
      case 1: // 서류 검토중
      case 2: // 과제전형
      case 3: // 코딩테스트
        return "outline";
      case 4: // 1차 면접
      case 5: // 2차 면접
      case 6: // 기술 면접
      case 7: // 인성 면접
        return "default";
      case 8: // 최종 합격
        return "default";
      case 9: // 불합격
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredApplications = applications?.applications.filter((app) => {
    // 상태 필터링
    const matchesStatus =
      statusFilter === null || app.currentStageId === statusFilter;

    // 검색어 필터링
    const matchesSearch =
      searchQuery.trim() === "" ||
      app.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const sortedApplications = [...(filteredApplications || [])].sort((a, b) => {
    const dateA = new Date(a.appliedDate).getTime();
    const dateB = new Date(b.appliedDate).getTime();

    return dateSort === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <ScrollArea className='h-[calc(100vh-280px)]'>
      <div className='space-y-3 pr-4'>
        <div className='text-sm text-muted-foreground'>
          {filteredApplications?.length}개의 지원 내역이 있습니다.
        </div>
        {sortedApplications?.map((app) => (
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
                  <h3 className='font-bold'>
                    {app.position ? app.position : "포지션 정보 없음"}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {app.companyName ? app.companyName : "회사 이름 없음"}
                  </p>
                </div>
                <Badge variant={getStatusBadgeVariant(app.currentStageId)}>
                  {getStatusLabel(app.currentStageId)}
                </Badge>
              </div>
              <div className='flex items-center gap-2 mt-2 text-xs text-muted-foreground'>
                <Calendar className='h-3 w-3' />
                <span>지원일: {formatDate(app.appliedDate, "yyyy-MM-dd")}</span>
              </div>
              {app.nextStageDate && (
                <div className='mt-2 text-xs'>
                  <span className='font-medium'>다음 단계: </span>
                  {app.nextStageDate
                    ? formatDate(app.nextStageDate, "yyyy-MM-dd")
                    : "다음 단계 정보 없음"}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {sortedApplications?.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>
              {" "}
              {statusFilter !== null
                ? `선택한 상태(${getStatusLabel(
                    statusFilter
                  )})의 지원 내역이 없습니다.`
                : "검색 결과가 없습니다."}
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
