import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteJobsQuery } from "@/entities/job/queries";
import JobListItem from "./JobListItem";

interface ListItemsProps {
  category?: string;
  keyword?: string;
  limit?: number;
}

export default function ListItems({
  category,
  keyword,
  limit = 10,
}: ListItemsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const queryParams = {
    limit,
    ...(category && { category }),
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteJobsQuery(queryParams);

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
    <div className='space-y-3'>
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      ))}

      {/* 스크롤 감지 영역 */}
      <div ref={ref} className='h-10 flex items-center justify-center'>
        {isFetchingNextPage && (
          <div className='animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full'></div>
        )}
      </div>
    </div>
  );
}
