import { Job } from "@/entities/job";
import JobListItem from "./JobListItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, unknown>>;
}

export default function JobList({
  jobs,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: JobListProps) {
  // 무한 스크롤 설정
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% 정도 보이면 로드
  });

  // 뷰포트에 들어오면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 로딩 중이고 데이터가 없을 때
  if (isLoading && jobs.length === 0) {
    return (
      <div className='flex justify-center items-center py-20'>
        <Loader2 className='w-10 h-10 animate-spin text-primary' />
      </div>
    );
  }

  // 데이터가 없을 때
  if (!isLoading && jobs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <p className='text-muted-foreground mb-2'>검색 결과가 없습니다</p>
        <p className='text-sm text-muted-foreground'>
          다른 필터 조건으로 시도해보세요
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* 공고 목록 */}
      <div className='space-y-3'>
        {jobs.map((job) => (
          <JobListItem key={job.id} job={job} />
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {(isFetchingNextPage || hasNextPage) && (
        <div ref={ref} className='flex justify-center py-4'>
          {isFetchingNextPage && (
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
          )}
        </div>
      )}
    </div>
  );
}
