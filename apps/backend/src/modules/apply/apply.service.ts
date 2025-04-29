import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application, ApplicationStageHistory } from './entities/apply.entity';
import { DataSource, IsNull } from 'typeorm';
import { Repository } from 'typeorm';
import { Job } from '../jobs/entities/job.entity';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/create-application.dto';

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

  async updateApplication(applicationId: number, dto: UpdateApplicationDto) {
    const application = await this.applicationsRepository.findOne({
      where: { id: applicationId },
    });
    if (!application) {
      throw new NotFoundException('지원 기록을 찾을 수 없습니다.');
    }
    // 현재 단계일 경우 현재 단계 ID 사용, 아니면 수정한 단계 ID 사용
    const targetStageId = dto.currentStageId ?? application.currentStageId;

    return this.dataSource.transaction(async (manager) => {
      const historyRepo = manager.getRepository(ApplicationStageHistory);
      // 0) 동일 단계 내 수정
      if (targetStageId === application.currentStageId) {
        const currentHistory = await historyRepo.findOne({
          where: { applicationId, endDate: IsNull() },
          order: { startDate: 'DESC' },
        });
        if (!currentHistory) {
          throw new NotFoundException('이력 레코드를 찾을 수 없습니다.');
        }
        if (dto.stageDate) {
          currentHistory.startDate = new Date(dto.stageDate);
        }
        if (dto.notes) {
          currentHistory.notes = dto.notes;
        }
        if (dto.nextStageDate) {
          currentHistory.nextStageDate = new Date(dto.nextStageDate);
        }
        await historyRepo.save(currentHistory);
        if (dto.nextStageDate) {
          application.nextStageDate = new Date(dto.nextStageDate);
          await manager.getRepository(Application).save(application);
        }
        return manager.getRepository(Application).findOne({
          where: { id: applicationId },
          relations: ['currentStage', 'stageHistory', 'stageHistory.stage'],
        });
      }

      // 1) 이전 열린 이력 종료
      const currentHistory = await historyRepo.findOne({
        where: { applicationId, endDate: IsNull() },
        order: { startDate: 'DESC' },
      });
      if (currentHistory) {
        currentHistory.endDate = dto.stageDate
          ? new Date(dto.stageDate)
          : new Date();
        await historyRepo.save(currentHistory);
      }

      // 2) 새 이력 추가
      const newHistory = historyRepo.create({
        applicationId,
        stageId: targetStageId,
        result: 'waiting',
        startDate: dto.stageDate ? new Date(dto.stageDate) : new Date(),
        notes: dto.notes ?? '',
        ...(dto.nextStageDate && {
          nextStageDate: new Date(dto.nextStageDate),
        }),
      });
      await historyRepo.save(newHistory);

      // 3) Application 단계 업데이트
      application.currentStageId = targetStageId;
      if (dto.nextStageDate) {
        application.nextStageDate = new Date(dto.nextStageDate);
      }

      await manager.getRepository(Application).save(application);

      // 4) 최종 결과 반환 (relations 포함)
      return manager.getRepository(Application).findOne({
        where: { id: applicationId },
        relations: ['currentStage', 'stageHistory', 'stageHistory.stage'],
      });
    });
  }
}
