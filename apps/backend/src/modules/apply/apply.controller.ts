import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/create-application.dto';
import { ApplyService } from './apply.service';
import { Application } from './entities/apply.entity';
import { Request } from 'express';
import { UpdateHistoryNoteDto } from './dto/update-history-note.dto';

interface AuthRequest extends Request {
  user: { id: number };
}

@ApiTags('지원')
@Controller('apply')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  @ApiOperation({ summary: '채용공고 지원하기' })
  @ApiCreatedResponse({ description: '지원 성공' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  async createApplication(
    @Req() req: AuthRequest,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<{ id: number; message: string; application: Application | null }> {
    const userId = req.user.id;
    return this.applyService.createApplication(userId, createApplicationDto);
  }

  /**
   * 유저의 지원 기록을 조회
   */
  @Get()
  @ApiOperation({ summary: '유저 지원 기록 조회' })
  @ApiOkResponse({ description: '지원 기록 조회 성공' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  async getUserApplications(
    @Req() req: AuthRequest,
  ): Promise<{ applications: Application[] }> {
    const userId = req.user.id;
    return this.applyService.getUserApplications(userId);
  }

  /**
   * 특정 공고에 지원했는지 확인
   */
  @Get('check/:jobId')
  @ApiOperation({ summary: '특정 공고 지원 여부 확인' })
  @ApiOkResponse({ description: '지원 여부 확인 성공' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  async checkApplication(
    @Req() req: AuthRequest,
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<{ isApplied: boolean }> {
    const userId = req.user.id;
    const isApplied = await this.applyService.checkApplication(userId, jobId);
    return { isApplied };
  }

  /**
   * 지원 기록을 수정
   */
  @Patch(':id')
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateApplicationDto,
  ) {
    return this.applyService.updateApplication(id, dto);
  }

  /**
   * 이력 메모 수정
   */
  @Patch('history/:id/note')
  async updateHistoryNote(
    @Param('id', ParseIntPipe) historyId: number,
    @Body() dto: UpdateHistoryNoteDto,
    @Req() req: AuthRequest,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    return this.applyService.updateHistoryNote(historyId, dto.notes, userId);
  }

  // 지원 기록 삭제
  @Delete(':id')
  @ApiOperation({ summary: '지원 내역 삭제' })
  @ApiOkResponse({ description: '지원 내역 삭제 성공' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  async deleteApplication(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    return this.applyService.deleteApplication(id, userId);
  }
}
