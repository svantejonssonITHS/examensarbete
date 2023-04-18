// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { FavoriteRoutesService } from './favoriteRoutes.service';
import { FavoriteRoutesController } from './favoriteRoutes.controller';
import { DatabaseModule } from '$src/providers/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [FavoriteRoutesController],
	providers: [FavoriteRoutesService]
})
export class FavoriteRoutesModule {}
