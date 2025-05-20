import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application, ApplicationStageHistory } from './entities/apply.entity';
import { DataSource, IsNull, MoreThan } from 'typeorm';
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
   * 유저의 지원 기록을 조회.
   */
  async getUserApplications(userId: number) {
    try {
      const applications = await this.applicationsRepository.find({
        where: { userId },
        relations: ['currentStage', 'stageHistory', 'stageHistory.stage'],
        order: { createdAt: 'DESC', stageHistory: { id: 'ASC' } },
      });
      return { applications };
    } catch (error: unknown) {
      throw new BadRequestException(
        `지원 기록 조회 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  }

  /**
   * 사용자가 특정 공고에 지원했는지 확인
   */
  async checkApplication(userId: number, jobId: number): Promise<boolean> {
    try {
      const application = await this.applicationsRepository.findOne({
        where: { userId, jobId },
      });
      return !!application;
    } catch (error: unknown) {
      console.error('지원 여부 확인 중 오류 발생:', error);
      return false;
    }
  }

  /**
   * 지원 기록을 수정
   */
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

      // 0.5) 롤백 처리: 이전 단계로 돌아가는 경우
      if (targetStageId < application.currentStageId) {
        // 현재 단계 이후의 이력 삭제
        await historyRepo.delete({
          applicationId,
          stageId: MoreThan(targetStageId),
        });
        // 이전 단계 이력 복원
        const originalHistory = await historyRepo.findOne({
          where: { applicationId, stageId: targetStageId },
          order: { startDate: 'DESC' },
        });
        if (originalHistory) {
          originalHistory.endDate = null;
          await historyRepo.save(originalHistory);
        }
        // Application 단계 되돌리기
        application.currentStageId = targetStageId;
        await manager.getRepository(Application).save(application);

        // 변경된 데이터 반환
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

  /**
   * 이력 메모 수정
   */
  async updateHistoryNote(historyId: number, notes: string, userId: number) {
    const history = await this.stageHistoryRepository.findOne({
      where: { id: historyId },
      relations: ['application'],
    });

    if (!history) {
      throw new NotFoundException('히스토리 기록을 찾을 수 없습니다.');
    }

    if (history.application.userId !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    history.notes = notes;
    await this.stageHistoryRepository.save(history);

    return {
      message: '노트가 성공적으로 업데이트 되었습니다.',
    };
  }

  /**
   * 지원 기록 삭제
   */
  async deleteApplication(
    id: number,
    userId: number,
  ): Promise<{ message: string }> {
    const application = await this.applicationsRepository.findOne({
      where: { id, userId },
    });

    if (!application) {
      throw new NotFoundException('지원 기록을 찾을 수 없습니다.');
    }

    return this.dataSource.transaction(async (manager) => {
      // 1. history 내역 삭제
      await manager
        .getRepository(ApplicationStageHistory)
        .delete({ applicationId: id });

      // 2.지원 기록 삭제
      await manager.getRepository(Application).delete(id);

      return {
        message: '지원 내역 및 관련 히스토리가 성공적으로 삭제되었습니다',
      };
    });
  }
}
