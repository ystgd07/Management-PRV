import { Button } from "@/components/ui/button";
import { PostApplyRequest } from "@/entities/apply/model";
import { useApplyMutation } from "@/entities/apply/queries";
import { useCallback } from "react";
import { Job } from "@/entities/job/model";

export default function Click({ job }: { job: Job }) {
  const { mutate, isPending, isError, error } = useApplyMutation();

  const apply = useCallback(
    (payload: PostApplyRequest) => {
      mutate(payload);
    },
    [mutate]
  );

  return (
    <Button
      size='sm'
      onClick={() =>
        apply({
          jobId: Number(job.id),
          companyName: job.company,
          position: job.category || "",
          appliedDate: new Date().toISOString(),
          nextStageDate: new Date().toISOString(),
          notes: "",
        })
      }
      className='cursor-pointer'
    >
      {isPending ? "지원중.." : "지원하기"}
      {isError && <div>{error.message}</div>}
    </Button>
  );
}
