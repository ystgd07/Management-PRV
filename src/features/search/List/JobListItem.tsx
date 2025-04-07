import { Job } from "@/entities/job/model";
import { Building2, MapPin, Clock, Heart } from "lucide-react";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useJobStore } from "@/store/Job/store";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProps) {
  const { savedJobs, toggleSaveJob } = useJobStore();
  const isSaved = savedJobs.includes(job.id);

  const getDueTimeDisplay = () => {
    if (!job.dueTime) {
      return "마감일 미정";
    }

    const dueDate = new Date(job.dueTime);

    if (!isValid(dueDate)) {
      return "마감일 미정";
    }

    const now = new Date();

    if (dueDate < now) {
      return "마감됨";
    }

    if (dueDate.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0)) {
      return "오늘 마감";
    }

    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return `D-${diffDays}`;
    }

    return format(dueDate, "yyyy.MM.dd 마감", { locale: ko });
  };

  return (
    <div className='border rounded-lg p-4 bg-card hover:shadow-md transition-shadow mb-3'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <h3 className='font-bold text-lg line-clamp-1'>{job.title}</h3>

          <div className='flex items-center mt-1 text-muted-foreground'>
            <Building2 className='h-4 w-4 mr-1' />
            <span className='text-sm'>{job.company}</span>
          </div>

          <div className='flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground'>
            <div className='flex items-center'>
              <MapPin className='h-4 w-4 mr-1' />
              <span>{job.location}</span>
            </div>

            <div className='flex items-center'>
              <Clock className='h-4 w-4 mr-1' />
              <span
                className={
                  job.dueTime
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }
              >
                {getDueTimeDisplay()}
              </span>
            </div>
          </div>

          <div className='flex mt-3 space-x-1'>
            {job.requirements?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className='px-2 py-0.5 bg-muted text-xs rounded-full'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center space-y-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => toggleSaveJob(job.id)}
            className='h-8 w-8'
          >
            <Heart
              className={`h-5 w-5 ${
                isSaved ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='flex justify-between items-center mt-3'>
          <Button size='sm'>상세보기</Button>
        </div>
      </div>
    </div>
  );
}
