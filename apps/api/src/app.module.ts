// External dependencies
import { Module, ValidationPipe } from '@nestjs/common';

// Internal dependencies
import { DatabaseModule } from './providers/database/database.module';
import { ScheduleModule } from './providers/schedule/schedule.module';
import { DeparturesModule } from './endpoints/departures/departures.module';
import { FavoriteRoutesModule } from './endpoints/favoriteRoutes/favoriteRoutes.module';
import { FavoriteStationsModule } from './endpoints/favoriteStations/favoriteStations.module';
import { HealthModule } from './endpoints/health/health.module';
import { JourneysModule } from './endpoints/journeys/journeys.module';
import { StationsModule } from './endpoints/stations/stations.module';

@Module({
	imports: [
		// Database
		DatabaseModule,
		// Scheduling
		ScheduleModule,
		// Endpoints
		DeparturesModule,
		FavoriteRoutesModule,
		FavoriteStationsModule,
		HealthModule,
		JourneysModule,
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
