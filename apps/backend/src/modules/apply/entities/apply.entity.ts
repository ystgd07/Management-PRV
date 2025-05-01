import { Job } from 'src/modules/jobs/entities/job.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('application_stages')
export class ApplicationStage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ name: 'display_order' })
  displayOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'job_id', nullable: true })
  jobId: number;

  @Column({ name: 'company_name', length: 100 })
  companyName: string;

  @Column({ length: 100 })
  position: string;

  @Column({ name: 'applied_date', type: 'date' })
  appliedDate: Date;

  @Column({ name: 'current_stage_id' })
  currentStageId: number;

  @Column({ name: 'next_stage_date', type: 'date', nullable: true })
  nextStageDate: Date | null;

  @Column({ length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 관계 정의
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Job, { nullable: true })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => ApplicationStage)
  @JoinColumn({ name: 'current_stage_id' })
  currentStage: ApplicationStage;

  @OneToMany(() => ApplicationStageHistory, (history) => history.application)
  stageHistory: ApplicationStageHistory[];
}

@Entity('application_stage_history')
export class ApplicationStageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'application_id' })
  applicationId: number;

  @Column({ name: 'stage_id' })
  stageId: number;

  @Column({ length: 20 })
  result: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ name: 'next_stage_date', type: 'date', nullable: true })
  nextStageDate: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @ManyToOne(() => ApplicationStage)
  @JoinColumn({ name: 'stage_id' })
  stage: ApplicationStage;
}
