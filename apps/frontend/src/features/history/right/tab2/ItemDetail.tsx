import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GetApplicationsResponse } from "@/entities/apply/model";
import { getStatusById } from "@/shared/constants/applicationStatus";
import { ApplicationStatusId } from "@/shared/constants/applicationStatus";
import { useHistoryStore } from "@/store/history/store";
import { formatDate } from "date-fns";

// 상태 ID에 따른 표시 텍스트 반환 함수
const getStatusLabel = (stageId: number) => {
  const status = getStatusById(stageId as ApplicationStatusId);
  return status ? status.label : "상태 정보 없음";
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
  applications,
}: {
  applications: GetApplicationsResponse | undefined;
}) {
  const { selectedApplication } = useHistoryStore();
  const selectedApp = applications?.applications.find(
    (app) => app.id === selectedApplication
  );

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
                  <p>
                    {formatDate(selectedApp?.appliedDate || "", "yyyy-MM-dd")}
                  </p>
                </div>
                <div className='flex-1'>
                  <p className='text-sm text-muted-foreground'>현재 상태</p>
                  <Badge
                    variant={getStatusBadgeVariant(selectedApp?.status || "")}
                  >
                    {getStatusLabel(selectedApp?.currentStageId || 0)}
                  </Badge>
                </div>
              </div>
              {selectedApp?.nextStageDate && (
                <div className='w-full'>
                  <p className='text-sm text-muted-foreground'>다음 단계</p>
                  <p>{selectedApp.nextStageDate}</p>
                  {selectedApp?.nextStageDate && (
                    <p className='text-sm text-muted-foreground'>
                      일정:{" "}
                      {formatDate(
                        selectedApp?.nextStageDate,
                        "yyyy년 MM월 dd일"
                      )}
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
