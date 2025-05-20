import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoriteJob } from './entities/favorite-job.entity';
import { Job } from '../jobs/entities/job.entity';
import { ApplyModule } from '../apply/apply.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteJob, Job]), ApplyModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
