import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplyService } from './apply.service';

@ApiTags('지원')
@Controller('apply')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '채용공고 지원하기' })
  @ApiResponse({ status: 201, description: '지원 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async createApplication(
    @Req() req,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
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
