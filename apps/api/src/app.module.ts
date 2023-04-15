// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { DatabaseModule } from './providers/database/database.module';
import { ScheduleModule } from './providers/schedule/schedule.module';
import { HealthModule } from './routes/health/health.module';
import { StationsModule } from './routes/stations/stations.module';

@Module({
	imports: [
		// Database
		DatabaseModule,
		// Scheduling
		ScheduleModule,
		// Routes
		HealthModule,
		StationsModule
	],
	providers: []
})
export class AppModule {}
