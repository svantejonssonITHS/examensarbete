// External dependencies
import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';

// Internal dependencies
import { ScheduleProvider } from './schedule.provider';
import { DatabaseModule } from '../database/database.module';
import { SLModule } from '../sl/sl.module';

@Module({
	imports: [NestScheduleModule.forRoot(), DatabaseModule, SLModule],
	providers: [ScheduleProvider],
	exports: [ScheduleProvider]
})
export class ScheduleModule {}
