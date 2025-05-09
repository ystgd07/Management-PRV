import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateHistoryNoteDto {
  @ApiProperty({ description: '메모', required: true })
  @IsString()
  notes: string;
}
