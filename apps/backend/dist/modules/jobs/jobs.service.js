"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entities/job.entity");
let JobsService = class JobsService {
    jobRepository;
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async getJobs(cursor, limit = 20) {
        let query = this.jobRepository
            .createQueryBuilder('job')
            .where('job.status = :status', { status: 'active' })
            .orderBy('job.id', 'DESC')
            .take(limit + 1);
        if (cursor) {
            const decodedCursor = this.decodeCursor(cursor);
            query = query.andWhere('job.id < :cursor', { cursor: decodedCursor });
        }
        const jobs = await query.getMany();
        const hasNextPage = jobs.length > limit;
        if (hasNextPage) {
            jobs.pop();
        }
        const nextCursor = hasNextPage && jobs.length > 0
            ? this.encodeCursor(jobs[jobs.length - 1].id)
            : null;
        return {
            jobs,
            nextCursor,
            hasNextPage,
        };
    }
    encodeCursor(id) {
        return Buffer.from(id.toString()).toString('base64');
    }
    decodeCursor(cursor) {
        const decoded = Buffer.from(cursor, 'base64').toString('ascii');
        return parseInt(decoded, 10);
    }
    async getJobById(id) {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new common_1.NotFoundException(`ID가 ${id}인 공고를 찾을 수 없습니다.`);
        }
        return job;
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map