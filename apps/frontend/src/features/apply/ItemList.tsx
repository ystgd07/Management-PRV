import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Application, StageId } from "@/entities/apply/model";
import { useApplyQuery } from "@/entities/apply/queries";
import { StageBadge } from "@/shared/ui/StageBadge";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import ApplyStatusDetail from "./ApplyStatusDetail";

export default function ItemList() {
  const { data } = useApplyQuery();
  const [activeTab, setActiveTab] = useState("applications");

  // 상세정보 Sheet 상태관리
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("submitted");
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  //  상세보기 버튼 클릭 핸들러
  const handleDetailClick = (application: Application) => {
    if (!application) return;

    setSelectedAppId(application.id);
    setDetailOpen(true);
    setCurrentStatus(mapStatusToDetailStatus(application.currentStage.name));
  };

  // 상태 변경 핸들러
  const handleStatusChange = (
    appId: number,
    status: string,
    date?: string,
    note?: string
  ) => {
    // 상태 변경 로직 추가(!#추후구현)
    console.log("상태 변경", appId, status, date, note);
  };

  // 서버 응답의 상태를 DetailSheet에서 사용하는 상태 ID로 변환
  const mapStatusToDetailStatus = (stageName: string): string => {
    const statusMap: Record<string, string> = {
      "서류 검토중": "reviewing",
      과제전형: "document_passed",
      코딩테스트: "document_passed",
      "1차 면접": "interview_scheduled",
      "2차 면접": "interview_scheduled",
      "기술 면접": "interview_scheduled",
      "인성 면접": "interview_scheduled",
      "최종 합격": "final_passed",
      불합격: "rejected",
    };
    return statusMap[stageName] || "submitted";
  };

  return (
    <>
      {data && data.applications.length > 0 ? (
        <div className='space-y-3'>
          {data?.applications.map((application) => (
            <Card key={application.id} className='overflow-hidden'>
              <CardContent className='p-4'>
                <div>
                  <h3 className='font-bold'>{application.companyName}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {application.position !== ""
                      ? application.position
                      : application.companyName}
                  </p>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Badge className=' flex items-center justify-center'>
                    {application.status === "active" ? "진행중" : "완료"}
                  </Badge>
                  <span className='text-xs text-muted-foreground'>
                    지원일: {application.appliedDate}
                  </span>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <StageBadge
                    stage={application.currentStage}
                    id={application.currentStage.id as StageId}
                  />
                </div>
                {/* 추후 추가 검토 필요: 다음 단계 데이터 필요 */}
                {/* {application.nextStep && (
                  <div className='mt-3 p-2 bg-muted rounded-md'>
                    <p className='text-sm font-medium'>
                      다음 단계: {application.nextStep}
                    </p>
                    {application.nextDate && (
                      <p className='text-xs text-muted-foreground'>
                        일정: {application.nextDate}
                      </p>
                    )}
                  </div> */}
                {/* )} */}
                <div className='flex justify-end mt-3'>
                  <Button
                    size='sm'
                    className='cursor-pointer'
                    onClick={() => handleDetailClick(application)}
                  >
                    수정
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <Briefcase className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='font-medium text-lg'>지원 내역이 없습니다</h3>
          <p className='text-muted-foreground mt-1'>
            관심있는 공고에 지원해보세요
          </p>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => setActiveTab("search")}
          >
            공고 검색하기
          </Button>
        </div>
      )}
      {/* 상세 정보 시트 */}
      <ApplyStatusDetail
        open={detailOpen}
        onOpenChange={setDetailOpen}
        currentStatus={currentStatus}
        applicationId={selectedAppId || 0} // null일 때 0으로 기본값 설정
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
