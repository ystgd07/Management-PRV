import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/entities/job/model";
import { Heart, MapPin, Briefcase } from "lucide-react";
import { useJobStore } from "@/store/Job/store";
import { useDeleteFavoriteMutation } from "@/entities/favorite/queries";
import Click from "@/features/apply/Click";

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
        </div>
        <div className='flex justify-between items-center mt-3'>
          <span className='text-xs text-muted-foreground'>
            {job.postedDate}
          </span>
          <Click job={job} />
        </div>
      </CardContent>
    </Card>
  );
}
