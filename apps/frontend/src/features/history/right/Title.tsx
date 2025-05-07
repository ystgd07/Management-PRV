import { Badge } from "@/components/ui/badge";
import { GetApplicationsResponse } from "@/entities/apply/model";
import { getStatusById } from "@/shared/constants/applicationStatus";
import { ApplicationStatusId } from "@/shared/constants/applicationStatus";
import { useHistoryStore } from "@/store/history/store";
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

const getStatusLabel = (stageId: number) => {
  const status = getStatusById(stageId as ApplicationStatusId);
  return status ? status.label : "상태 정보 없음";
};

export default function Title({
  applications,
}: {
  applications: GetApplicationsResponse | undefined;
}) {
  const selectedApplicationId = useHistoryStore(
    (state) => state.selectedApplication
  );

  const selectedApp = applications?.applications.find(
    (app) => app.id === selectedApplicationId
  );

  return (
    <div className='space-y-2'>
      <h2 className='text-2xl font-bold'>{selectedApp?.position}</h2>
      <p className='text-lg text-muted-foreground'>
        {selectedApp?.companyName}
      </p>
      <div className='flex items-center gap-2 mt-1'>
        <Badge variant='outline'>
          지원일:{" "}
          {selectedApp?.appliedDate
            ? formatDate(selectedApp?.appliedDate, "yyyy-MM-dd")
            : "날짜 정보 없음"}
        </Badge>
        <Badge variant={getStatusBadgeVariant(selectedApp?.status || "")}>
          {selectedApp?.status
            ? getStatusLabel(selectedApp?.currentStageId || 0)
            : "상태 정보 없음"}
        </Badge>
      </div>
    </div>
  );
}
