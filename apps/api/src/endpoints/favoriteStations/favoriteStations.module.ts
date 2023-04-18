// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { FavoriteStationsService } from './favoriteStations.service';
import { FavoriteStationsController } from './favoriteStations.controller';
import { DatabaseModule } from '$src/providers/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [FavoriteStationsController],
	providers: [FavoriteStationsService]
})
export class FavoriteStationsModule {}
