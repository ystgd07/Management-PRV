import { Badge } from "@/components/ui/badge";
import { Stage, StageId } from "@/entities/apply/model";
import { cn } from "@/lib/utils";

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

export function StageBadge({ stage, id }: StageBadgeProps) {
  return (
    <Badge
      className={cn("font-semibold", stageStyles[id])}
      variant={stage.id === 8 ? "default" : "outline"}
    >
      {stage.name}
    </Badge>
  );
}
