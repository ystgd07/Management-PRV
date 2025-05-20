"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  Application,
  StageId,
  UpdateApplicationRequest,
} from "@/entities/apply/model";
import {
  useApplyQuery,
  useUpdateApplyMutation,
  useDeleteApplyMutation,
} from "@/entities/apply/queries";
import { StageBadge } from "@/shared/ui/StageBadge";
import { AlertCircle, Briefcase, Trash2 } from "lucide-react";
import { useState } from "react";
import ApplyStatusDetail from "./ApplyStatusDetail";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ItemList() {
  const { data } = useApplyQuery();
  const [activeTab, setActiveTab] = useState("applications");
  const { mutate: updateApply } = useUpdateApplyMutation();
  const { mutate: deleteApply } = useDeleteApplyMutation();

  // 상세정보 Sheet 상태관리
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("submitted");
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  // 삭제 확인 다이얼로그 상태관리
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<Application | null>(null);

  //  상세보기 버튼 클릭 핸들러
  const handleDetailClick = (application: Application) => {
    if (!application) return;

    setSelectedAppId(application.id);
    setDetailOpen(true);
    setCurrentStatus(mapStatusToDetailStatus(application.currentStage.name));
  };

  // 상태 변경 핸들러
  const handleStatusChange = (
    appId?: number,
    status?: string,
    date?: string,
    nextDate?: string,
    note?: string
  ) => {
    const data: UpdateApplicationRequest = {
      currentStageId: Number(status),
      // stageDate 가 빈 문자열이면 아예 필드 자체를 뻄
      ...(date ? { stageDate: date } : {}),
      ...(nextDate ? { nextStageDate: nextDate } : {}),
      ...(note ? { notes: note } : {}),
    };
    updateApply({ id: appId || 0, data });
    setDetailOpen(false);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (application: Application) => {
    setApplicationToDelete(application);
    setDeleteDialogOpen(true);
  };

  // 삭제 확인 핸들러
  const handleConfirmDelete = (id: number) => {
    deleteApply(id);
    setDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };

  // 서버 응답의 상태를 DetailSheet에서 사용하는 상태 ID로 변환
  const mapStatusToDetailStatus = (stageName: string): string => {
    const statusMap: Record<string, string> = {
      "서류 검토중": "1",
      과제전형: "2",
      코딩테스트: "3",
      "1차 면접": "4",
      "2차 면접": "5",
      "기술 면접": "6",
      "인성 면접": "7",
      "최종 합격": "8",
      불합격: "9",
      지원취소: "10",
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
                  <Badge className='flex items-center justify-center'>
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
                <div className='flex justify-end gap-2 mt-3'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='cursor-pointer border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-colors'
                    onClick={() => handleDeleteClick(application)}
                  >
                    <Trash2 className='h-4 w-4 mr-1' />
                    삭제
                  </Button>
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

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center gap-2'>
              <AlertCircle className='h-5 w-5 text-destructive' />
              지원 내역 삭제
            </AlertDialogTitle>
            <AlertDialogDescription>
              {applicationToDelete && (
                <>
                  <span className='font-medium'>
                    {applicationToDelete.companyName}
                  </span>
                  {applicationToDelete.position && (
                    <span> - {applicationToDelete.position}</span>
                  )}
                  <span> 지원 내역을 삭제하시겠습니까?</span>
                  <p className='mt-2'>이 작업은 되돌릴 수 없습니다.</p>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleConfirmDelete(applicationToDelete?.id || 0)}
              className='bg-destructive hover:bg-destructive/90'
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
