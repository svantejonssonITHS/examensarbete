// External dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal dependencies
import env from './utils/env.util';
import { Geometry, Position, Station } from './entities';
import { HealthModule } from './routes/health/health.module';
import { ScheduleModule } from './providers/schedule/schedule.module';

@Module({
	imports: [
		// Database
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: env.DATABASE_HOST,
			port: env.DATABASE_PORT,
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			database: env.DATABASE_NAME,
			synchronize: env.DATABASE_SYNCHRONIZE,
			entities: [Geometry, Position, Station]
		}),
		// Scheduling
		ScheduleModule,
		// Routes
		HealthModule
	],
	providers: []
})
export class AppModule {}
