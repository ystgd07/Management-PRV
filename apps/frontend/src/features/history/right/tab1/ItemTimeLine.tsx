import {
  CheckCircle,
  AlertCircle,
  ChevronDown,
  XCircle,
  Clock,
  Edit2,
  Calendar,
  FileText,
} from "lucide-react";
import { formatDate } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GetApplicationsResponse } from "@/entities/apply/model";
import { useHistoryStore } from "@/store/history/store";
import {
  getStatusById,
  ApplicationStatusId,
} from "@/shared/constants/applicationStatus";

export default function ItemTimeLine({
  applications,
}: // expandedStatus,
// editingNote,
// setEditingNote,
// noteText,
// setNoteText,
// saveNote,
// cancelEditing,
// setExpandedStatus,
{
  applications: GetApplicationsResponse | undefined;
  // expandedStatus: string | null;
  // editingNote: { appId: number; index: number } | null;
  // setEditingNote: Dispatch<
  //   SetStateAction<{ appId: number; index: number } | null>
  // >;
  // noteText: string;
  // setNoteText: Dispatch<SetStateAction<string>>;
  // saveNote: () => void;
  // cancelEditing: () => void;
  // setExpandedStatus: Dispatch<SetStateAction<string | null>>;
}) {
  const [noteText, setNoteText] = useState("");

  const {
    selectedApplication,
    setEditingNote,
    editingNote,
    expandStatus,
    setExpandStatus,
  } = useHistoryStore();

  const selectedApp = applications?.applications.find(
    (app) => app.id === selectedApplication
  );

  const getStatusLabel = (stageId: number) => {
    const status = getStatusById(stageId as ApplicationStatusId);
    return status ? status.label : "상태 정보 없음";
  };

  const getStatusInfo = (stageId: number) => {
    const status = getStatusById(stageId as ApplicationStatusId);

    if (!status) {
      return {
        icon: <Clock className='h-4 w-4' />,
        color: "bg-gray-100 text-gray-700 border-gray-200",
      };
    }

    // 상태 ID에 따라 다른 아이콘과 색상 반환
    switch (status.id) {
      case 1: // 서류 검토중
        return {
          icon: <Clock className='h-4 w-4' />,
          color: "bg-amber-100 text-amber-700 border-amber-200",
        };
      case 2: // 과제전형
      case 3: // 코딩테스트
        return {
          icon: <FileText className='h-4 w-4' />,
          color: "bg-purple-100 text-purple-700 border-purple-200",
        };
      case 4: // 1차 면접
      case 5: // 2차 면접
      case 6: // 기술 면접
      case 7: // 인성 면접
        return {
          icon: <Calendar className='h-4 w-4' />,
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case 8: // 최종 합격
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case 9: // 불합격
        return {
          icon: <XCircle className='h-4 w-4' />,
          color: "bg-red-100 text-red-700 border-red-200",
        };
      default:
        return {
          icon: <AlertCircle className='h-4 w-4' />,
          color: "bg-gray-100 text-gray-700 border-gray-200",
        };
    }
  };

  const startEditingNote = (
    appId: number,
    index: number,
    currentNote: string
  ) => {
    setEditingNote({ appId, index });
    setNoteText(currentNote);
  };

  const toggleExpand = (status: string) => {
    if (expandStatus === status) {
      setExpandStatus(null);
    } else {
      setExpandStatus(status);
    }
  };

  return (
    <>
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>지원 상태 히스토리</h3>
        <p className='text-sm text-muted-foreground'>
          지원 과정의 모든 상태 변경 내역을 확인하고 메모를 수정할 수 있습니다.
        </p>
      </div>
      <div className='space-y-2 relative'>
        {/* Timeline line */}
        <div
          className='absolute left-4 top-0 bottom-0 w-0.5 bg-muted'
          aria-hidden='true'
          style={{ transform: "translateX(-50%)" }}
        />
        {selectedApp?.stageHistory.map((historyItem, index) => {
          const { icon, color } = getStatusInfo(historyItem.stage.id);
          const isLast = index === selectedApp.stageHistory.length - 1;

          // 현재 페이지에서 수정 중인 메모인지 확인 (선택된 공고의 히스토리인지 확인)
          const isEditing =
            editingNote?.appId === selectedApp.id &&
            editingNote?.index === index;

          const isExpanded =
            expandStatus === `${historyItem.stage.name}-${index}` || isEditing;

          return (
            <div
              key={`${historyItem.stage.id}-${index}`}
              className='relative pl-8'
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-4 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2",
                  color
                )}
                aria-hidden='true'
              >
                {icon}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "p-4 rounded-lg border",
                  isLast ? "bg-background" : "bg-muted/30",
                  isExpanded ? "border-primary" : "border-border"
                )}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col items-start'>
                    <span className='font-medium'>
                      {getStatusLabel(historyItem.stageId)}
                    </span>
                    <span className='text-sm text-muted-foreground'>
                      {formatDate(historyItem.startDate, "yyyy-MM-dd")}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    {!isEditing && (
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                          startEditingNote(
                            selectedApp.id,
                            index,
                            historyItem.notes
                          )
                        }
                        aria-label='메모 수정'
                      >
                        <Edit2 className='h-4 w-4' />
                      </Button>
                    )}
                    {!isEditing && (
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                          toggleExpand(`${historyItem.stage.name}-${index}`)
                        }
                        aria-label={isExpanded ? "접기" : "펼치기"}
                      >
                        {isExpanded ? (
                          <ChevronDown className='h-4 w-4' />
                        ) : (
                          <ChevronRight className='h-4 w-4' />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className='mt-3 pt-3 border-t'>
                    {isEditing ? (
                      <div className='space-y-2'>
                        <Textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder='이 단계에 대한 메모를 입력하세요...'
                          className='min-h-[100px]'
                        />
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setEditingNote(null)}
                          >
                            <X className='h-3.5 w-3.5 mr-1' />
                            취소
                          </Button>
                          <Button size='sm'>
                            <Save className='h-3.5 w-3.5 mr-1' />
                            저장
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='text-sm'>
                        {historyItem.notes ? (
                          <p>{historyItem.notes}</p>
                        ) : (
                          <p className='text-muted-foreground italic'>
                            메모가 없습니다. 메모를 추가하려면 수정 버튼을
                            클릭하세요.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
