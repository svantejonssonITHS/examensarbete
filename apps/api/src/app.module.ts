// External dependencies
import { Module, ValidationPipe } from '@nestjs/common';

// Internal dependencies
import { DatabaseModule } from './providers/database/database.module';
import { ScheduleModule } from './providers/schedule/schedule.module';
import { FavoriteRoutesModule } from './endpoints/favoriteRoutes/favoriteRoutes.module';
import { HealthModule } from './endpoints/health/health.module';
import { StationsModule } from './endpoints/stations/stations.module';

@Module({
	imports: [
		// Database
		DatabaseModule,
		// Scheduling
		ScheduleModule,
		// Endpoints
		FavoriteRoutesModule,
		HealthModule,
		StationsModule
	],
	providers: [
		{
			provide: 'APP_PIPE',
			useValue: new ValidationPipe()
		}
	]
})
export class AppModule {}
