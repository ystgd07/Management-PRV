import { Badge } from "@/components/ui/badge";
import { Stage, StageId } from "@/entities/apply/model";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  XCircle,
} from "lucide-react";

interface StageBadgeProps {
  stage: Stage;
  id: StageId;
}

const stageStyles: Record<Stage["id"], string> = {
  1: "bg-stage1 text-sky-600",
  2: "bg-stage2 text-amber-700",
  3: "bg-stage3 text-teal-600",
  4: "bg-stage4 text-pink-700",
  5: "bg-stage5 text-violet-700",
  6: "bg-stage6 text-sky-500",
  7: "bg-stage7 text-rose-600",
  8: "bg-stage8 text-green-700",
  9: "bg-stage9 text-red-600",
};

const stageIcons: Record<Stage["id"], React.ReactNode> = {
  1: <FileText className='h-4 w-4' />, // 서류 검토중
  2: <FileText className='h-4 w-4' />, // 과제전형
  3: <Clock className='h-4 w-4' />, // 코딩테스트
  4: <Calendar className='h-4 w-4' />, // 1차 면접
  5: <Calendar className='h-4 w-4' />, // 2차 면접
  6: <Clock className='h-4 w-4' />, // 기술 면접
  7: <AlertCircle className='h-4 w-4' />, // 인성 면접
  8: <CheckCircle className='h-4 w-4' />, // 최종 합격
  9: <XCircle className='h-4 w-4' />, // 불합격
};

export function StageBadge({ stage, id }: StageBadgeProps) {
  return (
    <Badge
      className={cn("font-semibold", stageStyles[id])}
      variant={stage.id === 8 ? "default" : "outline"}
    >
      {stageIcons[id]}
      {stage.name}
    </Badge>
  );
}
