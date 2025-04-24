import { useUnifiedInfiniteJobsQuery } from "@/entities/job";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface UseJobCategoriesProps {
  categories?: string[];
  regions?: string[];
  limit?: number;
}

export const useJobCategories = ({
  categories,
  regions,
  limit = 20,
}: UseJobCategoriesProps = {}) => {
  // 무한 스크롤을 위한 IntersectionObserver 설정
  const { ref, inView } = useInView({
    threshold: 0.1, // 요소의 10%가 보이면 트리거
  });

  const isFiltered = !!(categories?.length || regions?.length);

  // 통합 쿼리 훅 사용
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useUnifiedInfiniteJobsQuery({
    isFiltered,
    params: {
      categories,
      regions,
      limit,
    },
  });

  // InView 상태가 되면 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 데이터 구조 변환
  const allCategories = isFiltered
    ? data?.pages
        .flatMap((page) => page.jobs || [])
        .reduce((acc: any[], job) => {
          // 카테고리 기반으로 그룹화
          const category = job.category || "Unknown";
          const existingCategory = acc.find((cat) => cat.name === category);

          if (existingCategory) {
            existingCategory.jobs = existingCategory.jobs || [];
            existingCategory.jobs.push(job);
          } else {
            acc.push({ name: category, jobs: [job] });
          }

          return acc;
        }, [])
    : [];

  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    categories: allCategories,
    totalCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    loadMoreRef: ref, // 이 ref를 마지막 아이템이나 로딩 인디케이터에 연결
  };
};
