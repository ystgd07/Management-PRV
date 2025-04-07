import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/entities/job/model";
import { Heart, MapPin, Briefcase } from "lucide-react";

export default function InterestCard({
  job,
  toggleSaveJob,
}: {
  job: Job;
  toggleSaveJob: (id: string) => void;
}) {
  return (
    <Card key={job.id} className='overflow-hidden'>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='font-bold'>{job.title}</h3>
            <p className='text-sm text-muted-foreground'>{job.company}</p>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => toggleSaveJob(job.id)}
            className='h-8 w-8'
          >
            <Heart className='h-5 w-5 fill-primary text-primary' />
          </Button>
        </div>
        <div className='flex items-center gap-2 mt-2 text-sm text-muted-foreground'>
          <MapPin className='h-3.5 w-3.5' />
          <span>{job.location}</span>
          <span className='text-xs'>•</span>
          <Briefcase className='h-3.5 w-3.5' />
          <span>{job.experience || "경력 무관"}</span>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <span className='text-xs text-muted-foreground'>
            {job.postedDate}
          </span>
          <Button size='sm'>지원하기</Button>
        </div>
      </CardContent>
    </Card>
  );
}
