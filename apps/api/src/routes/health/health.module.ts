// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { VasttrafikModule } from '$src/providers/vasttrafik/vasttrafik.module';

@Module({
	imports: [VasttrafikModule],
	controllers: [HealthController],
	providers: [HealthService]
})
export class HealthModule {}
