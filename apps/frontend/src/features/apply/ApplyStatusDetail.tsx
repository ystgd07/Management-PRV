import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CustomSheet,
  CustomSheetContent,
  CustomSheetHeader,
  CustomSheetTitle,
} from "@/components/ui/custom-sheet";
import { ApplicationStatus, ApplicationStatusSheetProps } from "./tpye/type";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ApplyStatusDetail({
  open,
  onOpenChange,
  currentStatus,
  applicationId,
  onStatusChange,
}: ApplicationStatusSheetProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [statusDate, setStatusDate] = useState("");
  const [statusNote, setStatusNote] = useState("");

  const statuses: ApplicationStatus[] = [
    {
      id: "submitted",
      label: "서류 제출",
      description: "지원서가 제출되었습니다.",
      color: "bg-blue-100 text-blue-700",
      icon: <FileText className='h-4 w-4' />,
    },
    {
      id: "reviewing",
      label: "서류 검토중",
      description: "채용 담당자가 지원서를 검토하고 있습니다.",
      color: "bg-amber-100 text-amber-700",
      icon: <Clock className='h-4 w-4' />,
    },
    {
      id: "document_passed",
      label: "서류 합격",
      description: "서류 전형에 합격하셨습니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "interview_scheduled",
      label: "면접 예정",
      description: "면접 일정이 확정되었습니다.",
      color: "bg-purple-100 text-purple-700",
      icon: <Calendar className='h-4 w-4' />,
    },
    {
      id: "interview_passed",
      label: "면접 합격",
      description: "면접 전형에 합격하셨습니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "final_passed",
      label: "최종 합격",
      description: "최종 합격하셨습니다. 축하합니다!",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "rejected",
      label: "불합격",
      description: "아쉽게도 이번 기회에 함께하지 못하게 되었습니다.",
      color: "bg-red-100 text-red-700",
      icon: <XCircle className='h-4 w-4' />,
    },
    {
      id: "cancelled",
      label: "지원 취소",
      description: "지원이 취소되었습니다.",
      color: "bg-gray-100 text-gray-700",
      icon: <AlertCircle className='h-4 w-4' />,
    },
  ];

  const handleSave = () => {
    onStatusChange(applicationId, selectedStatus, statusDate, statusNote);
    onOpenChange(false);
  };

  return (
    <CustomSheet open={open} onOpenChange={onOpenChange}>
      <CustomSheetContent onClose={() => onOpenChange(false)}>
        <CustomSheetHeader>
          <CustomSheetTitle>지원 상태 변경</CustomSheetTitle>
        </CustomSheetHeader>
        <ScrollArea className='h-[calc(100vh-10rem)] py-4 mt-2'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium'>현재 상태</h3>
              <div className='p-3 bg-muted rounded-md'>
                {statuses.find((s) => s.id === currentStatus)?.label ||
                  "상태 정보 없음"}
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h3 className='text-sm font-medium'>상태 선택</h3>
              <RadioGroup
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <div className='space-y-2'>
                  {statuses.map((status) => (
                    <div
                      key={status.id}
                      className={cn(
                        "flex items-center space-x-2 rounded-md border p-3",
                        selectedStatus === status.id && "border-primary"
                      )}
                    >
                      <RadioGroupItem value={status.id} id={status.id} />
                      <Label
                        htmlFor={status.id}
                        className='flex flex-1 items-center justify-between cursor-pointer'
                      >
                        <div className='flex items-center space-x-2'>
                          <div className={cn("p-1 rounded-full", status.color)}>
                            {status.icon}
                          </div>
                          <div>
                            <p className='font-medium'>{status.label}</p>
                            <p className='text-xs text-muted-foreground'>
                              {status.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className='h-4 w-4 text-muted-foreground' />
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h3 className='text-sm font-medium'>상태 변경 날짜</h3>
              <div className='grid gap-2'>
                <Label htmlFor='status-date'>날짜</Label>
                <Input
                  id='status-date'
                  type='date'
                  value={statusDate}
                  onChange={(e) => setStatusDate(e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-sm font-medium'>메모</h3>
              <div className='grid gap-2'>
                <Label htmlFor='status-note'>메모 (선택사항)</Label>
                <Textarea
                  id='status-note'
                  placeholder='면접 준비사항, 피드백 등을 기록해보세요.'
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <Button className='w-full' onClick={handleSave}>
              상태 변경하기
            </Button>
          </div>
        </ScrollArea>
      </CustomSheetContent>
    </CustomSheet>
  );
}
