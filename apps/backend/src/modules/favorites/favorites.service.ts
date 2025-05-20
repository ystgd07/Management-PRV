import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteJob } from './entities/favorite-job.entity';
import { Job } from '../jobs/entities/job.entity';
import { ApplyService } from '../apply/apply.service';
import { FavoriteJobResponseDto } from './dto/favorite-job.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteJob)
    private favoriteJobsRepository: Repository<FavoriteJob>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private readonly applyService: ApplyService,
  ) {}

  async addFavorite(
    userId: number,
    jobId: number,
    notes?: string,
  ): Promise<FavoriteJob> {
    // 공고 존재 여부 확인
    const job = await this.jobsRepository.findOne({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('해당 공고를 찾을 수 없습니다.');
    }

    // 이미 찜한 경우 확인
    const existing = await this.favoriteJobsRepository.findOne({
      where: { userId, jobId },
    });

    if (existing) {
      throw new ConflictException('이미 찜한 공고입니다.');
    }

    // 찜하기 생성
    const favorite = this.favoriteJobsRepository.create({
      userId,
      jobId,
      notes,
      status: 'active',
    });

    return this.favoriteJobsRepository.save(favorite);
  }

  async removeFavorite(userId: number, favoriteId: number): Promise<void> {
    const favorite = await this.favoriteJobsRepository.findOne({
      where: { id: favoriteId, userId },
    });

    if (!favorite) {
      throw new NotFoundException('찜한 공고를 찾을 수 없습니다.');
    }

    await this.favoriteJobsRepository.remove(favorite);
  }

  async getFavorites(userId: number): Promise<FavoriteJobResponseDto[]> {
    const favoriteJobs = await this.favoriteJobsRepository.find({
      where: { userId, status: 'active' },
      relations: ['job'],
      order: { createdAt: 'DESC' },
    });

    if (favoriteJobs.length === 0) {
      return [];
    }

    const favoriteJobResponses = await Promise.all(
      favoriteJobs.map(async (favJob) => {
        if (!favJob.job) {
          console.warn(`Job with id ${favJob.jobId} not found`);
          return null;
        }

        // 지원 여부 확인
        const isApplied = await this.applyService.checkApplication(
          userId,
          favJob.jobId,
        );

        return {
          id: favJob.id,
          jobId: favJob.jobId,
          notes: favJob.notes,
          status: favJob.status,
          createdAt: favJob.createdAt,
          isApplied, // 지원 여부 추가
          job: {
            id: favJob.job.id,
            title: favJob.job.title,
            company: favJob.job.company,
            location: favJob.job.location,
            annualFrom: favJob.job.annualFrom,
            annualTo: favJob.job.annualTo,
            dueTime: favJob.job.dueTime,
            position: favJob.job.position,
            detailUrl: favJob.job.detailUrl, // 공고 링크 추가
            isApplied: isApplied,
          },
        };
      }),
    );

    return favoriteJobResponses.filter(
      (response): response is NonNullable<typeof response> => response !== null,
    );
  }

  async checkFavorite(userId: number, jobId: number): Promise<boolean> {
    const favorite = await this.favoriteJobsRepository.findOne({
      where: { userId, jobId, status: 'active' },
    });

    return !!favorite;
  }
}
