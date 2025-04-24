import { useJobStore } from "@/store/Job/store";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import InterestCard from "./ui/InterestCard";

export default function InterestList({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const { toggleSaveJob, favorites } = useJobStore();

  // 로딩 상태는 전역적으로 관리되므로 여기서는 별도로 처리하지 않음
  const isLoading = false;

  if (isLoading) {
    return (
      <div className='flex justify-center py-10'>
        <div className='animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full'></div>
      </div>
    );
  }

  return (
    <>
      {favorites && favorites.length > 0 ? (
        <div className='space-y-3'>
          {favorites.map((favorite) => (
            <InterestCard
              key={favorite.id}
              job={favorite.job!}
              toggleSaveJob={toggleSaveJob}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <Heart className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='font-medium text-lg'>관심 공고가 없습니다</h3>
          <p className='text-muted-foreground mt-1'>
            관심있는 공고를 하트 아이콘을 눌러 저장해보세요
          </p>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => setActiveTab("search")}
          >
            공고 검색하기
          </Button>
        </div>
      )}
    </>
  );
}
