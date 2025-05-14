import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FilterParams, useUnifiedInfiniteJobsQuery } from "@/entities/job";
import JobListItem from "./JobListItem";

interface FilteredListItemsProps {
  isFiltered: boolean;
  filterParams: FilterParams;
}

export default function FilteredListItems({
  isFiltered,
  filterParams,
}: FilteredListItemsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useUnifiedInfiniteJobsQuery({
    isFiltered,
    params: filterParams,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className='flex justify-center py-10'>
        <div className='animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full'></div>
      </div>
    );
  }

  if (isError) {
    console.error("필터링된 공고 목록 조회 중 오류 발생");
    return (
      <div className='text-center py-10 text-destructive'>
        <p className='text-lg font-medium'>데이터를 불러올 수 없습니다</p>
        <p className='text-sm mt-2'>다시 시도해주세요</p>
      </div>
    );
  }

  if (!data || data.pages[0].jobs.length === 0) {
    return (
      <div className='text-center py-10 text-muted-foreground'>
        <p className='text-lg font-medium'>검색 결과가 없습니다</p>
        <p className='text-sm mt-2'>다른 검색어나 필터를 시도해보세요</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 검색 결과 요약 */}
      <p className='text-sm text-muted-foreground'>
        총 {data.pages[0].totalCount || 0}개의 공고를 찾았습니다
      </p>

      {/* 검색 결과 목록 */}
      <div className='space-y-3'>
        {data.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.jobs.map((job) => (
              <JobListItem key={job.id} job={job} />
            ))}
          </div>
        ))}

        {/* 무한 스크롤 감지 요소 */}
        <div ref={ref} className='h-10 flex items-center justify-center'>
          {isFetchingNextPage && (
            <div className='animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full'></div>
          )}
        </div>
      </div>
    </div>
  );
}
