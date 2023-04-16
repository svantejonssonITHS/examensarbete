// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { DatabaseModule } from '$src/providers/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [StationsController],
	providers: [StationsService]
})
export class StationsModule {}
