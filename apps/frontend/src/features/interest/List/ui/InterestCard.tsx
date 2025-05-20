import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/entities/job/model";
import { Heart, MapPin, Briefcase, LinkIcon, ExternalLink } from "lucide-react";
import { useJobStore } from "@/store/Job/store";
import { useDeleteFavoriteMutation } from "@/entities/favorite/queries";
import Click from "@/features/apply/Click";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function InterestCard({
  job,
  toggleSaveJob,
}: {
  job: Job;
  toggleSaveJob: (id: string) => void;
}) {
  const { getFavoriteIdByJobId } = useJobStore();
  const { mutate: deleteFavorite } = useDeleteFavoriteMutation();

  const handleRemoveFavorite = () => {
    toggleSaveJob(job.id);

    const favoriteId = getFavoriteIdByJobId(job.id);
    if (favoriteId) {
      deleteFavorite(favoriteId);
    }
  };

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
            onClick={handleRemoveFavorite}
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
          <span className='text-xs'>•</span>

          {job.detailUrl ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className='flex items-center gap-1 cursor-pointer group relative'
                    onClick={() => window.open(job.detailUrl, "_blank")}
                  >
                    <LinkIcon className='h-3.5 w-3.5 text-primary group-hover:text-rose-500 transition-colors duration-300' />
                    <span className='truncate max-w-[60px] group-hover:text-gradient-to-r group-hover:from-violet-500 group-hover:to-pink-500  transition-all duration-300 relative'>
                      <span className='absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm -z-10 transition-opacity duration-300'></span>
                      <span className='group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-pink-500 transition-all duration-300'>
                        상세 정보
                      </span>
                    </span>
                    <ExternalLink className='h-3 w-3 text-primary opacity-0 group-hover:opacity-100 group-hover:text-pink-500 transition-all duration-300 absolute -right-4' />
                  </div>
                </TooltipTrigger>
                <TooltipContent side='top' className='max-w-[300px] break-all'>
                  <p>{job.detailUrl}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className='flex items-center gap-1'>
              <LinkIcon className='h-3.5 w-3.5 text-muted-foreground' />
              <span className='text-muted-foreground'>링크 미제공</span>
            </div>
          )}
        </div>
        <div className='flex justify-between items-center mt-3'>
          <span className='text-xs text-muted-foreground'>
            {job.postedDate}
          </span>

          <div className='flex gap-2'>
            <Click job={job} isApplied={job.isApplied || false} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
