import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Application,
  ApplicationStage,
  ApplicationStageHistory,
} from './entities/apply.entity';
import { Job } from '../jobs/entities/job.entity';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      ApplicationStage,
      ApplicationStageHistory,
      Job,
    ]),
  ],
  controllers: [ApplyController],
  providers: [ApplyService],
  exports: [ApplyService],
})
export class ApplyModule {}
