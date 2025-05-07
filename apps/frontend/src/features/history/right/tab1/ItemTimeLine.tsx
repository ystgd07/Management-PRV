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
import { Dispatch } from "react";
import { SetStateAction } from "react";

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

export default function ItemTimeLine({
  selectedApp,
  expandedStatus,
  editingNote,
  setEditingNote,
  noteText,
  setNoteText,
  saveNote,
  cancelEditing,
  setExpandedStatus,
}: {
  selectedApp: Application;
  expandedStatus: string | null;
  editingNote: { appId: number; index: number } | null;
  setEditingNote: Dispatch<
    SetStateAction<{ appId: number; index: number } | null>
  >;
  noteText: string;
  setNoteText: Dispatch<SetStateAction<string>>;
  saveNote: () => void;
  cancelEditing: () => void;
  setExpandedStatus: Dispatch<SetStateAction<string | null>>;
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
  // 상태에 따른 아이콘 및 색상 정보
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          icon: <FileText className='h-4 w-4' />,
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "reviewing":
        return {
          icon: <Clock className='h-4 w-4' />,
          color: "bg-amber-100 text-amber-700 border-amber-200",
        };
      case "document_passed":
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "interview_scheduled":
        return {
          icon: <Calendar className='h-4 w-4' />,
          color: "bg-purple-100 text-purple-700 border-purple-200",
        };
      case "interview_passed":
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "final_passed":
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "rejected":
        return {
          icon: <XCircle className='h-4 w-4' />,
          color: "bg-red-100 text-red-700 border-red-200",
        };
      case "cancelled":
        return {
          icon: <AlertCircle className='h-4 w-4' />,
          color: "bg-gray-100 text-gray-700 border-gray-200",
        };
      default:
        return {
          icon: <Clock className='h-4 w-4' />,
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
    if (expandedStatus === status) {
      setExpandedStatus(null);
    } else {
      setExpandedStatus(status);
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
        {selectedApp.statusHistory.map((historyItem, index) => {
          const { icon, color } = getStatusInfo(historyItem.status);
          const isLast = index === selectedApp.statusHistory.length - 1;
          const isExpanded =
            expandedStatus === `${historyItem.status}-${index}` ||
            (editingNote?.appId === selectedApp.id &&
              editingNote?.index === index);
          const isEditing =
            editingNote?.appId === selectedApp.id &&
            editingNote?.index === index;

          return (
            <div
              key={`${historyItem.status}-${index}`}
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
                      {getStatusLabel(historyItem.status)}
                    </span>
                    <span className='text-sm text-muted-foreground'>
                      {formatDate(historyItem.date, "yyyy-MM-dd")}
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
                            historyItem.note
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
                          toggleExpand(`${historyItem.status}-${index}`)
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

                {/* Note content or edit form */}
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
                            onClick={cancelEditing}
                          >
                            <X className='h-3.5 w-3.5 mr-1' />
                            취소
                          </Button>
                          <Button size='sm' onClick={saveNote}>
                            <Save className='h-3.5 w-3.5 mr-1' />
                            저장
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='text-sm'>
                        {historyItem.note ? (
                          <p>{historyItem.note}</p>
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
