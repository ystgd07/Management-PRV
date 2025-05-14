import { Badge } from "@/components/ui/badge";
import { GetApplicationsResponse } from "@/entities/apply/model";
import {
  getBadgeVariant,
  getStatusById,
} from "@/shared/constants/applicationStatus";
import { ApplicationStatusId } from "@/shared/constants/applicationStatus";
import { useHistoryStore } from "@/store/history/store";
import { formatDate } from "date-fns";

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
      <h2 className='text-2xl font-bold'>
        {selectedApp?.position ? selectedApp?.position : "포지션 정보 없음"}
      </h2>
      <p className='text-lg text-muted-foreground'>
        {selectedApp?.companyName ? selectedApp?.companyName : "회사 이름 없음"}
      </p>
      <div className='flex items-center gap-2 mt-1'>
        <Badge variant='outline'>
          지원일:{" "}
          {selectedApp?.appliedDate
            ? formatDate(selectedApp?.appliedDate, "yyyy-MM-dd")
            : "날짜 정보 없음"}
        </Badge>
        <Badge
          variant={getBadgeVariant(
            selectedApp?.currentStageId as ApplicationStatusId
          )}
          className={
            getStatusById(selectedApp?.currentStageId as ApplicationStatusId)
              ?.colorClass
          }
        >
          {selectedApp?.status
            ? getStatusById(selectedApp?.currentStageId as ApplicationStatusId)
                ?.label
            : "상태 정보 없음"}
        </Badge>
      </div>
    </div>
  );
}
