import { Controller, Get, Post, Req, UseGuards, Body } from '@nestjs/common';
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
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplyService } from './apply.service';
import { Application } from './entities/apply.entity';
import { Request } from 'express';

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
   * 유저의 지원 기록을 조회합니다.
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
  // 지원 기록 수정
}
