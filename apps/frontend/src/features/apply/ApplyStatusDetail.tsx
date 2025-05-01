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
  XCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
  const [nextStatusDate, setNextStatusDate] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedStatus(currentStatus);
      setStatusDate("");
      setNextStatusDate("");
      setStatusNote("");
    }
  }, [open, currentStatus]);

  const statuses: ApplicationStatus[] = [
    {
      id: "1",
      label: "서류 검토중",
      description: "채용 담당자가 지원서를 검토하고 있습니다.",
      color: "bg-amber-100 text-amber-700",
      icon: <Clock className='h-4 w-4' />,
    },
    {
      id: "2",
      label: "과제전형",
      description: "과제전형을 진행하고 있습니다.",
      color: "bg-purple-100 text-purple-700",
      icon: <Calendar className='h-4 w-4' />,
    },
    {
      id: "3",
      label: "코딩테스트",
      description: "코딩테스트를 진행하고 있습니다.",
      color: "bg-purple-100 text-purple-700",
      icon: <Calendar className='h-4 w-4' />,
    },
    {
      id: "4",
      label: "1차 면접",
      description: "1차 면접을 진행하고 있습니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "5",
      label: "2차 면접",
      description: "2차 면접을 진행하고 있습니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "6",
      label: "기술면접",
      description: "기술면접을 진행하고 있습니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "7",
      label: "인성면접",
      description: "인성면접을 진행하고 있습니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "8",
      label: "최종합격",
      description: "최종합격입니다.",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className='h-4 w-4' />,
    },
    {
      id: "9",
      label: "불합격",
      description: "아쉽게도 이번 기회에 함께하지 못하게 되었습니다.",
      color: "bg-red-100 text-red-700",
      icon: <XCircle className='h-4 w-4' />,
    },
    {
      id: "10",
      label: "지원 취소",
      description: "지원이 취소되었습니다.",
      color: "bg-gray-100 text-gray-700",
      icon: <AlertCircle className='h-4 w-4' />,
    },
  ];

  const handleSave = () => {
    onStatusChange(
      applicationId,
      selectedStatus,
      statusDate,
      nextStatusDate,
      statusNote
    );
    onOpenChange(false);
  };
  console.log("currentStatus", currentStatus);

  return (
    <CustomSheet open={open} onOpenChange={onOpenChange}>
      <CustomSheetContent onClose={() => onOpenChange(false)}>
        <CustomSheetHeader>
          <CustomSheetTitle>지원 상태 변경</CustomSheetTitle>
        </CustomSheetHeader>
        <ScrollArea className='h-[calc(100vh-10rem)] py-4 mt-2'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-sm font-semibold'>현재 상태</h3>
              <div className='flex items-center gap-2 p-3 bg-muted rounded-2xl border-1 border-black '>
                <div
                  className={cn(
                    "p-1 rounded-full",
                    statuses.find((s) => s.id === currentStatus)?.color
                  )}
                >
                  {statuses.find((s) => s.id === currentStatus)?.icon}
                </div>
                <div className='text-sm font-semibold'>
                  {statuses.find((s) => s.id === currentStatus)?.label ||
                    "상태 정보 없음"}
                </div>
              </div>
            </div>
            <Separator />

            <div className='space-y-4'>
              <h3 className='text-sm font-semibold'>다음 단계 시작날짜</h3>
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

            <Separator />

            <div className='space-y-4'>
              <h3 className='text-sm font-semibold'>다음 단계</h3>
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
                        selectedStatus === status.id && "border-primary",
                        status.id === currentStatus && "bg-gray-100"
                      )}
                    >
                      <RadioGroupItem
                        value={status.id}
                        id={status.id}
                        disabled={status.id === currentStatus}
                      />
                      <Label
                        htmlFor={status.id}
                        className='flex flex-1 items-center justify-between cursor-pointer'
                      >
                        <div className='flex items-center space-x-2'>
                          <div
                            className={cn(
                              "p-1 rounded-full",
                              status.id === currentStatus
                                ? "bg-gray-100"
                                : status.color
                            )}
                          >
                            {status.icon}
                          </div>
                          <div>
                            <p
                              className={`font-medium ${
                                status.id === currentStatus && "text-gray-500"
                              }`}
                            >
                              {status.label}
                            </p>
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
              <h3 className='text-sm font-semibold'>다음단계 진행날짜</h3>
              <div className='grid gap-2'>
                <Label htmlFor='status-date'>날짜</Label>
                <Input
                  id='status-date'
                  type='date'
                  value={nextStatusDate}
                  onChange={(e) => setNextStatusDate(e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-sm font-semibold'>메모</h3>
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
