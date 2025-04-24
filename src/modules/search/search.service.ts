import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../jobs/entities/job.entity';
import { SearchJobDto, SearchResponseDto } from './dto/search-job.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async getJobsByCategory(searchParams: any): Promise<any> {
    try {
      this.logger.log(`서비스 호출됨: ${JSON.stringify(searchParams)}`);
      this.logger.log(`searchParams 타입: ${typeof searchParams}`);

      // 디버깅을 위한 상세 로그
      if (!searchParams) {
        this.logger.error('searchParams가 undefined 또는 null입니다.');
        return {
          jobs: [],
          nextCursor: null,
          hasNextPage: false,
          categoryCounts: {},
          regionCounts: {},
        };
      }

      Object.keys(searchParams).forEach((key) => {
        this.logger.log(
          `${key}: ${JSON.stringify(searchParams[key])}, 타입: ${typeof searchParams[key]}`,
        );
      });

      const { categories, regions, cursor, limit = 20 } = searchParams;

      // annualExperience 속성 추출 (경력 필터)
      let annualExperience: number | null = null;
      if (
        searchParams.annualExperience !== undefined &&
        searchParams.annualExperience !== null
      ) {
        if (typeof searchParams.annualExperience === 'number') {
          annualExperience = searchParams.annualExperience;
        } else if (typeof searchParams.annualExperience === 'string') {
          // 문자열을 숫자로 변환 시도
          const parsed = parseInt(searchParams.annualExperience, 10);
          if (!isNaN(parsed)) {
            annualExperience = parsed;
          }
        }
      }

      this.logger.log(
        `경력 필터 값: ${annualExperience}, 타입: ${typeof annualExperience}`,
      );
      this.logger.log(
        `searchParams.annualExperience 원본 값: ${searchParams.annualExperience}, 타입: ${typeof searchParams.annualExperience}`,
      );

      // 커서가 있으면 디코딩
      let cursorId: number | undefined;
      if (cursor) {
        try {
          cursorId = this.decodeCursor(cursor);
          this.logger.log(`커서 디코딩: ${cursor} -> ID: ${cursorId}`);
        } catch (e) {
          this.logger.error(`Invalid cursor: ${cursor}`, e.stack);
        }
      }

      // 기본 쿼리 생성
      let query = this.jobRepository
        .createQueryBuilder('job')
        .where('job.status = :status', { status: 'active' })
        .orderBy('job.id', 'DESC')
        .take(limit + 1); // 다음 페이지 확인용으로 1개 더 가져옴

      // 커서가 있으면 해당 ID 이후의 데이터만 조회
      if (cursorId) {
        query = query.andWhere('job.id < :cursorId', { cursorId });
      }

      // 카테고리 필터 적용
      if (categories && categories.length > 0) {
        this.logger.log(`카테고리 필터 적용: ${categories.join(',')}`);

        // position 필드로 검색 (부분 일치)
        const categoryConditions = categories.map((category, index) => {
          const likeParamName = `likeCategory${index}`;
          query = query.setParameter(likeParamName, `%${category}%`);
          return `LOWER(job.position) LIKE :${likeParamName}`;
        });

        // title 필드도 검색
        categories.forEach((category, index) => {
          const titleParamName = `titleCategory${index}`;
          query = query.setParameter(titleParamName, `%${category}%`);
          categoryConditions.push(`LOWER(job.title) LIKE :${titleParamName}`);
        });

        query = query.andWhere(`(${categoryConditions.join(' OR ')})`);
        this.logger.log(
          `카테고리 검색 조건: ${categoryConditions.join(' OR ')}`,
        );
      }

      // 지역 필터 적용
      if (regions && regions.length > 0) {
        this.logger.log(`지역 필터 적용: ${regions.join(',')}`);
        query = query.andWhere('job.location IN (:...regions)', { regions });
      }

      // 경력 필터 적용
      if (annualExperience !== null) {
        // 신입(0년차)인 경우 신입만 필터링
        if (annualExperience === 0) {
          this.logger.log('신입 공고만 필터링합니다.');
          query = query.andWhere(
            '(job.annualFrom = 0 OR job.annualFrom IS NULL)',
          );
          this.logger.log(
            '적용된 필터: job.annualFrom = 0 OR job.annualFrom IS NULL',
          );
        } else {
          // 특정 경력에 맞는 공고만 필터링 (선택한 경력에 정확히 일치하는 것만)
          this.logger.log(`${annualExperience}년차 공고만 필터링합니다.`);

          // 수정: 경력 범위에 포함되는 공고도 필터링되도록 수정
          query = query.andWhere(
            '(job.annualFrom = :annualExperience OR (job.annualFrom <= :annualExperience AND (job.annualTo >= :annualExperience OR job.annualTo = 100)))',
            { annualExperience },
          );

          this.logger.log(
            `적용된 필터: 경력 ${annualExperience}년차 포함 범위`,
          );
        }
      } else {
        this.logger.log('경력 필터가 적용되지 않았습니다.');
      }

      // 쿼리 출력
      const queryStr = query.getQueryAndParameters();
      this.logger.log(`실행 쿼리: ${queryStr[0]}`);
      this.logger.log(`쿼리 파라미터: ${JSON.stringify(queryStr[1])}`);

      // 경력 필터 확인을 위한 전체 쿼리 로깅
      const fullQuery = query.getSql();
      this.logger.log(`전체 SQL 쿼리: ${fullQuery}`);

      // 전체 개수 계산을 위한 복제 쿼리 생성
      const countQuery = this.jobRepository
        .createQueryBuilder('job')
        .where('job.status = :status', { status: 'active' });

      // 카테고리 필터 적용 (페이징 제외한 조건만 적용)
      if (categories && categories.length > 0) {
        // position 필드로 검색 (부분 일치)
        const categoryConditions = categories.map((category, index) => {
          const likeParamName = `countLikeCategory${index}`;
          countQuery.setParameter(likeParamName, `%${category}%`);
          return `LOWER(job.position) LIKE :${likeParamName}`;
        });

        // title 필드도 검색
        categories.forEach((category, index) => {
          const titleParamName = `countTitleCategory${index}`;
          countQuery.setParameter(titleParamName, `%${category}%`);
          categoryConditions.push(`LOWER(job.title) LIKE :${titleParamName}`);
        });

        countQuery.andWhere(`(${categoryConditions.join(' OR ')})`);
      }

      // 지역 필터 적용
      if (regions && regions.length > 0) {
        countQuery.andWhere('job.location IN (:...countRegions)', {
          countRegions: regions,
        });
      }

      // 경력 필터 적용 (카운트 쿼리에도 동일하게 적용)
      if (annualExperience !== null) {
        // 신입(0년차)인 경우 신입만 필터링
        if (annualExperience === 0) {
          countQuery.andWhere('(job.annualFrom = 0 OR job.annualFrom IS NULL)');
          this.logger.log('카운트 쿼리에 신입 필터 적용');
        } else {
          // 특정 경력에 맞는 공고만 필터링

          // 수정: 경력 범위에 포함되는 공고도 필터링되도록 수정
          countQuery.andWhere(
            '(job.annualFrom = :countAnnualExperience OR (job.annualFrom <= :countAnnualExperience AND (job.annualTo >= :countAnnualExperience OR job.annualTo = 100)))',
            { countAnnualExperience: annualExperience },
          );

          this.logger.log(
            `카운트 쿼리에 ${annualExperience}년차 필터 적용 (범위 포함)`,
          );
        }
      }

      // total count 조회
      const totalCount = await countQuery.getCount();
      this.logger.log(`검색 결과 총 개수: ${totalCount}`);

      // 쿼리 실행
      const jobs = await query.getMany();
      this.logger.log(`검색된 공고 수: ${jobs.length}`);

      // 다음 페이지 여부 확인
      const hasNextPage = jobs.length > limit;
      if (hasNextPage) {
        jobs.pop(); // 마지막 항목 제거 (다음 페이지 확인용이었음)
      }

      // 다음 커서 생성
      const nextCursor =
        hasNextPage && jobs.length > 0
          ? this.encodeCursor(jobs[jobs.length - 1].id)
          : null;

      // totalCount를 포함한 반환값
      return {
        jobs: jobs || [],
        nextCursor,
        hasNextPage,
        totalCount,
        categoryCounts: {},
        regionCounts: {},
      };
    } catch (error) {
      this.logger.error(
        `공고 조회 중 오류 발생: ${error.message}`,
        error.stack,
      );

      // 오류가 발생해도 빈 결과 반환
      return {
        jobs: [],
        nextCursor: null,
        hasNextPage: false,
        totalCount: 0,
        categoryCounts: {},
        regionCounts: {},
      };
    }
  }

  /**
   * ID를 Base64로 인코딩하여 커서 생성
   */
  private encodeCursor(id: number): string {
    return Buffer.from(id.toString()).toString('base64');
  }

  /**
   * Base64 인코딩된 커서를 디코딩하여 ID 추출
   */
  private decodeCursor(cursor: string): number {
    const decoded = Buffer.from(cursor, 'base64').toString('ascii');
    return parseInt(decoded, 10);
  }
}
