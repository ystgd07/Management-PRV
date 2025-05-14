import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GetApplicationsResponse } from "@/entities/apply/model";
import {
  getBadgeVariant,
  getStatusById,
} from "@/shared/constants/applicationStatus";
import { ApplicationStatusId } from "@/shared/constants/applicationStatus";
import { useHistoryStore } from "@/store/history/store";
import { formatDate } from "date-fns";

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
                    variant={getBadgeVariant(
                      selectedApp?.currentStageId as ApplicationStatusId
                    )}
                    className={
                      getStatusById(
                        selectedApp?.currentStageId as ApplicationStatusId
                      )?.colorClass
                    }
                  >
                    {
                      getStatusById(
                        selectedApp?.currentStageId as ApplicationStatusId
                      )?.label
                    }
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
