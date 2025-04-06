import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { jobs } from "@/shared/lib/sample";
import { Heart, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useJobStore } from "@/store/Job/store";

export default function ListItems() {
  const { savedJobs, toggleSaveJob } = useJobStore();

  return (
    <div className='space-y-3'>
      {jobs.map((job) => (
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
                <Heart
                  className={`h-5 w-5 ${
                    savedJobs.includes(job.id)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>
            <div className='flex items-center gap-2 mt-2 text-sm text-muted-foreground'>
              <MapPin className='h-3.5 w-3.5' />
              <span>{job.location}</span>
              <span className='text-xs'>•</span>
              <Briefcase className='h-3.5 w-3.5' />
              <span>{job.experience}</span>
            </div>
            <p className='mt-2 text-sm line-clamp-2'>{job.description}</p>
            <div className='flex flex-wrap gap-1 mt-3'>
              {job.tags.map((tag) => (
                <Badge key={tag} variant='secondary' className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className='flex justify-between items-center mt-3'>
              <span className='text-xs text-muted-foreground'>
                {job.posted}
              </span>
              <Button size='sm'>상세보기</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
