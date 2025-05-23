import { IsDateString } from 'class-validator';
import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: '채용공고 ID (선택 사항)', required: false })
  @IsOptional()
  @IsNumber()
  jobId?: number;

  @ApiProperty({ description: '회사명', required: true })
  @IsString()
  companyName: string;

  @ApiProperty({ description: '포지션 제목', required: true })
  @IsString()
  position: string;

  @ApiProperty({ description: '지원일 (YYYY-MM-DD)', required: true })
  @IsDateString()
  appliedDate: string;

  @ApiProperty({
    description: '다음 단계 예정일 (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  nextStageDate?: string;

  @ApiProperty({ description: '메모', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
