// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { VasttrafikModule } from '$src/providers/vasttrafik/vasttrafik.module';
import { DatabaseModule } from '$src/providers/database/database.module';

@Module({
	imports: [VasttrafikModule, DatabaseModule],
	controllers: [StationsController],
	providers: [StationsService]
})
export class StationModule {}
