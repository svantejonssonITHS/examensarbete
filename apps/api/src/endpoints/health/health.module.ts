// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { VasttrafikModule } from '$src/providers/vasttrafik/vasttrafik.module';
import { DatabaseModule } from '$src/providers/database/database.module';

@Module({
	imports: [VasttrafikModule, DatabaseModule],
	controllers: [HealthController],
	providers: [HealthService]
})
export class HealthModule {}
