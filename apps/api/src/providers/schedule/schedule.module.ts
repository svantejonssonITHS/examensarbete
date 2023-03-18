// External dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';

// Internal dependencies
import { Geometry, Position, Station } from '$src/entities';
import { ScheduleProvider } from './schedule.provider';

@Module({
	imports: [NestScheduleModule.forRoot(), TypeOrmModule.forFeature([Geometry, Position, Station])],
	providers: [ScheduleProvider],
	exports: [ScheduleProvider]
})
export class ScheduleModule {}
