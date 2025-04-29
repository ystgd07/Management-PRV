import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application, ApplicationStageHistory } from './entities/apply.entity';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { Job } from '../jobs/entities/job.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplyService {
  // 서류 검토 단계 ID
  private readonly DOCUMENT_REVIEW_STAGE_ID = 1;

  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    @InjectRepository(ApplicationStageHistory)
    private stageHistoryRepository: Repository<ApplicationStageHistory>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private dataSource: DataSource,
  ) {}

  async createApplication(
    userId: number,
    createApplicationDto: CreateApplicationDto,
  ) {
    try {
      if (createApplicationDto.jobId) {
        const job = await this.jobsRepository.findOne({
          where: { id: createApplicationDto.jobId },
        });

        if (!job) {
          throw new NotFoundException('채용 공고를 찾을 수 없습니다.');
        }
      }

      const application = await this.applicationsRepository.save({
        userId,
        jobId: createApplicationDto.jobId || undefined,
        companyName: createApplicationDto.companyName,
        position: createApplicationDto.position,
        appliedDate: new Date(createApplicationDto.appliedDate),
        currentStageId: this.DOCUMENT_REVIEW_STAGE_ID,
        status: 'active',
        ...(createApplicationDto.nextStageDate && {
          nextStageDate: new Date(createApplicationDto.nextStageDate),
        }),
      });

      await this.stageHistoryRepository.save({
        applicationId: application.id,
        stageId: this.DOCUMENT_REVIEW_STAGE_ID,
        result: 'waiting',
        startDate: new Date(createApplicationDto.appliedDate),
        notes: createApplicationDto.notes || '',
        ...(createApplicationDto.nextStageDate && {
          nextStageDate: new Date(createApplicationDto.nextStageDate),
        }),
      });

      const createdApplication = await this.applicationsRepository.findOne({
        where: { id: application.id },
        relations: ['currentStage'],
      });

      return {
        id: application.id,
        message: '지원이 성공적으로 등록되었습니다.',
        application: createdApplication,
      };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        `지원 등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  }

  /**
   * 유저의 지원 기록을 조회합니다.
   */
  async getUserApplications(userId: number) {
    try {
      const applications = await this.applicationsRepository.find({
        where: { userId },
        relations: ['currentStage', 'stageHistory', 'stageHistory.stage'],
        order: { createdAt: 'DESC' },
      });
      return { applications };
    } catch (error: unknown) {
      throw new BadRequestException(
        `지원 기록 조회 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  }
}